/**
 * skylark-widgets-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-swt/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/browser","skylark-utils-dom/eventer","skylark-utils-dom/noder","skylark-utils-dom/geom","skylark-utils-dom/query","./swt","./_Toggler"],function(e,s,l,d,c,i,o,t){var r=t.inherit({klassName:"CheckBox",pluginName:"lark.checkbox",options:{selectors:{chk:"input[type=checkbox]",lbl:"checkbox-label"},template:void 0,checked:void 0,label:void 0,value:void 0},_parse:function(e,s){s=this.overrided(e,s);var l=i(e),d=s.selectors&&s.selectors.chk,c=s.selectors&&s.selectors.lbl;d||(d=this.options.selectors.chk),c||(c=this.options.selectors.lbl);var o=l.find(d);l.find(c);return void 0==s.checked?s.checked=o.prop("checked"):o.prop("checked",s.checked),void 0==s.disabled?s.disabled=o.prop("disabled"):o.prop("disabled",s.disabled),s},_create:function(){},_init:function(){this._elm;this.$lbl=this._velm.$(this.options.selectors.lbl),this.$chk=this._velm.$(this.options.selectors.chk)},_startup:function(){var e=this;this.$chk.on("change",function(s){var l=e.$chk.prop("checked");e.state.set("checked",l)})},_refresh:function(e){this.overrided(changed);var s,l,d,c,i=this;e.checked&&(s=e.checked.value,l=i.$chk,d=i.$label,c=i.$toggleContainer,s?(l.prop("checked",!0),d.addClass("checked"),c.removeClass("hide hidden")):(l.prop("checked",!1),d.removeClass("checked"),c.addClass("hidden"))),e.disabled&&function(e){var s=i.$chk,l=i.$label;e?(s.prop("disabled",!0),l.addClass("disabled")):(s.prop("disabled",!1),l.removeClass("disabled"))}(e.disabled.value)}});return o.CheckBox=r});
//# sourceMappingURL=sourcemaps/CheckBox.js.map
