
var demo=new Vue({
    el: "#app",
    mixins:[vueinterval],
    data: {
        createTime: Date.now(),
        tenMinuteCnt:new Date(Date.now()+ 6e5),
        nextNewYear: new Date((new Date().getFullYear() + 1 + "")),
        explodeLimit:0,
        explode: 0,
        livingSecounds: 0,
        binaryRun: true,
        tasks: [{ ttl: 5e5, iid: null }],
    },
    computed:{
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
            var item = { ttl: 1e4,iid:null,active:false };
            this.tasks.push(item);
        },
        startTask: function (t) {
            var fnDel = this.deleteTask;
            t.iid=this.setVueInterval(function () {
                t.ttl -= 1000;
                if (t.ttl <=0)
                    fnDel(t);
                if (t.ttl === 0) t.ttl = "Goodbye!";
            }, 1e3);
        },
        suspendTask: function (t) {
            if (t.iid && !isNaN(t.iid)) t.iid = this.suspendVueInterval(t.iid);
        },
        resumeTask: function (t) {
            if (!t.iid.indexOf('suspended')) {
                t.iid = this.resumeVueInterval(t.iid);
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
        inYear: function (val) {
            var month = new Date(val);
            val = new Date(val);
            var dateArray = val.toISOString().split(/[T:.]/g);
            return month.getMonth() + "." + month.getDate() + ". " + dateArray[1] + ":" + dateArray[2] + ":" + dateArray[3];
        },
        iso: function (val) {
            if (typeof val === 'number')
                val = new Date(val);
            return val.toISOString();
        }
    },
    directives: {
        turning: function (el, binding) {
            if (!binding.value) return;
            var cur = el.style.transform.length ? el.style.transform : "rotate(0deg)";
            cur = Number(cur.replace(/[rotate()deg]/g, ""));
            var turning = "rotate(" + ((cur + 16 * binding.value) % 360) + "deg)";
            el.style.transform = turning;//"rotate(" + turning + "deg);";
        }
    }
})