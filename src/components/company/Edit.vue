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
            <div class="col-lg-12 col-xl-12 col-sm-12 col-xs-12 col-md-12">
              <div class="card">
                <div class="card-header">
                      <!-- <i class="link-icon float-start" data-feather="arrow-left"></i> -->
                       &nbsp;&nbsp;&nbsp;
                      <h6 class="card-title mb-0 float-start">{{ $t("companyDetail") }}</h6>
                      <button
                        class="btn btn-default btn-sm float-end"
                        @click="resetForm"
                        type="button"
                      >
                      <i class="link-icon" data-feather="repeat"></i>
                        {{ $t("resetFormTxt") }}
                      </button>
                </div>
                <div class="card-body">
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

                  <form
                    class="forms-sample"
                    @submit.prevent="submitData"
                    method="POST"
                  >
                    <div
                      class="
                        d-flex
                        justify-content-between
                        align-items-baseline
                        mb-2
                      "
                    >
                    
                    </div>
                    
 


                     <div class="row mb-3">
                      <div class="col-lg-3">
                        <label for="company_id_txt" class="col-form-label">{{
                          $t("company_id_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="company_id"
                          :placeholder="$t('company_id_txt')"
                          v-model="forms.company_id"
                          @keyup="uppercase"
                          required
                        />
                        <div v-if="errors.company_id">
                          <div
                            v-for="error in errors.company_id"
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
                        <label for="company_name_txt" class="col-form-label">{{
                          $t("company_name_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="company_name_txt"
                          :placeholder="$t('company_name_txt')"
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


                    <div class="row mb-3">
                      <div class="col-lg-3">
                        <label for="DivisionTxt" class="col-form-label">{{
                          $t("DivisionTxt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">

                        <div class="form-check form-check-inline" v-for="(data,index) in fetchDivision" :key="data.division_id">
                        <input type="checkbox" v-model="forms.divisions" :value="data.division_id" :id="data.division_id" class="form-check-input">
                        <label class="form-check-label" :for="index">
                          {{data.division_id}}
                        </label>
                      </div>
 

                        <div v-if="errors.divisions">
                          <div
                            v-for="error in errors.divisions"
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


                      



                   
                    <div class="card-footer">
                      <button
                        class="btn btn-warning float-start btn-sm"
                        @click="backForm"
                        type="button"
                      >
                      <i class="link-icon float-start" data-feather="arrow-left"></i>
                        {{ $t("backMess") }}
                      </button>
                      &nbsp;&nbsp;&nbsp;
                      <button class="btn btn-primary float-end btn-sm" type="submit">
                           <i class="link-icon" data-feather="save"></i>
                        {{ $t("submitFormTxt") }}
                      </button>
                    </div>
                  </form>
                </div>
              </div> <!--end::card-->
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
import sidebarComponent from "@/components/_partials/_sidebar";
import navbarComponent from "@/components/_partials/_navbar";
import footerComponent from "@/components/_partials/_footer";


export default {
  name: "CompanyEdit",
  props: {},
  components: {
    "sidebar-component": sidebarComponent,
    "navbar-component": navbarComponent,
    "footer-component": footerComponent,
  },
  data() {
    return {
      isLoading: false,
      maxToasts: 100,
      position: "up right",
      closeBtn: true,
      errors: [],
      userData: "",
      companyCode: "",
      levels:["ROOT","STAFF"],
      statuses:["active","deactived"],
      fetchDivision:[],
      permision_role:[],
      forms: { name: "", company_id: "", divisions:[] },
    };
  },
  watch: {},
  methods: {
    uppercase() { 
        this.forms.company_id = this.forms.company_id.toUpperCase();
        this.forms.company_id = this.forms.company_id.trim();
    },

    resetForm() {
      this.forms.company_id = "";
      this.forms.name = "";
      this.forms.divisions = [];
    },


    backForm() {
       window.location.href = "/company";
    },

    loadDivision() {
      const baseURI = this.$settings.endPoint + "division/all";
     
      return this.$http
        .get(
          baseURI
        )
        .then((response) => {
            this.fetchDivision=response.data.datas.data;
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
                "company_id"    : this.forms.company_id,
                "divisions"     : this.forms.divisions
            };

 

            var id = this.$route.params.id;
            const baseURI  =  this.$settings.endPoint+"company/update/"+id;
          this.$http.put(baseURI,formData).then((response) => {
                this.loading();
                this.loadData();
              if(response.data.status === 200) {
                    this.errors = [];
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

    fade(sType) {
      this.isLoading = sType;
    },

    loading() {
      this.fade(true);
      setTimeout(() => {
        this.fade(false);
      }, 1000); // hide the message after 3 seconds
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
    fetchIt() {
      const userDatas     = this.$getUserInfo();
      this.detailUser     = userDatas.sub;
      

      if(this.detailUser.level != "ROOT"){
        this.$router.push("/authorized-error");
      }

    },

    loadData() {
      var id = this.$route.params.id;
      const baseURI = this.$settings.endPoint + "company/detail/"+id;
      return this.$http
        .get(
          baseURI
        )
        .then((response) => {
            if(response.data.datas.credentials){
                setAuthToken(response.data.datas.credentials.access_token);
            }

            let divisions = [];
            response.data.datas.data.division_company.forEach((value ) => {
                    divisions.push(value.division_id);
                });

            this.forms.name         = response.data.datas.data.name;
            this.forms.company_id   = response.data.datas.data.company_id;
            this.forms.divisions    = divisions;
        });
    },
  },
  events: {},
  created: function () {},
  mounted() {
    this.fetchIt();
    this.loadData();
    this.loadDivision();
  },
};
</script>
<style scoped>
</style>