<template>
    <div>

        <div id="error">
        
            <div class="container text-center pt-32">
                <h1 class='error-title'>404</h1>
                <p>{{ $t('page404Desc') }}</p>
                <a :href="this.$settings.endPointApp" class='btn btn-primary'>{{$t('goHOmeDesc')}}</a>
            </div>
        </div>
         
    </div>
</template>


<script>

export default {
  name: 'PageNotFound',
  props: {
    classMenu: {
      type: String,
      required: true
    },
  },
  components: {
  },
  data () {
    return {  
      locale:'',
      name:'',
        
    }
  },
    watch: { 

    },
    methods: { 	
       

    },
    events: {

    },
    created: function() { 
    
    },
	mounted() {
        
        
    }

}
</script>
<style scoped>

</style>