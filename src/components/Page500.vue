<template>
    <div>

        <div id="error">
        
            <div class="container text-center pt-32">
                <h1 class='error-title'>500</h1>
                <p>{{ $t('page500Desc') }}</p>
                <a href="/" class='btn btn-primary'>{{$t('goHOmeDesc')}}</a>
            </div>
        </div>
         
    </div>
</template>


<script>

export default {
  name: 'ServerErrorPage',
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