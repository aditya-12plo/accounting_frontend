<template>
    <div>



<div class="d-flex flex-column flex-root">
  <div class="page d-flex flex-row flex-column-fluid">
    <div class="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">
       
           


      <div v-if="isLoading">


        <div id="kt_header" class="header" data-kt-sticky="true" data-kt-sticky-name="header" data-kt-sticky-offset="{default: '200px', lg: '300px'}" style="animation-duration: 0.3s;"></div>

        <!--begin::Loading Content-->
          <div class="py-5">
            <div class="col-lg-12">
              <!--begin::Card-->
                <div class="card card-border overlay overlay-block">
                  <div class="overlay-layer card-rounded bg-dark bg-opacity-5">
                    <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>
                  </div>
                </div>
              <!--end::Card-->
            </div>
          </div>
        <!--end::Loading Content-->


      </div>
      <div v-else>

        <div id="kt_header" class="header" data-kt-sticky="true" data-kt-sticky-name="header" data-kt-sticky-offset="{default: '200px', lg: '300px'}" style="animation-duration: 0.3s;"></div>

        <!--begin::Content-->
        <div class="docs-content d-flex flex-column flex-column-fluid" id="kt_docs_content">
          <!--begin::Container--->
          <div class="container" id="kt_docs_content_container">
            <!--begin::Card--->
            <div class="card card-docs mb-2">
              <!--begin::Card Body-->
							<div class="card-body fs-6 py-15 px-10 py-lg-15 px-lg-15 text-gray-700">
                <!--begin::Section-->
                <div class="pb-10">

                  <img src="/assets/images/logo-icdx.png" alt="icdx logo" class="mw-100" style="display: block;margin-left: auto;margin-right: auto;"/>  
                  <div class="py-5"><h1 class="anchor fw-bolder mb-5" id="overview" style="display: block;text-align: center;">ACCOUNTING & BUDGETING SYSTEM</h1> <br> {{ $t('resetPassword') }}</div>
                  <div class="py-5">
                    <form class="pt-3" @submit.prevent="submitData" method="POST">

                        <div class="form-group position-relative has-icon-left">
                          <label for="language">Language / Bahasa</label>
                          <div class="position-relative">
                            <select v-model="locale" @change="langChanged($i18n.locale)" class="form-select">
                              <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang"><font  style="color: #212529;">{{ lang }}</font></option>
                            </select>
                          </div>
                        </div>



                        <div class="form-group position-relative has-icon-left">
                          <div class="clearfix">
                            <label for="password">{{ $t('password') }}</label>
                          </div>
                          <div class="position-relative">
                            <input type="password" class="form-control" v-model="forms.password" required>
                          </div>
                          <div v-if="errors.password">
                            <div class="alert alert-light-success color-danger" v-for="error in errors.password" :key="error">{{error}}</div>
                          </div>
                        </div>


                        <div class="form-group position-relative has-icon-left">
                          <div class="position-relative">
                            <vue-captcha 
                              ref="captcha" 
                              :captcha.sync="code"
                              @on-change="handleChange">
                            </vue-captcha>
                                        
                          </div>
                          <div class="buttons">
                            <button type="button" @click="refreshCaptchaCode" class="btn icon icon-left btn-info"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="fa fa-refresh"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg> Refresh</button>
                          </div>
                        </div>


                        <div class="form-group position-relative has-icon-left">
                          <div class="clearfix">
                            <label for="captchaCode">{{ $t('captchaCode') }}</label>
                          </div>
                          <div class="position-relative">
                            <input type="text" class="form-control" v-model="forms.captchaCode" required>
                          </div>
                          <div v-if="errors.captchaCode">
                            <div class="alert alert-light-success color-danger" v-for="error in errors.captchaCode" :key="error">{{error}}</div>
                          </div>
                        </div>



                        <div class="clearfix">
                          <button class="btn btn-primary float-right">Submit</button>
                        </div>


                        <div class="my-2 d-flex justify-content-between align-items-center">
                            <div class="form-check">
                            
                            </div>
                            <a :href="this.$settings.endPointApp" class="auth-link text-black">{{ $t('txtLogin') }}?</a>
                        </div>

                    </form>
                  </div>

                </div>
                <!--end::Section-->
              </div>
              <!--end::Card-->
            </div>
            <!--end::Card Body-->
          </div>
          <!--end::Container-->
        </div>
      <!--end::Content-->


      </div>


        
					
   
    </div>
  </div>
</div>



    </div>
</template>


<script>

    import Vue from "vue"
    import { setAuthToken,setAuthLang } from '@/config/auth'
    import vSelect from 'vue-select'
    import VueCaptcha from 'vue-captcha-code'


export default {
  name: 'ResetPassword',
  components: {
        'v-select':vSelect,
        VueCaptcha
  },
  data () {
    return {
        code: '',
        locale:'',
        maxToasts: 100,
        position: 'up right',
        closeBtn: true,  
        isLoading: false,  
        errors: [],
        langs: ['id', 'en'],
        forms: {password:'',captchaCode:''},
    }
  },
   watch: { 

  },
  methods: { 
    handleChange(code) {
      this.code = code;
    },
    refreshCaptchaCode() {
      this.$refs.captcha.refreshCaptcha();
    },
    makeOffer() {
        console.log(this.forms)
    },

    resetForms(){
        this.forms.password     = ''
        this.forms.captchaCode  = ''
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
          
          if (this.forms.captchaCode == this.code) {
            this.fade(true);
 
              let formData = new FormData();
              formData.append("email", this.$route.params.email);
              formData.append("token", this.$route.params.token);
              formData.append("password", this.forms.password);
              const baseURI  =  this.$settings.endPoint+"/user/change-password-from-link";
              
              this.$http.post(baseURI,formData)
                .then((response) => {
                  this.loading();
                  if(response.data.status === 200) {
                    this.errors = [];
                    this.resetForms()
                    this.success(response.data.datas.messages);
                    window.location.href = '/';
                  }else{
                    this.errors = response.data.errors;
                    this.resultError(response.data.errors);
                    this.refreshCaptchaCode();
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
                  this.refreshCaptchaCode();
                }
              });
             
          }else{
            this.refreshCaptchaCode();
            var wrongCaptchaCode = this.$t('wrongCaptchaCode');
            this.error(wrongCaptchaCode);
          }


          
        }
      })            
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
 
    },

  },
  events: {

  },
  created: function() { 
    
  },
	mounted() {
    // this.fetchIt();
    // this.fade(true);
    this.loading();
    this.langChanged(this.$i18n.locale);
  }

}
</script>
<style scoped>

</style>