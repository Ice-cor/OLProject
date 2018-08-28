function ajax (Vue, axios) {
  axios.defaults.headers['content-Type'] = 'application/x-www-form-urlencoded'
  /* let $http = axios.create({
    baseURL,
    timeout: 1000
  }) */
  Vue.prototype.$ajax = function (params) {
    const token = this.$store.getters.getToken;
    params['data'].token = token;
    axios.post(params['url'], JSON.stringify(params['data']))
      .then(res => {
        res = res.data;
        if (res.status === 0) {
          if (params['success'] !== undefined) params['success'](res)
        } else {
          if (params['fail'] === undefined) {}
          else params['fail'](res)
        }
      }).catch(error => console.log(error))
  }

  /* const _get = (url, query) => {
    return $http.get(url, {params: query})
  }

  const _post = (url, query) => {
    return $http.post(url, JSON.stringify(query), {headers: {'Content-Type': 'application/json'}})
  }

  const _postFrom = (url, query) => {
    return $http.post(url, JSON.stringify(query), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
  }

  const _postImg = (url, query) => {
    return $http.post(url, query, {headers: {'Content-Type': 'multipart/form-data'}})
  } */
}

export default ajax
