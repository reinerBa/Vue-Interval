
var demo=new Vue({
    el: "#app",
    mixins:[vueinterval],
    data: {
        createTime: "",
        newYear: null,
        explodeLimit:0,
        explode: 0,
        livingSecounds: 0,
        binaryRun: true,
        tasks: [{end:new Date(Date.now()+4e3)}],
    },
    computed:{
        midnight:function(){
            return Date.now();//ticker-
        },
        nonreactive: function () {
            this.ticker ;
            return document.getElementById("actMe").value ;
        },
    },
    methods: {
        calcExplode: function () {
            this.explode = this.explodeLimit - Date.now();
        },
        INTERVAL__1e3$update: function (a) {
            this.livingSecounds+=1+ (a ? a : 0);
        },
        addTask: function () {
            var item = { end: new Date(1e4),iid:null };
            var self = this;
            item.iid=this.setVueInterval(function () {
                item.end -= 1e3;
                if (item.end <= 0)  self.tasks.splice(self.tasks.indexOf(item), 1);
            }, 1e3);
            this.tasks.push(item);
        },
        suspendTask: function (t) {
            if(t.iid)t.iid= this.suspendVueInterval(t.iid);
        },
        resumeTask: function (t) {
            if (!t.iid) {
                var self = this;
                t.iid = this.setVueInterval(function () {
                    item.end -= 1e3;
                    if (item.end <= 0) self.tasks.splice(self.tasks.indexOf(item), 1);
                }, 1e3);
            }
        },
        deleteTask: function (t) {
            this.removeVueInterval(t.iid);
            this.tasks.splice(this.tasks.indexOf(t), 1);
        }

    },
    filters: {
        hhmmssFilter: function (val) {
            if (!val) return "";
            if(typeof val === 'number') 
                val=new Date(val);
            var dateArray = val.toISOString().split(/[T:.]/g);
            return dateArray[1] + ":" + dateArray[2] + ":" + dateArray[3];
        },
        iso: function (val) {
            if (typeof val === 'number')
                val = new Date(val);
            return val.toISOString();
        }
    },
    directives:{
        turning: function (el, binding) {
            if (!binding.value) return;
            var cur = el.style.transform.length ? el.style.transform : "rotate(0deg)";
            cur = Number(cur.replace(/[rotate()deg]/g, ""));
            var turning = "rotate(" + ((cur+16*binding.value) % 360) + "deg)";
            el.style.transform = turning;//"rotate(" + turning + "deg);";
        }
    },
    created: function () {
        this.createTime = Date.now();

        var nextYear = new Date().getFullYear() + 1;
        this.newYear = new Date(nextYear + "-01-01");
    }
})