/**
 * skylark-ui-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-swt/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/browser","skylark-utils-dom/eventer","skylark-utils-dom/noder","skylark-utils-dom/geom","skylark-utils-dom/query","./ui","./Widget"],function(e,t,s,i,r,k,n,c){var h=n._Toggler=c.inherit({klassName:"_Toggler",toggle:function(){var e=this.isChecked();e?this.uncheck():this.check()},check:function(){return this.state.set("checked",!0),this},uncheck:function(){return this.state.set("checked",!1),this},isChecked:function(){return this.state.get("checked")}});return h});
//# sourceMappingURL=sourcemaps/_Toggler.js.map
