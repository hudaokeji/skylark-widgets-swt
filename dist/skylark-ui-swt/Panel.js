/**
 * skylark-ui-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-swt/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/browser","skylark-utils-dom/eventer","skylark-utils-dom/noder","skylark-utils-dom/geom","skylark-utils-dom/query","skylark-bootstrap3/collapse","./ui","./Widget"],function(t,l,a,e,n,o,i,s,r){function u(t){var l,a=t.attr("data-target")||(l=t.attr("href"))&&l.replace(/.*(?=#[^\s]+$)/,"");return o(a)}var c=r.inherit({klassName:"Panel",pluginName:"lark.panel",_init:function(){this._velm.on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(t){var l=o(this);l.attr("data-target")||t.preventDefault();var a=u(l),e=a.collapse("instance");e?e.toggle():a.collapse(l.data())})},expand:function(){o(this._elm).collapse("show")},collapse:function(){this._velm.collapse("hide")},toogle:function(){this._velm.collapse("toogle")},full:function(){},unfull:function(){},toogleFull:function(){},close:function(){var t=this.dom(id);this.minimize(id,!0).promise().then(function(){t.fadeOut()})}});return c});
//# sourceMappingURL=sourcemaps/Panel.js.map
