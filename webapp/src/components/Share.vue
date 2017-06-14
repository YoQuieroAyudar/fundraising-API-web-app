<template>
  <div>
    <social-sharing :url="url"
                      :title="$t(title)"
                      :description="$t(description)"
                      :quote="$t(description)"
                      :hashtags="$t(hashtags)"
                      :twitter-user="$t(outTwitterUser)"
                      v-cloak inline-template>

                    <div>

                      <div class="container" style="margin-top: 2em;width:14em;">
                        <div class="row">
                          <div style="height:4em;border: 1px solid #fff;background-color:#3b5998;" class="col-xs-6">
                            <a href="#">
                              <network network="facebook">
                                <i style="font-size: 2em;margin:0.5em 0.8em;color:white;" class="fa fa-facebook"></i>
                              </network>
                            </a>
                          </div>

                          <div style="height:4em;border: 1px solid white;background-color:#55acee;" class="col-xs-6">
                            <a href="#">
                              <network network="twitter">
                                <i style="font-size: 2em;margin:0.5em 0.8em;color:white;" class="fa fa-twitter"></i>
                              </network>
                            </a>
                          </div>

                        </div>

                        <div class="row">
                          <div style="height:4em;border: 1px solid white;background-color:#4dc247;" class="col-xs-6">
                            <a href="#">
                              <network network="whatsapp">
                                <i style="font-size: 2em;margin:0.5em 0.8em;color:white;" class="fa fa-whatsapp"></i>
                              </network>
                            </a>
                          </div>

                          <div style="height:4em;border: 1px solid white;background-color:#dd4b39;" class="col-xs-6">
                            <a href="#">
                              <network network="googleplus">
                                <i style="font-size: 2em;margin:0.5em 0.8em;color:white;" class="fa fa-google-plus"></i>
                              </network>
                            </a>
                          </div>

                        </div>

                        <div class="row">

                          <div style="height:4em;border: 1px solid white;background-color:#cb2027;" class="col-xs-6">
                            <a href="#">
                              <network network="pinterest">
                                <i style="font-size: 2em;margin:0.5em 0.8em;color:white;" class="fa fa-pinterest"></i>
                              </network>
                            </a>
                          </div>

                          <div style="height:4em;border: 1px solid white;background-color:#007bb5;" class="col-xs-6">
                            <a href="#">
                              <network network="linkedin">
                                <i style="font-size: 2em;margin:0.5em 0.8em;color:white;" class="fa fa-linkedin"></i>
                              </network>
                            </a>
                          </div>

                        </div>

                        <div class="row">

                          <div style="height:4em;border: 1px solid white;background-color:#ff4500;" class="col-xs-6">
                            <a href="#">
                              <network network="reddit">
                                <i style="font-size: 2em;margin:0.5em 0.8em;color:white;" class="fa fa-reddit"></i>
                              </network>
                            </a>
                          </div>

                          <div style="height:4em;border: 1px solid white;background-color:#45668e;" class="col-xs-6">
                            <a href="#">
                              <network network="vk">
                                <i style="font-size: 2em;margin:0.5em 0.8em;color:white;" class="fa fa-vk"></i>
                              </network>
                            </a>
                          </div>

                        </div>

                      </div>

                  </div>
    </social-sharing>

  </div>

</template>

<script>
export default {
  data () {
    return {
      title: 'IWantToHelp',
      description: 'I have donated to a charity with IWantToHelp http://web.iwanttohelp.org.uk #IWantToHelp',
      hashtags: 'fundraising,user,widget,IWantToHelp',
      outTwitterUser: 'YQuieroAyudar'
    }
  },
  methods: {
    endsWith (item, end) {
      return item.lastIndexOf(end) === (item.length - 1)
    }
  },
  computed: {
    url () {
      var address = window.location.href.replace('#/', '')
      var baseUrl = ''
      // if in development use the production url
      if (address.indexOf('localhost') > -1) {
        baseUrl = 'https://yoquieroayudar.github.io'
      } else {
        baseUrl = address
      }
      var lang = localStorage.getItem('user_locale')
      lang = lang === null ? this.$i18n.locale() : lang
      if (baseUrl.indexOf('?') < 0) {
        baseUrl += '?'
      }
      if (baseUrl.indexOf('lang=') < 0) {
        var lang = 'lang=' + encodeURIComponent(lang)
        this.endsWith(baseUrl, '&') ? baseUrl += lang : baseUrl += '&' + lang
      }
      var db = this.$store.getters.getApiDB
      var country = this.$store.getters.getSelectedCountry
      if (country === null && baseUrl.indexOf('')) {
        db = 'db=' + encodeURIComponent(db)
        this.endsWith(baseUrl, '&') ? baseUrl += db : baseUrl + '&' + db
      }
      return baseUrl
    }
  }
}
</script>
<style scoped>
a.social-link:hover {
  border: 1px solid #000;
}

</style>
