<template>
    <div>
 
 <div class="main-wrapper">
    
    <!--begin::sidebar-->
    <sidebar-component classMenu="ContactUs"></sidebar-component>
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
                    <h6 class="card-title mb-0">{{$t("pageContactUs")}}</h6>
                    </div>
                 
                    <div class="row mb-3">
						<div class="col-lg-3">
							<label for="defaultconfig" class="col-form-label">{{$t("txtSubject")}}</label>
						</div>
						<div class="col-lg-8">
							<input type="text" class="form-control" id="txtSubject" :placeholder="$t('txtSubject')" v-model="forms.subject" required>
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
							<label for="defaultconfig" class="col-form-label">{{$t("txtMessages")}}</label>
						</div>
						<div class="col-lg-8">
							<textarea class="form-control" v-model="forms.message_data" id="simpleMdeEditor" rows="5"></textarea>
							<!-- <textarea class="form-control" v-model="forms.message_data" id="simpleMdeEditor" rows="5"></textarea> -->
                            <div v-if="errors.message">
                                <div v-for="error in errors.message" :key="error" class="alert alert-primary" role="alert">
                                    <i data-feather="alert-circle"></i>
                                   {{error}}
                                </div>
                            </div>
                        </div>
					</div>
                  
                    <div class="buttons">
                        <button class="btn btn-warning" @click="resetForm" type="button">{{$t("resetFormTxt")}}</button>
                        &nbsp;&nbsp;&nbsp;
                        <button class="btn btn-primary" type="submit">{{$t("submitFormTxt")}}</button>
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

import sidebarComponent from '@/components/_partials/_sidebar'
import navbarComponent from '@/components/_partials/_navbar'
import footerComponent from '@/components/_partials/_footer'

export default {
  name: 'ContactUs',
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
        forms: {subject:'', message_data:''},  
    }
  },
    watch: { 

    },
    methods: { 	
        resetForm(){
            this.forms.subject      = ""
            this.forms.message_data = ""
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
                   
                    // let formData = new FormData();
                    // formData.append("subject", this.forms.subject);
                    // formData.append("message", this.forms.message_data);

                    // const baseURI  =  this.$settings.endPoint+"support/contact-us";
                    // this.$http.post(baseURI,formData).then((response) => {
                    //     this.loading();
                    //     if(response.data.status === 200) {
                    //     this.resetForm();
                    //         this.errors = [];
                    //         this.success(response.data.datas.messages);
                    //     }else{
                    //         this.errors = response.data.errors;
                    //         this.resultError(response.data.errors);
                    //     }
                    // }).catch(error => {
                    //     this.loading();
                    //     if (error.response) {
                    //     if(error.response.status === 422) {
                    //             this.errors = error.response.data.errors;
                    //             this.resultError(error.response.data.errors);
                    //     }else if (error.response.status === 500) {
                    //         this.$router.push('/server-error');
                    //     }else{
                    //         this.$router.push('/page-not-found');
                    //     }
                    //     }
                    //     this.resetForm();
                    // });
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
        
        
    }

}
</script>
<style scoped>

</style>