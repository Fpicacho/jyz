<template>
  <div class="IndexForm container">
    <img src="../../assets/img/logo.png" alt=""/>
    <p id="id">{{ fuelManID }}号加油员为您服务</p>
    <van-form @submit="onSubmit">
      <van-field
          v-model="money"
          name="money"
          placeholder="充值金额"
          :rules="[
          { required: true, message: '请输入充值金额' },
        ]"
      />
      <div style="margin: 16px;">
        <van-button
            round
            block
            type="info"
            size="large"
            native-type="submit"
            color="linear-gradient(to right, #ff6034, #ee0a24)"
        >购买
        </van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import wx from 'weixin-jsapi'

export default {
  name: "IndexForm",
  props: ['fuelManID', 'code', 'uid'],
  data() {
    return {
      money: null,
      duration: true,
      wxConst: null,
      zfConfig: null
    }
  },
  computed: {
    ...mapState({
      config: state => state.index.config
    })
  },
  methods: {
    ...mapActions({postPayment: 'index/postPayment', getConfig: 'index/getConfig'}),
    onSubmit() {
      this.getConfig()
      console.log(location.href.split('#')[0])
      const res = {
        'prime_cost': this.money,
        'job_number': this.fuelManID,
        'payment_stats': 1,
        'product': '购买加油卡',
        'uid': this.uid
      }
      const postPayment = this.postPayment(res)
      this.$toast.loading({
        message: '正在唤起支付台...',
        forbidClick: true,
        duration: this.duration,
      });
      postPayment.then((res) => {
        this.$toast.clear();
        wx.config({
          debug: false,
          appId: this.config.appId,
          timestamp: this.config.timestamp,
          nonceStr: this.config.nonceStr,
          signature: this.config.signature,
          jsApiList: ['chooseWXPay']
        })
        wx.ready(function () {
          this.zfConfig = res.data.data.config
          console.log("ready准备就绪 准备唤起支付台", this.zfConfig)
          wx.chooseWXPay({
            timestamp: this.zfConfig.timestamp,
            nonceStr: this.zfConfig.nonceStr,
            package: this.zfConfig.package,
            signType: this.zfConfig.signType,
            paySign: this.zfConfig.paySign,
            success: function (res) {
              alert('支付成功')
            },
            cencel: function (res) {
              alert('用戶取消訂單')
            },
            fail: err => {
              alert('支付失敗')
            }
          })
        })
      }).catch((err) => {
        console.log(err)
        this.$toast.fail("支付台唤起失败！请维护人员检查Log")
        this.$toast.clear();
      })
    }
  },
}
</script>

<style scoped lang="less">
.container {
  width: 375px;
  height: 667px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto; /*有了这个就自动居中了*/
}

.IndexForm {
  width: 800px;
  text-align: center;

  .van-cell {
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 0;

    /deep/ .van-field__control {
      height: 60px;
      font-size: 50px;
      text-align: center;
      font-weight: bold;
    }

    /deep/ .van-field__error-message {
      margin-top: 15px;
      font-size: 24px;
      text-align: center;
    }
  }

  /deep/ .van-button {
    font-size: 35px;
    height: 80px;
  }

  #id {
    color: #333;
    font-size: 30px;
  }

  img {
    width: 500px;
  }
}

</style>