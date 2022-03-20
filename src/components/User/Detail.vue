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
                        <h3>{{ $t('userAccessDetail')}}</h3>
                        <p class="text-subtitle text-muted">-</p>
                    </div>

                    <section id="basic-horizontal-layouts">
                        <div class="row match-height"> 

                             <div class="col-md-12 col-12">
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
                                                            <b>{{this.datasUser.name}}</b>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label>Email</label>
                                                        </div>
                                                        <div class="col-md-8 form-group">
                                                            <b>{{this.datasUser.email}}</b>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label>Level</label>
                                                        </div>
                                                        <div class="col-md-8 form-group">
                                                            <b>{{this.datasUser.level}}</b>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label>Status</label>
                                                        </div>
                                                        <div class="col-md-8 form-group">
                                                            <b>{{this.datasUser.status}}</b>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label>{{ $t('divisionCode')}}</label>
                                                        </div>
                                                        <div class="col-md-8 form-group">
                                                            <b>{{this.datasDivision.code}}</b>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label>{{ $t('divisionDesc')}}</label>
                                                        </div>
                                                        <div class="col-md-8 form-group">
                                                            <b>{{this.datasDivision.name}}</b>
                                                        </div>
                                                        <div class="col-sm-12 d-flex">
                                                            <button type="button" class="btn btn-primary mr-1 mb-1" @click.prevent="backPage()">{{$t('backMess')}}</button>
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
  name: 'UserDetail',
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
      detailUser:[],
      detailDivisi:[],
      datasUser:[],
      datasDivision:[],
    }
  },
    watch: { 

    },
    methods: {
         

        backPage(){
            // this.$router.go(-1);
            window.location.href = '/user-access';
        },

        resetForms(){
 
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

        fetchData() {
            var id  = this.$onBehind(this.$route.params.id);
            const baseURI  =  this.$settings.endPoint+"/user/detail/"+id;
            
            return this.$http.get(baseURI).then((response) => {
                this.datasUser      = response.data.datas
                this.datasDivision  = response.data.datas.division
            })
            
        },

    },
    events: {

    },
    created: function() { 
 
    },
	mounted() {
      this.fetchIt();
      this.fetchData();
    }

}
</script>
<style scoped>

</style>