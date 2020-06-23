/**
 * skylark-widgets-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-swt/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-query","skylark-bootstrap3/collapse","./swt","./Widget"],function(o,l,e,t,n,i,s,a,c){return c.inherit({klassName:"Panel",pluginName:"lark.panel",options:{toggler:{selector:'.panel-heading [data-toggle="collapse"]'},body:{selector:".panel-collapse"}},_init:function(){var o=this;this.$toggle=this._velm.find(this.options.toggler.selector),this.$body=this._velm.find(this.options.body.selector),this.$toggle.on("click.lark",function(l){var e=i(this),t=o.$body.collapse("instance");t?t.toggle():o.$body.collapse(e.data())})},expand:function(){this.$body.collapse("show")},collapse:function(){this.$body.collapse("hide")},toogle:function(){this.body.collapse("toogle")},full:function(){},unfull:function(){},toogleFull:function(){},close:function(){var o=this.dom(id);this.minimize(id,!0).promise().then(function(){o.fadeOut()})}})});
//# sourceMappingURL=sourcemaps/Panel.js.map
