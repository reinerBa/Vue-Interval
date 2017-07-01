# Vue-Interval
[![NPM](https://nodei.co/npm/vue-interval.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-interval/)

An interval mixin to call static vue-functions in an interval, update values, get current time and dynamic interval management

- **Dependencies:** Only Vue.js 2.0
- **Browsers tested:** Chrome, Firefox and IE10+
- **Demo:** [link](https://reinerba.github.io/Vue-Interval/Demo.html "Demo")

# Features

This mixin adds reactive data and method to your components:

## Functions
* Automatically recognize Vue-Element methods that starts with Interval__[Timeinterval]$ as interval methods and execute/stop them on dismount
* Add new intervals with setVueInterval
* Add new intervals with callback function after exceeding interval limit
* Remove manually setted intervals with removeVueInterval
* Suspend manually setted intervals with suspendVueInterval
* Remove manually setted intervals with suspendVueInterval

## Properties
* Use `ticker` as a simple secound counter since creation
* or to update the value non-reactive variables in computed properties every secound
* use `dateNow` as Date.now() persistence that gets updated every secound
* [WIP] update intervals adjustable

# Usage
It's available as npm package now and has a module defintion file for webpack

    npm install vue-interval
    import vueinterval from './VueInterval.common'

To make the mixin globally available for every instance or component just add the script in the head tag (or somewhere in the body)

    <script src="VueInterval.js" type="text/javascript"></script>

And add it to the desired components

    new Vue({
        el: "#app",
        mixins:[vueinterval],
        data: {...

After this you can use the interval variables `ticker` and `dateNow`. The first variable just counts up from zero every secound, where 0 is the moment when the component was created. The secound variable is the current Date.now() which is also updated every secound. 

To write a method in your component which is triggered in interval just use the prefix `INTERVAL__[timeperiod]$` with timeperiod as number like:

    INTERVAL__1e4$myUpdateMethod: function (a) {
            Ajax.get('/update/opentasks');
        }

This method for instance will make an ajax call every 10 secounds `(1e4 => 10.000ms)`.

# License
MIT
