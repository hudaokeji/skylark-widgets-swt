/**
 * skylark-ui-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-swt/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/browser","skylark-utils-dom/eventer","skylark-utils-dom/noder","skylark-utils-dom/geom","skylark-utils-dom/query","skylark-bootstrap3/collapse","./ui","./Widget"],function(o,l,t,e,i,s,n,a,r){var c=r.inherit({klassName:"Panel",pluginName:"lark.panel",options:{toggler:{selector:'.panel-heading [data-toggle="collapse"]'},body:{selector:".panel-collapse"}},_init:function(){var o=this;this.$toggle=this._velm.find(this.options.toggler.selector),this.$body=this._velm.find(this.options.body.selector),this.$toggle.on("click.lark",function(l){var t=s(this),e=o.$body.collapse("instance");e?e.toggle():o.$body.collapse(t.data())})},expand:function(){this.$body.collapse("show")},collapse:function(){this.$body.collapse("hide")},toogle:function(){this.body.collapse("toogle")},full:function(){},unfull:function(){},toogleFull:function(){},close:function(){var o=this.dom(id);this.minimize(id,!0).promise().then(function(){o.fadeOut()})}});return c});
//# sourceMappingURL=sourcemaps/Panel.js.map
