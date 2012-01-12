Accessible Spinbutton
===========
This class provides an accessible spinbutton.

![Screenshot](http://www.accessiblemootoolsdemo.iao.fraunhofer.de/Mootools_Widgets/WidgetThumbs/Spinbutton.png)

How to use
----------

	#HTML
	<input id="spinbutton" type="text" value="100"/>
	
	#JS
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