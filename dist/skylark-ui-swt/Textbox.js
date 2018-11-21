/**
 * skylark-ui-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-swt/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/browser","skylark-utils-dom/eventer","skylark-utils-dom/noder","skylark-utils-dom/geom","skylark-utils-dom/query","./ui","./Widget"],function(t,i,a,l,s,r,n,o){var u=n.Textbox=o.inherit({klassName:"Textbox",pluginName:"lark.textbox",_parse:function(){var e=this._velm;this.options.multiline=e.is("textarea");var t=$chk.prop("checked"),i=$chk.prop("disabled");this.state.set("value",t),this.state.set(i)},_create:function(){var e="input",i={},a=this.options;t.each(["rows","spellcheck","maxLength","size","readonly","min","max","step","list","pattern","placeholder","required","multiple"],function(e){i[e]=a[e]}),a.multiline&&(e="textarea"),a.subtype&&(i.type=a.subtype),this._elm=this._dom.noder.createElement(e,i)},_init:function(){},_sync:function(){var e=this;this._velm.on("change",function(t){var i=e._velm.prop("value");e.state.set("value",i)})},_refresh:function(t){var i=this;void 0!==t.value&&i._velm.value()!==e.value&&i._velm.value(t.value),void 0!==t.disabled&&i._velm.disable(t.disabled),this.overrided(changed)}});return u});
//# sourceMappingURL=sourcemaps/Textbox.js.map
