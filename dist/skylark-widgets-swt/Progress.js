/**
 * skylark-widgets-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-swt/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-query","./swt","./Widget"],function(s,i,e,t,r,n,o,a){"use strict";return o.Progress=a.inherit({klassName:"Progress",pluginName:"lark.progress",options:{selectors:{bar:"progress-bar"},min:0,max:100},state:{value:Number},_init:function(){this._vbar=this._velm.find(this.options.selectors.bar),this.value(this.options.min)},_refresh:function(){this.overrided(changed);if(void 0!==updates.value){var s=updates.value,i=this.options.min,e=this.options.max;this._vbar.css("width",(s-i)/(e-i)*100+"%")}},start:function(s){this.value(this.options.min),this._velm.slideDown()},increase:function(s){var i=this.value();this.value(i+=1*s)},finish:function(){this.value(this.options.min),this._velm.slideUp()}})});
//# sourceMappingURL=sourcemaps/Progress.js.map
