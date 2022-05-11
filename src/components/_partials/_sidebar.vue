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


          <li class="nav-item nav-category">{{ $t("dataMaster_txt") }}</li>
          <li class="nav-item">
            <a href="/vendor" class="nav-link">
              <i class="link-icon" data-feather="git-merge"></i>
              <span class="link-title">Vendor</span>
            </a>
          </li>


          <li class="nav-item nav-category">{{ $t("choose_txt") }}</li>
          <li class="nav-item">
            <a
              class="nav-link"
              data-bs-toggle="collapse"
              href="#companyCodeTxt"
              role="button"
              aria-expanded="false"
              aria-controls="companyCodeTxt"
            >
              <i class="link-icon" data-feather="shuffle"></i>
              <span class="link-title">{{ $t("companyCodeTxt") }}</span>
              <i class="link-arrow" data-feather="chevron-down"></i>
            </a>
            <div class="collapse" id="companyCodeTxt">
              <ul class="nav sub-menu">

                <li class="nav-item" v-for="companyData in user_company" :key="companyData.company_id">
                  <a href="#" @click="langCompanyChanged(companyData.company_id)" class="nav-link"> <span class="ms-1" style="color:#f16912;" v-if="company_default == companyData.company_id"> {{companyData.company_id}} </span> <span class="ms-1" v-else> {{companyData.company_id}} </span> </a>
                </li>
                
              </ul>
            </div>
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
      company_default:"",
      user_company:"",
    };
  },
  watch: {},
  methods: {
 
    langCompanyChanged(companyCode){
      this.company_default          = companyCode;
      localStorage.company_default  = companyCode;
      window.location.reload();
    },

    fetchIt() {
      const userDatas = this.$getUserInfo();
      this.name             = userDatas.sub.name;
      this.email            = userDatas.sub.email;
      this.level            = userDatas.sub.level;
      this.company_default  = localStorage.getItem('company_default');
      this.user_company     =  userDatas.sub.user_company;
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