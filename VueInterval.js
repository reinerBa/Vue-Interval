/**
 * Vue-Interval by Reiner Bamberger 
 * @Url: https://github.com/reinerBa/Vue-Interval
 * @License: MIT
 */

// define a mixin object
var vueinterval = {
    data: { 
        interval_Array: [],
        ticker:0,
        dateNow:Date.now() 
    },
    methods: {
        setVueInterval:function(fn,time){
            var iid = setInterval(fn, time);
            this.interval_Array.push({ fn: fn, time: time, intID: iid });
            return iid;
        },
        removeVueInterval: function (iId) {
            for (var i = 0; i < this.interval_Array.length; i++) {
                if (this.interval_Array[i].intID === iId) {
                    clearInterval(iId);
                    this.interval_Array.splice(i, 1);
                    return true;
                }
            } return false;
        },
        suspendVueInterval: function (iId) {
            var i=0, item;
            while (item = this.interval_Array[i++]) {
                if (item.intID === iId) {
                    clearInterval(iId);
                    item.intID = "suspended" + item.intID;
                    return item.intID;
                }
            }
        },
        resumeVueInterval: function (iId) {
            var i = -1, item;
            while (item = this.interval_Array[++i]) {
                if (item.intID === iId) {
                    var id = setInterval(item.fn, item.time);
                    this.interval_Array[i].intID = id;
                    return id;
                }
            }
        }
    },
    created: function () {
        var self = this;
        function actTicks() {
            self.ticker++;
            self.dateNow = Date.now();
        };
        //save fn for the ticker
        this.interval_Array.push({ fn: actTicks, time: 1e3, intID: null });
        var keys = Object.keys(this);

        for (var i = 0; i < keys.length; i++) {
            if (!keys[i].indexOf("INTERVAL__")) {
                var time = keys[i].substring(10, keys[i].indexOf("$"));
                this.interval_Array.push({ fn: this[keys[i]], time: Number(time), intID: null });
            }
        }
        if(Vue.config.debug)
            console.log('created mixin! ' + this.interval_Array.length);
    },
    mounted: function () {     
        for (var i = 0; i < this.interval_Array.length; i++) {
            if (this.interval_Array[i].intID === null)
                this.interval_Array[i].intID = setInterval(this.interval_Array[i].fn, this.interval_Array[i].time);
        }
    },
    beforeDestroy:function() {
        for (var i = 0; i < this.interval_Array.length; i++) {
            clearInterval(this.interval_Array[i].intID);
        }
    }
}
