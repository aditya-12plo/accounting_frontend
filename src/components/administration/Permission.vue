<template>
  <div>
    <div class="main-wrapper">
      <!--begin::sidebar-->
      <sidebar-component classMenu="Permission"></sidebar-component>
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
                  <h4 style="margin-right: 5px" class="float-start">{{ $t("PermissionTxt") }}</h4>
                  <button
                    class="btn btn-primary float-end btn-xs"
                    style="margin-right: 5px"
                    @click.prevent="createData()"
                  >
                    <i class="link-icon" data-feather="plus"></i>
                    {{ $t("createNew") }}
                  </button>
                  <!-- <button
                    class="btn btn-warning float-end btn-xs"
                    style="margin-right: 5px"
                    @click.prevent="uploadData()"
                  >
                     <i class="link-icon" data-feather="upload"></i>
                    {{ $t("uploadData") }} .xlsx
                  </button> -->
                  <button
                    class="btn btn-success float-end btn-xs"
                    style="margin-right: 5px"
                    @click.prevent="downloadData()"
                  >
                     <i class="link-icon" data-feather="download"></i>
                    {{ $t("downloadData") }} .xlsx
                  </button>
                </div>

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
                    :columns="columns"
                   
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
                          class="btn btn-warning btn-xs"
                         style="margin-right: 5px ; margin-bottom: 5px"
                          @click.prevent="editData(props.index, props.row)"
                        >
                          
                          Edit
                        </button>
                        <!-- <button
                          v-if="props.row.status === 'deactived'"
                          class="btn btn-success"
                          @click.prevent="
                            updateStatus(props.index, props.row, 'active')
                          "
                        >
                          Activate
                        </button>
                        <button
                          v-if="props.row.status === 'active'"
                          class="btn btn-danger"
                          @click.prevent="
                            updateStatus(props.index, props.row, 'deactived')
                          "
                        >
                          Deactivated
                        </button> -->

                        <button
                          class="btn btn-danger btn-xs"
                          style="margin-right: 5px ; margin-bottom: 5px"
                          @click.prevent="deleteData(props.index, props.row)"
                        >
                         
                          Delete
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
  </div>
</template>

<script>
import sidebarComponent from "../_partials/_sidebar";
import navbarComponent from "../_partials/_navbar";
import footerComponent from "../_partials/_footer";

export default {
  name: "PermissionIndex",
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
          label: "Controller",
          field: "controller",
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "Filter By Controller", // placeholder for filter input
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
      const baseURI = this.$settings.endPoint + "/permission";
      var CurrentDate = this.$moment().format("DD_MM_YYYY_HH_mm_ss");
      var file_name = "download_" + CurrentDate + ".xlsx";

      //var columnFilters = this.serverParams.columnFilters;


      return this.$http
        .get(
          baseURI +
            `?per_page=${this.serverParams.per_page}&page=${this.serverParams.page}&sort_field=${this.serverParams.sort.field}&sort_type=${this.serverParams.sort.type}&code=${this.serverParams.columnFilters.code}&name=${this.serverParams.columnFilters.name}&controller=${this.serverParams.columnFilters.controller}&download=download`,
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

    // downloadData() {
    //   this.fade(true);
    //   var baseURI = this.$settings.endPoint + "/user/download";
    //   var CurrentDate = this.$moment().format("DD_MM_YYYY_HH_mm_ss");
    //   var columnFilters = this.serverParams.columnFilters;
    //   var role = columnFilters["role.name"];
    //   var company_code = columnFilters["company_detail.code"];

    //   var sendData = {
    //     username: this.serverParams.columnFilters.username,
    //     name: this.serverParams.columnFilters.name,
    //     email: this.serverParams.columnFilters.email,
    //     level: this.serverParams.columnFilters.level,
    //     status: this.serverParams.columnFilters.status,
    //     role:role,
    //     company_code: company_code,
    //     file_name: "download_" + CurrentDate + ".xlsx",
    //   };
    //   this.$http({
    //     url: baseURI,
    //     method: "GET",
    //     data: sendData,
    //     responseType: "blob",
    //   })
    //     .then((response) => {
    //       this.errors = [];
    //       var filename = sendData.file_name;

    //       var fileURL = window.URL.createObjectURL(new Blob([response.data]));
    //       var fileLink = document.createElement("a");

    //       fileLink.href = fileURL;
    //       fileLink.setAttribute("download", filename);
    //       document.body.appendChild(fileLink);
    //       fileLink.click();
    //       this.fade(false);
    //     })
    //     .catch((error) => {
    //       if (error.response) {
    //         if (error.response.status === 422) {
    //           this.errors = { message: ["File Not Found"] };
    //           this.error("File Not Found");
    //         } else if (error.response.status === 500) {
    //           this.$router.push("/server-error");
    //         } else {
    //           this.$router.push("/page-not-found");
    //         }
    //       }
    //     });
    // },
    createData() {
      window.location.href = "/permission/add";
    },

    uploadData(){
      window.location.href = "/permission/upload";
    },

    editData(index, row) {
      var params = this.$onRandom(row.permission_id);
      window.location.href = "/permission/edit/" + params;
    },

    detailData(index, row) {
      var params = this.$onRandom(row.permission_id);
      window.location.href = "/permission/detail/" + params;
    },

    deleteData(index, row, status) {
      this.$swal({
        title: this.$t("areYouSure"),
        text: this.$t("yourData"),
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then((result) => {
        if (result.value) {
          var formData = {
            status: status,
          };
          const baseURI =
            this.$settings.endPoint + "permission/delete/" + row.permission_id;
          this.$http
            .delete(baseURI, formData)
            .then((response) => {
              this.loading();
              if (response.data.status === 200) {
                this.success(response.data.datas.messages);
                this.loadItems();
              } else {
                this.errors = response.data.errors;
                this.resultError(response.data.errors);
              }
            })
            .catch((error) => {
              this.loading();
              if (error.response) {
                if (error.response.status === 422) {
                  this.errors = error.response.data.errors;
                  this.resultError(error.response.data.errors);
                } else if (error.response.status === 500) {
                  this.$router.push("/server-error");
                } else {
                  this.$router.push("/page-not-found");
                }
              }
            });
        }
      });
    },

    // load items is what brings back the rows from server
    loadItems() {
      const baseURI = this.$settings.endPoint + "permission";

      //var columnFilters = this.serverParams.columnFilters;


      return this.$http
        .get(
           baseURI +
            `?per_page=${this.serverParams.per_page}&page=${this.serverParams.page}&sort_field=${this.serverParams.sort.field}&sort_type=${this.serverParams.sort.type}&code=${this.serverParams.columnFilters.code}&name=${this.serverParams.columnFilters.name}&controller=${this.serverParams.columnFilters.controller}`,
        )
        .then((response) => {
          console.log(response);
          this.rows = response.data.datas.data;
          this.totalRecords = response.data.datas.total;
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
      const userDatas = this.$getUserInfo();
      this.detailUser = userDatas.sub;
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