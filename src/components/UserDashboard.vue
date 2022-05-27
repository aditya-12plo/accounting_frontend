<template>
    <div>

 

<div class="main-wrapper">
    
    <!--begin::sidebar-->
    <sidebar-component classMenu="Dashboard"></sidebar-component>
    <!--end::sidebar-->


		<div class="page-wrapper">

            <!--begin::navbar-->
            <navbar-component></navbar-component>
            <!--end::navbar-->

            <!--begin::content-->
            <div class="page-content">

                <div class="d-flex justify-content-between align-items-center flex-wrap grid-margin">
              

                <div class="col-lg-12 col-xl-12 stretch-card">
            <div class="card">
              <div class="card-body" style="height:500px;">
                <div class="d-flex justify-content-between align-items-baseline mb-2">


                    <h4 class="mb-12 mb-md-0">{{$t("dashboardTxt")}}</h4>

                </div>
                

                    <p>{{$t("dashboard_txt")}}</p>

                    <p>{{ this.getTerbilang(100) }}</p>



              </div> 
            </div>
          </div>

                </div>

            </div>
            <!--end::content-->


            <!--begin::footer-->
            <footer-component></footer-component>
            <!--end::footer-->

    </div>


</div>
 


  
            
    </div>
</template>

<script> 
import { terbilang } from "@/middleware/terbilang";

import sidebarComponent from './_partials/_sidebar'
import navbarComponent from './_partials/_navbar'
import footerComponent from './_partials/_footer'

export default {
  name: 'UserDashboard',
  components: {
    'sidebar-component':sidebarComponent,
    'navbar-component':navbarComponent,
    'footer-component':footerComponent,
  },
  data () {
    return {  
      maxToasts: 100,
      position: 'up right',
      closeBtn: true,  
      isLoading: false,  
      errors: [],
      langs: ['id', 'en'],
      name:'',
    }
  },
    watch: { 

    },
    methods: { 	

        getTerbilang(angka){
          return terbilang(angka)
        },

        fade(sType){  	
        this.isLoading = sType;
        },

        loading(){
          this.fade(true);
          setTimeout(() => {
            this.isLoading = false;
          }, 1000); // hide the message after 3 seconds
        },

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
    this.fetchIt();
    this.loading();
    
  }

}

</script>
<style scoped>

</style>