/**
 * skylark-ui-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-swt/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","./swt","./Widget"],function(t,n,e,a){class s extends a{get klassName(){return"Button"}get pluginName(){return"lark.button"}get options(){return{btnSize:"lg",btnType:"default",leftIcon:null,rightIcon:null,topIcon:null,bottomIcon:null}}get state(){return{text:String}}_parse(e,a){var s=n(e);if((a=t.mixin({},a)).btnType||(s.hasClass("btn-link")?a.btnType="link":s.hasClass("btn-default")?a.btnType="default":s.hasClass("btn-primary")?a.btnType="primary":s.hasClass("btn-info")?a.btnType="info":s.hasClass("btn-success")?a.btnType="success":s.hasClass("btn-warning")?a.btnType="warning":s.hasClass("btn-danger")&&(a.btnType="danger")),a.btnSize||(s.hasClass("btn-xs")?a.btnSize="xs":s.hasClass("btn-sm")?a.btnSize="sm":s.hasClass("btn-lg")&&(a.btnSize="lg")),a.href||(a.href=s.attr("href"),a.target=s.attr("target")),a.text||(a.text=s.find(".text").text()),!a.leftIcon){var l=s.find(".fa-icon-left");l.length>0&&(l.removeClass("fa-icon-left").removeClass("fa"),a.leftIcon=l.attr("class"),l.addClass("fa-icon-left").addClass("fa"))}if(!a.rightIcon){var r=s.find(".fa-icon-right");r.length>0&&(r.removeClass("fa-icon-right").removeClass("fa"),a.rightIcon=r.attr("class"),r.addClass("fa-icon-right").addClass("fa"))}}_refresh(t){super._refresh(t);var n=this._velm;t.btnType&&n.removeClass("btn-link btn-default btn-primary btn-info btn-success btn-warning btn-danger").addClass("btn-"+t.btnType.value),t.btnSize&&n.removeClass("btn-xs btn-sm btn-lg").addClass("btn-"+t.btnSize.value),t.text&&n.$(".text").text(t.text.value),t.left&&(n.$(".fa-icon-left").remove(),n.prepend('<i style="word-spacing: -1em;" class="fa fa-icon-left fa-'+t.iconleft.value+'">&nbsp;</i>\n')),t.iconright&&(n.$(".fa-icon-right").remove(),t.iconright.value&&n.append('<i style="word-spacing: -1em;" class="fa fa-icon-right fa-'+t.iconright.value+'">&nbsp;</i>\n'))}}return a.register(s),e.Button=s});
//# sourceMappingURL=sourcemaps/Button.js.map
