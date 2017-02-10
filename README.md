# Vue-Interval
An interval mixin to call static vue-functions in an interval, update values, get current time and dynamic interval management
Only compatible with vue 2.0.

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

# Status
I want to have all relevant functions till 2017.

# Usage

# Demo 
[Demo](https://reinerba.github.io/Vue-Interval/Demo.html "Demo")
