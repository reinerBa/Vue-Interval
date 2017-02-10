# Vue-Interval
An interval mixin to call static vue-functions in an interval, update values, get current time and dynamic interval management

- Dependencies: Only Vue.js 2.0

#Features
## Functions
* Automatically recognize Vue-Element methods that starts with Interval__[Timeinterval]$ as interval methods and execute/stop them on dismount
* Add new intervals with setVueInterval.
* Remove manually setted intervals with removeVueInterval
* Suspend manually setted intervals with suspendVueInterval
* Remove manually setted intervals with suspendVueInterval

* [] Execute special fns after dismount
* [] Functions with arguments

## Properties
* Use ticker as a simple secound counter since creation
* or to update computed properties every secound
* use dateNow as Date.now() persistence that gets updated every secound
* [] update intervals adjustable

# Usage
To global register the mixin just add the script


To use the interval feautes include the mixin in a component

    new Vue({
        el: "#app",
        mixins:[vueinterval],
        data: {...

After this you can use the interval variables `ticker` and `dateNow`. The first variable just counts up from zero every secound, where 0 is the moment when the component was created. The secound variable is the current Date.now() which is also updated every secound. 

To write a method in your component which is triggered in interval just use the prefix `INTERVAL__[timeperiod]$` with timeperiod as number like:

    INTERVAL__1e4$myUpdateMethod: function (a) {
            Ajax.get('/update/opentasks');
        }

# Demo 
[Demo](https://reinerba.github.io/Vue-Interval/Demo.html "Demo")

# License
MIT
