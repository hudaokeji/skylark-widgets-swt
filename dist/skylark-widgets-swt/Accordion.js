/**
 * skylark-widgets-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-swt/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-query","skylark-bootstrap3/collapse","./swt","./Widget","./Panel"],function(n,e,o,l,a,i,t,s,c,r){var d=c.inherit({klassName:"Accordion",pluginName:"lark.accordion",options:{panel:{selector:"> .panel",template:null}},_init:function(){var n=[];this._velm.$(this.options.panel.selector).forEach(function(e){var o=new d.Panel(e,{});n.push(o)}),this._panels=n},_post:function(){},_refresh:function(n){},panels:{get:function(){}},addPanel:function(){var n=$template.clone();n.find(".collapse").removeClass("in"),n.find(".accordion-toggle").attr("href","#"+ ++hash).text("Dynamic panel #"+hash),n.find(".panel-collapse").attr("id",hash).addClass("collapse").removeClass("in"),i("#accordion").append(n.fadeIn())},remove:function(){},expand:function(){},expandAll:function(){},collapse:function(){},collapseAll:function(){}});return d.Panel=r.inherit({klassName:"AccordionPanel",_init:function(){this.overrided()},expand:function(){i(this._elm).collapse("show")},collapse:function(){i(this._elm).collapse("hide")},toogle:function(){i(this._elm).collapse("toogle")},remove:function(){this.overided()}}),s.Accordion=d});
//# sourceMappingURL=sourcemaps/Accordion.js.map
