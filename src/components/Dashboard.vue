<template>
    <div>



<div class="d-flex flex-column flex-root">
  <div class="page d-flex flex-row flex-column-fluid">

    <!--begin::navbar-->
    <navbar-component classMenu="Dashboard"></navbar-component>
    <!--end::navbar-->

    <div v-if="isLoading" class="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">

      <!--begin::Loading Content-->
 
          <div id="kt_header" class="header" data-kt-sticky="true" data-kt-sticky-name="header" data-kt-sticky-offset="{default: '200px', lg: '300px'}" style="animation-duration: 0.3s;"></div>
          <div class="py-5">
            <div class="col-lg-12">
              <!--begin::Card-->
                <div class="card card-border overlay overlay-block">
                  <div class="overlay-layer card-rounded bg-dark bg-opacity-5">
                    <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>
                  </div>
                </div>
              <!--end::Card-->
            </div>
          </div>

      <!--end::Loading Content-->

    </div>
    <div v-else class="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">


 <!--begin::Header-->
    <div id="kt_header" class="header" data-kt-sticky="true" data-kt-sticky-name="header" data-kt-sticky-offset="{default: '200px', lg: '300px'}">
        <!--begin::Container-->
        <div class="container-xxl d-flex align-items-center justify-content-between" id="kt_header_container">
            <!--begin::Page title-->
            <div class="page-title d-flex flex-column align-items-start justify-content-center flex-wrap mt-n5 mt-lg-0 me-lg-2 pb-2 pb-lg-0" data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', lg: '#kt_header_container'}">
                <!--begin::Heading-->
                <h1 class="text-dark fw-bolder my-0 fs-2">Dashboard</h1>
                <!--end::Heading-->
            </div>
            <!--end::Page title=-->
            <!--begin::Wrapper-->
            <div class="d-flex d-lg-none align-items-center ms-n2 me-2">
                <!--begin::Aside mobile toggle-->
                <div class="btn btn-icon btn-active-icon-primary" id="kt_aside_toggle">
                    <!--begin::Svg Icon | path: icons/duotune/abstract/abs015.svg-->
                    <span class="svg-icon svg-icon-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="black" />
                            <path opacity="0.3" d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="black" />
                        </svg>
                    </span>
                    <!--end::Svg Icon-->
                </div>
                <!--end::Aside mobile toggle-->
                <!--begin::Logo-->
                <a :href="this.$settings.endPointApp+'/dashboard'" class="d-flex align-items-center">
                    <img alt="ICDX GROUP" src="/assets/images/icon_64x64.8a9f2f.png" class="h-30px" />
                </a>
                <!--end::Logo-->
            </div>
            <!--end::Wrapper-->
            <!--begin::Toolbar wrapper-->
            <div class="d-flex flex-shrink-0">
               
                <!--begin::Chat-->
                <div class="d-flex align-items-center ms-3">
                    <!--begin::Menu wrapper-->
                    <div class="btn btn-icon btn-primary w-40px h-40px pulse pulse-white" id="kt_drawer_chat_toggle">
                        <!--begin::Svg Icon | path: icons/duotune/communication/com012.svg-->
                        <span class="svg-icon svg-icon-2">
                            <img alt="ICDX GROUP" src="/assets/images/notification-bell-svgrepo-com.svg" class="h-30px" />
                        </span>
                        <!--end::Svg Icon-->
                        <span class="pulse-ring"></span>
                    </div>
                    <!--end::Menu wrapper-->
                </div>
                <!--end::Chat-->
            </div>
            <!--end::Toolbar wrapper-->
        </div>
        <!--end::Container-->
    </div>
    <!--end::Header-->




    <!--begin::Content-->
    <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
        <!--begin::Container-->
        <div class="container-xxl" id="kt_content_container">
           
            
            <!--begin::Row-->
            <div class="row g-5 gx-xxl-8">
                
                
                <!--begin::Col-->
                <div class="col-xxl-12">
                    <!--begin::Tables Widget 5-->
                    <div class="card card-xxl-stretch mb-5 mb-xxl-8">
                        <!--begin::Header-->
                        <div class="card-header border-0 pt-5">
                            <h3 class="card-title align-items-start flex-column">
                                <span class="card-label fw-bolder fs-3 mb-1">Latest Products</span>
                                <span class="text-muted mt-1 fw-bold fs-7">More than 400 new products</span>
                            </h3>
                             
                        </div>
                        <!--end::Header-->
                        <!--begin::Body-->
                        <div class="card-body py-3">
                            <div class="tab-content">

                                <!--begin::Tap pane-->
                                <div class="tab-pane fade show active" id="kt_table_widget_5_tab_1">
                                    <!--begin::Table container-->
                                    <div class="table-responsive">
                                        <!--begin::Table-->
                                        <table class="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4">
                                            <!--begin::Table head-->
                                            <thead>
                                                <tr class="border-0">
                                                    <th class="p-0 w-50px"></th>
                                                    <th class="p-0 min-w-150px"></th>
                                                    <th class="p-0 min-w-140px"></th>
                                                    <th class="p-0 min-w-110px"></th>
                                                    <th class="p-0 min-w-50px"></th>
                                                </tr>
                                            </thead>
                                            <!--end::Table head-->
                                            <!--begin::Table body-->
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div class="symbol symbol-45px me-2">
                                                            <span class="symbol-label">
                                                                <img src="/assets/images/icon_64x64.8a9f2f.png" class="h-50 align-self-center" alt="" />
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <a href="#" class="text-dark fw-bolder text-hover-primary mb-1 fs-6">Brad Simmons</a>
                                                        <span class="text-muted fw-bold d-block">Movie Creator</span>
                                                    </td>
                                                    <td class="text-end text-muted fw-bold">React, HTML</td>
                                                    <td class="text-end">
                                                        <span class="badge badge-light-success">Approved</span>
                                                    </td>
                                                    <td class="text-end">
                                                        <a href="#" class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                                                            <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
                                                            <span class="svg-icon svg-icon-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                    <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                                                                    <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                                                                </svg>
                                                            </span>
                                                            <!--end::Svg Icon-->
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="symbol symbol-45px me-2">
                                                            <span class="symbol-label">
                                                                <img src="/assets/images/icon_64x64.8a9f2f.png" class="h-50 align-self-center" alt="" />
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <a href="#" class="text-dark fw-bolder text-hover-primary mb-1 fs-6">Popular Authors</a>
                                                        <span class="text-muted fw-bold d-block">Most Successful</span>
                                                    </td>
                                                    <td class="text-end text-muted fw-bold">Python, MySQL</td>
                                                    <td class="text-end">
                                                        <span class="badge badge-light-warning">In Progress</span>
                                                    </td>
                                                    <td class="text-end">
                                                        <a href="#" class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                                                            <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
                                                            <span class="svg-icon svg-icon-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                    <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                                                                    <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                                                                </svg>
                                                            </span>
                                                            <!--end::Svg Icon-->
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="symbol symbol-45px me-2">
                                                            <span class="symbol-label">
                                                                <img src="/assets/images/icon_64x64.8a9f2f.png" class="h-50 align-self-center" alt="" />
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <a href="#" class="text-dark fw-bolder text-hover-primary mb-1 fs-6">New Users</a>
                                                        <span class="text-muted fw-bold d-block">Awesome Users</span>
                                                    </td>
                                                    <td class="text-end text-muted fw-bold">Laravel,Metronic</td>
                                                    <td class="text-end">
                                                        <span class="badge badge-light-primary">Success</span>
                                                    </td>
                                                    <td class="text-end">
                                                        <a href="#" class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                                                            <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
                                                            <span class="svg-icon svg-icon-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                    <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                                                                    <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                                                                </svg>
                                                            </span>
                                                            <!--end::Svg Icon-->
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="symbol symbol-45px me-2">
                                                            <span class="symbol-label">
                                                                <img src="/assets/images/icon_64x64.8a9f2f.png" class="h-50 align-self-center" alt="" />
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <a href="#" class="text-dark fw-bolder text-hover-primary mb-1 fs-6">Active Customers</a>
                                                        <span class="text-muted fw-bold d-block">Movie Creator</span>
                                                    </td>
                                                    <td class="text-end text-muted fw-bold">AngularJS, C#</td>
                                                    <td class="text-end">
                                                        <span class="badge badge-light-danger">Rejected</span>
                                                    </td>
                                                    <td class="text-end">
                                                        <a href="#" class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                                                            <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
                                                            <span class="svg-icon svg-icon-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                    <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                                                                    <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                                                                </svg>
                                                            </span>
                                                            <!--end::Svg Icon-->
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="symbol symbol-45px me-2">
                                                            <span class="symbol-label">
                                                                <img src="/assets/images/icon_64x64.8a9f2f.png" class="h-50 align-self-center" alt="" />
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <a href="#" class="text-dark fw-bolder text-hover-primary mb-1 fs-6">Bestseller Theme</a>
                                                        <span class="text-muted fw-bold d-block">Best Customers</span>
                                                    </td>
                                                    <td class="text-end text-muted fw-bold">ReactJS, Ruby</td>
                                                    <td class="text-end">
                                                        <span class="badge badge-light-warning">In Progress</span>
                                                    </td>
                                                    <td class="text-end">
                                                        <a href="#" class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                                                            <!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
                                                            <span class="svg-icon svg-icon-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                    <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black" />
                                                                    <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black" />
                                                                </svg>
                                                            </span>
                                                            <!--end::Svg Icon-->
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <!--end::Table body-->
                                        </table>
                                    </div>
                                    <!--end::Table-->
                                </div>
                                <!--end::Tap pane-->


                            </div>
                        </div>
                        <!--end::Body-->
                    </div>
                    <!--end::Tables Widget 5-->
                </div>
                <!--end::Col-->


            </div>
            <!--end::Row-->


        </div>
        <!--end::Container-->
    </div>
    <!--end::Content-->


    <!--begin::Footer-->
    <div class="footer py-4 d-flex flex-lg-column" id="kt_footer">
        <!--begin::Container-->
        <div class="container-xxl d-flex flex-column flex-md-row flex-stack">
            <!--begin::Copyright-->
            <div class="text-dark order-2 order-md-1">
                <span class="text-gray-400 fw-bold me-1">Created by</span>
                <a href="https://www.icdx.co.id/" target="_blank" class="text-muted text-hover-primary fw-bold me-2 fs-6">ICDX GROUP</a>
            </div>
            <!--end::Copyright-->
            
            
        </div>
        <!--end::Container-->
    </div>
    <!--end::Footer-->


    </div>




    <!--begin::Chat drawer-->
		<div id="kt_drawer_chat" class="bg-body" data-kt-drawer="true" data-kt-drawer-name="chat" data-kt-drawer-activate="true" data-kt-drawer-overlay="true" data-kt-drawer-width="{default:'300px', 'md': '500px'}" data-kt-drawer-direction="end" data-kt-drawer-toggle="#kt_drawer_chat_toggle" data-kt-drawer-close="#kt_drawer_chat_close">
			<!--begin::Messenger-->
			<div class="card w-100 rounded-0 border-0" id="kt_drawer_chat_messenger">
				<!--begin::Card header-->
				<div class="card-header pe-5" id="kt_drawer_chat_messenger_header">
					<!--begin::Title-->
					<div class="card-title">
						<!--begin::User-->
						<div class="d-flex justify-content-center flex-column me-3">
							<a href="#" class="fs-4 fw-bolder text-gray-900 text-hover-primary me-1 mb-2 lh-1">{{ $t('txtNotification') }}</a>
							
						</div>
						<!--end::User-->
					</div>
					<!--end::Title-->
					<!--begin::Card toolbar-->
					<div class="card-toolbar">
						<!--begin::Close-->
						<div class="btn btn-sm btn-icon btn-active-light-primary" id="kt_drawer_chat_close">
							<!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
							<span class="svg-icon svg-icon-2">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
									<rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black" />
									<rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black" />
								</svg>
							</span>
							<!--end::Svg Icon-->
						</div>
						<!--end::Close-->
					</div>
					<!--end::Card toolbar-->
				</div>
				<!--end::Card header-->
				<!--begin::Card body-->
				<div class="card-body" id="kt_drawer_chat_messenger_body">
					<!--begin::Messages-->
					<div class="scroll-y me-n5 pe-5" data-kt-element="messages" data-kt-scroll="true" data-kt-scroll-activate="true" data-kt-scroll-height="auto" data-kt-scroll-dependencies="#kt_drawer_chat_messenger_header, #kt_drawer_chat_messenger_footer" data-kt-scroll-wrappers="#kt_drawer_chat_messenger_body" data-kt-scroll-offset="0px">
						
            
            
						<!--begin::Message(in)-->
						<div class="d-flex justify-content-start mb-10">
							<!--begin::Wrapper-->
							<div class="d-flex flex-column align-items-start">
								<!--begin::User-->
								<div class="d-flex align-items-center mb-2">
								
									<!--begin::Details-->
									<div class="ms-3">
										<a href="#" class="fs-5 fw-bolder text-gray-900 text-hover-primary me-1">Brian Cox</a>
										<span class="text-muted fs-7 mb-1">1 Hour</span>
									</div>
									<!--end::Details-->

								</div>
								<!--end::User-->
								<!--begin::Text-->
								<div class="p-5 rounded bg-light-info text-dark fw-bold mw-lg-400px text-start" data-kt-element="message-text">Ok, Understood!</div>
								<!--end::Text-->
							</div>
							<!--end::Wrapper-->
						</div>
						<!--end::Message(in)-->

                  
					</div>
					<!--end::Messages-->
				</div>
				<!--end::Card body-->
			</div>
			<!--end::Messenger-->
		</div>
		<!--end::Chat drawer-->



    <!--begin::Scrolltop-->
    <div id="kt_scrolltop" class="scrolltop" data-kt-scrolltop="true">
        <!--begin::Svg Icon | path: icons/duotune/arrows/arr066.svg-->
        <span class="svg-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="black" />
                <path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="black" />
            </svg>
        </span>
        <!--end::Svg Icon-->
    </div>
    <!--end::Scrolltop-->



   
  </div>
</div>

  
            
    </div>
</template>

<script>
import navbarComponent from './layouts/navbar'

export default {
  name: 'Dashboard',
  components: {
    'navbar-component':navbarComponent,
  },
  data () {
    return {  
      maxToasts: 100,
      position: 'up right',
      closeBtn: true,  
      isLoading: false,  
      errors: [],
      langs: ['id', 'en'],
      name:'',
    }
  },
    watch: { 

    },
    methods: { 	

        fade(sType){  	
        this.isLoading = sType;
        },

        loading(){
          this.fade(true);
          setTimeout(() => {
            this.isLoading = false;
          }, 1000); // hide the message after 3 seconds
        },

      fetchIt() {
        // const userDatas = this.$getUserInfo();
        // this.name = userDatas.sub.name;
        
      },

      logout(){
        this.$logoutUser();
        this.$router.push('/');
      },

    },
    events: {

    },
    created: function() { 
 
    },
	mounted() {
        this.fetchIt();
        this.loading();
    }

}
</script>
<style scoped>

</style>