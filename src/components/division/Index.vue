<template>
  <div>
    <div class="main-wrapper">
      <!--begin::sidebar-->
      <sidebar-component classMenu="Division"></sidebar-component>
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
                  <h4 style="margin-right: 5px" class="float-start">{{ $t("txtDivisionSetting") }}</h4>
                 
                  <button
                    class="btn btn-primary float-end btn-xs"
                    style="margin-right: 5px"
                    @click.prevent="createData()"
                  >
                     <i class="mdi mdi-folder-plus" style="font-size:1rem;color:white;vertical-align: middle;"></i>
                    {{ $t("createNew") }}
                  </button>
                  <button
                    class="btn btn-success float-end btn-xs"
                    style="margin-right: 5px"
                    @click.prevent="downloadData()"
                  >
                     <i class="mdi mdi-download" style="font-size:1rem;color:white;vertical-align: middle;"></i>
                    {{ $t("downloadData") }} .xlsx
                  </button>
                </div>

                <div class="card-body">
                  <vue-good-table
                    title="list-division"
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
                   
                  >
                    <template slot="table-row" slot-scope="props">
                      <span v-if="props.column.field == 'actions'">
                          
                        <a href="#" title="Detail" @click.prevent="detailData(props.index, props.row)" >
                            <i class="mdi mdi-eye" style="font-size:16px;color:blue;"></i>
                          </a>
                   
                          
                          <a href="#" title="Edit" @click.prevent="editData(props.index, props.row)" >
                             &nbsp; &nbsp;
                            <i class="mdi mdi-square-edit-outline" style="font-size:16px"></i>
                          </a>
                           
                        
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



<!-- @view --->
    <modal name="detail-data" height="auto" :draggable="true">
        

        <div class="modal-header">
            <h5 class="modal-title">Detail Data</h5>
            <button @click="$modal.hide('detail-data')" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

      <div class="modal-body">
        
        
                     <div class="row mb-3">
                      <div class="col-lg-3">
                        <label for="division_id_txt" class="col-form-label">{{
                          $t("division_id_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="division_id"
                          :placeholder="$t('division_id_txt')"
                          v-model="forms.division_id"
                          @keyup="uppercase"
                          disabled
                        />
                        <div v-if="errors.division_id">
                          <div
                            v-for="error in errors.division_id"
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
                        <label for="division_name_txt" class="col-form-label">{{
                          $t("division_name_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="name"
                          :placeholder="$t('division_name_txt')"
                          v-model="forms.name"
                          disabled
                        />
                        <div v-if="errors.name">
                          <div
                            v-for="error in errors.name"
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
        <button type="button" class="btn btn-secondary" @click="$modal.hide('detail-data')"><i class="mdi mdi-window-close" style="font-size:1rem;color:white;vertical-align: middle;"></i> {{ $t("close_txt") }}</button>
      </div>
 
    </modal>



<!-- @add --->
    <modal name="add-data" height="auto" :draggable="true">
        

<form class="forms-sample" @submit.prevent="submitData" method="POST" >
        <div class="modal-header">
            <h5 class="modal-title">{{ $t("createNew") }}</h5>
            <button type="button" @click="$modal.hide('add-data')" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

      <div class="modal-body">
        
        
                     <div class="row mb-3">
                      <div class="col-lg-3">
                        <label for="division_id_txt" class="col-form-label">{{
                          $t("division_id_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="division_id"
                          :placeholder="$t('division_id_txt')"
                          v-model="forms.division_id"
                          @keyup="uppercase"
                          required
                        />
                        <div v-if="errors.division_id">
                          <div
                            v-for="error in errors.division_id"
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
                        <label for="division_name_txt" class="col-form-label">{{
                          $t("division_name_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="name"
                          :placeholder="$t('division_name_txt')"
                          v-model="forms.name"
                          required
                        />
                        <div v-if="errors.name">
                          <div
                            v-for="error in errors.name"
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
        <button type="submit" class="btn btn-primary"><i class="mdi mdi-content-save" style="font-size:1rem;color:white;vertical-align: middle;"></i> {{ $t("submitFormTxt") }}</button>
        <button type="button" class="btn btn-secondary" @click="$modal.hide('add-data')"><i class="mdi mdi-window-close" style="font-size:1rem;color:white;vertical-align: middle;"></i> {{ $t("close_txt") }}</button>
      </div>
</form>
 
    </modal>



<!-- @edit --->
    <modal name="edit-data" height="auto" :draggable="true">
        

<form class="forms-sample" @submit.prevent="submitEditData()" method="POST" >
        <div class="modal-header">
            <h5 class="modal-title">{{ $t("editData_txt") }}</h5>
            <button type="button" @click="$modal.hide('edit-data')" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

      <div class="modal-body">
        
        
                     <div class="row mb-3">
                      <div class="col-lg-3">
                        <label for="division_id_txt" class="col-form-label">{{
                          $t("division_id_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="division_id"
                          :placeholder="$t('division_id_txt')"
                          v-model="forms.division_id"
                          @keyup="uppercase"
                          required
                        />
                        <div v-if="errors.division_id">
                          <div
                            v-for="error in errors.division_id"
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
                        <label for="division_name_txt" class="col-form-label">{{
                          $t("division_name_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="name"
                          :placeholder="$t('division_name_txt')"
                          v-model="forms.name"
                          required
                        />
                        <div v-if="errors.name">
                          <div
                            v-for="error in errors.name"
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
        <button type="submit" class="btn btn-primary"><i class="mdi mdi-content-save" style="font-size:1rem;color:white;vertical-align: middle;"></i> {{ $t("submitFormTxt") }}</button>
        <button type="button" class="btn btn-secondary" @click="$modal.hide('edit-data')"><i class="mdi mdi-window-close" style="font-size:1rem;color:white;vertical-align: middle;"></i> {{ $t("close_txt") }}</button>
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

export default {
  name: "DivisionIndex",
  components: {
    "sidebar-component": sidebarComponent,
    "navbar-component": navbarComponent,
    "footer-component": footerComponent,
  },
  data() {
    return {
        primaryKey:"",
      maxToasts: 100,
      position: "up right",
      closeBtn: true,
      isLoading: false,
      errors: [],
      langs: ["id", "en"],
      forms: { name: "", division_id: "", created_at:"",updated_at:"" },
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
          label: "Division ID",
          field: "division_id",
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "Filter By Division ID", // placeholder for filter input
            filterValue: "", // initial populated value for this filter
            filterDropdownItems: [], // dropdown (with selected values) instead of text input
            trigger: "enter", //only trigger on enter not on keyup
          },
        }, 
        {
          label: "Name",
          field: "name",
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "Filter By Name", // placeholder for filter input
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
            
            let formData = {
                "name"          : this.forms.name,
                "division_id"   : this.forms.division_id
            };
            const baseURI  =  this.$settings.endPoint+"division/update/"+this.primaryKey;
            this.$http.put(baseURI,formData).then((response) => {
              this.loading();
              if(response.data.status === 200) {
                    this.resetForm();
                    this.$modal.hide('edit-data');
                    this.errors = [];
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
            
            let formData = {
                "name"          : this.forms.name,
                "division_id"   : this.forms.division_id
            };
            const baseURI  =  this.$settings.endPoint+"division/create";
            this.$http.post(baseURI,formData).then((response) => {
              this.loading();
              if(response.data.status === 200) {
                    this.resetForm();
                    this.$modal.hide('add-data');
                    this.errors = [];
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
    resetForm() {
        this.primaryKey         = ""
        this.forms.division_id  = ""
        this.forms.name         = ""
        this.errors = [];
    },
    uppercase() { 
        this.forms.division_id = this.forms.division_id.toUpperCase();
        this.forms.division_id = this.forms.division_id.trim();
    },
    downloadData() {
      const baseURI = this.$settings.endPoint + "division/index";
      var CurrentDate = this.$moment().format("DD_MM_YYYY_HH_mm_ss");
      var file_name = "download_" + CurrentDate + ".xlsx";
 
      return this.$http
        .get(
          baseURI +
            `?per_page=${this.serverParams.per_page}&page=${this.serverParams.page}&sort_field=${this.serverParams.sort.field}&sort_type=${this.serverParams.sort.type}&name=${this.serverParams.columnFilters.name}&company_id=${this.serverParams.columnFilters.company_id}&download=download`,
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

    editData(index, row) {
        this.errors             = [];
        this.primaryKey         = row.division_id
        this.forms.division_id  = row.division_id
        this.forms.name         = row.name
        this.forms.created_at   = row.created_at
        this.forms.updated_at   = row.updated_at
        this.$modal.show('edit-data');
    },

    detailData(index, row) {
        this.errors             = [];
        this.forms.division_id  = row.division_id
        this.forms.name         = row.name
        this.forms.created_at   = row.created_at
        this.forms.updated_at   = row.updated_at
        this.$modal.show('detail-data');
    },

    // load items is what brings back the rows from server
    loadItems() {
      const baseURI = this.$settings.endPoint + "division/index";
 
 

      return this.$http
        .get(
          baseURI +
            `?per_page=${this.serverParams.per_page}&page=${this.serverParams.page}&sort_field=${this.serverParams.sort.field}&sort_type=${this.serverParams.sort.type}&division_id=${this.serverParams.columnFilters.division_id}&name=${this.serverParams.columnFilters.name}`
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
      const userDatas     = this.$getUserInfo();
      this.detailUser     = userDatas.sub;
      

      if(this.detailUser.level != "ROOT"){
        this.$router.push("/authorized-error");
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
    this.fetchIt();
    this.loading();
  },
};
</script>
<style scoped>

</style>