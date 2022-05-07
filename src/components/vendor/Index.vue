<template>
  <div>
    <div class="main-wrapper">
      <!--begin::sidebar-->
      <sidebar-component classMenu="Vendor"></sidebar-component>
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
                  <h4 style="margin-right: 5px" class="float-start">Vendor</h4>
                 
                  <button
                    class="btn btn-danger float-end btn-xs"
                    style="margin-right: 5px"
                    @click.prevent="uploadData()"
                  >
                     <i class="link-icon" data-feather="upload"></i>
                    {{ $t("uploadData") }}
                  </button>
                  <button
                    class="btn btn-primary float-end btn-xs"
                    style="margin-right: 5px"
                    @click.prevent="createData()"
                  >
                    <i class="link-icon" data-feather="plus"></i>
                    {{ $t("createNew") }}
                  </button>
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
                    title="list-vendor"
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
            <button @click="hideModal()" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

      <div class="modal-body">
        
        
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
                     
                     <div class="row mb-3">
                      <div class="col-lg-3">
                        <label for="vendor_name_txt" class="col-form-label">{{
                          $t("vendor_name_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="vendor_name"
                          :placeholder="$t('vendor_name_txt')"
                          v-model="forms.name"
                          @keyup="uppercase"
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
        
        
                     <div class="row mb-3">
                      <div class="col-lg-3">
                        <label for="npwp_no_txt" class="col-form-label">{{
                          $t("npwp_no_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="npwp_no"
                          :placeholder="$t('npwp_no_txt')"
                          v-model="forms.npwp_no"
                          v-on:keypress="isNumber()"
                          maxlength="15"
                          disabled
                        />
                        <div v-if="errors.npwp_no">
                          <div
                            v-for="error in errors.npwp_no"
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
                        <label for="balance_txt" class="col-form-label">{{
                          $t("balance_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                          <money v-model="forms.balance" maxlength="20" class="form-control border-input" :placeholder="$t('balance_txt')" v-bind="money" disabled></money>
                         
                        <div v-if="errors.balance">
                          <div
                            v-for="error in errors.balance"
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
                        <label for="address_txt" class="col-form-label">{{
                          $t("address_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                         <textarea v-model="forms.address" class="form-control" rows="5" id="message" :placeholder="$t('address_txt')" disabled></textarea>
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

         

      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="hideModal()">{{ $t("close_txt") }}</button>
      </div>
 
    </modal>



<!-- @add --->
    <modal name="add-data" height="auto" :draggable="true">
        

<form class="forms-sample" @submit.prevent="submitData" method="POST" >
        <div class="modal-header">
            <h5 class="modal-title">{{ $t("createNew") }}</h5>
            <button type="button" @click="hideModal()" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

      <div class="modal-body">
        
        
                     <div class="row mb-3">
                      <div class="col-lg-3">
                        <label for="vendor_name_txt" class="col-form-label">{{
                          $t("vendor_name_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="vendor_name"
                          :placeholder="$t('vendor_name_txt')"
                          v-model="forms.name"
                          @keyup="uppercase"
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
                        <label for="npwp_no_txt" class="col-form-label">{{
                          $t("npwp_no_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="npwp_no"
                          :placeholder="$t('npwp_no_txt')"
                          v-model="forms.npwp_no"
                          v-on:keypress="isNumber()"
                          maxlength="15"
                          required
                        />
                        <div v-if="errors.npwp_no">
                          <div
                            v-for="error in errors.npwp_no"
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
                        <label for="balance_txt" class="col-form-label">{{
                          $t("balance_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                          <money v-model="forms.balance" maxlength="20" class="form-control border-input" :placeholder="$t('balance_txt')" v-bind="money"></money>
                         
                        <div v-if="errors.balance">
                          <div
                            v-for="error in errors.balance"
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
                        <label for="address_txt" class="col-form-label">{{
                          $t("address_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                         <textarea v-model="forms.address" class="form-control" rows="5" id="message" :placeholder="$t('address_txt')" required></textarea>
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
        
         

      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-primary">{{ $t("submitFormTxt") }}</button>
        <button type="button" class="btn btn-secondary" @click="hideModal()">{{ $t("close_txt") }}</button>
      </div>
</form>
 
    </modal>



<!-- @edit --->
    <modal name="edit-data" height="auto" :draggable="true">
        

<form class="forms-sample" @submit.prevent="submitEditData()" method="POST" >
        <div class="modal-header">
            <h5 class="modal-title">{{ $t("editData_txt") }}</h5>
            <button type="button" @click="hideModal()" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

      <div class="modal-body">
        
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
        
                     <div class="row mb-3">
                      <div class="col-lg-3">
                        <label for="vendor_name_txt" class="col-form-label">{{
                          $t("vendor_name_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="vendor_name"
                          :placeholder="$t('vendor_name_txt')"
                          v-model="forms.name"
                          @keyup="uppercase"
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
                        <label for="npwp_no_txt" class="col-form-label">{{
                          $t("npwp_no_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="npwp_no"
                          :placeholder="$t('npwp_no_txt')"
                          v-model="forms.npwp_no"
                          v-on:keypress="isNumber()"
                          maxlength="15"
                          required
                        />
                        <div v-if="errors.npwp_no">
                          <div
                            v-for="error in errors.npwp_no"
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
                        <label for="balance_txt" class="col-form-label">{{
                          $t("balance_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                          <money v-model="forms.balance" maxlength="20" class="form-control border-input" :placeholder="$t('balance_txt')" v-bind="money"></money>
                         
                        <div v-if="errors.balance">
                          <div
                            v-for="error in errors.balance"
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
                        <label for="address_txt" class="col-form-label">{{
                          $t("address_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                         <textarea v-model="forms.address" class="form-control" rows="5" id="message" :placeholder="$t('address_txt')" required></textarea>
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

        
         

      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-primary">{{ $t("submitFormTxt") }}</button>
        <button type="button" class="btn btn-secondary" @click="hideModal()">{{ $t("close_txt") }}</button>
      </div>
</form>
 
    </modal>





<!-- @upload --->
    <modal name="upload-data" height="auto" :draggable="true">
        

<form class="forms-sample" @submit.prevent="submitUploadData()" method="POST" >
        <div class="modal-header">
            <h5 class="modal-title">{{ $t("uploadData") }}</h5>
            <button type="button" @click="hideModal()" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

      <div class="modal-body">
        
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
         
                     <div class="row mb-3">
                      <div class="col-lg-3">
                        <label for="file_txt" class="col-form-label">{{
                          $t("file_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                       <input class="form-control" type="file" name="file_name" id="file_name" v-on:change="uploadAvatar" required>
                        <div v-if="errors.file">
                          <div
                            v-for="error in errors.file"
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
                        <div class="col-lg-12">
                          <label for="download_template_txt" class="col-form-label"> <a href="#" @click="downloadTemplate()">{{
                            $t("download_template_txt")
                          }}</a></label>
                        </div>
                    </div>

                    <div class="row mb-3" v-if="this.uploadResponse.length > 0">
                        <div class="col-lg-12">
                          <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">{{$t("vendor_name_txt")}}</th>
                                <th scope="col">Status</th>
                                <th scope="col">{{$t("txtMessages")}}</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr v-for="(item,index) in uploadResponse" :key="index">
                                <th scope="row">{{index}}</th>
                                <td>{{item.name}}</td>
                                <td><span v-if="item.status == 'failed'" style="color:red;">{{item.status}}</span><span v-else style="color:blue;">{{item.status}}</span></td>
                                <td>{{item.message}}</td>
                                </tr>

                            </tbody>
                          </table>
                        </div>
                    </div>
         
        
         

      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-primary">{{ $t("submitFormTxt") }}</button>
        <button type="button" class="btn btn-secondary" @click="hideModal()">{{ $t("close_txt") }}</button>
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
  name: "VendorIndex",
  components: {
    "sidebar-component": sidebarComponent,
    "navbar-component": navbarComponent,
    "footer-component": footerComponent,
  },
  data() {
    return {
        money: {
          decimal: ',',
          thousands: '.',
          prefix: 'Rp. ',
          precision: 2,
          masked: false
        },
        primaryKey:"",
        file_name:"",
        maxToasts: 100,
        position: "up right",
        closeBtn: true,
        isLoading: false,
        errors: [],
        langs: ["id", "en"],
        forms: { vendor_id:"", name: "", address: "", npwp_no:"", balance:0, created_at:"",updated_at:"" },
        detailUser: [],
        uploadResponse:[],
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
            label: "NPWP NO",
            field: "npwp_no",
            filterOptions: {
                enabled: true, // enable filter for this column
                placeholder: "Filter By NPWP NO", // placeholder for filter input
                filterValue: "", // initial populated value for this filter
                filterDropdownItems: [], // dropdown (with selected values) instead of text input
                trigger: "enter", //only trigger on enter not on keyup
            },
            }, 
            {
            label: "Address",
            field: "address",
            filterOptions: {
                enabled: true, // enable filter for this column
                placeholder: "Filter By Address", // placeholder for filter input
                filterValue: "", // initial populated value for this filter
                filterDropdownItems: [], // dropdown (with selected values) instead of text input
                trigger: "enter", //only trigger on enter not on keyup
            },
            }, 
            {
            label: "Balance",
            field: "balance",
            formatFn: this.formatNumberRupiah,
            filterOptions: {
                enabled: false, // enable filter for this column
                placeholder: "Filter By Balance", // placeholder for filter input
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

    uploadAvatar(event) {

      let files = event.target.files || event.dataTransfer.files;
      if (files.length) this.file_name = files[0];
                
    },
    hideModal(){
        this.$modal.hide('add-data');
        this.$modal.hide('detail-data');
        this.$modal.hide('edit-data');
        this.$modal.hide('upload-data');
        this.resetForm();
    },
	isNumber(value) {
      let evt = (value) ? value : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    formatNumberRupiah(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return `Rp. ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
    },

    submitUploadData() {
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
            formData.set('file', this.file_name)

            const baseURI  =  this.$settings.endPoint+"vendor/upload";
          this.$http.post(baseURI,formData).then((response) => {
              this.loading();
              if(response.data.status === 200) {
                    this.loadItems();
                    this.resetForm();
                    this.errors         = [];
                    this.uploadResponse = response.data.datas.data;
                    
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
            
            const baseURI  =  this.$settings.endPoint+"vendor/update/"+this.forms.vendor_id;
            this.$http.put(baseURI,this.forms).then((response) => {
              this.loading();
              if(response.data.status === 200) {
                    this.hideModal();
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
             
             
            const baseURI  =  this.$settings.endPoint+"vendor/create";
            this.$http.post(baseURI,this.forms).then((response) => {
              this.loading();
              if(response.data.status === 200) {
                    this.hideModal();
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
        this.forms.vendor_id        = ""
        this.forms.name             = ""
        this.forms.address          = ""
        this.forms.balance          = 0
        this.forms.npwp_no          = ""
        this.file_name                = '';
        this.uploadResponse         = [];
        this.errors                 = [];
    },
    uppercase() { 
        this.forms.name     = this.forms.name.toUpperCase();
        this.forms.address  = this.forms.address.toUpperCase();
    },
    downloadData() {
      const baseURI = this.$settings.endPoint + "vendor/index";
      var CurrentDate = this.$moment().format("DD_MM_YYYY_HH_mm_ss");
      var file_name = "download_" + CurrentDate + ".xlsx";
 
      return this.$http
        .get(
          baseURI +
            `?per_page=${this.serverParams.per_page}&page=${this.serverParams.page}&sort_field=${this.serverParams.sort.field}&sort_type=${this.serverParams.sort.type}&name=${this.serverParams.columnFilters.name}&npwp_no=${this.serverParams.columnFilters.npwp_no}&address=${this.serverParams.columnFilters.address}&download=download`,
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

    downloadTemplate() {
      const baseURI = this.$settings.endPoint + "vendor/download-template";
      var file_name = "vendor-template.xlsx";
 
      return this.$http
        .get(
          baseURI,
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
    
    uploadData() {
        this.resetForm();
        this.$modal.show('upload-data');
    },

    
    createData() {
        this.resetForm();
        this.$modal.show('add-data');
    },

    editData(index, row) {
        this.errors             = [];
        this.forms.vendor_id    = row.vendor_id
        this.forms.name         = row.name
        this.forms.address      = row.address
        this.forms.npwp_no      = row.npwp_no
        this.forms.balance      = row.balance
        this.forms.created_at   = row.created_at
        this.forms.updated_at   = row.updated_at
        this.$modal.show('edit-data');
    },

    detailData(index, row) {
        this.errors             = [];
        this.forms.vendor_id    = row.vendor_id
        this.forms.name         = row.name
        this.forms.address      = row.address
        this.forms.npwp_no      = row.npwp_no
        this.forms.balance      = row.balance
        this.forms.created_at   = row.created_at
        this.forms.updated_at   = row.updated_at
        this.$modal.show('detail-data');
    },

    // load items is what brings back the rows from server
    loadItems() {
      const baseURI = this.$settings.endPoint + "vendor/index";
 
 

      return this.$http
        .get(
          baseURI +
            `?per_page=${this.serverParams.per_page}&page=${this.serverParams.page}&sort_field=${this.serverParams.sort.field}&sort_type=${this.serverParams.sort.type}&name=${this.serverParams.columnFilters.name}&address=${this.serverParams.columnFilters.address}&npwp_no=${this.serverParams.columnFilters.npwp_no}`
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