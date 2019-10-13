/**
 * skylark-widgets-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-swt/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","skylark-widgets-base/Widget"],function(t,o,r){return r.inherit({pluginName:"lark.toolbar",options:{toolbarFloat:!0,toolbarHidden:!1,toolbarFloatOffset:0,template:'<div class="lark-toolbar"><ul></ul></div>',separator:{template:'<li><span class="separator"></span></li>'}},_init:function(){var t,r;this.opts=this.options,this.wrapper=o(this._elm),this.list=this.wrapper.find("ul"),this.list.on("click",function(t){return!1}),this.wrapper.on("mousedown",(r=this,function(t){return r.list.find(".menu-on").removeClass(".menu-on")})),o(document).on("mousedown.toolbar",function(t){return function(o){return t.list.find(".menu-on").removeClass("menu-on")}}(this)),!this.opts.toolbarHidden&&this.opts.toolbarFloat&&(this.wrapper.css("top",this.opts.toolbarFloatOffset),t=0,function(o){return function(){return o.wrapper.css("position","static"),o.wrapper.width("auto"),o.editor.editable.util.reflow(o.wrapper),o.wrapper.width(o.wrapper.outerWidth()),o.wrapper.css("left",o.editor.editable.util.os.mobile?o.wrapper.position().left:o.wrapper.offset().left),o.wrapper.css("position",""),t=o.wrapper.outerHeight(),o.editor.placeholderEl.css("top",t),!0}}(this))},addToolItem:function(t){return o(t._elm).appendTo(this.list),this},addSeparator:function(){return o(this.options.separator.template).appendTo(this.list),this}})});
//# sourceMappingURL=sourcemaps/Toolbar.js.map
