/**
 * skylark-ui-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-swt/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/browser","skylark-utils-dom/eventer","skylark-utils-dom/noder","skylark-utils-dom/geom","skylark-utils-dom/query","./ui","./_Toggler"],function(e,s,l,c,d,i,o,t){var a=t.inherit({klassName:"Checkbox",pluginName:"lark.checkbox",options:{selectors:{chk:"input[type=checkbox]",lbl:"checkbox-label"},template:void 0,checked:void 0,label:void 0,value:void 0},_parse:function(e,s){s=this.overrided(e,s);var l=i(e),c=s.selectors&&s.selectors.chk,d=s.selectors&&s.selectors.lbl;c||(c=this.options.selectors.chk),d||(d=this.options.selectors.lbl);var o=l.find(c);l.find(d);return void 0==s.checked?s.checked=o.prop("checked"):o.prop("checked",s.checked),void 0==s.disabled?s.disabled=o.prop("disabled"):o.prop("disabled",s.disabled),s},_create:function(){},_init:function(){this._elm;this.$lbl=this._velm.$(this.options.selectors.lbl),this.$chk=this._velm.$(this.options.selectors.chk)},_attach:function(){var e=this;this.$chk.on("change",function(s){var l=e.$chk.prop("checked");e.state.set("checked",l)})},_refresh:function(e){function s(e){var s=c.$chk,l=c.$label,d=c.$toggleContainer;e?(s.prop("checked",!0),l.addClass("checked"),d.removeClass("hide hidden")):(s.prop("checked",!1),l.removeClass("checked"),d.addClass("hidden"))}function l(e){var s=c.$chk,l=c.$label;e?(s.prop("disabled",!0),l.addClass("disabled")):(s.prop("disabled",!1),l.removeClass("disabled"))}this.overrided(changed);var c=this;e.checked&&s(e.checked.value),e.disabled&&l(e.disabled.value)}});return o.Checkbox=a});
//# sourceMappingURL=sourcemaps/Checkbox.js.map
