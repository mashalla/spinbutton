/*
---
script: spinbutton.js
description: ---
license: MIT-style license
authors:
- Christian Merz
requires:
- core:1.3.2/Element.Event
provides: [spinbutton]
...
*/
var Spinbutton = new Class({
    Implements: [Options, Events],
    
    options: {
        classPrefix: 'MooAccessSpinButton',
        start: 10.0,
        min: 0,
        max: 100,
        stepsize: 1.0,
        incrementalStep: 10,
        spinbutton: null,
        watchertime: 600,
        steptime: 300,
        minStepperSize: 30,
        treshold: 25
    },
    initialize: function(options){
        this.setOptions(options);
        if (!this.options.spinbutton) {
            return;
        }
        this.currentValue = this.options.start;
        this.options.spinbutton.addClass(this.options.classPrefix + 'Input')
        var container = new Element('div', {
            'class': this.options.classPrefix + 'Container'
        }).wraps(this.options.spinbutton);
        this.options.spinbutton.setProperties({
            'value': this.currentValue,
            'role': 'spinbutton',
            'tabindex': '0',
            'aria-valuenow': this.currentValue,
            'aria-valuemax': this.options.max,
            'aria-valuemin': this.options.min
        });
        this.up = new Element('div', {
            'class': this.options.classPrefix + 'Up'
        }).inject(this.options.spinbutton, 'after');
        this.down = new Element('div', {
            'class': this.options.classPrefix + 'Down'
        }).inject(this.options.spinbutton, 'after');
     //   var conHeight = container.getHeight() / 2 - 2;
     //   this.up.setStyle('height', conHeight);
     //   this.down.setStyles({
     //       height: (conHeight),
     //       top: (conHeight + 1)
     //   });
        this.initEvents();
    },
    increase: function(step){
        this.checkCurrentValue();
        if (!step) 
            var stepsize = this.options.stepsize
        else 
            var stepsize = parseInt(step);
        this.currentValue = this.currentValue + stepsize;
        if (this.currentValue > this.options.max) 
            this.currentValue = this.options.max;
        this.setValue();
    },
    decrease: function(step){
        this.checkCurrentValue();
        if (!step) 
            var stepsize = this.options.stepsize
        else 
            var stepsize = parseInt(step);
        this.currentValue = this.currentValue - stepsize;
        if (this.currentValue < this.options.min) 
            this.currentValue = this.options.min;
        this.setValue();
    },
    checkCurrentValue: function(){
        this.currentValue = parseInt(this.options.spinbutton.getProperty('value'));
        if (!this.currentValue) 
            this.currentValue = 0
    },
    setValue: function(){
        this.options.spinbutton.setProperties({
            'value': this.currentValue,
            'aria-valuenow': this.currentValue
        });
    },
    initEvents: function(){
        var self = this;
        self.options.spinbutton.addEvent('keydown', function(e){
            switch (e.key) {
                case 'up':
                    e.stop();
                    self.increase();
                    break;
                case 'down':
                    e.stop();
                    self.decrease();
                    break;
                case 'home':
                    e.stop();
                    self.currentValue = self.options.max;
                    self.setValue();
                    break;
                case 'end':
                    e.stop();
                    self.currentValue = self.options.min;
                    self.setValue();
                    break;
                case 'pageup':
                    e.stop();
                    self.increase(self.options.incrementalStep);
                    break;
                case 'pagedown':
                    e.stop();
                    self.decrease(self.options.incrementalStep);
                    break;
            }
        });
        var automaticIncrease = function(){
            self.increase();
        };
        var automaticDecrease = function(){
            self.decrease();
        };
        self.up.addEvents({
            'mousedown': function(e){
                var stepper = self.options.steptime
                self.increase();
                self.timer = automaticIncrease.periodical(stepper);
                self.watcher = function(){
                    if (stepper > self.options.minStepperSize) {
                        stepper = parseInt(stepper / (self.options.steptime / (stepper - self.options.treshold)));
                        if (stepper > self.options.minStepperSize) {
                            clearInterval(self.timer);
                            self.timer = automaticIncrease.periodical(stepper);
                        }
                        else {
                            stepper = self.options.minStepperSize;
                            clearInterval(self.timer);
                            self.timer = automaticIncrease.periodical(stepper);
                        }
                    }
                    else {
                        clearInterval(self.watcher);
                    }
                }
.periodical(self.options.watchertime);
            },
            'mouseup': function(e){
                clearInterval(self.watcher);
                clearInterval(self.timer);
            },
            'mouseout': function(e){
                clearInterval(self.watcher);
                clearInterval(self.timer);
            }
        });
        self.down.addEvents({
            'mousedown': function(e){
                var stepper = self.options.steptime
                self.decrease();
                self.timer = automaticDecrease.periodical(stepper);
                self.watcher = function(){
                    if (stepper > self.options.minStepperSize) {
                        stepper = parseInt(stepper / (self.options.steptime / (stepper - self.options.treshold)));
                        if (stepper > self.options.minStepperSize) {
                            clearInterval(self.timer);
                            self.timer = automaticDecrease.periodical(stepper);
                        }
                        else {
                            stepper = self.options.minStepperSize;
                            clearInterval(self.timer);
                            self.timer = automaticDecrease.periodical(stepper);
                        }
                    }
                    else {
                    
                        clearInterval(self.watcher);
                    }
                }
.periodical(self.options.watchertime);
            },
            'mouseup': function(e){
                clearInterval(self.watcher);
                clearInterval(self.timer);
            },
            'mouseout': function(e){
                clearInterval(self.watcher);
                clearInterval(self.timer);
            }
        });
    }
});

var Spinbuttons = new Class({
    Implements: [Options, Events],
    
    options: {
        classPrefix: 'MooAccessSpinButton',
        value: 'button',
        role: 'presentation',
        ariaLabel: null,
        additionalClass: null,
        clickFunction: function(e){
        }
    },
    initialize: function(options){
        this.setOptions(options);
        
        this.button = new Element('input', {
            'type': 'button',
            'value': this.options.value,
            'class': this.options.classPrefix,
            'role': this.options.button
        });
        if (this.options.ariaLabel) {
            this.button.setProperty('aria-label', this.options.ariaLabel)
        }
        if (this.options.additionalClass) {
            this.button.addClass(this.options.additionalClass)
        }
        this.button.addEvent('click', this.options.clickFunction)
    }
});
