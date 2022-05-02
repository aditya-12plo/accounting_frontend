<template>
  <div>
    <div class="main-wrapper">
      <!--begin::sidebar-->
      <sidebar-component classMenu="UserProfile"></sidebar-component>
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
            <div class="col-lg-12 col-xl-12 stretch-card">
              <div class="card">
                <div class="card-body">
                  <div
                    class="
                      d-flex
                      justify-content-between
                      align-items-baseline
                      mb-2
                    "
                  >
                    <h6 class="card-title mb-0">{{ $t("profileTxt") }}</h6>
                  </div>

                  <div class="row mb-3">
                    <div class="col-lg-3">
                      <label for="defaultconfig" class="col-form-label">{{
                        $t("name")
                      }}</label>
                    </div>
                    <div class="col-lg-8">
                      {{ this.userData.name }}
                    </div>
                  </div>

                  <div class="row mb-3">
                    <div class="col-lg-3">
                      <label for="defaultconfig" class="col-form-label">{{
                        $t("emailAddress")
                      }}</label>
                    </div>
                    <div class="col-lg-8">
                      {{ this.userData.email }}
                    </div>
                  </div>

                  <div class="row mb-3">
                    <div class="col-lg-3">
                      <label for="txtDivision" class="col-form-label">{{
                        $t("txtDivision")
                      }}</label>
                    </div>
                    <div class="col-lg-8">
                      {{ this.userDivision.division_id }} ({{ this.userDivision.name }})
                    </div>
                  </div>
 
                    <h6 class="card-title mb-0">{{ $t("companyAccessTxt") }}</h6>
                  <div v-for="cmpy in companyData" :key="cmpy.user_company_id">
                  <div class="row mb-3">
                    <div class="col-lg-3">
                      <label for="defaultconfig" class="col-form-label">{{
                        $t("companyCodeTxt")
                      }}</label>
                    </div>
                    <div class="col-lg-8">
                      {{ cmpy.company.company_id }}
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-lg-3">
                      <label for="defaultconfig" class="col-form-label">{{
                        $t("companyNameTxt")
                      }}</label>
                    </div>
                    <div class="col-lg-8">
                      {{ cmpy.company.name }}
                    </div>
                  </div>
                  </div>


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
  name: "UserProfile",
  props: {},
  components: {
    "sidebar-component": sidebarComponent,
    "navbar-component": navbarComponent,
    "footer-component": footerComponent,
  },
  data() {
    return {
      errors: [],
      userData: "",
      userDivision: "",
      companyData: [],
    };
  },
  watch: {},
  methods: {
    fetchIt() {
      const userDatas = this.$getUserInfo();
      this.userData = userDatas.sub;
      this.userDivision = userDatas.sub.division;
      this.companyData = userDatas.sub.user_company;
      console.log(this.companyData)
    },
  },
  events: {},
  created: function () {},
  mounted() {
    this.fetchIt();
  },
};
</script>
<style scoped>
</style>