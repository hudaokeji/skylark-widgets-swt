/**
 * skylark-widgets-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-swt/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-query","./swt","./Widget"],function(e,t,s,k,n,r,c,i){return c._Toggler=i.inherit({klassName:"_Toggler",toggle:function(){this.isChecked()?this.uncheck():this.check()},check:function(){return this.state.set("checked",!0),this},uncheck:function(){return this.state.set("checked",!1),this},isChecked:function(){return this.state.get("checked")}})});
//# sourceMappingURL=sourcemaps/_Toggler.js.map
