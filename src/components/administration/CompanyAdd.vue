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
                      <h6 class="card-title mb-0 float-start">{{ $t("companyAccessAdd") }}</h6>
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
                          $t('companyCode')
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="code"
                          :placeholder="$t('companyCode')"
                          v-model="forms.code"
                          required
                        />
                        <div v-if="errors.code">
                          <div
                            v-for="error in errors.code"
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
                          $t('companyName')
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="name"
                          :placeholder="$t('companyName')"
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
                        <label for="defaultconfig" class="col-form-label">{{
                          $t('companyCountry')
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="country"
                          :placeholder="$t('companyCountry')"
                          v-model="forms.country"
                          
                        />
                        <div v-if="errors.country">
                          <div
                            v-for="error in errors.country"
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
                          $t('companyProvince')
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="province"
                          :placeholder="$t('companyProvince')"
                          v-model="forms.province"
                         
                        />
                        <div v-if="errors.province">
                          <div
                            v-for="error in errors.province"
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
                          $t('companyCity')
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="city"
                          :placeholder="$t('companyCity')"
                          v-model="forms.city"
                        
                        />
                        <div v-if="errors.city">
                          <div
                            v-for="error in errors.city"
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
                          $t('companyArea')
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="area"
                          :placeholder="$t('companyArea')"
                          v-model="forms.area"
                         
                        />
                        <div v-if="errors.area">
                          <div
                            v-for="error in errors.area"
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
                          $t('companySubArea')
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="sub_area"
                          :placeholder="$t('companySubArea')"
                          v-model="forms.sub_area"
                          
                        />
                        <div v-if="errors.subarea">
                          <div
                            v-for="error in errors.sub_area"
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
                          $t('companyVillage')
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="village"
                          :placeholder="$t('companyVillage')"
                          v-model="forms.village"
                       
                        />
                        <div v-if="errors.village">
                          <div
                            v-for="error in errors.village"
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
                          $t('companyAddress')
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="address"
                          :placeholder="$t('companyAddress')"
                          v-model="forms.address"
                         
                        />
                        <div v-if="errors.address">
                          <div
                            v-for="error in errors.address"
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
                          $t('companyPostalCode')
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="postal_code"
                          :placeholder="$t('companyPostalCode')"
                          v-model="forms.postal_code"
                          
                        />
                        <div v-if="errors.postal_code">
                          <div
                            v-for="error in errors.postal_code"
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
                        <label for="defaultconfig" class="col-form-label">PIC
                        </label>
                      </div>
                      <div class="col-lg-3">
                        <input
                          type="text"
                          class="form-control"
                          id="pic_name"
                          placeholder="Name"
                          v-model="forms.pic_name"
                          
                        />
                        <div v-if="errors.pic_name">
                          <div
                            v-for="error in errors.pic_name"
                            :key="error"
                            class="alert alert-primary"
                            role="alert"
                          >
                            <i data-feather="alert-circle"></i>
                            {{ error }}
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <input
                          type="text"
                          class="form-control"
                          id="pic_email"
                          placeholder="Email"
                          v-model="forms.pic_email"
                          
                        />
                        <div v-if="errors.pic_email">
                          <div
                            v-for="error in errors.pic_email"
                            :key="error"
                            class="alert alert-primary"
                            role="alert"
                          >
                            <i data-feather="alert-circle"></i>
                            {{ error }}
                          </div>
                        </div>
                      </div>


                       <div class="col-lg-2">
                        <input
                          type="text"
                          class="form-control"
                          id="pic_phone"
                          placeholder="Phone"
                          v-model="forms.pic_phone"
                          
                        />
                        <div v-if="errors.pic_phone">
                          <div
                            v-for="error in errors.pic_phone"
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
import sidebarComponent from "@/components/_partials/_sidebar";
import navbarComponent from "@/components/_partials/_navbar";
import footerComponent from "@/components/_partials/_footer";

export default {
  name: "CompanyAdd",
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
      forms: { name: "", usernmae: "" },
    };
  },
  watch: {},
  methods: {
    resetForm() {
      this.forms.code = "";
      this.forms.name = "";
      this.forms.country = "";
      this.forms.province = "";
      this.forms.city = "";
      this.forms.area = "";
      this.forms.sub_area = "";
      this.forms.village = "";
      this.forms.address = "";
      this.forms.postal_code = "";
      this.forms.pic_name = "";
      this.forms.pic_email = "";
      this.forms.pic_phone = "";

    },


    backForm() {
       window.location.href = "/company";
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

          let formData = new FormData();

          formData.append("code", this.forms.code);
          formData.append("name", this.forms.name);
          formData.append("country", this.forms.country);
          formData.append("province", this.forms.province);
          formData.append("city", this.forms.city);
          formData.append("area", this.forms.area);
          formData.append("sub_area", this.forms.sub_area);
          formData.append("village", this.forms.village);
          formData.append("address", this.forms.address);
          formData.append("postal_code", this.forms.postal_code);
          formData.append("status", 'active');
          formData.append("pic_name", this.forms.pic_name);
          formData.append("pic_email", this.forms.pic_email);
          formData.append("pic_phone", this.forms.pic_phone);
          
          const baseURI  =  this.$settings.endPoint+"company/create";
          this.$http.post(baseURI,formData).then((response) => {
              this.loading();
              if(response.data.status === 200) {
              this.resetForm();
                  this.errors = [];
                  //console.log(response.data.datas.user_id);
                  var params = this.$onRandom(response.data.datas.company_id);
                  window.location.href = "/company/detail/" + params;
                  // this.success('Berhasil');
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

  },
};
</script>
<style scoped>
</style>