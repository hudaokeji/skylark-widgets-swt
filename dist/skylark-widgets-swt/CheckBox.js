/**
 * skylark-widgets-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-swt/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-query","./swt","./_Toggler"],function(e,s,d,c,l,o,i,r){var a=r.inherit({klassName:"CheckBox",pluginName:"lark.checkbox",options:{selectors:{chk:"input[type=checkbox]",lbl:"checkbox-label"},template:void 0,checked:void 0,label:void 0,value:void 0},_parse:function(e,s){s=this.overrided(e,s);var d=o(e),c=s.selectors&&s.selectors.chk,l=s.selectors&&s.selectors.lbl;c||(c=this.options.selectors.chk),l||(l=this.options.selectors.lbl);var i=d.find(c);d.find(l);return void 0==s.checked?s.checked=i.prop("checked"):i.prop("checked",s.checked),void 0==s.disabled?s.disabled=i.prop("disabled"):i.prop("disabled",s.disabled),s},_create:function(){},_init:function(){this._elm;this.$lbl=this._velm.$(this.options.selectors.lbl),this.$chk=this._velm.$(this.options.selectors.chk)},_startup:function(){var e=this;this.$chk.on("change",function(s){var d=e.$chk.prop("checked");e.state.set("checked",d)})},_refresh:function(e){this.overrided(changed);var s,d,c,l,o=this;e.checked&&(s=e.checked.value,d=o.$chk,c=o.$label,l=o.$toggleContainer,s?(d.prop("checked",!0),c.addClass("checked"),l.removeClass("hide hidden")):(d.prop("checked",!1),c.removeClass("checked"),l.addClass("hidden"))),e.disabled&&function(e){var s=o.$chk,d=o.$label;e?(s.prop("disabled",!0),d.addClass("disabled")):(s.prop("disabled",!1),d.removeClass("disabled"))}(e.disabled.value)}});return i.CheckBox=a});
//# sourceMappingURL=sourcemaps/CheckBox.js.map
