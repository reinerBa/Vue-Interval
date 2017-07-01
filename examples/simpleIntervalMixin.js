/**
 * little mixin for interval handling
 * Snipped from @Url: https://github.com/reinerBa/Vue-Interval
 * @License: WTFPL – Do What the Fuck You Want to Public License 
*/

var simpleIntervalMixin = {
    data:{
        $$intervalStack: []
    },
    methods:{
      addInterval:function(intervalFn, offset){
        this.$data.$$intervalStack.push(setInterval(intervalFn, offset));
      }
    },
    beforeDestroy() {
      this.$data.$$intervalStack.foreach(function(e, idx){
        clearInterval(e);
      })
    },
}
