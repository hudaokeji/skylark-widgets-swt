/**
 * skylark-widgets-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-swt/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-query","./swt","./Widget"],function(t,i,a,s,l,n,r,o){return r.TextBox=o.inherit({klassName:"TextBox",pluginName:"lark.textbox",_parse:function(){var e=this._velm;this.options.multiline=e.is("textarea");var t=$chk.prop("checked"),i=$chk.prop("disabled");this.state.set("value",t),this.state.set(i)},_create:function(){var e="input",i={},a=this.options;t.each(["rows","spellcheck","maxLength","size","readonly","min","max","step","list","pattern","placeholder","required","multiple"],function(e){i[e]=a[e]}),a.multiline&&(e="textarea"),a.subtype&&(i.type=a.subtype),this._elm=this._dom.noder.createElement(e,i)},_init:function(){},_sync:function(){var e=this;this._velm.on("change",function(t){var i=e._velm.prop("value");e.state.set("value",i)})},_refresh:function(t){void 0!==t.value&&this._velm.value()!==e.value&&this._velm.value(t.value),void 0!==t.disabled&&this._velm.disable(t.disabled),this.overrided(changed)}})});
//# sourceMappingURL=sourcemaps/TextBox.js.map
