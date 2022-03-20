<template>
    <div>
        <div id="app">
  
            <div id="sidebar" class='active'>
                <div class="sidebar-wrapper active">
                    <div class="sidebar-menu">

                        <sidebar-component classMenu="Settings"></sidebar-component>

                    </div>
                    <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
                </div>
            </div>


            <div id="main">

                <navbar-component classMenu="Settings"></navbar-component>

                <div class="main-content container-fluid">

                    <div class="page-title">
                        <h3>{{ $t('userSettings')}}</h3>
                        <p class="text-subtitle text-muted">-</p>
                    </div>

                    <section id="basic-horizontal-layouts">
                        <div class="row match-height">

                             <div class="col-md-6 col-12">
                                 <div class="card">
                                    <div class="card-content">
                                        <div class="card-body">


                                            <form class="form form-horizontal">
                                                <div class="form-body">
                                                    <div class="row">
                                                        <div class="col-md-4">
                                                            <label>{{ $t('name')}}</label>
                                                        </div>
                                                        <div class="col-md-8 form-group">
                                                            <b>{{this.detailUser.name}}</b>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label>Email</label>
                                                        </div>
                                                        <div class="col-md-8 form-group">
                                                            <b>{{this.detailUser.email}}</b>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label>{{ $t('divisionCode')}}</label>
                                                        </div>
                                                        <div class="col-md-8 form-group">
                                                            <b>{{this.detailDivisi.code}}</b>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label>{{ $t('divisionDesc')}}</label>
                                                        </div>
                                                        <div class="col-md-8 form-group">
                                                            <b>{{this.detailDivisi.name}}</b>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>


                                        </div>
                                    </div>
                                 </div>
                             </div>


                             <div class="col-md-6 col-12">
                                 <div class="card">
                                    <div class="card-content">
                                        <div class="card-body">


                                            <form class="form form-horizontal" @submit.prevent="submitData" method="POST">
                                                <div class="form-body">
                                                    <div class="row">
                                                        <div class="col-md-4">
                                                            <label>{{ $t('password')}}</label>
                                                        </div>
                                                        <div class="col-md-8 form-group">
                                                            <input type="password" class="form-control" v-model="forms.password" required>
                                                            <div v-if="errors.password">
                                                                <div class="alert alert-light-success color-danger" v-for="error in errors.password" :key="error">{{error}}</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label>{{ $t('passwordConfirm')}}</label>
                                                        </div>
                                                        <div class="col-md-8 form-group">
                                                            <input type="password" class="form-control" v-model="forms.password_confirmation" required>

                                                            <div v-if="errors.password_confirmation">
                                                                <div class="alert alert-light-success color-danger" v-for="error in errors.password_confirmation" :key="error">{{error}}</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-12 d-flex justify-content-end">
                                                            <button type="submit" class="btn btn-primary mr-1 mb-1">Submit</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>


                                        </div>
                                    </div>
                                 </div>
                             </div>

                        </div>
                    </section>

                </div>

                
            </div>

        </div>
    
    </div>
</template>

<script>
import sidebarComponent from './layouts/sidebar'
import navbarComponent from './layouts/navbar'

export default {
  name: 'Settings',
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
      detailUser:[],
      detailDivisi:[],
      forms: {password: '', password_confirmation:''},
    }
  },
    watch: { 

    },
    methods: {
        
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
                
                if (this.forms.password == this.forms.password_confirmation) {
                    this.fade(true);
                    let formData = new FormData();
                    formData.append("password", this.forms.password);
                    formData.append("password_confirmation", this.forms.password_confirmation);
                    
                    const baseURI  =  this.$settings.endPoint+"/user/change-password";
                    
                    this.$http.post(baseURI,formData)
                        .then((response) => {
                        this.loading();
                        if(response.data.status === 200) {
                            this.errors = [];
                            this.resetForms();
                            this.success(response.data.datas.messages);
                        }else{
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
                     });
                }else{
                    var wrongPasswordConfirm = this.$t('wrongPasswordConfirm');
                    this.error(wrongPasswordConfirm);
                }


                
                }
            })            
            },


        resetForms(){
            this.forms.password                 = ''
            this.forms.password_confirmation    = ''
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
        
        fade(sType){  	
            this.isLoading = sType;
        },

        loading(){
            setTimeout(() => {
                this.isLoading = false;
            }, 1000); // hide the message after 3 seconds
        },

        fetchIt() {
            const userDatas     = this.$getUserInfo();
            this.detailUser     = userDatas.sub;
            this.detailDivisi   = userDatas.sub.division;
            
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
    }

}
</script>
<style scoped>

</style>