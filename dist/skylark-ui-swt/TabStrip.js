/**
 * skylark-ui-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-swt/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/browser","skylark-utils-dom/eventer","skylark-utils-dom/noder","skylark-utils-dom/geom","skylark-utils-dom/query","./swt","./Widget","skylark-bootstrap3/tab","skylark-bootstrap3/dropdown"],function(t,s,e,a,n,o,i,r){return r.inherit({klassName:"TabStrip",pluginName:"lark.tabstrip",options:{selectors:{header:".nav-tabs",tab:'[data-toggle="tab"]',content:".tab-content",tabpane:".tab-pane"}},_init:function(){this.$header=this._velm.$(this.options.selectors.header),this.$tabs=this.$header.find(this.options.selectors.tab),this.$content=this._velm.$(this.options.selectors.content),this.$tabpanes=this.$content.find(this.options.selectors.tabpane),this.$header.find('[data-toggle="dropdown"]').dropdown();var t=this;this.$tabs.each(function(s,e){o(e).tab({target:t.$tabpanes[s]})})},add:function(){},remove:function(){}})});
//# sourceMappingURL=sourcemaps/TabStrip.js.map
