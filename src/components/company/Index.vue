<template>
  <div>
    <div class="main-wrapper">
      <!--begin::sidebar-->
      <sidebar-component classMenu="Company"></sidebar-component>
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
                  <h4 style="margin-right: 5px" class="float-start">{{ $t("txtCompanySetting") }}</h4>
                 
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
                    title="list-company"
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
  </div>
</template>

<script>
import { setAuthToken } from "@/middleware/auth";
import sidebarComponent from "../_partials/_sidebar";
import navbarComponent from "../_partials/_navbar";
import footerComponent from "../_partials/_footer";

export default {
  name: "CompanyIndex",
  components: {
    "sidebar-component": sidebarComponent,
    "navbar-component": navbarComponent,
    "footer-component": footerComponent,
  },
  data() {
    return {
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
          label: "Company ID",
          field: "company_id",
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "Filter By Company ID", // placeholder for filter input
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

    downloadData() {
      const baseURI = this.$settings.endPoint + "company/index";
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
      window.location.href = "/company/add";
    },

    editData(index, row) {
      var params = row.company_id;
      window.location.href = "/company/edit/" + params;
    },

    detailData(index, row) {
      var params = row.company_id;
      window.location.href = "/company/detail/" + params;
    },
 

    // load items is what brings back the rows from server
    loadItems() {
      const baseURI = this.$settings.endPoint + "company/index";
 
 

      return this.$http
        .get(
          baseURI +
            `?per_page=${this.serverParams.per_page}&page=${this.serverParams.page}&sort_field=${this.serverParams.sort.field}&sort_type=${this.serverParams.sort.type}&division_id=${this.serverParams.columnFilters.division_id}&name=${this.serverParams.columnFilters.name}&company_id=${this.serverParams.columnFilters.company_id}`
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