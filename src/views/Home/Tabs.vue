<template>
  <div class="tabsWrap">
    <ul class="tabs">
      <li :class="{myActive: index === number}" v-for="(tab,index) in tabsData" @click="tabsChange(index,tab.id)" :key="tab.id">
        {{tab.name}}
      </li>
    </ul>

    <ol class="tabBody">
      <li v-for="item in objListChange[id]">
        <div class="mainInfo">
          <span class="companyLogo">
            <img :src="item.logoUrl" :alt="item.name">
          </span>
          <div class="companyInfo">
            <div class="companyInfoTop">
              <h2 class="companyName">
                {{item.name}}
              </h2>
              <span class="labels" v-for="lable in item.labels">
                {{lable.name}}
              </span>
            </div>
            <h3 class="des">{{item.des}}</h3>
            <div class="moneyInfo">
              <p>
                <span class="loanRangeText">{{item.loanRangeText}}</span>
                <span class="loanRange">{{item.loanRange}}</span>
              </p>
              <p>
                <span class="loanTermText">{{item.loanTermText}}</span>
                <span class="loanTerm">{{item.loanTerm}}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="peopleNumsAndBtn">
          <p class="peopleNums">{{item.number}}</p>
          <button class="applyBtn">申请</button>
        </div>
      </li>
    </ol>
    <div class="more" @click="loadMore" v-if="isLoadMore">
      <button>更多产品</button>
    </div>
    <!-- <div class="more" @click="loadMore" v-else>
      没有更多了
    </div> -->
  </div>
</template>


<script>
export default {
  name: 'tabs',
  data() {
    return {
      number: 0,
      id: '',
      tabBodyListObj: {},
      countObj: {},
      pageNo: 1,
      pageSize: 3
    }
  },
  methods: {
    tabsChange(index, id) {
      this.number = index
      this.id = id
    },
    getTabBodyList({ typeId, pageNo, pageSize }) {
      //tabs初始化数据
      this.$axios
        .post('/pub/getProductList', { typeId, pageNo, pageSize })
        .then(res => {
          if (res.status === 200) {
            let data = res.data
            if (data.productVOs.length > 0) {
              this.$set(this.tabBodyListObj, typeId, data.productVOs)
              this.$set(this.countObj, typeId, {
                count: data.count,
                pageNo: 0,
                pageSize: 3
              }) //存储页码状态
            } else {
              this.tabBodyListObj[typeId] = []
            }
          }
        })
    },
    upDateBodyList({ typeId, pageNo, pageSize }) {
      this.$axios
        .post('/pub/getProductList', { typeId, pageNo, pageSize })
        .then(res => {
          if (res.status === 200) {
            let data = res.data
            if (data.productVOs.length > 0 && pageNo > 1) {
              this.tabBodyListObj[typeId].push(...data.productVOs)
              console.log(this.tabBodyListObj[typeId])
            } else if (data.productVOs.length > 0 && pageNo === 1) {
              this.tabBodyListObj[typeId] = data.productVOs
            } else {
              return
            }
          }
        })
    },
    loadMore() {
      let { pageNo, pageSize } = this.countObj[this.id]
      pageSize = 10 // 加载条数
      this.upDateBodyList({
        typeId: this.id,
        pageNo: pageNo + 1,
        pageSize: pageSize
      })
    }
  },
  created() {
    this.id = this.tabsData[0].id
    this.tabsData.forEach(list => {
      this.getTabBodyList({
        typeId: list.id,
        pageNo: 1,
        pageSize: 3
      })
    })
  },
  mounted() {
    // console.log(this.tabBodyListObj,'mounted')
  },
  computed: {
    tabsData() {
      if (this.$store.state.homePageData.typePOs) {
        this.$store.state.homePageData.typePOs.forEach(list => {
          this.$set(this.tabBodyListObj, list.id, [])
        })
      }
      return this.$store.state.homePageData.typePOs
    },
    objListChange() {
      return this.tabBodyListObj
    },
    isLoadMore() {
      if (this.countObj[this.id]) {
        return (
          this.tabBodyListObj[this.id].length < this.countObj[this.id].count
        )
      }
    }
  },
  updated() {
    // console.log(this.tabBodyListObj,'updated')
  }
}
</script>

<style lang="scss" scoped>
.tabsWrap {
  > .tabs {
    display: flex;
    background: white;
    font-size: 28px;
    color: #333;
    li {
      flex: 1;
      padding: 30px 0;
    }
    li.myActive {
      border-bottom: 1.5px solid #3886f8;
    }
  }
  > .tabBody {
    margin-top: 20px;
    background: white;
    text-align: left;
    > li {
      padding: 20px 0 20px 30px;
      border-bottom: 1px solid #ddd;
      .mainInfo {
        display: flex;
        align-items: center;
        .companyLogo {
          display: block;
          width: 136px;
          height: 136px;
          background: #989898;
          border-radius: 25px;
          box-shadow: 0 0 0 4px rgba(152, 152, 152, 0.4);
          margin-right: 24px;
          overflow: hidden;
          text-align: center;
          line-height: 106px;
          margin-right: 60px;
        }
        .companyInfo {
          .companyInfoTop {
            display: flex;
            align-items: center;
            padding-bottom: 25px;
            .companyName {
              font-size: 36px;
              margin-right: 20px;
              display: inline-block;
            }
            .labels {
              display: inline-block;
              padding: 2px 10px;
              transform: skew(-20deg);
              background: #fe5c0d;
              border-radius: 10px;
              font-size: 22px;
              color: white;
              text-align: center;
              line-height: 36px;
              box-shadow: 3px 3px 0 3px #ffc5a8;
              margin-right: 20px;
              margin-bottom: 5px;
            }
          }
        }
        .des {
          font-size: 28px;
          color: #666666;
          padding-bottom: 25px;
        }
        .moneyInfo {
          display: flex;
          align-items: center;
          font-size: 28px;
          padding-bottom: 25px;
          p:first-child {
            margin-right: 35px;
          }
          p > .loanRangeText,
          .loanTermText {
            color: #666666;
          }
          p > .loanRange,
          .loanTerm {
            color: #fe5c0d;
          }
        }
      }
      .peopleNumsAndBtn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 26px;
        .applyBtn {
          color: white;
          font-size: 28px;
          padding: 10px 46px;
          background: #3886f8;
          border-radius: 50px;
          margin-right: 70px;
        }
      }
    }
  }
  > .more {
    padding: 20px 0;
    display: flex;
    justify-content: center;
    button {
      background: transparent;
      border: 1px solid #3886f8;
      padding: 10px 40px;
      border-radius: 50px;
      color: #3886f8;
    }
  }
}
</style>
