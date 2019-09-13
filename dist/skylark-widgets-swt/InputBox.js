/**
 * skylark-widgets-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-swt/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/browser","skylark-utils-dom/eventer","skylark-utils-dom/noder","skylark-utils-dom/geom","skylark-utils-dom/query","./swt","./Widget"],function(t,i,s,a,l,n,r,o){var u=o.inherit({klassName:"InputBox",pluginName:"lark.inputbox",_parse:function(){var e=this._velm;this.options.multiline=e.is("textarea");var t=$chk.prop("checked"),i=$chk.prop("disabled");this.state.set("value",t),this.state.set(i)},_create:function(){var e="input",i={},s=this.options;t.each(["rows","spellcheck","maxLength","size","readonly","min","max","step","list","pattern","placeholder","required","multiple"],function(e){i[e]=s[e]}),s.multiline&&(e="textarea"),s.subtype&&(i.type=s.subtype),this._elm=this._dom.noder.createElement(e,i)},_init:function(){},_sync:function(){var e=this;this._velm.on("change",function(t){var i=e._velm.prop("value");e.state.set("value",i)})},_refresh:function(t){void 0!==t.value&&this._velm.value()!==e.value&&this._velm.value(t.value),void 0!==t.disabled&&this._velm.disable(t.disabled),this.overrided(changed)}});return r.InputBox=u});
//# sourceMappingURL=sourcemaps/InputBox.js.map
