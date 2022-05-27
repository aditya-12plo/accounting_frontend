<template>
  <div>
    <div v-if="isLoading">
      <!--begin::Loading Content-->
      <div class="main-wrapper">
        <div class="page-wrapper full-page">
          <div class="container">
            <div class="row">
              <!--begin::Card-->
              <div
                class="text-center mb-3 mt-4 overlay overlay-block"
                style="background-color: none"
              >
                <div class="overlay-layer card-rounded bg-opacity-5">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
              <!--end::Card-->
            </div>
          </div>
        </div>
      </div>
      <!--end::Loading Content-->
    </div>
    <div v-else>
      <div class="main-wrapper">
        <div class="page-wrapper full-page">
          <div
            class="
              page-content
              d-flex
              align-items-center
              justify-content-center
            "
          >
            <div class="row w-100 mx-0 auth-page">
              <div class="col-md-4 col-xl-4 mx-auto">
                <div class="card">
                  <div class="row">
                    <div class="col-md-12 ps-md-0">
                      <div class="auth-form-wrapper px-6 py-5">
                        
                        <img
                          src="/assets/images/icon_icdx.png"
                          style="
                            display: block;
                            margin-left: auto;
                            margin-right: auto;
                          " width="40px" height="40px"
                        />

                        <a
                          href="#"
                          class="noble-ui-logo d-block mb-2"
                          style="text-align: center"
                          ><span> SYSTEM</span></a
                        >
                        <h5
                          class="text-muted fw-normal mb-4"
                          style="text-align: center"
                        >
                          {{ $t("txtLogin2") }}
                        </h5>
                        <form
                          class="forms-sample"
                          @submit.prevent="submitData"
                          method="POST"
                        >
                          <div class="mb-3">
                            <label for="txtLanguage" class="form-label">{{
                              $t("txtLanguage")
                            }}</label>
                            <select
                              v-model="locale"
                              @change="langChanged($i18n.locale)"
                              class="form-select"
                            >
                              <option
                                v-for="(lang, i) in langs"
                                :key="`Lang${i}`"
                                :value="lang"
                              >
                                <font style="color: #212529">{{ lang }}</font>
                              </option>
                            </select>
                          </div>
                          <div class="mb-3">
                            <label for="emailAddress" class="form-label">{{
                              $t("emailAddress")
                            }}</label>
                           <input
                              type="email"
                              class="form-control"
                              id="email"
                              :placeholder="$t('emailAddress')"
                              v-model="forms.email"
                              autofocus
                              required
                            />
                          </div>
                          <div class="mb-3">
                            <label for="userPassword" class="form-label">{{
                              $t("password")
                            }}</label>
                            <input
                              type="password"
                              class="form-control"
                              id="userPassword"
                              autocomplete="current-password"
                              :placeholder="$t('password')"
                              v-model="forms.password"
                              required
                            />
                          </div>
                          <div class="mb-3">
                            <label for="company_id" class="form-label">{{
                              $t("companyCodeTxt")
                            }}</label>
                            <input
                              type="text"
                              class="form-control"
                              id="company_id"
                              :placeholder="$t('companyCodeTxt')"
                              v-model="forms.company_id"
                              @keyup="uppercase"
                              autofocus
                              required
                            />
                          </div>
                          <div class="mb-3">
                            <div class="position-relative">
                              <vue-captcha
                                ref="captcha"
                                :captcha.sync="code"
                                @on-change="handleChange"
                              ></vue-captcha>
                            </div>
                            <div class="buttons">
                              <button
                                type="button"
                                @click="refreshCaptchaCode"
                                class="btn icon icon-left btn-info"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="fa fa-refresh"
                                >
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <line x1="12" y1="16" x2="12" y2="12"></line>
                                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                </svg>
                                Refresh
                              </button>
                            </div>
                          </div>
                          <div class="mb-3">
                            <label for="captchaCode" class="form-label">{{
                              $t("captchaCode")
                            }}</label>
                            <input
                              type="text"
                              class="form-control"
                              id="captchaCode"
                              :placeholder="$t('captchaCode')"
                              v-model="forms.captchaCode"
                              required
                            />
                          </div>

                          <div>
                            <button
                              class="
                                btn btn-primary
                                me-2
                                mb-2 mb-md-0
                                text-white
                              "
                            >
                             <i class="mdi mdi-login" style="font-size:1rem;color:white;vertical-align: middle;"></i>
                              {{ $t("txtLogin") }}
                            </button>
                          </div>
                          <div style="text-align: right">
                            <a
                              :href="
                                this.$settings.endPointApp + 'forgot-password'
                              "
                              class="auth-link text-black"
                              >{{ $t("forgotPassword") }}?</a
                            >
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { setAuthToken, setAuthLang } from "@/middleware/auth";
import VueCaptcha from "vue-captcha-code";

export default {
  name: "UserLogin",
  components: {
    VueCaptcha,
  },
  data() {
    return {
      code: "",
      locale: "",
      maxToasts: 100,
      position: "up right",
      closeBtn: true,
      isLoading: false,
      errors: [],
      companyModels: [],
      langs: ["id", "en"],
      forms: { company_id: "", email: "", password: "", captchaCode: "" },
    };
  },
  watch: {},
  methods: {
    handleChange(code) {
      this.code = code;
    },
    refreshCaptchaCode() {
      this.$refs.captcha.refreshCaptcha();
    },
    makeOffer() {
      
    },
    uppercase() { 
        this.forms.company_id  = this.forms.company_id.toUpperCase();
    },
    submitData() {
      if (this.forms.captchaCode == this.code) {
        this.fade(true);

        if (this.forms.email.trim()) {
          let formData = new FormData();
          formData.append("email", this.forms.email.trim());
          formData.append("password", this.forms.password);
          formData.append("company_id", this.forms.company_id);

          const baseURI = this.$settings.endPoint + "auth/login";

          this.$http
            .post(baseURI, formData)
            .then((response) => {
              this.loading();
              if (response.data.status === 200) {
                setAuthToken(response.data.datas.access_token);
                localStorage.setItem("company_default", this.forms.company_id);
                window.location.href = "/dashboard";
              } else {
                this.forms.captchaCode = "";
                this.errors = response.data.errors;
                this.resultError(response.data.errors);
                this.refreshCaptchaCode();
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
              this.forms.captchaCode = "";
              this.refreshCaptchaCode();
            });
        } else {
          this.error("email required");
        }
      } else {
        this.refreshCaptchaCode();
        this.forms.captchaCode = "";
        var wrongCaptchaCode = this.$t("wrongCaptchaCode");
        this.error(wrongCaptchaCode);
      }
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

    langChanged(lang) {
      if (this.locale == "") {
        this.locale = lang;
        setAuthLang(lang);
      } else {
        this.$i18n.locale = this.locale;
        localStorage.Lang = this.locale;
        setAuthLang(this.locale);
      }
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
  },
  events: {},
  created: function () {},
  mounted() {
    this.loading();
    this.langChanged(this.$i18n.locale);
  },
};
</script>
<style scoped>
</style>