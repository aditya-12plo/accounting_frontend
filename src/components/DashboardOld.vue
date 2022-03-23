<template>
    <div>
        <div id="app">
  
            <div id="sidebar" class='active'>
                <div class="sidebar-wrapper active">
                    <div class="sidebar-menu">

                        <sidebar-component classMenu="Dashboard"></sidebar-component>

                    </div>
                    <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
                </div>
            </div>


            <div id="main">

                <navbar-component classMenu="Dashboard"></navbar-component>

                <div class="main-content container-fluid">
                    <div class="page-title">
                        <h3>Dashboard</h3>
                        <p class="text-subtitle text-muted">A good dashboard to display your statistics</p>
                    </div>
<a class="dropdown-item" @click="logout()"><i data-feather="log-out"></i> Logout</a>
                </div>

                
            </div>

        </div>
    
    </div>
</template>

<script>
import sidebarComponent from './layouts/sidebar'
import navbarComponent from './layouts/navbar'

export default {
  name: 'Dashboard',
  components: {
    'sidebar-component':sidebarComponent,
    'navbar-component':navbarComponent,
  },
  data () {
    return {  
      maxToasts: 100,
      position: 'up right',
      closeBtn: true,  
      errors: [],
      langs: ['id', 'en'],
      name:'',
    }
  },
    watch: { 

    },
    methods: { 	

      fetchIt() {
        // const userDatas = this.$getUserInfo();
        // this.name = userDatas.sub.name;
        
      },

      logout(){
        this.$logoutUser();
        this.$router.push('/');
      },

    },
    events: {

    },
    created: function() { 
 
    },
	mounted() {
      document.body.classList.add("sidebar-menu-collapsed");
      this.fetchIt();
    }

}
</script>
<style scoped>

</style>