//return true if char is a number
  export default {
    methods:{
      isNumber: function(text){
        
        if(text) {
          var reg = new RegExp('[0-9]+$');
          return reg.test(text);
        }
        return false;

      },
      removeSpecial: function(text){
        if (/^\W$/.test(text.key)) {
            text.preventDefault();
        }
      },
    }
   }