<template>
  <div>
    <nav class="sidebar">
      <div class="sidebar-header">
        <a href="/dashboard" class="sidebar-brand"> <img src="/assets/images/icon_icdx.png" width="40px" height="40px"><span> SYSTEM </span></a>
        <div class="sidebar-toggler not-active">
          <span></span><span></span><span></span>
        </div>
      </div>

      <div class="sidebar-body">
        <ul class="nav">
          <li class="nav-item nav-category">{{ $t("MainTxt") }}</li>
          <li class="nav-item">
            <a href="/dashboard" class="nav-link">
              <i class="link-icon" data-feather="box"></i>
              <span class="link-title">{{ $t("dashboardMenu") }}</span>
            </a>
          </li>

          <li class="nav-item nav-category">web apps</li>
          <li class="nav-item">
            <a
              class="nav-link"
              data-bs-toggle="collapse"
              href="#emails"
              role="button"
              aria-expanded="false"
              aria-controls="emails"
            >
              <i class="link-icon" data-feather="mail"></i>
              <span class="link-title">Email</span>
              <i class="link-arrow" data-feather="chevron-down"></i>
            </a>
            <div class="collapse" id="emails">
              <ul class="nav sub-menu">
                <li class="nav-item">
                  <a href="#" class="nav-link">Inbox</a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link">Read</a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link">Compose</a>
                </li>
              </ul>
            </div>
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="link-icon" data-feather="message-square"></i>
              <span class="link-title">Chat</span>
            </a>
          </li>
 
          <br>
          <span v-if="this.level == 'ROOT'">
            <li class="nav-item nav-category">{{ $t("AdministrationTxt") }}</li>

              <li class="nav-item">
                <a href="/users" class="nav-link">
                  <i class="link-icon" data-feather="trello"></i>
                  <span class="link-title">{{ $t("txtUserSetting") }}</span>
                </a>
              </li>
 
              <li class="nav-item">
                <a href="/company" class="nav-link">
                  <i class="link-icon" data-feather="airplay"></i>
                  <span class="link-title">{{ $t("txtCompanySetting") }}</span>
                </a>
              </li>
 
              <li class="nav-item">
                <a href="/division" class="nav-link">
                  <i class="link-icon" data-feather="book"></i>
                  <span class="link-title">{{ $t("txtDivisionSetting") }}</span>
                </a>
              </li>

   
 
          </span>
        </ul>
      </div>
    </nav>
  </div>
</template>


<script>
export default {
  name: "sidebarMenu",
  props: {
    classMenu: {
      type: String,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      locale: "",
      name: "",
      email: "",
      level: "",
    };
  },
  watch: {},
  methods: {
 

    fetchIt() {
      const userDatas = this.$getUserInfo();
      this.name = userDatas.sub.name;
      this.email = userDatas.sub.email;
      this.level = userDatas.sub.level;
    },
  },
  events: {},
  created: function () {},
  mounted() {
    this.fetchIt();
  },
};
</script>
<style scoped>
</style>