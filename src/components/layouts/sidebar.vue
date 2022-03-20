<template>
    <div>
 
                    <ul class="menu">
            
            
                        <li class='sidebar-title'>{{ $t('mainMenu')}}</li>
                
                
                
                        <li v-if="this.classMenu == 'Dashboard'" class="sidebar-item active">
                            <a href="/dashboard" class='sidebar-link'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> 
                                <span>{{ $t('dashboard')}}</span>
                            </a>
                            
                        </li>
                        <li v-else class="sidebar-item">
                            <a href="/dashboard" class='sidebar-link'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> 
                                <span>{{ $t('dashboard')}}</span>
                            </a>
                            
                        </li>

                        <div v-if="this.detailUser.level == 'ROOT' && this.detailDivisi.division_id == 'ACCOUNTING'">
                          <li v-if="this.classMenu == 'UserIndex'" class="sidebar-item active">
                              <a href="/user-access" class='sidebar-link'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                  <span>{{ $t('userAccess')}}</span>
                              </a>
                              
                          </li>
                          <li v-else class="sidebar-item">
                              <a href="/user-access" class='sidebar-link'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                  <span>{{ $t('userAccess')}}</span>
                              </a>
                              
                          </li>
                        </div>
                    
                        <li class="sidebar-item  has-sub">
                            <a href="#" class='sidebar-link'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                                <span>Language / Bahasa</span>
                            </a>
                            
                            <ul class="submenu ">
                                
                                <li>
                                    <a href="#" @click="toID">Bahasa</a>
                                </li>
                                
                                <li>
                                    <a href="#" @click="toEN">English</a>
                                </li>
                                
                            </ul>
                            
                        </li>
         
                    </ul>
             
      
    </div>
</template>


<script>
import { setAuthLang } from '@/config/auth'

export default {
  name: 'Menu',
  props: {
    classMenu: {
      type: String,
      required: true
    },
  },
  components: {
  },
  data () {
    return {  
      locale:'',
      detailUser:[],
      detailDivisi:[],
        
    }
  },
    watch: { 

    },
    methods: { 	
      
      langChanged(lang){
        if(this.locale == ''){
          this.locale = lang;
        setAuthLang(lang);
        }else{
          this.$i18n.locale = this.locale;
          localStorage.Lang = this.locale;
          setAuthLang(this.locale);
        }
      },
      toEN(){
        this.$i18n.locale = 'en';
         localStorage.Lang = 'en';
          setAuthLang('en');
      },

      toID(){
        this.$i18n.locale = 'id';
         localStorage.Lang = 'id';
          setAuthLang('id');
      },

        fetchIt() {
            const userDatas     = this.$getUserInfo();
            this.detailUser     = userDatas.sub;
            this.detailDivisi   = userDatas.sub.division;
            
        },



    },
    events: {

    },
    created: function() { 
    
    },
	mounted() {
      this.langChanged(this.$i18n.locale);
      this.fetchIt();
        
    }

}
</script>
<style scoped>

</style>