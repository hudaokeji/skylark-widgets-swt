define([
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
  "./ui",
  "./Widget"
],function(langx,browser,eventer,noder,geom,$,ui,Widget){

    'use strict';

     var Progress = ui.Progress = Widget.inherit({
     	klassName : "Progress",

     	pluginName : "lark.progress",

     	options : {
     		selectors : {
     			bar : "progress-bar"
     		},
     		min : 0,
     		max : 100
     	},

     	state : {
     		value : Number
     	},

		_init : function() {
			this._vbar = this._velm.find(this.options.selectors.bar);
			this.value(this.options.min);
		},

		_refresh : function() {
	        this.overrided(changed);
	        var self  = this;

	        if (updates["value"] !== undefined) {
	        	var value = updates["value"],
	        		min = this.options.min,
	        		max = this.options.max;

				this._vbar.css("width",(value-min)/(max-min)*100+"%");
	        }
		},

		start : function(max){
			this.value(this.options.min);
			this._velm.slideDown();
		},

		increase : function(tick){
			var value = this.value();
			this.value(value += tick*1.0);
		},

		finish : function(){
			this.value(this.options.min);
			this._velm.slideUp();
		}     	
     });

	return Progress;
	
 });