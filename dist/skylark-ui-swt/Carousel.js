/**
 * skylark-ui-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-swt/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/browser","skylark-utils-dom/eventer","skylark-utils-dom/noder","skylark-utils-dom/geom","skylark-utils-dom/query","./ui","./Widget","skylark-bootstrap3/carousel"],function(t,s,e,r,a,i,l,n){var o=n.inherit({klassName:"Carousel",pluginName:"lark.carousel",_init:function(){this._bs_carousel=this._velm.carousel(this.options);var t=this;this._velm.on("click.lark","[data-slide],[data-slide-to]",function(s){var e=i(this),r=e.attr("data-slide-to");if(r)t.to(r);else{var a=e.attr("data-slide");"prev"==a?t.prev():t.next()}s.preventDefault()})},to:function(t){return this._bs_carousel.to(t)},pause:function(t){return this._bs_carousel.pause(t),this},cycle:function(t){return this._bs_carousel.cycle(t)},next:function(){return this._bs_carousel.next()},prev:function(){return this._bs_carousel.prev()},add:function(){}});return l.Carousel=o});
//# sourceMappingURL=sourcemaps/Carousel.js.map
