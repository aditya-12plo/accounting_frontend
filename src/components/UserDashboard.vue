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
                <div>
                    <h4 class="mb-12 mb-md-0">{{$t("dashboardTxt")}}</h4>
                </div>

                <div class="col-lg-12 col-xl-12 stretch-card">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-baseline mb-2">
                  <h6 class="card-title mb-0">Projects</h6>
                  <div class="dropdown mb-2">
                    <button class="btn p-0" type="button" id="dropdownMenuButton7" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="icon-lg text-muted pb-3px" data-feather="more-horizontal"></i>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton7">
                      <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="eye" class="icon-sm me-2"></i> <span class="">View</span></a>
                      <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="edit-2" class="icon-sm me-2"></i> <span class="">Edit</span></a>
                      <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="trash" class="icon-sm me-2"></i> <span class="">Delete</span></a>
                      <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="printer" class="icon-sm me-2"></i> <span class="">Print</span></a>
                      <a class="dropdown-item d-flex align-items-center" href="javascript:;"><i data-feather="download" class="icon-sm me-2"></i> <span class="">Download</span></a>
                    </div>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th class="pt-0">#</th>
                        <th class="pt-0">Project Name</th>
                        <th class="pt-0">Start Date</th>
                        <th class="pt-0">Due Date</th>
                        <th class="pt-0">Status</th>
                        <th class="pt-0">Assign</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>NobleUI jQuery</td>
                        <td>01/01/2022</td>
                        <td>26/04/2022</td>
                        <td><span class="badge bg-danger">Released</span></td>
                        <td>Leonardo Payne</td>
                      </tr>
                       
                    </tbody>
                  </table>
                </div>
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