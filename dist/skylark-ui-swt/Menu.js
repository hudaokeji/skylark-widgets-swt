/**
 * skylark-ui-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-swt/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/browser","skylark-utils-dom/eventer","skylark-utils-dom/noder","skylark-utils-dom/geom","skylark-utils-dom/query","./swt","./Widget"],function(e,t,a,i,n,s,o,l){var r,c=null,h=o.Menu=l.inherit({klassName:"Menu",pluginName:"lark.menu",init:function(t,a){a||(a=t,t=null);var n,o=this;this._options=e.mixin({hide_onmouseleave:0,icons:!0},a);var l=!1;(n=this.$el=s(t||"<ul class='vakata-context'></ul>")).on("mouseenter","li",function(e){e.stopImmediatePropagation(),i.contains(this,e.relatedTarget)||(l&&clearTimeout(l),n.find(".vakata-context-hover").removeClass("vakata-context-hover").end(),s(this).siblings().find("ul").hide().end().end().parentsUntil(".vakata-context","li").addBack().addClass("vakata-context-hover"),o._show_submenu(this))}).on("mouseleave","li",function(e){i.contains(this,e.relatedTarget)||s(this).find(".vakata-context-hover").addBack().removeClass("vakata-context-hover")}).on("mouseleave",function(e){s(this).find(".vakata-context-hover").removeClass("vakata-context-hover"),o._options.hide_onmouseleave&&(l=setTimeout(function(){o.hide()},o._options.hide_onmouseleave))}).on("click","a",function(e){e.preventDefault(),s(this).blur().parent().hasClass("vakata-context-disabled")||!1===o._execute(s(this).attr("rel"))||o.hide()}).on("keydown","a",function(e){var t=null;switch(e.which){case 13:case 32:e.type="click",e.preventDefault(),s(e.currentTarget).trigger(e);break;case 37:o.$el.find(".vakata-context-hover").last().closest("li").first().find("ul").hide().find(".vakata-context-hover").removeClass("vakata-context-hover").end().end().children("a").focus(),e.stopImmediatePropagation(),e.preventDefault();break;case 38:(t=o.$el.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").prevAll("li:not(.vakata-context-separator)").first()).length||(t=o.$el.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").last()),t.addClass("vakata-context-hover").children("a").focus(),e.stopImmediatePropagation(),e.preventDefault();break;case 39:o.$el.find(".vakata-context-hover").last().children("ul").show().children("li:not(.vakata-context-separator)").removeClass("vakata-context-hover").first().addClass("vakata-context-hover").children("a").focus(),e.stopImmediatePropagation(),e.preventDefault();break;case 40:(t=o.$el.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").nextAll("li:not(.vakata-context-separator)").first()).length||(t=o.$el.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").first()),t.addClass("vakata-context-hover").children("a").focus(),e.stopImmediatePropagation(),e.preventDefault();break;case 27:o.hide(),e.preventDefault()}}).on("keydown",function(e){e.preventDefault();var t=o.$el.find(".vakata-contextmenu-shortcut-"+e.which).parent();t.parent().not(".vakata-context-disabled")&&t.click()}),this.render()},render:function(){var e=this._options.items;this._parse(e)&&this.$el.html(this.html),this.$el.width("")},_trigger:function(e){s(document).trigger("context_"+e+".sbswt",{reference:this.reference,element:this.$el,position:{x:this.position_x,y:this.position_y}})},_execute:function(t){return!(!(t=this.items[t])||t._disabled&&(!e.isFunction(t._disabled)||t._disabled({item:t,reference:this.reference,element:this.$el}))||!t.action)&&t.action.call(null,{item:t,reference:this.reference,element:this.$el,position:{x:this.position_x,y:this.position_y}})},_parse:function(t,a){var i=this,n=i._options.reference;if(!t)return!1;a||(i.html="",i.items=[]);var s,o="",l=!1;return a&&(o+="<ul>"),e.each(t,function(t,a){if(!a)return!0;i.items.push(a),!l&&a.separator_before&&(o+="<li class='vakata-context-separator'><a href='#' "+(i._options.icons?"":'style="margin-left:0px;"')+">&#160;</a></li>"),l=!1,o+="<li class='"+(a._class||"")+(!0===a._disabled||e.isFunction(a._disabled)&&a._disabled({item:a,reference:n,element:i.$el})?" vakata-contextmenu-disabled ":"")+"' "+(a.shortcut?" data-shortcut='"+a.shortcut+"' ":"")+">",o+="<a href='#' rel='"+(i.items.length-1)+"' "+(a.title?"title='"+a.title+"'":"")+">",i._options.icons&&(o+="<i ",a.icon&&(-1!==a.icon.indexOf("/")||-1!==a.icon.indexOf(".")?o+=" style='background:url(\""+a.icon+"\") center center no-repeat' ":o+=" class='"+a.icon+"' "),o+="></i><span class='vakata-contextmenu-sep'>&#160;</span>"),o+=(e.isFunction(a.label)?a.label({item:t,reference:n,element:i.$el}):a.label)+(a.shortcut?' <span class="vakata-contextmenu-shortcut vakata-contextmenu-shortcut-'+a.shortcut+'">'+(a.shortcut_label||"")+"</span>":"")+"</a>",a.submenu&&(s=i._parse(a.submenu,!0))&&(o+=s),o+="</li>",a.separator_after&&(o+="<li class='vakata-context-separator'><a href='#' "+(i._options.icons?"":'style="margin-left:0px;"')+">&#160;</a></li>",l=!0)}),o=o.replace(/<li class\='vakata-context-separator'\><\/li\>$/,""),a&&(o+="</ul>"),a||(i.html=o,i._trigger("parse")),o.length>10&&o},_show_submenu:function(e){if((e=s(e)).length&&e.children("ul").length){var t=e.children("ul"),a=e.offset().left,i=a+e.outerWidth(),n=e.offset().top,o=t.width(),l=t.height(),c=s(window).width()+s(window).scrollLeft(),h=s(window).height()+s(window).scrollTop();r?e[i-(o+10+e.outerWidth())<0?"addClass":"removeClass"]("vakata-context-left"):e[i+o>c&&a>c-i?"addClass":"removeClass"]("vakata-context-right"),n+l+10>h&&t.css("bottom","-1px"),e.hasClass("vakata-context-right")?a<o&&t.css("margin-right",a-o):c-i<o&&t.css("margin-left",c-i-o),t.show()}},show:function(e,t,a){var i,n,o,l,h,d,u,v;switch(!0){case!t&&!e:return!1;case!!t&&!!e:this.reference=e,this.position_x=t.x,this.position_y=t.y;break;case!t&&!!e:this.reference=e,i=e.offset(),this.position_x=i.left+e.outerHeight(),this.position_y=i.top;break;case!!t&&!e:this.position_x=t.x,this.position_y=t.y}e&&!a&&s(e).data("vakata_contextmenu")&&(a=s(e).data("vakata_contextmenu")),this.items.length&&(this.$el.appendTo(document.body),n=this.$el,o=this.position_x,l=this.position_y,h=n.width(),d=n.height(),u=s(window).width()+s(window).scrollLeft(),v=s(window).height()+s(window).scrollTop(),r&&(o-=n.outerWidth()-s(e).outerWidth())<s(window).scrollLeft()+20&&(o=s(window).scrollLeft()+20),o+h+20>u&&(o=u-(h+20)),l+d+20>v&&(l=v-(d+20)),this.$el.css({left:o,top:l}).show().find("a").first().focus().parent().addClass("vakata-context-hover"),this.is_visible=!0,c=this,this._trigger("show"))},hide:function(){this.is_visible&&(this.$el.hide().find("ul").hide().end().find(":focus").blur().end().detach(),this.is_visible=!1,c=null,this._trigger("hide"))}});return s(function(){r="rtl"===s(document.body).css("direction"),s(document).on("mousedown.sbswt.popup",function(e){c&&c.$el[0]!==e.target&&!i.contains(c.$el[0],e.target)&&c.hide()}).on("context_show.sbswt.popup",function(e,t){c.$el.find("li:has(ul)").children("a").addClass("vakata-context-parent"),r&&c.$el.addClass("vakata-context-rtl").css("direction","rtl"),c.$el.find("ul").hide().end()})}),h.popup=function(e,t,a){new h({reference:e,items:a}).show(e,t)},h.hide=function(){c&&c.hide()},h});
//# sourceMappingURL=sourcemaps/Menu.js.map
