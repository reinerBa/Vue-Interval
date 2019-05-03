
var demo = new Vue({
  el: '#app',
  mixins: [vueinterval],
  data: {
    createTime: Date.now(),
    tenMinuteCnt: new Date(Date.now() + 6e5),
    nextNewYear: new Date((new Date().getFullYear() + 1 + '')),
    explodeLimit: 0,
    explode: 0,
    livingSecounds: 0,
    binaryRun: true,
    tasks: [{ ttl: 5e5, iid: null }],
    endMessage: 'Goodbye',
    endMessages: [],
    t2interval: 1000,
    t2time: 5000
  },
  computed: {
    nonreactive: function () {
      this.ticker
      return document.getElementById('actMe').value
    }
  },
  methods: {
    calcExplode: function () {
      this.explode = this.explodeLimit - Date.now()
    },
    INTERVAL__1e3$update: function (a) {
      this.livingSecounds += 1 + (a || 0)
    },
    addTask: function () {
      var item = { ttl: 1e4, iid: null }
      this.tasks.push(item)
    },
    addTask2: function () {
      var item = { ttl: 15e3, iid: null }
      var self = this
      var message = this.endMessage
      this.setVueInterval(function () {
        self.endMessages.push('Tick ' + self.ticker + ': My message is ' + message)
      }, this.t2interval, function () { self.endMessages.push('<b>Callback: ' + message + '</b>') }, this.t2time)
    },
    startTask: function (t) {
      var fnDel = this.deleteTask
      t.iid = this.setVueInterval(function () {
        t.ttl -= 1000
        if (t.ttl <= 0) { fnDel(t) }
        if (t.ttl === 0) t.ttl = 'Goodbye!'
      }, 1e3)
    },
    suspendTask: function (t) {
      if (t.iid && !isNaN(t.iid)) t.iid = this.suspendVueInterval(t.iid)
    },
    resumeTask: function (t) {
      if (!t.iid.indexOf('suspended')) {
        t.iid = this.resumeVueInterval(t.iid)
      }
    },
    deleteTask: function (t) {
      this.removeVueInterval(t.iid)
      this.tasks.splice(this.tasks.indexOf(t), 1)
    }

  },
  filters: {
    hhmmssFilter: function (val) {
      if (!val) return ''
      if (typeof val === 'number') { val = new Date(val) }
      var dateArray = val.toISOString().split(/[T:.]/g)
      return dateArray[1] + ':' + dateArray[2] + ':' + dateArray[3]
    },
    inYear: function (val) {
      var month = new Date(val)
      val = new Date(val)
      var dateArray = val.toISOString().split(/[T:.]/g)
      return month.getMonth() + '.' + month.getDate() + '. ' + dateArray[1] + ':' + dateArray[2] + ':' + dateArray[3]
    },
    iso: function (val) {
      if (typeof val === 'number') { val = new Date(val) }
      return val.toISOString()
    }
  },
  directives: {
    turning: function (el, binding) {
      if (!binding.value) return
      var cur = el.style.transform.length ? el.style.transform : 'rotate(0deg)'
      cur = Number(cur.replace(/[rotate()deg]/g, ''))
      var turning = 'rotate(' + ((cur + 16 * binding.value) % 360) + 'deg)'
      el.style.transform = turning// "rotate(" + turning + "deg);";
    }
  }
})

new Vue({
  el: '#app2',
  mixins: [vueinterval],
  methods: {
    changeTicker: function () {
      var newTickerInterval = this.$refs.tickTime.value
      this.adjustVueTickerInterval(newTickerInterval)
    }
  },
  computed: {
    tickerIntervalTime: function () {
      for (var i = 0; i < this.interval_Array.length; i++) {
        if (this.interval_Array[i].iType === 'tickerInterval') { return this.interval_Array[i].time }
      }
    }
  }
})
