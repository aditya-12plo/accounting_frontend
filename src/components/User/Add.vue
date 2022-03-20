<template>
    <div>
        <div id="app">
  
            <div id="sidebar" class='active'>
                <div class="sidebar-wrapper active">
                    <div class="sidebar-menu">

                        <sidebar-component classMenu="UserIndex"></sidebar-component>

                    </div>
                    <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
                </div>
            </div>


            <div id="main">

                <navbar-component classMenu="UserIndex"></navbar-component>

                <div class="main-content container-fluid">

                    <div class="page-title">
                        <h3>{{ $t('userAccessAdd')}}</h3>
                        <p class="text-subtitle text-muted">-</p>
                    </div>

                    <section id="basic-horizontal-layouts">
                        <div class="row match-height"> 

                             <div class="col-md-12 col-12">
                                 <div class="card">
                                    <div class="card-content">
                                        <div class="card-body">

  
                                            <form class="form form-horizontal" @submit.prevent="submitData" method="POST">
                                                <div class="form-body">
                                                    <div class="row">
                                                        <div class="col-md-4">
                                                            <label>{{ $t('name')}}</label>
                                                        </div>
                                                        <div class="col-md-8 form-group">
                                                            <input type="text" class="form-control" v-model="forms.name" aria-describedby="nameHelp" required="" autofocus>
                                                            <div v-if="errors.name">
                                                                <div class="alert alert-light-success color-danger" v-for="error in errors.name" :key="error">{{error}}</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label>Email</label>
                                                        </div>
                                                        <div class="col-md-8 form-group">
                                                            <input type="email" class="form-control" v-model="forms.email" aria-describedby="emailHelp" required="" autofocus>
                                                            <div v-if="errors.email">
                                                                <div class="alert alert-light-success color-danger" v-for="error in errors.email" :key="error">{{error}}</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label>{{$t('password')}}</label>
                                                        </div>
                                                        <div class="col-md-8 form-group">
                                                            <input type="password" class="form-control" v-model="forms.password" aria-describedby="passwordHelp" required="" autofocus>
                                                            <div v-if="errors.password">
                                                                <div class="alert alert-light-success color-danger" v-for="error in errors.password" :key="error">{{error}}</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label>{{$t('division')}}</label>
                                                        </div>
                                                        <div class="col-md-8 form-group">
                                                            <select v-model="forms.division_id" class="form-select">
                                                                <option v-for="(dtDiv, i) in datasDivision" :key="`dtDiv${i}`" :value="dtDiv.division_id">{{ dtDiv.name }}</option>
                                                            </select>
                                                            <div v-if="errors.division_id">
                                                                <div class="alert alert-light-success color-danger" v-for="error in errors.division_id" :key="error">{{error}}</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label>Status</label>
                                                        </div>
                                                        <div class="col-md-8 form-group">
                                                            <select v-model="forms.status" class="form-select">
                                                                <option v-for="(dtStts, i) in datasStatus" :key="`dtStts${i}`" :value="dtStts">{{ dtStts }}</option>
                                                            </select>
                                                            <div v-if="errors.status">
                                                                <div class="alert alert-light-success color-danger" v-for="error in errors.status" :key="error">{{error}}</div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-12 d-flex">
                                                            <button type="button" class="btn btn-primary mr-1 mb-1" @click.prevent="backPage()">{{$t('backMess')}}</button>
                                                            <button type="submit" class="btn btn-danger mr-1 mb-1">{{$t('submitMess')}}</button>
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
import sidebarComponent from '../layouts/sidebar'
import navbarComponent from '../layouts/navbar'

export default {
  name: 'UserEdit',
  components: {
    'sidebar-component':sidebarComponent,
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
      datasStatus: ['active','deactived'],
      detailUser:[],
      detailDivisi:[],
      datasUser:[],
      datasDivision:[],
      forms:{email:'',name:'',status:'',division_id:'',password:''},
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
                
                    this.fade(true);
                    let formData = new FormData();
                    formData.append("password", this.forms.password);
                    formData.append("name", this.forms.name);
                    formData.append("email", this.forms.email);
                    formData.append("status", this.forms.status);
                    formData.append("division_id", this.forms.division_id);
                    
                    const baseURI  =  this.$settings.endPoint+"/user/create";
                    
                    this.$http.post(baseURI,this.forms)
                        .then((response) => {
                        this.loading();
                        if(response.data.status === 200) {
                            this.errors = [];
                            this.resetForms()
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
                }
            })            
        },


        backPage(){
            // this.$router.go(-1);
            window.location.href = '/user-access';
        },

        resetForms(){
            this.forms.email         = ''
            this.forms.name          = ''
            this.forms.status        = ''
            this.forms.division_id   = ''
            this.forms.password      = ''
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
            
            this.$toast.open({
                message: kata,
                type: 'error',
                duration:3000,
                position: 'top-right'
            });
    
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

        fetchDataDivision() {
            const baseURI  =  this.$settings.endPoint+"/division/index?download=download";
            
            return this.$http.get(baseURI).then((response) => {
                this.datasDivision  = response.data.datas

            })
            
        },

    },
    events: {

    },
    created: function() { 
 
    },
	mounted() {
      this.fetchIt();
      this.fetchDataDivision();
    }

}
</script>
<style scoped>

</style>