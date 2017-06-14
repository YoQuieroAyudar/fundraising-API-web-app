<template>
  <div>
    <social-sharing url="https://github.com/YoQuieroAyudar/fundraising-API-user-widget"
                      :title="$t(title)"
                      :description="$t(description)"
                      :quote="$t(description)"
                      :hashtags="$t(hashtags)"
                      :twitter-user="$t(outTwitterUser)"
                      v-cloak inline-template>
                    <div>
                      <ul class="list-unstyled share-buttons-list" style="font-size: 1.65em;">
                        <li class="">
                          <a href="#">
                            <network network="facebook">
                              <i class="fa fa-facebook"></i> Facebook
                            </network>
                          </a>
                        </li>
                        <li class="">
                          <a href="#">
                            <network network="googleplus">
                              <i class="fa fa-google-plus"></i> Google +
                            </network>
                          </a>
                        </li>
                        <li class="">
                          <a href="#">
                            <network network="linkedin">
                              <i class="fa fa-linkedin"></i> LinkedIn
                            </network>
                          </a>
                        </li>
                        <li class="">
                          <a href="#">
                            <network network="pinterest">
                              <i class="fa fa-pinterest"></i> Pinterest
                            </network>
                          </a>
                        </li>
                        <li class="">
                          <a href="#">
                            <network network="reddit">
                              <i class="fa fa-reddit"></i> Reddit
                            </network>
                          </a>
                        </li>
                        <li class="">
                          <a href="#">
                            <network network="twitter">
                              <i class="fa fa-twitter"></i> Twitter
                            </network>
                          </a>
                        </li>
                        <li class="">
                          <a href="#">
                            <network network="vk">
                              <i class="fa fa-vk"></i> VKontakte
                            </network>
                          </a>
                        </li>
                        <li class="">
                          <a href="#">
                            <network network="whatsapp">
                              <i class="fa fa-whatsapp"></i> Whatsapp
                            </network>
                          </a>
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
      title: 'IWantToHelp',
      description: 'I have donated to a charity with IWantToHelp http://web.iwanttohelp.org.uk #IWantToHelp',
      hashtags: 'fundraising,user,widget,IWantToHelp',
      outTwitterUser: 'YQuieroAyudar'
    }
  },
  methods: {

  }
}
</script>
<style scoped>
a.social-link:hover {
  border: 1px solid #000;
}
</style>
