/**
 * skylark-ui-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-swt/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/browser","skylark-utils-dom/eventer","skylark-utils-dom/noder","skylark-utils-dom/geom","skylark-utils-dom/query","skylark-bootstrap3/collapse","./ui","./Widget","./Panel"],function(e,n,l,o,a,i,t,s,c,r){var d=c.inherit({klassName:"Accordion",pluginName:"lark.accordion",options:{panel:{selector:"> .panel",template:null}},_init:function(){var e=[];this._velm.$(this.options.panel.selector).forEach(function(n){var l=new d.Panel(n,{});e.push(l)}),this._panels=e},_post:function(){},_refresh:function(e){},panels:{get:function(){}},addPanel:function(){var e=$template.clone();e.find(".collapse").removeClass("in"),e.find(".accordion-toggle").attr("href","#"+ ++hash).text("Dynamic panel #"+hash),e.find(".panel-collapse").attr("id",hash).addClass("collapse").removeClass("in"),i("#accordion").append(e.fadeIn())},remove:function(){},expand:function(){},expandAll:function(){},collapse:function(){},collapseAll:function(){}});return d.Panel=r.inherit({klassName:"AccordionPanel",_init:function(){this.overrided()},expand:function(){i(this._elm).collapse("show")},collapse:function(){this._velm.collapse("hide")},toogle:function(){this._velm.collapse("toogle")},remove:function(){this.overided()}}),d});
//# sourceMappingURL=sourcemaps/Accordion.js.map
