/*
---

name: Accessible Spinbutton

description: demo application

license: MIT-style license

authors:
 - Christian Merz

requires:
 - Core/1.2.4: *
 
provides: []
 
...
*/
window.addEvent('domready', function(){

    var spinbutton = new Spinbutton({
		'start':10,
		'min':0,
		'max':1000,
		'stepsize':1,
		'incrementalStep':10,
		'spinbutton':$('spinbutton')
	});
});