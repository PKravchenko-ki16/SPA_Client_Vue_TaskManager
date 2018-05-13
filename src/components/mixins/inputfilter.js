export const inputfilter = {
    data(){
      return {

      }
    },
    methods: {
    filter(value)
    { 
        return value.replace(/[/{}*<>"';]/g, '');
    },
    }
  }
  