<template>
  <div>
    <social-sharing url="https://github.com/YoQuieroAyudar/fundraising-API-user-widget"
                      :title="$t(title)"
                      :description="description"
                      :quote="description"
                      :hashtags="hashtags"
                      :twitter-user="outTwitterUser"
                      v-cloak inline-template>
                    <div>
                      <ul class="share-buttons-list">
                        <li>
                          <network network="facebook">
                            <i class="fa fa-facebook"></i> Facebook
                          </network>
                        </li>
                        <li>
                          <network network="googleplus">
                            <i class="fa fa-google-plus"></i> Google +
                          </network>
                        </li>
                        <li>
                          <network network="linkedin">
                            <i class="fa fa-linkedin"></i> LinkedIn
                          </network>
                        </li>
                        <li>
                          <network network="pinterest">
                            <i class="fa fa-pinterest"></i> Pinterest
                          </network>
                        </li>
                        <li>
                          <network network="reddit">
                            <i class="fa fa-reddit"></i> Reddit
                          </network>
                        </li>
                        <li>
                          <network network="twitter">
                            <i class="fa fa-twitter"></i> Twitter
                          </network>
                        </li>
                        <li>
                          <network network="vk">
                            <i class="fa fa-vk"></i> VKontakte
                          </network>
                        </li>
                        <li>
                          <network network="whatsapp">
                            <i class="fa fa-whatsapp"></i> Whatsapp
                          </network>
                        </li>
                      </ul>

                  </div>
    </social-sharing>

  </div>

</template>

<script>
export default {
  data () {
    return {
      title: 'Fundraising API user widget',
      description: 'Working on a vueJS user widget that works with # fundraising API. Work in progress...',
      hashtags: 'fundraising,user,widget',
      outTwitterUser: 'YQuieroAyudar'
    }
  },
  methods: {

  }
}
</script>
<style scoped>
.share-buttons-list li {
  cursor: pointer;
}
</style>
