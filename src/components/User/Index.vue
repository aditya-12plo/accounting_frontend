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
                        <h3>{{ $t('userAccessList')}}</h3>
                        <p class="text-subtitle text-muted">-</p>
                    </div>

                    <section id="basic-horizontal-layouts">
                        <div class="row match-height"> 

                             <div class="col-md-12 col-12">
                                 <div class="card">
                                    <div class="card-content">

<button class="btn btn-primary" style="margin-right: 5px;" @click.prevent="createData()">{{$t('createNew')}}</button>
<button class="btn btn-warning" style="margin-right: 5px;" @click.prevent="downloadData()">{{$t('downloadData')}} .xlsx</button>

                                        <div class="card-body">

 <vue-good-table
    title="list-user"
    mode="remote"
    @on-page-change="onPageChange"
    @on-sort-change="onSortChange"
    @on-column-filter="onColumnFilter"
    @on-per-page-change="onPerPageChange"
    :totalRows="totalRecords"
    :line-numbers="true"
    :isLoading.sync="isLoading"
    :pagination-options="{
        enabled: true,
    }"
  :rows="rows"
  :columns="columns">      
      <template slot="table-row" slot-scope="props">

        <span v-if="props.column.field == 'actions'">
          <button class="btn btn-primary" style="margin-right: 5px;" @click.prevent="detailData(props.index , props.row)">detail</button>
          <button class="btn btn-warning" style="margin-right: 5px;" @click.prevent="editData(props.index , props.row)">Edit</button>
          <button v-if="props.row.status === 'deactived'" class="btn btn-success" @click.prevent="deleteData(props.index , props.row, 'active')">Activate</button>
          <button v-if="props.row.status === 'active'" class="btn btn-danger" @click.prevent="deleteData(props.index , props.row, 'deactived')">Deactivated</button>
        </span>
        <span v-else>
            {{props.formattedRow[props.column.field]}}
        </span>
      </template> 
</vue-good-table>


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
  name: 'UserIndex',
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
      totalRecords: 0,
      serverParams: {
          columnFilters: {},
          sort: {
          field: '', 
          type: '',
        },
        page: 1, 
        per_page: 10
      },
      columns: [
        {
          label: 'Name',
          field: 'name',
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "Filter By Name", // placeholder for filter input
            filterValue: "", // initial populated value for this filter
            filterDropdownItems: [], // dropdown (with selected values) instead of text input
            trigger: "enter" //only trigger on enter not on keyup
          }
        },
        {
          label: 'Email',
          field: 'email',
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "Filter By Email", // placeholder for filter input
            filterValue: "", // initial populated value for this filter
            filterDropdownItems: [], // dropdown (with selected values) instead of text input
            trigger: "enter" //only trigger on enter not on keyup
          }
        },
        {
          label: 'Position',
          field: 'level',
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "Filter By Level", // placeholder for filter input
            filterValue: "", // initial populated value for this filter
            filterDropdownItems: [], // dropdown (with selected values) instead of text input
            trigger: "enter" //only trigger on enter not on keyup
          }
        },
        {
          label: 'Division Code',
          field: 'division.code',
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "Filter By Division Code", // placeholder for filter input
            filterValue: "", // initial populated value for this filter
            filterDropdownItems: [], // dropdown (with selected values) instead of text input
            trigger: "enter" //only trigger on enter not on keyup
          }
        },
        {
          label: 'Division Name',
          field: 'division.name',
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "Filter By Division Name", // placeholder for filter input
            filterValue: "", // initial populated value for this filter
            filterDropdownItems: [], // dropdown (with selected values) instead of text input
            trigger: "enter" //only trigger on enter not on keyup
          }
        },
        {
          label: 'Status',
          field: 'status',
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "Filter By Status", // placeholder for filter input
            filterValue: "", // initial populated value for this filter
            filterDropdownItems: ['active','deactived'], // dropdown (with selected values) instead of text input
            trigger: "enter" //only trigger on enter not on keyup
          }
        },
        {
          label: 'Action',
          field: 'actions',
          sortable: false,
        }
        ],
        rows: [],
    }
  },
    watch: { 

    },
    methods: {
        
        downloadData(){
            this.fade(true);
            var baseURI     =  this.$settings.endPoint+'/user/download';
            var CurrentDate = this.$moment().format('DD_MM_YYYY_HH_mm_ss');
            var columnFilters = this.serverParams.columnFilters;
            var division_name = columnFilters['division.name'];
            var division_code = columnFilters['division.code'];
            
            var sendData    = {
                  name:this.serverParams.columnFilters.name,
                  email:this.serverParams.columnFilters.email,
                  level:this.serverParams.columnFilters.level,
                  status:this.serverParams.columnFilters.status,
                  division_name:division_name,
                  division_code:division_code,
                  file_name:'download_'+CurrentDate+'.xlsx'
                };	
            this.$http({
                url: baseURI,
                method: 'POST',
                data: sendData,
                responseType: 'blob',
            }).then((response) => {
                this.errors     = [];
                var filename    = sendData.file_name;

                var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                var fileLink = document.createElement('a');

                fileLink.href = fileURL;
                fileLink.setAttribute('download', filename);
                document.body.appendChild(fileLink);
                fileLink.click();
                this.fade(false);
            }).catch(error => {
                if (error.response) {
                    if(error.response.status === 422) {
                        this.errors =  {"message": ["File Not Found"]};
                        this.error("File Not Found");
                    }else if (error.response.status === 500) {
                        this.$router.push('/server-error');
                    }else{
                        this.$router.push('/page-not-found');
                    }
                }
            });
        },
      createData(){
        window.location.href = '/user-access/add';     
      },
        
      editData(index , row){
        var params  = this.$onRandom(row.user_id);
        window.location.href = '/user-access/edit/'+params;     
      },
        
      detailData(index , row){
        var params  = this.$onRandom(row.user_id);
        window.location.href = '/user-access/detail/'+params;     
      },
      deleteData(index , row, status){
           this.$swal({
                title: this.$t('areYouSure'),
                text: this.$t('yourData'),
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            }).then((result) => {
                if (result.value) {
                 
                    var formData = {status  : status}
                    const baseURI  =  this.$settings.endPoint+"/user/update-status/"+row.user_id;
                    this.$http.put(baseURI,formData).then((response) => {
                    this.loading();
                    if(response.data.status === 200) {
                        this.success(response.data.datas.messages);
                        this.loadItems();
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

        // load items is what brings back the rows from server
        loadItems() {
            const baseURI  =  this.$settings.endPoint+"/user/index";

            var columnFilters = this.serverParams.columnFilters;
            var division_name = columnFilters['division.name'];
            var division_code = columnFilters['division.code'];
            return this.$http.get(baseURI+`?per_page=${this.serverParams.per_page}&page=${this.serverParams.page}&sort_field=${this.serverParams.sort.field}&sort_type=${this.serverParams.sort.type}&name=${this.serverParams.columnFilters.name}&email=${this.serverParams.columnFilters.email}&level=${this.serverParams.columnFilters.level}&status=${this.serverParams.columnFilters.status}&division_name=${division_name}&division_code=${division_code}`).then((response) => {
                this.rows           = response.data.datas.data
                this.totalRecords  = response.data.datas.total
            })
        },

      
        updateParams(newProps) {
            this.serverParams = Object.assign({}, this.serverParams, newProps);
            this.loadItems();
        },

        onColumnFilter(params) {
            this.updateParams(params);
        },
        
        onPageChange(params) {
            this.updateParams({page: params.currentPage});
        },
        
        onSortChange(params) {
            this.updateParams({
            sort: {
                type: params[0].type,
                field: params[0].field,
            },
            });
        },

        onPerPageChange(params) {
            this.updateParams({per_page: params.currentPerPage});
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
            if(this.detailUser.level != "ROOT"){
                window.location.href = '/dashboard';
            }
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