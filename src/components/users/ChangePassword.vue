<template>
    <div>
 
 <div class="main-wrapper">
    
    <!--begin::sidebar-->
    <sidebar-component classMenu="ChangePassword"></sidebar-component>
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
              <div class="card-body">

<!--begin::loading-data-->                  
<div v-if="isLoading" class="d-flex align-items-center">
  <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div><strong>{{$t("loadingTxt")}}...</strong>
</div>
<!--end::loading-data-->  

<form class="forms-sample" @submit.prevent="submitData" method="POST">

                    <div class="d-flex justify-content-between align-items-baseline mb-2">
                    <h6 class="card-title mb-0">{{$t("ChangePasswordTxt")}}</h6>
                    </div>
                 
                    <div class="row mb-3">
						<div class="col-lg-3">
							<label for="defaultconfig" class="col-form-label">{{$t("newPassword")}}</label>
						</div>
						<div class="col-lg-8">
							<input type="password" class="form-control" id="userPassword" autocomplete="current-password" :placeholder="$t('newPassword')" v-model="forms.password" required>
                            <div v-if="errors.password">
                                <div v-for="error in errors.password" :key="error" class="alert alert-primary" role="alert">
                                    <i data-feather="alert-circle"></i>
                                   {{error}}
                                </div>
                            </div>
						</div>
					</div>
                 
                    <div class="row mb-3">
						<div class="col-lg-3">
							<label for="defaultconfig" class="col-form-label">{{$t("passwordConfirm")}}</label>
						</div>
						<div class="col-lg-8">
							<input type="password" class="form-control" id="userPasswordConfirm" autocomplete="current-password" :placeholder="$t('passwordConfirm')" v-model="forms.password_confirmation" required>
						</div>
					</div>
                  
                    <div class="buttons">
                        <button class="btn btn-warning" @click="resetForm" type="button"><i class="mdi mdi-repeat" style="font-size:1rem;color:white;vertical-align: middle;"></i> {{$t("resetFormTxt")}}</button>
                        &nbsp;&nbsp;&nbsp;
                        <button class="btn btn-primary" type="submit"><i class="mdi mdi-content-save" style="font-size:1rem;color:white;vertical-align: middle;"></i> {{$t("submitFormTxt")}}</button>
                    </div>
</form>

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

import { setAuthToken } from "@/middleware/auth";
import sidebarComponent from '@/components/_partials/_sidebar'
import navbarComponent from '@/components/_partials/_navbar'
import footerComponent from '@/components/_partials/_footer'

export default {
  name: 'ChangePassword',
  props: {
  },
  components: {
    'sidebar-component':sidebarComponent,
    'navbar-component':navbarComponent,
    'footer-component':footerComponent,
  },
  data () {
    return {  
        isLoading: false,  
        maxToasts: 100,
        position: 'up right',
        closeBtn: true,  
        errors: [],
        userData:"",
        companyData:"",
        forms: {password:'', password_confirmation:''},  
    }
  },
    watch: { 

    },
    methods: { 	
        resetForm(){
            this.forms.password                   = ""
            this.forms.password_confirmation      = ""
        },

        fetchIt() {
            const userDatas     = this.$getUserInfo();
            this.userData       = userDatas.sub;
            this.companyData    = userDatas.sub.company_detail;
            
        },
       
        submitData() {
            this.$swal({
                title: this.$t('areYouSure'),
                text: this.$t('yourData'),
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            }).then((result) => {
                if (result.value) { 

                    this.fade(true);
                    
                    let formData = new FormData();
                    formData.append("password", this.forms.password);
                    formData.append("password_confirmation", this.forms.password_confirmation);

                    const baseURI  =  this.$settings.endPoint+"user/change-password";
                    this.$http.post(baseURI,formData).then((response) => {
                        this.loading();
                        if(response.data.status === 200) {
                            if(response.data.datas.credentials) {
                                setAuthToken(response.data.datas.credentials.access_token);
                            }

                            this.resetForm();
                            this.errors = [];
                            this.success(response.data.datas.messages);
                        }else{
                            this.resetForm();
                            this.errors = response.data.errors;
                            this.resultError(response.data.errors);
                        }
                    }).catch(error => {
                        this.loading();
                        if (error.response) {
                        if(error.response.status === 422) {
                                this.errors = error.response.data.errors;
                                this.resultError(error.response.data.errors);
                        }else if (error.response.status === 500) {
                            this.$router.push('/server-error');
                        }else{
                            this.$router.push('/page-not-found');
                        }
                        }
                        this.resetForm();
                    });
                }
            })
        },

        fade(sType){  	
            this.isLoading = sType;
        },

        loading(){
            this.fade(true);
            setTimeout(() => {
                this.fade(false);
            }, 1000); // hide the message after 3 seconds
        },

        resultError(data) {  
        var count = Object.keys(data).length;
            for(var x=0; x < count;x++){ 
            var nameOb      = Object.keys(data)[x];
            var objectData  = data[nameOb];
            for(var y=0; y < objectData.length;y++){ 
                this.error(objectData[y]);
            }
        }
        },
    
        success(kata) {
        const Toast = this.$swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.addEventListener('mouseenter', this.$swal.stopTimer)
            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
            }
        })
            Toast.fire({
            icon: 'success',
            title: kata
        })
        },
    
        error(kata) {      
        const Toast = this.$swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.addEventListener('mouseenter', this.$swal.stopTimer)
            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
            }
        })
            Toast.fire({
            icon: 'error',
            title: kata
        })
    
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