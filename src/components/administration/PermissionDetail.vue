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
            <div class="col-lg-12 col-xl-12 col-sm-12 col-xs-12 col-md-12">
              <div class="card">
                <div class="card-header">
                  <!-- <i class="link-icon float-start" data-feather="arrow-left"></i> -->
                  &nbsp;&nbsp;&nbsp;
                  <h6 class="card-title mb-0 float-start">
                    Detail
                  </h6>
                  <!-- <button
                    class="btn btn-default float-end"
                    @click="resetForm"
                    type="button"
                  >
                    <i class="link-icon" data-feather="repeat"></i>
                    {{ $t("resetFormTxt") }}
                  </button> -->
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
                          $t('permissionNameTxt')
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="name"
                          :placeholder="$t('permissionNameTxt')"
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
                      <div class="col-lg-3">
                        <label for="defaultconfig" class="col-form-label">Conttroller</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="controller"
                          readonly
                          v-model="forms.controller"
                        />
                        <div v-if="errors.controller">
                          <div
                            v-for="error in errors.controller"
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
  name: "RoleDetail",
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
      forms: [],
    };
  },
  watch: {},
  methods: {
    resetForm() {

    },

    backForm() {
      window.location.href = "/permission";
    },

    loadData(id) {
      const baseURI = this.$settings.endPoint + "permission/detail/" + id;
      return this.$http.get(baseURI).then((response) => {
        
        this.forms = response.data.datas;

        // this.form={ name: 'asep', usernmae:res.username };
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
  },
  events: {},
  created: function () {},
  mounted() {
    var params = this.$onBehind(this.$route.params.id);
    this.loadData(params[0]);
  },
};
</script>
<style scoped>
</style>