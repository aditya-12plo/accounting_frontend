<template>
  <div>
    <div class="main-wrapper">
      <!--begin::sidebar-->
      <sidebar-component classMenu="Users"></sidebar-component>
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
                      <h6 class="card-title mb-0 float-start">Detail</h6>
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
                        <label for="defaultconfig" class="col-form-label">{{
                          $t("nameTxt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="nameTxt"
                          :placeholder="$t('nameTxt')"
                          v-model="forms.name"
                          
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
                        <label for="defaultconfig" class="col-form-label">{{
                          $t("emailAddress")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="email"
                          class="form-control"
                          id="emailAddress"
                          :placeholder="$t('emailAddress')"
                          v-model="forms.email"
                          
                        />
                        <div v-if="errors.email">
                          <div
                            v-for="error in errors.email"
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
                        <label for="defaultconfig" class="col-form-label">{{
                          $t("password")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="password"
                          class="form-control"
                          id="password"
                          :placeholder="$t('password')"
                          v-model="forms.password"
                        />
                        <div v-if="errors.password">
                          <div
                            v-for="error in errors.password "
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
                        <label for="defaultconfig" class="col-form-label">{{
                          $t("DivisionTxt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                         <v-select v-model="forms.division_id" :options="this.fetchDivision" label="division_id" :placeholder="$t('DivisionTxt')" />
 

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
                        <label for="defaultconfig" class="col-form-label">{{
                          $t("companyCode")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                         <v-select multiple v-model="forms.companys" :options="this.fetchCompany" label="company_id" :placeholder="$t('companyCode')" />
                       
                        <div v-if="errors.company_ids">
                          <div
                            v-for="error in errors.company_ids"
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
                        <label for="defaultconfig" class="col-form-label">{{
                          $t("levelTxt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                         <v-select v-model="forms.level" :options="this.levels" :placeholder="$t('levelTxt')" />
 

                        <div v-if="errors.level">
                          <div
                            v-for="error in errors.level"
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
                        <label for="defaultconfig" class="col-form-label">
                          Status
                        </label>
                      </div>
                      <div class="col-lg-8">
                         <v-select v-model="forms.status" :options="this.statuses" placeholder="Status" />
 

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
import vSelect from 'vue-select'

export default {
  name: "UsersEdit",
  props: {},
  components: {
    "sidebar-component": sidebarComponent,
    "navbar-component": navbarComponent,
    "footer-component": footerComponent,
    "v-select": vSelect,
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
      fetchCompany:[],
      permision_role:[],
      forms: { name: "", email: "", division_id:"",companys:"",password:"",level:"",status:"" },
    };
  },
  watch: {},
  methods: {
    resetForm() {
      this.forms.level = "";
      this.forms.name = "";
      this.forms.password = "";
      this.forms.email = "";
      this.forms.companys = "";
      this.forms.status = "";
      this.forms.division_id = "";
    },


    backForm() {
       window.location.href = "/users";
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


    loadCompany() {
      const baseURI = this.$settings.endPoint + "company/all";
     
      return this.$http
        .get(
          baseURI
        )
        .then((response) => {
            this.fetchCompany=response.data.datas.data;
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

            let company_ids = [];
            this.forms.companys.forEach((value ) => {
                    company_ids.push(value.company_id);
                });

            let division_id = this.forms.division_id.division_id
            if(!division_id){
              division_id = this.forms.division_id
            }
            let formData = {
                "name"          : this.forms.name,
                "division_id"   : division_id,
                "password"      : this.forms.password,
                "email"         : this.forms.email.trim(),
                "company_ids"   : company_ids,
                "level"         : this.forms.level,
                "status"        : this.forms.status,
            };
 

            var id = this.$onBehind(this.$route.params.id);
            const baseURI  =  this.$settings.endPoint+"user/update/"+id;
          this.$http.put(baseURI,formData).then((response) => {
                this.loading();
                this.loadData();
              if(response.data.status === 200) {
                    this.errors = [];
                    this.forms.password = "";
                    this.success(response.data.datas.messages);
              }else{
                  this.errors = response.data.errors;
                  this.resultError(response.data.errors);
              }
          }).catch(error => {
              this.loading();
              if (error.response) {
              if(error.response.status === 422) {
                    this.loadData();
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
      var id = this.$onBehind(this.$route.params.id);
      const baseURI = this.$settings.endPoint + "user/detail/"+id;
      return this.$http
        .get(
          baseURI
        )
        .then((response) => {
            if(response.data.datas.credentials){
                setAuthToken(response.data.datas.credentials.access_token);
            }
            this.forms.name         = response.data.datas.data.name;
            this.forms.email        = response.data.datas.data.email;
            this.forms.companys     = response.data.datas.data.user_company;
            this.forms.status       = response.data.datas.data.status;
            this.forms.division_id  = response.data.datas.data.division_id;
            this.forms.level        = response.data.datas.data.level;
        });
    },
  },
  events: {},
  created: function () {},
  mounted() {
    this.fetchIt();
    this.loadData();
    this.loadDivision();
    this.loadCompany();
  },
};
</script>
<style scoped>
</style>