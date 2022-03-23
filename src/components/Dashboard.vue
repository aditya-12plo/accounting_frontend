<template>
    <div>


        <!-- <div v-if="isLoading" class="se-pre-con"><img src="/assets/images/loading.gif" alt="Loading" /></div> -->
       
       <div v-if="isLoading" class="se-pre-con" style="text-align: center;"><center><img src="/assets/images/loading.gif" alt="Loading" /></center></div>
        <div v-else class="container-scroller">

            <!-- navbar -->
                <navbar-component classMenu="Dashboard"></navbar-component>

            <!-- //navbar -->


             <div class="container-fluid page-body-wrapper">
                 <div class="main-panel">
                     <div class="content-wrapper">


                         <div class="col-md-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Dashboard</h4>
                  <p class="card-description">
                    Basic form layout
                  </p>
                  <form class="forms-sample">
                    <div class="form-group">
                      <label for="exampleInputUsername1">Username</label>
                      <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Username">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputConfirmPassword1">Confirm Password</label>
                      <input type="password" class="form-control" id="exampleInputConfirmPassword1" placeholder="Password">
                    </div>
                    <div class="form-check form-check-flat form-check-primary">
                      <label class="form-check-label">
                        <input type="checkbox" class="form-check-input">
                        Remember me
                      </label>
                    </div>
                    <button type="submit" class="btn btn-primary me-2">Submit</button>
                    <button class="btn btn-light">Cancel</button>
                  </form>
                </div>
              </div>
            </div>


                     </div>
                 </div>
             </div>


        </div>
  
            
    </div>
</template>

<script>
import navbarComponent from './layouts/navbar'

export default {
  name: 'Dashboard',
  components: {
    'navbar-component':navbarComponent,
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
          }, 100000); // hide the message after 3 seconds
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
    //   document.body.classList.add("sidebar-menu-collapsed");
        this.fetchIt();
        this.fade(true);
        this.loading();
    }

}
</script>
<style scoped>

</style>