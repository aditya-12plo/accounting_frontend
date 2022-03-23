<template>
    <div>
       
       <div class="horizontal-menu">
           <nav class="navbar top-navbar col-lg-12 col-12 p-0">
              <div class="container-fluid">
                <div class="navbar-menu-wrapper d-flex align-items-center justify-content-between">
                  <ul class="navbar-nav navbar-nav-left">
                    <li class="nav-item ms-0 me-5 d-lg-flex d-none">
                      <a href="#" class="nav-link horizontal-nav-left-menu"><i class="mdi mdi-format-list-bulleted"></i></a>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link count-indicator dropdown-toggle d-flex align-items-center justify-content-center" id="notificationDropdown" href="#" data-bs-toggle="dropdown">
                        <i class="mdi mdi-bell mx-0"></i>
                        <span class="count bg-success">2</span>
                      </a>
                      <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                        <p class="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
                        <a class="dropdown-item preview-item">
                          <div class="preview-thumbnail">
                              <div class="preview-icon bg-success">
                                <i class="mdi mdi-information mx-0"></i>
                              </div>
                          </div>
                          <div class="preview-item-content">
                              <h6 class="preview-subject font-weight-normal">Application Error</h6>
                              <p class="font-weight-light small-text mb-0 text-muted">
                                Just now
                              </p>
                          </div>
                        </a>
                        <a class="dropdown-item preview-item">
                          <div class="preview-thumbnail">
                              <div class="preview-icon bg-warning">
                                <i class="mdi mdi-settings mx-0"></i>
                              </div>
                          </div>
                          <div class="preview-item-content">
                              <h6 class="preview-subject font-weight-normal">Settings</h6>
                              <p class="font-weight-light small-text mb-0 text-muted">
                                Private message
                              </p>
                          </div>
                        </a>
                        <a class="dropdown-item preview-item">
                          <div class="preview-thumbnail">
                              <div class="preview-icon bg-info">
                                <i class="mdi mdi-account-box mx-0"></i>
                              </div>
                          </div>
                          <div class="preview-item-content">
                              <h6 class="preview-subject font-weight-normal">New user registration</h6>
                              <p class="font-weight-light small-text mb-0 text-muted">
                                2 days ago
                              </p>
                          </div>
                        </a>
                      </div>
                    </li>
                    
                  
                   	
                  </ul>
                  <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                      <a class="navbar-brand brand-logo" href="/dashboard"><img src="/assets/images/logo-icdx.png" alt="icdx logo"/></a>
                      <a class="navbar-brand brand-logo-mini" href="/dashboard"><img src="/assets/images/logo-icdx.png" alt="icdx logo"/></a>
                  </div>
                  <ul class="navbar-nav navbar-nav-right">
                     
                    
                      <li class="nav-item nav-profile dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="profileDropdown">
                          <span class="nav-profile-name">Hi, {{this.name}}</span>
                          <span class="online-status"></span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                            <a class="dropdown-item">
                              <i class="mdi mdi-settings text-primary"></i>
                              Settings
                            </a>
                            <a class="dropdown-item" @click="logout()">
                              <i class="mdi mdi-logout text-primary"></i>
                              Logout</a>
                            </a>
                        </div>
                      </li>
                  </ul>
                  <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="horizontal-menu-toggle">
                    <span class="mdi mdi-menu"></span>
                  </button>
                </div>
              </div>
            </nav>
       </div>
      
    </div>
</template>


<script>

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
      name:'',
        
    }
  },
    watch: { 

    },
    methods: { 	
      
      
      linkToSettings(){
        
        window.location.href = '/settings';

      },



      logout(){
        this.$logoutUser();
        window.location.href = '/';
      },


      fetchIt() {
        const userDatas = this.$getUserInfo();
        this.name = userDatas.sub.name;
        
      },

    },
    events: {

    },
    created: function() { 
    
    },
	mounted() {
      this.fetchIt();
        
    }

}
</script>
<style scoped>

</style>