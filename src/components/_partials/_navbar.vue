<template>
    <div>

        <nav class="navbar">

            <a href="#" class="sidebar-toggler"><i data-feather="menu"></i></a>
            <div class="navbar-content">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" id="languageDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <div v-if="this.locale=='id'">
                                          <i class="flag-icon flag-icon-id mt-1" title="indonesia"></i> <span class="ms-1 me-1 d-none d-md-inline-block">Indonesia</span>
                                      </div><div v-else>
                                          <i class="flag-icon flag-icon-us mt-1" title="us"></i> <span class="ms-1 me-1 d-none d-md-inline-block">English</span>
                                      </div>
                      </a>
                      <div class="dropdown-menu" aria-labelledby="languageDropdown">
                                      <a @click="langChanged('en')" class="dropdown-item py-2"><i class="flag-icon flag-icon-us" title="us" id="us"></i> <span class="ms-1"> English </span></a>
                                      <a @click="langChanged('id')" class="dropdown-item py-2"><i class="flag-icon flag-icon-id" title="indonesia" id="id"></i> <span class="ms-1"> Indonesia </span></a>
                      </div>
                    </li> 


                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" id="notificationDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i data-feather="bell"></i>
                        <div v-if="this.lonceng">
                          <div class="indicator">
                            <div class="circle"></div>
                          </div>
                        </div>
                      </a>
                      <div class="dropdown-menu p-0" aria-labelledby="notificationDropdown">
                        <div class="px-3 py-2 d-flex align-items-center justify-content-between border-bottom">
                          <p>{{this.notifMessage.length}} New Notifications</p>
                        </div>
                        <div class="p-1">

                          <a v-for="(message, index) in notifMessage" :key="index" href="javascript:;" class="dropdown-item d-flex align-items-center py-2">
                            <div class="wd-30 ht-30 d-flex align-items-center justify-content-center bg-primary rounded-circle me-3">
                              <i class="icon-sm text-white" data-feather="gift"></i>
                            </div>
                            <div class="flex-grow-1 me-2">
                              <p>{{message.messages}}</p>
                              <p class="tx-12 text-muted">{{message.created_at}}</p>
                            </div>	
                          </a>
    
                        </div>
                         
                      </div>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="me-2 icon-md" data-feather="user"></i>
                        </a>
                        <div class="dropdown-menu p-0" aria-labelledby="profileDropdown">
                            <div class="d-flex flex-column align-items-center border-bottom px-5 py-3">
                                <div class="text-center">
                                    <p class="tx-16 fw-bolder">{{this.name}}</p>
                                    <p class="tx-12 text-muted">{{this.email}}</p>
                                </div>
                            </div>
                            <ul class="list-unstyled p-1">
                                <li class="dropdown-item py-2">
                                    <a href="#" @click="userProfile()" class="text-body ms-0">
                                    <i class="me-2 icon-md" data-feather="user"></i>
                                    <span>{{$t("txtMyProfile")}}</span>
                                    </a>
                                </li>
                                <li class="dropdown-item py-2">
                                    <a href="#" @click="changePassword()" class="text-body ms-0">
                                    <i class="me-2 icon-md" data-feather="edit"></i>
                                    <span>{{$t("changePassword")}}</span>
                                    </a>
                                </li>
                                <li class="dropdown-item py-2">
                                    <a href="#" @click="logout()" class="text-body ms-0">
                                    <i class="me-2 icon-md" data-feather="log-out"></i>
                                    <span>{{ $t('txtSignOut') }}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    
                </ul>
            </div>

        </nav>

    </div>
</template>


<script>
import { setAuthLang,setAuthToken } from '@/middleware/auth'

export default {
  name: 'navbarMenu',
  props: {
  },
  components: {
  },
  data () {
    return {  
      locale:'',
      name:'',
      email:'',
      lonceng:false,
      notifMessage:[]
        
    }
  },
    watch: { 

    },
    methods: { 	
      
      
      linkToSettings(){
        
        window.location.href = '/settings';

      },



      langChanged(lang){
        this.locale = lang;
        this.$i18n.locale = this.locale;
        localStorage.Lang = this.locale;
        setAuthLang(this.locale);
      },

      logout(){
        this.$logoutUser();
        window.location.href = '/';
      },

        userProfile(){
            window.location.href = '/profile';
        },

        changePassword(){
            window.location.href = '/change-password';
        },

      fetchIt() {
        const userDatas = this.$getUserInfo();
        this.name = userDatas.sub.name;
        this.email = userDatas.sub.email;
        
      },

      getNotifications(datas){
          const userDatas = this.$getUserInfo();

         if(datas.token == userDatas.sub.token){
           this.lonceng = true;
           this.notifMessage.push(datas);
         }
 
      },

      loadNotification(){
        const baseURI = this.$settings.endPoint + "notification/index";
        const userDatas = this.$getUserInfo();
    
    

          return this.$http
            .get(
              baseURI +
                `?per_page=10&page=0&status=0&token=${userDatas.sub.token}`
            )
            .then((response) => {
                if(response.data.datas.credentials){
                    setAuthToken(response.data.datas.credentials.access_token);
                }
              this.notifMessage = response.data.datas.data.data;
              if(this.notifMessage.length > 0){
                this.lonceng = true
              }
            })
                .catch((error) => {
                  if (error.response) {
                    if (error.response.status === 422) {
                      this.errors = error.response.data.errors;
                      this.resultError(error.response.data.errors);
                    } else if (error.response.status === 401) {
                      this.$router.push("/authorized-error");
                    } else if (error.response.status === 500) {
                      this.$router.push("/server-error");
                    }  else {
                      this.$router.push("/page-not-found");
                    }
                  }
                });
      },

    },
    events: {

    },
    created: function() { 
    
    },
	mounted() {
      this.fetchIt();
      this.loadNotification();
      this.langChanged(this.$i18n.locale);
        
    var channel = this.$pusher.subscribe('budgeting-channel');
    channel.bind('BudgetingEvent', function(data) {
      this.getNotifications(data);
    },this);
  }

}
</script>
<style scoped>

</style>