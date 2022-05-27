<template>
  <div>
    <div class="main-wrapper">
      <!--begin::sidebar-->
      <sidebar-component classMenu="SystemCode"></sidebar-component>
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
                    class="btn btn-danger float-end btn-xs"
                    style="margin-right: 5px"
                    @click.prevent="uploadData()"
                  >
                     <i class="mdi mdi-upload" style="font-size:1rem;color:white;vertical-align: middle;"></i>
                    {{ $t("uploadData") }}
                  </button>

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
                    title="list-system-code"
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
                  
                        <a href="#" title="Delete" @click.prevent="deleteData(props.index, props.row)" >
                           &nbsp; &nbsp;
                          <i class="mdi mdi-delete-forever" style="font-size:16px;color:red"></i>
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
                            <div class="table-responsive text-nowrap">
                              <table class="table" style="table-layout: fixed;word-wrap: break-word;">
                                <thead class="thead-dark">
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">{{$t("system_code_name_txt")}}</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">{{$t("txtMessages")}}</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr v-for="(item,index) in uploadResponse" :key="index">
                                    <th scope="row">{{index+1}}</th>
                                    <td>{{item.name}}</td>
                                    <td><span v-if="item.status == 'failed'" style="color:red;">{{item.status}}</span><span v-else style="color:blue;">{{item.status}}</span></td>
                                    <td>{{item.message}}</td>
                                    </tr>

                                </tbody>
                              </table>
                          </div>
                        </div>
                    </div>
         
        
         

      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-primary"><i class="mdi mdi-content-save" style="font-size:1rem;color:white;vertical-align: middle;"></i> {{ $t("submitFormTxt") }}</button>
        <button type="button" class="btn btn-secondary" @click="hideModal()"><i class="mdi mdi-window-close" style="font-size:1rem;color:white;vertical-align: middle;"></i> {{ $t("close_txt") }}</button>
      </div>
</form>
 
    </modal>




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
                        <label for="system_code_txt" class="col-form-label">{{
                          $t("system_code_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="system_code"
                          :placeholder="$t('system_code_txt')"
                          v-model="forms.system_code"
                          @keyup="uppercase"
                          disabled
                        />
                        <div v-if="errors.system_code">
                          <div
                            v-for="error in errors.system_code"
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
                        <label for="value_txt" class="col-form-label">{{
                          $t("value_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="value"
                          :placeholder="$t('value_txt')"
                          v-model="forms.value"
                          @keyup="uppercase"
                          disabled
                        />
                        <div v-if="errors.value">
                          <div
                            v-for="error in errors.value"
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
                        <label for="sequence_txt" class="col-form-label">{{
                          $t("sequence_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="sequence"
                          :placeholder="$t('sequence_txt')"
                          v-model="forms.sequence"
                          v-on:keypress="isNumber()"
                          maxlength="2"
                          disabled
                        />
                        <div v-if="errors.sequence">
                          <div
                            v-for="error in errors.sequence"
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
                        <label for="create_by_txt" class="col-form-label">{{
                          $t("create_by_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="create_by"
                          :placeholder="$t('create_by_txt')"
                          v-model="forms.create_by"
                          disabled
                        />
                        <div v-if="errors.create_by">
                          <div
                            v-for="error in errors.create_by"
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
                        <label for="update_by_txt" class="col-form-label">{{
                          $t("update_by_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="update_by"
                          :placeholder="$t('update_by_txt')"
                          v-model="forms.update_by"
                          disabled
                        />
                        <div v-if="errors.update_by">
                          <div
                            v-for="error in errors.update_by"
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
        <button type="button" class="btn btn-secondary" @click="hideModal()"><i class="mdi mdi-window-close" style="font-size:1rem;color:white;vertical-align: middle;"></i> {{ $t("close_txt") }}</button>
      </div>
 
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
                    <label for="system_code_txt" class="col-form-label">{{
                      $t("system_code_txt")
                    }}</label>
                  </div>
                  <div class="col-lg-8">
                    <input
                      type="text"
                      class="form-control"
                      id="system_code"
                      :placeholder="$t('system_code_txt')"
                      v-model="forms.system_code"
                      @keyup="uppercase"
                      required
                    />
                    <div v-if="errors.system_code">
                      <div
                        v-for="error in errors.system_code"
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
                        <label for="value_txt" class="col-form-label">{{
                          $t("value_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="value"
                          :placeholder="$t('value_txt')"
                          v-model="forms.value"
                          @keyup="uppercase"
                          required
                        />
                        <div v-if="errors.value">
                          <div
                            v-for="error in errors.value"
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
                    <label for="sequence_txt" class="col-form-label">{{
                      $t("sequence_txt")
                    }}</label>
                  </div>
                  <div class="col-lg-8">
                    <input
                      type="text"
                      class="form-control"
                      id="sequence"
                      :placeholder="$t('sequence_txt')"
                      v-model="forms.sequence"
                      v-on:keypress="isNumber()"
                      maxlength="2"
                      required
                    />
                    <div v-if="errors.sequence">
                      <div
                        v-for="error in errors.sequence"
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
        <button type="submit" class="btn btn-primary"><i class="mdi mdi-content-save" style="font-size:1rem;color:white;vertical-align: middle;"></i> {{ $t("submitFormTxt") }}</button>
        <button type="button" class="btn btn-secondary" @click="hideModal()"><i class="mdi mdi-window-close" style="font-size:1rem;color:white;vertical-align: middle;"></i> {{ $t("close_txt") }}</button>
      </div>
</form>
 
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
                    <label for="system_code_txt" class="col-form-label">{{
                      $t("system_code_txt")
                    }}</label>
                  </div>
                  <div class="col-lg-8">
                    <input
                      type="text"
                      class="form-control"
                      id="system_code"
                      :placeholder="$t('system_code_txt')"
                      v-model="forms.system_code"
                      @keyup="uppercase"
                      required
                    />
                    <div v-if="errors.system_code">
                      <div
                        v-for="error in errors.system_code"
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
                        <label for="value_txt" class="col-form-label">{{
                          $t("value_txt")
                        }}</label>
                      </div>
                      <div class="col-lg-8">
                        <input
                          type="text"
                          class="form-control"
                          id="value"
                          :placeholder="$t('value_txt')"
                          v-model="forms.value"
                          @keyup="uppercase"
                          required
                        />
                        <div v-if="errors.value">
                          <div
                            v-for="error in errors.value"
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
                    <label for="sequence_txt" class="col-form-label">{{
                      $t("sequence_txt")
                    }}</label>
                  </div>
                  <div class="col-lg-8">
                    <input
                      type="text"
                      class="form-control"
                      id="sequence"
                      :placeholder="$t('sequence_txt')"
                      v-model="forms.sequence"
                      v-on:keypress="isNumber()"
                      maxlength="2"
                      required
                    />
                    <div v-if="errors.sequence">
                      <div
                        v-for="error in errors.sequence"
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
        <button type="submit" class="btn btn-primary"><i class="mdi mdi-content-save" style="font-size:1rem;color:white;vertical-align: middle;"></i> {{ $t("submitFormTxt") }}</button>
        <button type="button" class="btn btn-secondary" @click="hideModal()"><i class="mdi mdi-window-close" style="font-size:1rem;color:white;vertical-align: middle;"></i> {{ $t("close_txt") }}</button>
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
  name: "SystemCodeIndex",
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
      uploadResponse:[],
      forms: { system_code_id:"", system_code: "", value:"", sequence:0,create_by:"",update_by:"", created_at:"",updated_at:"" },
      file_name:"",
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
          label: "System Code",
          field: "system_code",
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "Filter By System Code", // placeholder for filter input
            filterValue: "", // initial populated value for this filter
            filterDropdownItems: [], // dropdown (with selected values) instead of text input
            trigger: "enter", //only trigger on enter not on keyup
          },
        }, 
        {
          label: "Value",
          field: "value",
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "Filter By Value", // placeholder for filter input
            filterValue: "", // initial populated value for this filter
            filterDropdownItems: [], // dropdown (with selected values) instead of text input
            trigger: "enter", //only trigger on enter not on keyup
          },
        },
        {
          label: "Create By",
          field: "create_by",
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "Filter By Create By", // placeholder for filter input
            filterValue: "", // initial populated value for this filter
            filterDropdownItems: [], // dropdown (with selected values) instead of text input
            trigger: "enter", //only trigger on enter not on keyup
          },
        },
        {
          label: "Update By",
          field: "update_by",
          filterOptions: {
            enabled: true, // enable filter for this column
            placeholder: "Filter By Update By", // placeholder for filter input
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
             
             
            const baseURI  =  this.$settings.endPoint+"system-code/create";
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
	isNumber(value) {
      let evt = (value) ? value : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    uppercase() { 
        this.forms.system_code      = this.forms.system_code.toUpperCase();
        this.forms.value            = this.forms.value.toUpperCase();
        this.forms.system_code      = this.forms.system_code.trim();
    },
    deleteData(index, row) {
        this.errors                   = [];
        this.forms.system_code_id     = row.system_code_id
        this.forms.system_code        = row.system_code
        this.forms.value              = row.value
        this.forms.sequence           = row.sequence
        this.forms.create_by          = row.create_by
        this.forms.update_by          = row.update_by
        this.forms.created_at         = row.created_at
        this.forms.updated_at         = row.updated_at
        
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
 
            const baseURI  =  this.$settings.endPoint+"system-code/destroy/"+this.forms.system_code_id;
          this.$http.delete(baseURI,this.forms).then((response) => {
              this.loading();
              if(response.data.status === 200) {

                    this.loadItems();
                    this.resetForm();
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

    downloadTemplate() {
      const baseURI = this.$settings.endPoint + "system-code/download-template";
      var file_name = "system-code-template.xlsx";
 
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
    resetForm() {
        this.forms.system_code_id           = ""
        this.forms.system_code              = ""
        this.forms.value                    = ""
        this.forms.sequence                 = 0
        this.forms.create_by                = ""
        this.forms.created_at               = ""
        this.forms.updated_at               = ""
        this.file_name                      = '';
        this.uploadResponse                 = [];
        this.errors                         = [];
    },
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
    uploadData() {
        this.resetForm();
        this.$modal.show('upload-data');
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

            const baseURI  =  this.$settings.endPoint+"system-code/upload";
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
    downloadData() {
      const baseURI = this.$settings.endPoint + "system-code/index";
      var CurrentDate = this.$moment().format("DD_MM_YYYY_HH_mm_ss");
      var file_name = "download_" + CurrentDate + ".xlsx";
 
      return this.$http
        .get(
          baseURI +
            `?per_page=${this.serverParams.per_page}&page=${this.serverParams.page}&sort_field=${this.serverParams.sort.field}&sort_type=${this.serverParams.sort.type}&system_code=${this.serverParams.columnFilters.system_code}&value=${this.serverParams.columnFilters.value}&create_by=${this.serverParams.columnFilters.create_by}&update_by=${this.serverParams.columnFilters.update_by}&download=download`,
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
        this.resetForm();
        this.$modal.show('add-data');
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
            
            const baseURI  =  this.$settings.endPoint+"system-code/update/"+this.forms.system_code_id;
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
    editData(index, row) {
        this.errors                   = [];
        this.forms.system_code_id     = row.system_code_id
        this.forms.system_code        = row.system_code
        this.forms.value              = row.value
        this.forms.sequence           = row.sequence
        this.forms.create_by          = row.create_by
        this.forms.update_by          = row.update_by
        this.forms.created_at         = row.created_at
        this.forms.updated_at         = row.updated_at
        this.$modal.show('edit-data');
    },

    detailData(index, row) {
        this.errors                   = [];
        this.forms.system_code_id     = row.system_code_id
        this.forms.system_code        = row.system_code
        this.forms.value              = row.value
        this.forms.sequence           = row.sequence
        this.forms.create_by          = row.create_by
        this.forms.update_by          = row.update_by
        this.forms.created_at         = row.created_at
        this.forms.updated_at         = row.updated_at
        this.$modal.show('detail-data');
    },
 

    // load items is what brings back the rows from server
    loadItems() {
      const baseURI = this.$settings.endPoint + "system-code/index";
 
 

      return this.$http
        .get(
          baseURI +
            `?per_page=${this.serverParams.per_page}&page=${this.serverParams.page}&sort_field=${this.serverParams.sort.field}&sort_type=${this.serverParams.sort.type}&system_code=${this.serverParams.columnFilters.system_code}&value=${this.serverParams.columnFilters.value}&create_by=${this.serverParams.columnFilters.create_by}&update_by=${this.serverParams.columnFilters.update_by}`
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