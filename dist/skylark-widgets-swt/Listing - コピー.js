/**
 * skylark-widgets-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-swt/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","./swt","./Widget"],function(e,t,i,s){var l=s.inherit({klassName:"Listing",pluginName:"lark.listing",options:{multiSelect:!1,multiTier:{mode:"",levels:2,selectors:{children:"> ul",hasChildren:":has(ul)"},classes:{expandIcon:"glyphicon glyphicon-plus",collapseIcon:"glyphicon glyphicon-minus",children:""},templates:{tree:{item:'<span><i class="glyphicon"></i><a href="javascript: void(0);"></a> </span>',itemGroup:""}}},toggle:!1,classes:{active:"active"},selectors:{item:"li"},selected:0},state:{selected:Object},_init:function(){this.overrided();var e=this,i=this._velm,s=this.options.selectors.item;this._$items=i.$(s),i.on("click",s,function(){var t=e._elmx(this);if(!t.hasClass("disabled")){var i=t.data("value");void 0===i&&(i=e._$items.index(this)),e.state.set("selected",i)}return!1}),this.state.set("selected",this.options.selected);var l=i,a=this.options.toggle;"tree"==this.options.multiTier.mode&&l.query(this.options.selectors.item).each(function(){if(t(this).is(e.options.multiTier.selectors.hasChildren)){var i=t(this).find(" > ul");t(i).remove(),text=t(this).text().trim(),t(this).html(e.options.multiTier.templates.tree.item),t(this).find(" > span > i").addClass("glyphicon-folder-open"),t(this).find(" > span > a").text(text),t(this).append(i)}else text=t(this).text().trim(),t(this).html(e.options.multiTier.templates.tree.item),t(this).find(" > span > i").addClass("glyphicon-file"),t(this).find(" > span > a").text(text)}),l.query("li.active").has("ul").children("ul").addClass("collapse in"),l.query("li").not(".active").has("ul").children("ul").addClass("collapse"),l.query("li").has("ul").find("a").on("click."+this.pluginName,function(e){e.preventDefault(),t(this).closest("li").toggleClass("active").children("ul").collapse("toggle"),a&&t(this).closest("li").siblings().removeClass("active").children("ul.in").collapse("hide")})},_refresh:function(t){this.overrided(t);var i=this;function s(t){return e.isNumber(t)?i._$items.eq(t):i._$items.filter('[data-value="'+t+'"]')}t.selected&&(this.options.multiSelect||(s(t.selected.oldValue).removeClass(i.options.classes.active),function(e){s(e).addClass(i.options.classes.active)}(t.selected.value)))}});return i.Listing=l});
//# sourceMappingURL=sourcemaps/Listing - コピー.js.map
