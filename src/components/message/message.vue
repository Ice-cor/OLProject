<template>
  <transition name="msgbox-bounce">
    <div class="mint-msgbox-wrapper" v-show="value">
      <div class="mint-msgbox">
        <div class="mint-msgbox-header" v-if="title !== ''">
          <div class="mint-msgbox-title">{{ title }}</div>
        </div>
        <div class="mint-msgbox-content" v-if="message !== ''">
          <div class="mint-msgbox-message" v-html="message"></div>
          <div class="mint-msgbox-input" v-show="showInput">
            <input v-model="inputValue" :placeholder="inputPlaceholder" ref="input">
            <div class="mint-msgbox-errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
          </div>
        </div>
        <div class="mint-msgbox-btns" :class="{'only-confirm': !showCancelButton}">
          <button :class="[ cancelButtonClasses ]" v-show="showCancelButton" @click="handleAction('cancel')">{{ cancelButtonText }}</button>
          <button :class="[ confirmButtonClasses, {'only-confirm': !showCancelButton}]" v-show="showConfirmButton" @click="handleAction('confirm')">{{ confirmButtonText }}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
  .mint-msgbox-wrapper {
    z-index: 999;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4);
  }
  .mint-msgbox {
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    font-size: 16px;
    -webkit-user-select: none;
    overflow: hidden;
    backface-visibility: hidden;
    transition: .2s;
    border-radius: 16px;
    width: 610px;
    .mint-msgbox-header {
      padding: 44px 0 33px;
    }
    .mint-msgbox-title {
      text-align: center;
      padding-left: 0;
      margin-bottom: 0;
      font-weight: bold;
      color: #333;
      font-size: 36px;
      font-weight: 600;
    }
    .mint-msgbox-content {
      min-height: 36px;
      position: relative;
    }
    .mint-msgbox-message {
      margin: 0;
      text-align: center;
      line-height: 36px;
      font-size: 32px;
      color: #333;
      font-weight: 600;
    }
    .mint-msgbox-input {
      padding-top: 15px;
      & input {
        border: 1px solid #dedede;
        border-radius: 5px;
        padding: 4px 5px;
        width: 100%;
        appearance: none;
        outline: none;
      }
      & input.invalid {
        border-color: #ff4949;
        &:focus {
          border-color: #ff4949;
        }
      }
    }
    .mint-msgbox-errormsg {
      color: red;
      font-size: 12px;
      min-height: 18px;
      margin-top: 2px;
    }
    .mint-msgbox-btns {
      display: flex;
      padding: 37px 32px 40px;
      justify-content: space-between;
      &.only-confirm {
        justify-content: center !important;
      }
    }
    .mint-msgbox-btn {
      display: block;
      background-color: #fff;
      width: 262px;
      height: 82px;
      line-height: 82px;
      border-radius: 10px;
      font-size: 32px;
      border: none;
      padding: 0;
      &:focus {
        outline: none;
      }
      &:active {
        background-color: #fff;
      }
    }
    .mint-msgbox-cancel {
      background-color: #ddd;
      color: #666;
      &:active {
        color: #000;
      }
    }
    .mint-msgbox-confirm {
      background-color: #3886F8;
      color: #fff;
      &:active {
       color: #26a2ff;
      }
      &.only-confirm {
        width: 442px;
      }
    }
  }

  .msgbox-bounce-enter {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.7);
  }
  .msgbox-bounce-leave-active {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.9);
  }
</style>

<script>
  let CONFIRM_TEXT = '确定'
  let CANCEL_TEXT = '取消'

  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      modal: {
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      lockScroll: {
        type: Boolean,
        default: false
      },
      closeOnClickModal: {
        default: true
      },
      closeOnPressEscape: {
        default: true
      },
      inputType: {
        type: String,
        default: 'text'
      }
    },

    computed: {
      confirmButtonClasses () {
        let classes = 'mint-msgbox-btn mint-msgbox-confirm ' + this.confirmButtonClass
        if (this.confirmButtonHighlight) {
          classes += ' mint-msgbox-confirm-highlight'
        }
        return classes
      },
      cancelButtonClasses () {
        let classes = 'mint-msgbox-btn mint-msgbox-cancel ' + this.cancelButtonClass
        if (this.cancelButtonHighlight) {
          classes += ' mint-msgbox-cancel-highlight'
        }
        return classes
      }
    },

    methods: {
      doClose () {
        this.value = false
        this._closing = true
        this.onClose && this.onClose()
        setTimeout(() => {
          if (this.modal && this.bodyOverflow !== 'hidden') {
            document.body.style.overflow = this.bodyOverflow
            document.body.style.paddingRight = this.bodyPaddingRight
          }
          this.bodyOverflow = null
          this.bodyPaddingRight = null
        }, 200)
        this.opened = false
        if (!this.transition) {
          this.doAfterClose()
        }
      },

      handleAction (action) {
        if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
          return
        }
        var callback = this.callback
        this.value = false
        callback(action)
      },

      validate () {
        if (this.$type === 'prompt') {
          var inputPattern = this.inputPattern
          if (inputPattern && !inputPattern.test(this.inputValue || '')) {
            this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!'
            this.$refs.input.classList.add('invalid')
            return false
          }
          var inputValidator = this.inputValidator
          if (typeof inputValidator === 'function') {
            var validateResult = inputValidator(this.inputValue)
            if (validateResult === false) {
              this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!'
              this.$refs.input.classList.add('invalid')
              return false
            }
            if (typeof validateResult === 'string') {
              this.editorErrorMessage = validateResult
              return false
            }
          }
        }
        this.editorErrorMessage = ''
        this.$refs.input.classList.remove('invalid')
        return true
      },

      handleInputType (val) {
        if (val === 'range' || !this.$refs.input) return
        this.$refs.input.type = val
      }
    },
    watch: {
      inputValue () {
        if (this.$type === 'prompt') {
          this.validate()
        }
      },
      value (val) {
        this.handleInputType(this.inputType)
        if (val && this.$type === 'prompt') {
          setTimeout(() => {
            if (this.$refs.input) {
              this.$refs.input.focus()
            }
          }, 500)
        }
      },
      inputType (val) {
        this.handleInputType(val)
      }
    },

    data () {
      return {
        title: '',
        message: '',
        type: '',
        showInput: false,
        inputValue: null,
        inputPlaceholder: '',
        inputPattern: null,
        inputValidator: null,
        inputErrorMessage: '',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: CONFIRM_TEXT,
        cancelButtonText: CANCEL_TEXT,
        confirmButtonClass: '',
        confirmButtonDisabled: false,
        cancelButtonClass: '',
        editorErrorMessage: null,
        callback: null
      }
    }
  }
</script>
