<template>
  <div>
    <div class="main-wrapper">
      <!--begin::sidebar-->
      <sidebar-component classMenu="BudgetAccount"></sidebar-component>
      <!--end::sidebar-->

      <div class="page-wrapper">
        <!--begin::navbar-->
        <navbar-component></navbar-component>
        <!--end::navbar-->

        <!--begin::content-->
        <div class="page-content">
          <div
            class="
              d-flex
              justify-content-between
              align-items-center
              flex-wrap
              grid-margin
            "
          >
            <div>
              <h4 class="mb-12 mb-md-0"></h4>
            </div>

            <div class="col-lg-12 col-xl-12 stretch-card">
              <div class="card">
                <div class="card-header">
                  <h4 style="margin-right: 5px" class="float-start">{{ $t("Budget_Account_Data_txt") }}</h4>
                  

                  <button
                    class="btn btn-primary float-end btn-xs"
                    style="margin-right: 5px"
                    @click.prevent="createData()"
                  >
                    <i class="link-icon" data-feather="plus"></i>
                    {{ $t("createNew") }}
                  </button>
                   
                </div>

                <div class="card-body">
                  <vue-good-table
                    title="list-budget-year"
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
                    :columns="columns"
                    :detailUser="this.detailUser"
                   
                  >
                    <template slot="table-row" slot-scope="props">
                      <span v-if="props.column.field == 'actions'">
                        <button
                          class="btn btn-primary btn-xs"
                          style="margin-right: 5px ; margin-bottom: 5px"
                          @click.prevent="detailData(props.index, props.row)"
                        >
                         
                          Detail
                        </button>
                        <button
                          v-if="props.row.status == 'draft' || props.row.status == 'cancelled' || detailUser.level == 'ROOT'"
                          class="btn btn-warning btn-xs"
                          style="margin-right: 5px ; margin-bottom: 5px"
                          @click.prevent="editData(props.index, props.row)"
                        >
                          
                          Edit
                        </button>
                  
                      
                        <button
                          class="btn btn-info btn-xs"
                          style="margin-right: 5px ; margin-bottom: 5px"
                          @click.prevent="downloadData(props.index, props.row)"
                        >
                          
                          Download
                        </button>
                        
                      </span>
                      <span v-else>
                        {{ props.formattedRow[props.column.field] }}
                      </span>
                    </template>
                  </vue-good-table>
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


 
<!-- @edit --->
    <modal name="edit-data" height="auto" :draggable="true">
        

<form class="forms-sample" @submit.prevent="submitEditData()" method="POST" >
        <div class="modal-header">
            <h5 class="modal-title">{{ $t("editData_txt") }}</h5>
            <button type="button" @click="hideModal()" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

      <div class="modal-body">
        
                <!--begin::loading-data-->
                  <div v-if="isLoading" class="d-flex align-items-center">
                    <div
                      class="spinner-border ms-auto"
                      role="status"
                      aria-hidden="true"
                    ></div>
                    <strong>{{ $t("loadingTxt") }}...</strong>
                  </div>
                  <!--end::loading-data-->
         
         
                     <div class="row mb-3">
                      <div class="col-lg-3">
                        <label for="year_txt" class="col-form-label">{{
                          $t("year_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="year"
                          :placeholder="$t('year_txt')"
                          v-model="forms.year"
                          v-on:keypress="isNumber()"
                          required
                        />
                        <div v-if="errors.year">
                          <div
                            v-for="error in errors.year"
                            :key="error"
                            class="alert alert-primary"
                            role="alert"
                          >
                            <i data-feather="alert-circle"></i>
                            {{ error }}
                          </div>
                        </div>
                      </div>
                    </div>
          

                 <div class="row mb-3">
                  <div class="col-lg-3">
                    <label for="status_txt" class="col-form-label">Status</label>
                  </div>
                  <div class="col-lg-8">
                     <v-select v-model="forms.status" :options="this.statuses" label="status" placeholder="Status" />
                    <div v-if="errors.status">
                      <div
                        v-for="error in errors.status"
                        :key="error"
                        class="alert alert-primary"
                        role="alert"
                      >
                        <i data-feather="alert-circle"></i>
                        {{ error }}
                      </div>
                    </div>
                  </div>
                </div>



      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-primary">{{ $t("submitFormTxt") }}</button>
        <button type="button" class="btn btn-secondary" @click="hideModal()">{{ $t("close_txt") }}</button>
      </div>
</form>
 
    </modal>



<!-- @add --->
    <modal name="add-data" height="auto" :draggable="true">
        

<form class="forms-sample" @submit.prevent="submitData" method="POST" >
        <div class="modal-header">
            <h5 class="modal-title">{{ $t("createNew") }}</h5>
            <button type="button" @click="hideModal()" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

      <div class="modal-body">
        
         
                     <div class="row mb-3">
                      <div class="col-lg-3">
                        <label for="year_txt" class="col-form-label">{{
                          $t("year_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="year"
                          :placeholder="$t('year_txt')"
                          v-model="forms.year"
                          v-on:keypress="isNumber()"
                          required
                        />
                        <div v-if="errors.year">
                          <div
                            v-for="error in errors.year"
                            :key="error"
                            class="alert alert-primary"
                            role="alert"
                          >
                            <i data-feather="alert-circle"></i>
                            {{ error }}
                          </div>
                        </div>
                      </div>
                    </div>
          


      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-primary">{{ $t("submitFormTxt") }}</button>
        <button type="button" class="btn btn-secondary" @click="hideModal()">{{ $t("close_txt") }}</button>
      </div>
</form>
 
    </modal>


  </div>
</template>

<script>
import { setAuthToken } from "@/middleware/auth";
import sidebarComponent from "../_partials/_sidebar";
import navbarComponent from "../_partials/_navbar";
import footerComponent from "../_partials/_footer";
import vSelect from 'vue-select'

export default {
  name: "BudgetAccountYear",
  components: {
    "sidebar-component": sidebarComponent,
    "navbar-component": navbarComponent,
    "footer-component": footerComponent,
    "v-select": vSelect,
  },
  data() {
    return {
        money: {
          decimal: ',',
          thousands: '.',
          prefix: 'Rp. ',
          precision: 2,
          masked: false
        },
        company_default:"",
        statuses:["draft","locked","cancelled"],
        uploadResponse:[],
        forms: { budget_year_id:"", company_id: "", year:"", status:"",create_by:"",update_by:"", created_at:"",updated_at:"" },
        file_name:"",
        maxToasts: 100,
        position: "up right",
        closeBtn: true,
        isLoading: false,
        errors: [],
        langs: ["id", "en"],
        detailUser: [],
        detailDivisi: [],
        totalRecords: 0,
        serverParams: {
            columnFilters: {},
            sort: {
            field: "",
            type: "",
            },
            page: 1,
            per_page: 10,
        },
        columns: [
            {
            label: "Year",
            field: "year",
            filterOptions: {
                enabled: true, // enable filter for this column
                placeholder: "Filter By Year", // placeholder for filter input
                filterValue: "", // initial populated value for this filter
                filterDropdownItems: [], // dropdown (with selected values) instead of text input
                trigger: "enter", //only trigger on enter not on keyup
            },
            }, 
            {
            label: "Status",
            field: "status",
            filterOptions: {
                enabled: true, // enable filter for this column
                placeholder: "Filter By Status", // placeholder for filter input
                filterValue: "", // initial populated value for this filter
                filterDropdownItems: ["draft","locked","cancelled"], // dropdown (with selected values) instead of text input
                trigger: "enter", //only trigger on enter not on keyup
            },
            },
            {
            label: "Create By",
            field: "create_by",
            filterOptions: {
                enabled: true, // enable filter for this column
                placeholder: "Filter By Create By", // placeholder for filter input
                filterValue: "", // initial populated value for this filter
                filterDropdownItems: [], // dropdown (with selected values) instead of text input
                trigger: "enter", //only trigger on enter not on keyup
            },
            },
            {
            label: "Update By",
            field: "update_by",
            filterOptions: {
                enabled: true, // enable filter for this column
                placeholder: "Filter By Update By", // placeholder for filter input
                filterValue: "", // initial populated value for this filter
                filterDropdownItems: [], // dropdown (with selected values) instead of text input
                trigger: "enter", //only trigger on enter not on keyup
            },
            },
            {
            label: "Action",
            field: "actions",
            sortable: false,
            },
        ],
        rows: [],
    };
  },
  watch: {},
  methods: {

    submitData() {
      this.$swal({
        title: this.$t("areYouSure"),
        text: this.$t("yourData"),
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then((result) => {
        if (result.value) {
            this.fade(true);
             
             this.forms.company_id = this.company_default
            const baseURI  =  this.$settings.endPoint+"budget-year/create";
            this.$http.post(baseURI,this.forms).then((response) => {
              this.loading();
              if(response.data.status === 200) {
                    this.hideModal();
                    this.loadItems();
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
      });
    },
	isNumber(value) {
      let evt = (value) ? value : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    uppercase() { 
        this.forms.year             = this.forms.company_id.toUpperCase();
        this.forms.year             = this.forms.year.trim();
    },
      
 
    resetForm() {
        this.forms.budget_year_id           = ""
        this.forms.company_id               = ""
        this.forms.year                     = ""
        this.forms.status                   = ""
        this.forms.create_by                = ""
        this.forms.created_at               = ""
        this.forms.updated_at               = ""
        this.file_name                      = '';
        this.uploadResponse                 = [];
        this.errors                         = [];
    },
    uploadAvatar(event) {

      let files = event.target.files || event.dataTransfer.files;
      if (files.length) this.file_name = files[0];
                
    },
    hideModal(){
        this.$modal.hide('add-data');
        this.$modal.hide('detail-data');
        this.$modal.hide('edit-data');
        this.resetForm();
    },
  
    downloadData(index, row) {
      const baseURI = this.$settings.endPoint + "budget-year/download-data-detail/"+row.budget_year_id;
      var file_name = row.company_id+"_download_" + row.year + ".xlsx";
 
      return this.$http
        .get(
          baseURI,
          {
            responseType: "blob",
          }
        )
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", file_name);
          document.body.appendChild(fileLink);
          fileLink.click();
          this.fade(false);
        });
    },

    
    createData() {
        this.resetForm();
        this.$modal.show('add-data');
    },

    submitEditData() {
      this.$swal({
        title: this.$t("areYouSure"),
        text: this.$t("yourData"),
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then((result) => {
        if (result.value) {
            this.fade(true);
            
             this.forms.company_id = this.company_default
            const baseURI  =  this.$settings.endPoint+"budget-year/update/"+this.forms.budget_year_id;
            this.$http.put(baseURI,this.forms).then((response) => {
              this.loading();
              if(response.data.status === 200) {
                    this.hideModal();
                    this.loadItems();
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
      });
    },
    editData(index, row) {
        this.errors                   = [];
        this.forms.budget_year_id     = row.budget_year_id
        this.forms.system_code        = row.company_id
        this.forms.status             = row.status
        this.forms.year               = row.year
        this.forms.create_by          = row.create_by
        this.forms.update_by          = row.update_by
        this.forms.created_at         = row.created_at
        this.forms.updated_at         = row.updated_at
        this.$modal.show('edit-data');
    },

    detailData(index, row) {
      var params = this.$onRandom(row.budget_year_id);
      window.location.href = "/budget-account/detail/" + params;
    },
 

    // load items is what brings back the rows from server
    loadItems() {
      const baseURI = this.$settings.endPoint + "budget-year/index";
        let company_id = localStorage.getItem('company_default')
      return this.$http
        .get(
          baseURI +
            `?per_page=${this.serverParams.per_page}&page=${this.serverParams.page}&sort_field=${this.serverParams.sort.field}&sort_type=${this.serverParams.sort.type}&company_id=${company_id}&year=${this.serverParams.columnFilters.year}&status=${this.serverParams.columnFilters.status}&create_by=${this.serverParams.columnFilters.create_by}&update_by=${this.serverParams.columnFilters.update_by}`
        )
        .then((response) => {
            if(response.data.datas.credentials){
                setAuthToken(response.data.datas.credentials.access_token);
            }
          this.rows = response.data.datas.data.data;
          this.totalRecords = response.data.datas.data.total;
        })
            .catch((error) => {
              this.loading();
              if (error.response) {
                if (error.response.status === 422) {
                  this.errors = error.response.data.errors;
                  this.resultError(error.response.data.errors);
                } else if (error.response.status === 401) {
                  this.$router.push("/authorized-error");
                } else if (error.response.status === 500) {
                  this.$router.push("/server-error");
                }  else {
                  this.$router.push("/page-not-found");
                }
              }
            });
    },

    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
      this.loadItems();
    },

    onColumnFilter(params) {
      this.updateParams(params);
    },

    onPageChange(params) {
      this.updateParams({ page: params.currentPage });
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
      this.updateParams({ per_page: params.currentPerPage });
    },

    resultError(data) {
      var count = Object.keys(data).length;
      for (var x = 0; x < count; x++) {
        var nameOb = Object.keys(data)[x];
        var objectData = data[nameOb];
        for (var y = 0; y < objectData.length; y++) {
          this.error(objectData[y]);
        }
      }
    },

    success(kata) {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: kata,
      });
    },

    error(kata) {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "error",
        title: kata,
      });
    },

    fade(sType) {
      this.isLoading = sType;
    },

    loading() {
      this.fade(true);
      setTimeout(() => {
        this.isLoading = false;
      }, 1000); // hide the message after 3 seconds
    },

    fetchIt() {
      const userDatas       = this.$getUserInfo();
      this.detailUser       = userDatas.sub;
      

      if(this.detailUser.level != "ROOT"){
          if(this.detailUser.division_id != "ACCOUNTING"){
            this.$router.push("/authorized-error");
          }
      }

    },

    logout() {
      this.$logoutUser();
      this.$router.push("/");
    },
  },
  events: {},
  created: function () {},
  mounted() {
    this.company_default  = localStorage.getItem('company_default');
    this.fetchIt();
    this.loading();
  },
};
</script>
<style scoped>
</style>