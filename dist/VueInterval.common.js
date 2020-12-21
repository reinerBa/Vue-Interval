/**
 * Vue-Interval 0.2.0
 * @Url: https://github.com/reinerBa/Vue-Interval
 * @License: MIT, Reiner Bamberger
 */

import Vue from 'vue'
export default{
  data: function () {
    return {
      interval_Array: [],
      ticker: 0,
      dateNow: Date.now()
    }
  },
  methods: {
    setVueInterval: function (fn, delay, endFn, ttl) {
      if (arguments.length === 4) {
        var fnDel = this.removeVueInterval
        var item = { 'fn': null, 'delay': delay, 'intID': null, 'endFn': endFn, 'loops': ttl / delay }
        item.fn = function () {
          fn()
          if (--item.loops <= 0) {
            endFn()
            fnDel(item.intID)
          }
        }
        item.intID = setInterval(item.fn, delay)
        this.interval_Array.push(item)

        return item.intID
      } else if (arguments.length === 2) {
        var iid = setInterval(fn, delay)
        this.interval_Array.push({ fn: fn, delay: delay, intID: iid })
	  }
      return iid
    },
    removeVueInterval: function (iId) {
      for (var i = 0; i < this.interval_Array.length; i++) {
        if (this.interval_Array[i].intID === iId) {
          clearInterval(iId)
          this.interval_Array.splice(i, 1)
          return true
        }
      }
	  return false
    },
    suspendVueInterval: function (iId) {
      var i = 0; var item
      while (item = this.interval_Array[i++]) {
        if (item.intID === iId) {
          clearInterval(iId)
          item.intID = 'suspended' + item.intID
          return item.intID
        }
      }
    },
    resumeVueInterval: function (iId) {
      var i = -1; var item
      while (item = this.interval_Array[++i]) {
        if (item.intID === iId) {
          var id = setInterval(item.fn, item.time)
          this.interval_Array[i].intID = id
          return id
        }
      }
    },
    adjustVueTickerInterval: function (newInterval) {
      newInterval = Number(newInterval)
      if (isNaN(newInterval) || typeof (newInterval) !== 'number' || newInterval < 1) { return }
      for (var i = 0; i < this.interval_Array.length; i++) {
        if (this.interval_Array[i].iType === 'tickerInterval') {
          this.interval_Array[i].time = newInterval
          clearInterval(this.interval_Array[i].intID)
          this.interval_Array[i].intID = setInterval(this.interval_Array[i].fn, this.interval_Array[i].time)
          break
        }
      }
    }
  },
  created: function () {
    var self = this
    function actTicks () {
      self.ticker++
      self.dateNow = Date.now()
    };
    // save fn for the ticker
    this.interval_Array.push({ fn: actTicks, time: 1e3, intID: null, iType: 'tickerInterval' })
    var keys = Object.keys(this)

    for (var i = 0; i < keys.length; i++) {
      if (!keys[i].indexOf('INTERVAL__')) {
        var time = keys[i].substring(10, keys[i].indexOf('$'))
        this.interval_Array.push({ fn: this[keys[i]], time: Number(time), intID: null })
      }
    }
    if (Vue.config.debug) { console.log('created mixin! ' + this.interval_Array.length) }
  },
  mounted: function () {
    for (var i = 0; i < this.interval_Array.length; i++) {
      if (this.interval_Array[i].intID === null) { this.interval_Array[i].intID = setInterval(this.interval_Array[i].fn, this.interval_Array[i].time) }
    }
  },
  beforeDestroy: function () {
    for (var i = 0; i < this.interval_Array.length; i++) {
      clearInterval(this.interval_Array[i].intID)
    }
  }
}
