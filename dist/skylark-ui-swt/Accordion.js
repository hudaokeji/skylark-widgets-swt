/**
 * skylark-ui-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-swt/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/browser","skylark-utils-dom/eventer","skylark-utils-dom/noder","skylark-utils-dom/geom","skylark-utils-dom/query","skylark-bootstrap3/collapse","./ui","./Widget","./Panel"],function(n,e,l,a,o,i,t,s,c,r){var d=c.inherit({klassName:"Accordion",pluginName:"lark.accordion",options:{panel:{selector:"> .panel",template:null}},_parse:function(){},_init:function(){var n=[];this._velm.$(this.options.panel.selector).forEach(function(e){var l=new d.Panel(e,{});n.push(l)}),this._panels=n},_sync:function(){},_refresh:function(n){},panels:{get:function(){}},addPanel:function(){var n=$template.clone();n.find(".collapse").removeClass("in"),n.find(".accordion-toggle").attr("href","#"+ ++hash).text("Dynamic panel #"+hash),n.find(".panel-collapse").attr("id",hash).addClass("collapse").removeClass("in"),i("#accordion").append(n.fadeIn())},removePanel:function(){},expandPanel:function(){},expandAllPanel:function(){},collapsePanel:function(){},collapseAllPanel:function(){}});return d.Panel=r.inherit({klassName:"AccordionPanel",_init:function(){this.overrided()},expand:function(){i(this._elm).collapse("show")},collapse:function(){this._velm.collapse("hide")},toogle:function(){this._velm.collapse("toogle")},remove:function(){this.overided()}}),d});
//# sourceMappingURL=sourcemaps/Accordion.js.map
