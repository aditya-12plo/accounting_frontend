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
import { setAuthLang } from '@/middleware/auth'

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

    },
    events: {

    },
    created: function() { 
    
    },
	mounted() {
      this.fetchIt();
      this.langChanged(this.$i18n.locale);
        
    }

}
</script>
<style scoped>

</style>