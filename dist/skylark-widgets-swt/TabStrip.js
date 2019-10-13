/**
 * skylark-widgets-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-swt/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-query","./swt","./Widget","skylark-bootstrap3/tab","skylark-bootstrap3/dropdown"],function(t,a,e,s,n,o,r,i){var d=i.inherit({klassName:"TabStrip",pluginName:"lark.tabstrip",options:{selectors:{header:".nav-tabs",tab:'[data-toggle="tab"]',content:".tab-content",tabpane:".tab-pane"}},_init:function(){this.$header=this._velm.$(this.options.selectors.header),this.$tabs=this.$header.find(this.options.selectors.tab),this.$content=this._velm.$(this.options.selectors.content),this.$tabpanes=this.$content.find(this.options.selectors.tabpane),this.$header.find('[data-toggle="dropdown"]').dropdown();var t=this;this.$tabs.each(function(a,e){o(e).tab({target:t.$tabpanes[a]})})},add:function(){},remove:function(){}});return r.TabStrip=d});
//# sourceMappingURL=sourcemaps/TabStrip.js.map
