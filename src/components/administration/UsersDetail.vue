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
                      <div class="col-lg-2">
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
                          readonly
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
                      <div class="col-lg-2">
                        <label for="defaultconfig" class="col-form-label">{{
                          $t("usernameTxt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="usernameTxt"
                          :placeholder="$t('usernameTxt')"
                          v-model="forms.username"
                          readonly
                        />
                        <div v-if="errors.username">
                          <div
                            v-for="error in errors.username"
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
                      <div class="col-lg-2">
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
                          readonly
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
                      <div class="col-lg-2">
                        <label for="defaultconfig" class="col-form-label">{{
                          $t("companyCode")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        
                         <select class="form-control" name="company_id" id="company_id" v-model="forms.company_id" disabled>
                          <option  v-for="(a, index) of fetchCompany" :value="a.company_id" :key="index">{{a.code}} | {{a.name}}</option>
                        </select>
                       
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
                      <div class="col-lg-2">
                        <label for="defaultconfig" class="col-form-label">{{
                          $t("roleTxt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">

                        <select class="form-control" name="role_id" id="role_id" v-model="forms.role_id" disabled>
                            <option  v-for="(a, index) of fetchRole" :value="a.role_id" :key="index">{{a.name}}</option>
                        </select>

                        <div v-if="errors.roleId">
                          <div
                            v-for="error in errors.roleId"
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


                    







                   
                    <div class="buttons">
                      <button
                        class="btn btn-warning float-start btn-sm"
                        @click="backForm"
                        type="button"
                      >
                      <i class="link-icon float-start" data-feather="arrow-left"></i>
                        {{ $t("backMess") }}
                      </button>
                      &nbsp;&nbsp;&nbsp;
                      <!-- <button class="btn btn-primary float-end btn-sm" type="submit">
                           <i class="link-icon" data-feather="save"></i>
                        {{ $t("submitFormTxt") }}
                      </button> -->
                    </div>
                  </form>
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
import sidebarComponent from "@/components/_partials/_sidebar";
import navbarComponent from "@/components/_partials/_navbar";
import footerComponent from "@/components/_partials/_footer";

export default {
  name: "UsersDetail",
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
      fetchRole:[],
      fetchCompany:[],
      permision_role:[],
      forms: [],
    };
  },
  watch: {},
  methods: {
    resetForm() {
      this.forms.name = "";
      this.forms.username = "";
      this.forms.password = "";
      this.forms.email = "";
      this.forms.company_id = "";
      this.forms.role_id = "";

    },

    backForm() {
       window.location.href = "/users";
    },


    loadData(id) {
      const baseURI = this.$settings.endPoint + "user/detail/"+id;
      return this.$http
        .get(
          baseURI
        )
        .then((response) => {
            this.forms=response.data.datas;
            
            // this.form={ name: 'asep', usernmae:res.username };
        });
    },

    loadRole() {
      const baseURI = this.$settings.endPoint + "/role";
     
      return this.$http
        .get(
          baseURI
        )
        .then((response) => {
            this.fetchRole=response.data.datas.data;
        });
    },


    loadCompany() {
      const baseURI = this.$settings.endPoint + "/company";
     
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
          // let params = this.$onBehind(this.$route.params.id);
          // let formData = new FormData();
          // formData.append("name", this.forms.name);
          // formData.append("username", this.forms.username);
          // formData.append("password", this.forms.password);
          // formData.append("email", this.forms.email);
          // formData.append("company_id", this.forms.company_id);
          // formData.append("role_id", this.forms.role_id);
          // formData.append("status", 'active');

          const baseURI  =  this.$settings.endPoint+"user/update/"+this.forms.user_id;
          this.$http.patch(baseURI,this.forms).then((response) => {
              this.loading();
              if(response.data.status === 200) {
              this.resetForm();
                  this.errors = [];
                  this.success(response.data.datas.messages);

                  //window.history.back();
                  var params = this.$onRandom(this.forms.user_id);
                  window.location.href = "/users/detail/" + params;

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
              this.resetForm();
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
        // onShown: function() {
        //     console.log('asdasdasd');
        //     //window.location.href = '/';
        // }
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
      // this.permision_role = userDatas.sub.permision_role;
      let rolePermision = [];
      userDatas.sub.permision_role.forEach(function(permision){
        if(permision.permission.controller == 'UserController'){
          rolePermision = permision;
          // console.log(permision);
        }
      });

      if(!rolePermision.method_read){
        this.$router.push("/authorized-error");
      }
      this.permision_role = rolePermision;

    },
  },
  events: {},
  created: function () {},
  mounted() {

      var params = this.$onBehind(this.$route.params.id);
      this.fetchIt();
       this.loadData(params[0]);
       this.loadRole();
       this.loadCompany();
  },
};
</script>
<style scoped>
</style>