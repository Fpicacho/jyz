<template>
  <div class="index">
    <IndexForm :fuelManID="queryFuelManId" :code="code" :uid="uid"/>
  </div>
</template>

<script>
import {mapActions,mapState} from "vuex"
import IndexForm from "@/components/Index/IndexForm";

export default {
  name: 'Index',

  created() {
    this.code = this.$route.query.code
    this.queryFuelManId = this.$route.query.state

    if (window.location.href.indexOf('code') !== -1) {
      const res = {
        code: this.code
      }
      const openid = this.getOpenId(res)
      openid.then((res) => {
        this.uid = res.data.data.uid
      })
      return
    }
    this.handLogin()
  },
  data() {
    return {
      code: null,
      queryFuelManId: null,
      uid: null
    }
  },
  methods: {
    ...mapActions({getOpenId: 'index/getOpenID'}),
    handLogin() {
      const redirect_uri = encodeURIComponent(
          `${window.location.href}` +
          encodeURIComponent(
              encodeURIComponent(
                  location.pathname + location.search
              )
          )
      );
      const state = this.$route.params.id
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7bd51673895c151e&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
    }
  },
  watch:{
    uid(value){
      this.uid = value
    }
  },
  components: {
    IndexForm
  }
}
</script>

<style scoped lang="less">

</style>
