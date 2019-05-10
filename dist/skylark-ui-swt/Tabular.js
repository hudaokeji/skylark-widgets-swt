/**
 * skylark-ui-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-swt/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/browser","skylark-utils-dom/eventer","skylark-utils-dom/noder","skylark-utils-dom/geom","skylark-utils-dom/query","./swt","./Widget"],function(e,t,n,o,l,r,i,a){a.inherit({klassName:"Tabular",pluginName:"lark.tabular",options:{buttonClasses:{append:null,removeLast:null,insert:null,remove:null,moveUp:null,moveDown:null,rowDrag:null},sectionClasses:{caption:null,header:null,body:null,subPanel:null,footer:null},hideButtons:{append:!1,removeLast:!1,insert:!1,remove:!1,moveUp:!1,moveDown:!1}}});var s={caption:null,captionTooltip:null,initRows:3,maxRowsAllowed:0,initData:null,columns:null,i18n:null,idPrefix:null,rowDragging:!1,hideButtons:null,hideRowNumColumn:!1,rowButtonsInFront:!1,rowCountName:"_RowCount",buttonClasses:null,sectionClasses:null,customGridButtons:null,customRowButtons:null,customFooterButtons:null,useSubPanel:!1,maintainScroll:!1,maxBodyHeight:0,autoColumnWidth:!0},u={nameFormatter:null,dataLoaded:null,rowDataLoaded:null,afterRowAppended:null,afterRowInserted:null,afterRowSwapped:null,beforeRowRemove:null,afterRowRemoved:null,afterRowDragged:null,subPanelBuilder:null,subPanelGetter:null,maxNumRowsReached:null},d={type:"text",name:null,value:null,display:null,displayCss:null,displayTooltip:null,headerSpan:1,cellCss:null,ctrlAttr:null,ctrlProp:null,ctrlCss:null,ctrlClass:null,ctrlOptions:null,uiOption:null,uiTooltip:null,resizable:!1,invisible:!1,emptyCriteria:null,customBuilder:null,customGetter:null,customSetter:null,onClick:null,onChange:null},c={noColumnInfo:"Cannot initial grid without column information!",elemNotTable:"Cannot initial grid on element other than TABLE!",notInit:"`appendGrid` does not initialized",getValueMultiGrid:"Cannot get values on multiple grid",notSupportMethod:"Method is not supported by `appendGrid`: "},m={append:"Append Row",removeLast:"Remove Last Row",insert:"Insert Row Above",remove:"Remove Current Row",moveUp:"Move Up",moveDown:"Move Down",rowDrag:"Sort Row",rowEmpty:"This Grid Is Empty"},p={append:null,removeLast:null,insert:null,remove:null,moveUp:null,moveDown:null,rowDrag:null},h={caption:null,header:null,body:null,subPanel:null,footer:null},f={append:!1,removeLast:!1,insert:!1,remove:!1,moveUp:!1,moveDown:!1},w={init:function(e){if(this.length>0){if(!r.isArray(e.columns)||0==e.columns.length)return alert(c.noColumnInfo),this;var t,n,o,l,i,a,w,v=this[0];if(P(v.tagName)||"TABLE"!=v.tagName)return alert(c.elemNotTable),this;var b,y,B=r.extend({},s,u,e);r.extend(B,{_uniqueIndex:0,_rowOrder:[],_isDataLoaded:!1,_visibleCount:0,_finalColSpan:0,_hideLastColumn:!1,_wrapperId:null,_calculateWidth:!0}),r.isPlainObject(e.i18n)?B._i18n=r.extend({},m,e.i18n):B._i18n=r.extend({},m),r.isPlainObject(e.buttonClasses)?B._buttonClasses=r.extend({},p,e.buttonClasses):B._buttonClasses=r.extend({},p),r.isPlainObject(e.sectionClasses)?B._sectionClasses=r.extend({},h,e.sectionClasses):B._sectionClasses=r.extend({},h),r.isPlainObject(e.hideButtons)?B.hideButtons=r.extend({},f,e.hideButtons):B.hideButtons=r.extend({},f),P(B.idPrefix)&&(P(v.id)||""==v.id?B.idPrefix="ag"+(new Date).getTime():B.idPrefix=v.id),r.isPlainObject(B.customGridButtons)||(B.customGridButtons={}),B.useSubPanel&&B.rowDragging&&(B.rowDragging=!1),(n=document.createElement("thead")).className="ui-widget-header",(o=document.createElement("tbody")).className="ui-widget-content",(l=document.createElement("tfoot")).className="ui-widget-header",i=document.createElement("colgroup"),B._wrapperId=B.idPrefix+"-wrapper",t=document.createElement("div"),r(t).attr("id",B._wrapperId).addClass("appendGrid").insertAfter(v),r(v).empty().addClass("ui-widget").appendTo(t),B.maxBodyHeight>0?(r("<table></table>").addClass("ui-widget head").append(n).prependTo(t),r(v).addClass("body").wrap(r("<div></div>").addClass("scroller").css("max-height",B.maxBodyHeight)).append(i,o),r("<table></table>").addClass("ui-widget foot").append(l).appendTo(t)):r(v).addClass("head body foot").append(i,n,o,l),n.appendChild(a=document.createElement("tr")),B._sectionClasses.header?a.className="columnHead "+B._sectionClasses.header:a.className="columnHead",B.hideRowNumColumn||(a.appendChild(b=document.createElement("td")),b.className="ui-widget-header first",i.appendChild(document.createElement("col")));for(var S=0,I=0;I<B.columns.length;I++){var D=r.extend({},d,B.columns[I]);if(B.columns[I]=D,"hidden"!=B.columns[I].type)if(B.columns[I].invisible||B._visibleCount++,0==S){var E="ui-widget-header";B.columns[I].invisible&&(E+=" invisible"),B.columns[I].resizable&&(E+=" resizable"),a.appendChild(w=document.createElement("td")),w.id=B.idPrefix+"_"+B.columns[I].name+"_td_head",w.className=E,B.columns[I].displayCss&&r(w).css(B.columns[I].displayCss),B.columns[I].headerSpan>1&&(r(w).attr("colSpan",B.columns[I].headerSpan),S=B.columns[I].headerSpan-1),r.isPlainObject(B.columns[I].displayTooltip)?r(w).tooltip(B.columns[I].displayTooltip):P(B.columns[I].displayTooltip)||r(w).attr("title",B.columns[I].displayTooltip).tooltip(),r.isFunction(B.columns[I].display)?B.columns[I].display(w):P(B.columns[I].display)||r(w).text(B.columns[I].display),i.appendChild(document.createElement("col"))}else S--}if(P(jQuery.ui.resizable)||r("td.resizable",n).resizable({handles:"e"}),B.hideButtons.insert&&B.hideButtons.remove&&B.hideButtons.moveUp&&B.hideButtons.moveDown&&(!r.isArray(B.customRowButtons)||0==B.customRowButtons.length)&&(B._hideLastColumn=!0),B._finalColSpan=B._visibleCount,B.hideRowNumColumn||B._finalColSpan++,B._hideLastColumn||B._finalColSpan++,B._hideLastColumn||(B.rowButtonsInFront?B.hideRowNumColumn?a.insertBefore(y=document.createElement("td"),a.firstChild):a.insertBefore(y=document.createElement("td"),a.childnodes[1]):a.appendChild(y=document.createElement("td")),y.className="ui-widget-header last",y.id=B.idPrefix+"_last_td_head",i.appendChild(document.createElement("col"))),B.caption&&(n.insertBefore(a=document.createElement("tr"),n.firstChild),B._sectionClasses.caption&&(a.className=B._sectionClasses.caption),a.appendChild(w=document.createElement("td")),w.id=B.idPrefix+"_caption_td",w.className="ui-state-active caption",w.colSpan=B._finalColSpan,r.isPlainObject(B.captionTooltip)?r(w).tooltip(B.captionTooltip):P(B.captionTooltip)||r(w).attr("title",B.captionTooltip).tooltip(),r.isFunction(B.caption)?B.caption(w):r(w).text(B.caption)),l.appendChild(a=document.createElement("tr")),B._sectionClasses.footer&&(a.className=B._sectionClasses.footer),a.appendChild(w=document.createElement("td")),w.id=B.idPrefix+"_footer_td",w.colSpan=B._finalColSpan,r("<input/>").attr({type:"hidden",id:B.idPrefix+"_rowOrder",name:B.idPrefix+"_rowOrder"}).appendTo(w),!B.hideButtons.append||!B.hideButtons.removeLast||r.isArray(B.customFooterButtons)&&0!=B.customFooterButtons.length){if(!B.hideButtons.append){var G=k(B.customGridButtons.append,"ui-icon-plusthick").attr({title:B._i18n.append}).addClass("append").click(function(e){return _(v,1,null,null),e&&e.preventDefault&&e.preventDefault(),!1}).appendTo(w);P(B._buttonClasses.append)||G.addClass(B._buttonClasses.append)}if(!B.hideButtons.removeLast){G=k(B.customGridButtons.removeLast,"ui-icon-closethick").attr({title:B._i18n.removeLast}).addClass("removeLast").click(function(e){return C(v,null,this.value,!1),e&&e.preventDefault&&e.preventDefault(),!1}).appendTo(w);P(B._buttonClasses.removeLast)||G.addClass(B._buttonClasses.removeLast)}if(B.customFooterButtons&&B.customFooterButtons.length){for(var F=B.customFooterButtons.length-1;F>=0;F--){(L=B.customFooterButtons[F])&&L.uiButton&&L.click&&L.atTheFront&&r(w).prepend(g(v,L))}for(F=0;F<B.customFooterButtons.length;F++){var L;(L=B.customFooterButtons[F])&&L.uiButton&&L.click&&!L.atTheFront&&r(w).append(g(v,L))}}}else a.style.display="none";B.rowDragging&&r(o).sortable({axis:"y",containment:v,handle:".rowDrag",helper:function(e,t){var n=t.children(),o=t.clone();return o.children().each(function(e){r(this).width(n.eq(e).width());var t=r("select",this);if(t.length>0)for(var o=0;o<t.length;o++){var l=n.eq(e).find("select");l.length>o&&(t[o].value=l[o].value)}}),o},update:function(e,t){var o=t.item[0].id.substring(t.item[0].id.lastIndexOf("_")+1),l=t.item[0].rowIndex-r("tr",n).length;!function(e,t,n,o){for(var l=r(e).data("appendGrid"),i=-1,a=0;a<l._rowOrder.length;a++)if(l._rowOrder[a]==n){t?(i=o,l._rowOrder.splice(a,1),l._rowOrder.splice(o,0,n)):(i=a,l._rowOrder.splice(o+1,0,n),l._rowOrder.splice(a,1));break}O(e,i),N(e,l),r.isFunction(l.afterRowDragged)&&l.afterRowDragged(e,o,n)}(v,t.originalPosition.top>t.position.top,o,l)}}),r(v).data("appendGrid",B),r.isArray(e.initData)?R(v,e.initData,!0):r(v).appendGrid("appendRow",B.initRows),0==B._rowOrder.length&&x(t,B,!0),B.maxBodyHeight>0&&(B.autoColumnWidth?T(t):r("table.foot",t).width(r(v).width()))}return this},isReady:function(){return!!v(this,!0)},isDataLoaded:function(){var e=v(this);return!!e&&e._isDataLoaded},load:function(e){return v(this)&&(null!=e&&e.length>0?R(this[0],e,!1):y(this[0])),this},appendRow:function(e){return this.appendGrid("insertRow",e)},insertRow:function(e,t,n){var o=v(this);if(o&&(r.isArray(e)&&e.length>0||r.isNumeric(e)&&e>0)){var l=this[0];if(insertResult=_(l,e,t,n),r.isNumeric(t)||r.isNumeric(n)){O(l,insertResult.rowIndex);var i=o._rowOrder[insertResult.addedRows[0]];r("#"+o.idPrefix+"_Insert_"+i,l).focus()}}return this},removeRow:function(e,t){var n=v(this);return n&&n._rowOrder.length>0&&C(this[0],e,t,!0),this},emptyGrid:function(){return v(this)&&y(this[0]),target},moveUpRow:function(e,t){var n=v(this);if(n){var o,l,i,a,s=this[0],u=null,d=s.getElementsByTagName("tbody")[0];r.isNumeric(e)&&e>0&&e<n._rowOrder.length?(u=e,t=n._rowOrder[e]):r.isNumeric(t)&&(u=B(t,n)),null!=u&&u>0&&(o=document.getElementById(n.idPrefix+"_Row_"+t,s),l=document.getElementById(n.idPrefix+"_Row_"+n._rowOrder[u-1],s),n.useSubPanel&&(i=document.getElementById(n.idPrefix+"_SubRow_"+t,s)),d.removeChild(o),n.useSubPanel&&d.removeChild(i),d.insertBefore(o,l),n.useSubPanel&&d.insertBefore(i,l),n._rowOrder[u]=n._rowOrder[u-1],n._rowOrder[u-1]=t,a=r("td.first",l).html(),r("td.first",l).html(r("td.first",o).html()),r("td.first",o).html(a),N(s,n),r("td.last button.moveUp",o).removeClass("ui-state-hover").blur(),r("td.last button.moveUp",l).focus(),n.afterRowSwapped&&n.afterRowSwapped(s,u,u-1))}return this},moveDownRow:function(e,t){var n=v(this);if(n){var o,l,i,a,s=this[0],u=null,d=s.getElementsByTagName("tbody")[0];r.isNumeric(e)&&e>=0&&e<n._rowOrder.length-1?(u=e,t=n._rowOrder[e]):r.isNumeric(t)&&(u=B(t,n)),null!=u&&u!=n._rowOrder.length-1&&(o=document.getElementById(n.idPrefix+"_Row_"+t,s),l=document.getElementById(n.idPrefix+"_Row_"+n._rowOrder[u+1],s),n.useSubPanel&&(i=document.getElementById(n.idPrefix+"_SubRow_"+n._rowOrder[u+1],s)),d.removeChild(l),d.insertBefore(l,o),n.useSubPanel&&d.insertBefore(i,o),n._rowOrder[u]=n._rowOrder[u+1],n._rowOrder[u+1]=t,a=r("td.first",l).html(),r("td.first",l).html(r("td.first",o).html()),r("td.first",o).html(a),N(s,n),r("td.last button.moveDown",o).removeClass("ui-state-hover").blur(),r("td.last button.moveDown",l).focus(),n.afterRowSwapped&&n.afterRowSwapped(s,u,u+1))}return this},showColumn:function(e){var t=v(this);if(t&&e){for(var n=-1,o=this[0],l=0;l<t.columns.length;l++)if(t.columns[l].name==e){n=l;break}if(-1!=n&&t.columns[n].invisible){t._visibleCount++,t._finalColSpan++,r("#"+t.idPrefix+"_caption_td").attr("colSpan",t._finalColSpan),r("#"+t.idPrefix+"_footer_td").attr("colSpan",t._finalColSpan),r("#"+t.idPrefix+"_"+e+"_td_head").removeClass("invisible");for(l=0;l<t._rowOrder.length;l++){var i=t._rowOrder[l];r("#"+t.idPrefix+"_"+e+"_td_"+i).removeClass("invisible"),t.useSubPanel&&r("#"+t.idPrefix+"_SubRow_"+i).attr("colSpan",t._visibleCount+(t._hideLastColumn?0:1))}t.columns[n].invisible=!1,N(o,t)}}return this},hideColumn:function(e){var t=v(this);if(t&&e){for(var n=-1,o=this[0],l=0;l<t.columns.length;l++)if(t.columns[l].name==e){n=l;break}if(-1!=n&&!t.columns[n].invisible){t._visibleCount--,t._finalColSpan--,r("#"+t.idPrefix+"_caption_td").attr("colSpan",t._finalColSpan),r("#"+t.idPrefix+"_footer_td").attr("colSpan",t._finalColSpan),r("#"+t.idPrefix+"_"+e+"_td_head").addClass("invisible");for(l=0;l<t._rowOrder.length;l++){var i=t._rowOrder[l];r("#"+t.idPrefix+"_"+e+"_td_"+i).addClass("invisible"),t.useSubPanel&&r("#"+t.idPrefix+"_SubRow_"+i).attr("colSpan",t._visibleCount+(t._hideLastColumn?0:1))}t.columns[n].invisible=!0,N(o,t)}}return this},isColumnInvisible:function(e){var t=v(this);if(t&&e)for(var n=0;n<t.columns.length;n++)if(t.columns[n].name==e)return t.columns[n].invisible;return null},getRowCount:function(){var e=v(this);return e?e._rowOrder.length:null},getUniqueIndex:function(e){var t=v(this);return t&&r.isNumeric(e)&&e<t._rowOrder.length?t._rowOrder[e]:null},getRowIndex:function(e){var t=v(this);if(t&&r.isNumeric(e))for(var n=0;n<t._rowOrder.length;n++)if(t._rowOrder[n]==e)return n;return null},getRowValue:function(e,t,n){var o=v(this),l=null;return o&&(r.isNumeric(e)&&e>=0&&e<o._rowOrder.length&&(t=o._rowOrder[e]),P(t)||(l=S(o,t,n))),l},getAllValue:function(e){var t=v(this),n=null;if(t){n=e?{}:[];for(var o=0;o<t._rowOrder.length;o++)e?(rowValue=S(t,t._rowOrder[o],o),r.extend(n,rowValue)):(rowValue=S(t,t._rowOrder[o]),n.push(rowValue));e&&(n[t.rowCountName]=t._rowOrder.length)}return n},getCtrlValue:function(e,t){var n=v(this);if(n&&t>=0&&t<n._rowOrder.length)for(var o=0;o<n.columns.length;o++)if(n.columns[o].name===e)return I(n,o,n._rowOrder[t]);return null},setCtrlValue:function(e,t,n){var o=v(this);if(o&&t>=0&&t<o._rowOrder.length)for(var l=0;l<o.columns.length;l++)if(o.columns[l].name==e){E(o,l,o._rowOrder[t],n);break}return this},getCellCtrl:function(e,t){var n=v(this);if(n&&t>=0&&t<n._rowOrder.length)for(var o=n._rowOrder[t],l=0;l<n.columns.length;l++)if(n.columns[l].name===e)return D(n.columns[l].type,n.idPrefix,e,o);return null},getCellCtrlByUniqueIndex:function(e,t){var n=v(this);if(n)for(var o=0;o<n.columns.length;o++)if(n.columns[o].name===e)return D(n.columns[o].type,n.idPrefix,e,t);return null},getRowOrder:function(){var e=v(this);return e?e._rowOrder.slice():null},getColumns:function(){var e=v(this);return e?e.columns.slice():null},isRowEmpty:function(e){var t=v(this);return t?G(t,e):null},removeEmptyRows:function(){var e=v(this);if(e){for(var t=this[0],n=e._rowOrder.length;n>=0;n--)G(e,n)&&C(t,null,e._rowOrder[n],!0);return this}return null}};function v(e,t){var n=null;return 1==e.length?(n=e.data("appendGrid"))||t||alert(c.notInit):t||alert(c.getValueMultiGrid),n}function _(e,t,n,o){var l,i,a,s,u=r(e).data("appendGrid"),d=[],c=null,m=[],p=(e.getElementsByTagName("thead")[0],e.getElementsByTagName("tbody")[0]),h=null,f=!1,w=!1,v=0,_=0;u.maxBodyHeight>0&&r("#"+u._wrapperId+" table thead")[0];var g=t,x=!1;if(r.isArray(t)&&(g=t.length,x=!0),r.isNumeric(o)){for(var y=0;y<u._rowOrder.length;y++)if(u._rowOrder[y]==o){n=y,0!=y&&(c=y-1);break}}else r.isNumeric(n)?n>=u._rowOrder.length?n=null:c=n-1:0!=u._rowOrder.length&&(n=null,c=u._rowOrder.length-1);u.maintainScroll&&!r.isNumeric(n)&&(v=r(e).height(),_=r(e).scrollParent().scrollTop()),0==u._rowOrder.length&&(r("tr.empty",e).remove(),w=!0);for(y=0;y<g;y++){if(0<u.maxRowsAllowed&&u._rowOrder.length>=u.maxRowsAllowed){f=!0;break}u._uniqueIndex++,l=u._uniqueIndex,m.length=0,r.isNumeric(n)?(u._rowOrder.splice(n,0,l),u.useSubPanel?(p.insertBefore(h=document.createElement("tr"),p.childNodes[2*n]),p.insertBefore(a=document.createElement("tr"),p.childNodes[2*n])):p.insertBefore(a=document.createElement("tr"),p.childNodes[n]),d.push(n)):(u._rowOrder.push(l),p.appendChild(a=document.createElement("tr")),u.useSubPanel&&p.appendChild(h=document.createElement("tr")),d.push(u._rowOrder.length-1)),a.id=u.idPrefix+"_Row_"+l,u._sectionClasses.body&&(a.className=u._sectionClasses.body),r(a).data("appendGrid",l),null!=h&&(h.id=u.idPrefix+"_SubRow_"+l,r(h).data("appendGrid",l),u._sectionClasses.subPanel&&(h.className=u._sectionClasses.subPanel)),u.hideRowNumColumn||(a.appendChild(s=document.createElement("td")),r(s).addClass("ui-widget-content first").text(u._rowOrder.length),u.useSubPanel&&(s.rowSpan=2));for(var O=0;O<u.columns.length;O++)if("hidden"!=u.columns[O].type){var R="ui-widget-content";u.columns[O].invisible&&(R+=" invisible"),a.appendChild(s=document.createElement("td")),s.id=u.idPrefix+"_"+u.columns[O].name+"_td_"+l,s.className=R,null!=u.columns[O].cellCss&&r(s).css(u.columns[O].cellCss);var B,S=u.idPrefix+"_"+u.columns[O].name+"_"+l;if(B=r.isFunction(u.nameFormatter)?u.nameFormatter(u.idPrefix,u.columns[O].name,l):S,i=null,"custom"==u.columns[O].type)r.isFunction(u.columns[O].customBuilder)&&(i=u.columns[O].customBuilder(s,u.idPrefix,u.columns[O].name,l));else if("select"==u.columns[O].type||"ui-selectmenu"==u.columns[O].type){if((i=document.createElement("select")).id=S,i.name=B,r.isArray(u.columns[O].ctrlOptions)){if(u.columns[O].ctrlOptions.length>0)if(r.isPlainObject(u.columns[O].ctrlOptions[0]))for(var I=null,D=null,G=0;G<u.columns[O].ctrlOptions.length;G++){P(u.columns[O].ctrlOptions[G].group)?D=null:I!=u.columns[O].ctrlOptions[G].group&&(I=u.columns[O].ctrlOptions[G].group,(D=document.createElement("optgroup")).label=I,i.appendChild(D));var F=r("<option/>").val(u.columns[O].ctrlOptions[G].value).text(u.columns[O].ctrlOptions[G].label);P(u.columns[O].ctrlOptions[G].title)||F.attr("title",u.columns[O].ctrlOptions[G].title),null==D?F.appendTo(i):F.appendTo(D)}else for(G=0;G<u.columns[O].ctrlOptions.length;G++)i.options[i.options.length]=new Option(u.columns[O].ctrlOptions[G],u.columns[O].ctrlOptions[G])}else if(r.isPlainObject(u.columns[O].ctrlOptions))for(var G in u.columns[O].ctrlOptions)i.options[i.options.length]=new Option(u.columns[O].ctrlOptions[G],G);else if("string"==typeof u.columns[O].ctrlOptions){var L=u.columns[O].ctrlOptions.split(";");for(G=0;G<L.length;G++){var A=L[G].indexOf(":");i.options[i.options.length]=-1==A?new Option(L[G],L[G]):new Option(L[G].substring(A+1,L[G].length),L[G].substring(0,A))}}else r.isFunction(u.columns[O].ctrlOptions)&&u.columns[O].ctrlOptions(i);s.appendChild(i),"ui-selectmenu"==u.columns[O].type&&r(i).selectmenu(u.columns[O].uiOption)}else if("checkbox"==u.columns[O].type)(i=document.createElement("input")).type="checkbox",i.id=S,i.name=B,i.value=1,s.appendChild(i),s.style.textAlign="center";else if("textarea"==u.columns[O].type)(i=document.createElement("textarea")).id=S,i.name=B,s.appendChild(i);else if(-1!=u.columns[O].type.search(/^(color|date|datetime|datetime\-local|email|month|number|range|search|tel|time|url|week)$/)){i=document.createElement("input");try{i.type=u.columns[O].type}catch(e){}i.id=S,i.name=B,s.appendChild(i)}else(i=document.createElement("input")).type="text",i.id=S,i.name=B,s.appendChild(i),"ui-datepicker"==u.columns[O].type?r(i).datepicker(u.columns[O].uiOption):"ui-spinner"==u.columns[O].type?r(i).spinner(u.columns[O].uiOption):"ui-autocomplete"==u.columns[O].type&&r(i).autocomplete(u.columns[O].uiOption);"custom"!=u.columns[O].type&&(null!=u.columns[O].ctrlAttr&&r(i).attr(u.columns[O].ctrlAttr),null!=u.columns[O].ctrlProp&&r(i).prop(u.columns[O].ctrlProp),null!=u.columns[O].ctrlCss&&r(i).css(u.columns[O].ctrlCss),null!=u.columns[O].ctrlClass&&r(i).addClass(u.columns[O].ctrlClass),u.columns[O].uiTooltip&&r(i).tooltip(u.columns[O].uiTooltip),r.isFunction(u.columns[O].onClick)&&r(i).click({caller:e,callback:u.columns[O].onClick,uniqueIndex:l},function(e){e.data.callback(e,r(e.data.caller).appendGrid("getRowIndex",e.data.uniqueIndex))}),r.isFunction(u.columns[O].onChange)&&r(i).change({caller:e,callback:u.columns[O].onChange,uniqueIndex:l},function(e){e.data.callback(e,r(e.data.caller).appendGrid("getRowIndex",e.data.uniqueIndex))})),x?E(u,O,l,t[y][u.columns[O].name]):P(u.columns[O].value)||E(u,O,l,u.columns[O].value)}else m.push(O);if(!u._hideLastColumn||u.columns.length>u._visibleCount){if(u.rowButtonsInFront?u.hideRowNumColumn?a.insertBefore(s=document.createElement("td"),a.firstChild):a.insertBefore(s=document.createElement("td"),a.childNodes[1]):a.appendChild(s=document.createElement("td")),s.className="ui-widget-content last",s.id=u.idPrefix+"_last_td_"+l,u._hideLastColumn&&(s.style.display="none"),!u.hideButtons.insert){var q=k(u.customGridButtons.insert,"ui-icon-arrowreturnthick-1-w").attr({id:u.idPrefix+"_Insert_"+l,title:u._i18n.insert,tabindex:-1}).addClass("insert").data("appendGrid",{uniqueIndex:l}).click(function(t){var n=r(this).data("appendGrid").uniqueIndex;return r(e).appendGrid("insertRow",1,null,n),t&&t.preventDefault&&t.preventDefault(u._buttonClasses.insert),!1}).appendTo(s);P(u._buttonClasses.insert)||q.addClass(u._buttonClasses.insert)}if(!u.hideButtons.remove){q=k(u.customGridButtons.remove,"ui-icon-trash").attr({id:u.idPrefix+"_Delete_"+l,title:u._i18n.remove,tabindex:-1}).addClass("remove").data("appendGrid",{uniqueIndex:l}).click(function(t){var n=r(this).data("appendGrid").uniqueIndex;return C(e,null,n,!1),t&&t.preventDefault&&t.preventDefault(),!1}).appendTo(s);P(u._buttonClasses.remove)||q.addClass(u._buttonClasses.remove)}if(!u.hideButtons.moveUp){q=k(u.customGridButtons.moveUp,"ui-icon-arrowthick-1-n").attr({id:u.idPrefix+"_MoveUp_"+l,title:u._i18n.moveUp,tabindex:-1}).addClass("moveUp").data("appendGrid",{uniqueIndex:l}).click(function(t){var n=r(this).data("appendGrid").uniqueIndex;return r(e).appendGrid("moveUpRow",null,n),t&&t.preventDefault&&t.preventDefault(),!1}).appendTo(s);P(u._buttonClasses.moveUp)||q.addClass(u._buttonClasses.moveUp)}if(!u.hideButtons.moveDown){q=k(u.customGridButtons.moveDown,"ui-icon-arrowthick-1-s").attr({id:u.idPrefix+"_MoveDown_"+l,title:u._i18n.moveDown,tabindex:-1}).addClass("moveDown").data("appendGrid",{uniqueIndex:l}).click(function(t){var n=r(this).data("appendGrid").uniqueIndex;return r(e).appendGrid("moveDownRow",null,n),t&&t.preventDefault&&t.preventDefault(),!1}).appendTo(s);P(u._buttonClasses.moveDown)||q.addClass(u._buttonClasses.moveDown)}if(u.rowDragging){q=r("<div/>").addClass("rowDrag ui-state-default ui-corner-all").attr("title",u._i18n.rowDrag).append(r("<div/>").addClass("ui-icon ui-icon-caret-2-n-s").append(r("<span/>").addClass("ui-button-text").text("Drag"))).appendTo(s);P(u._buttonClasses.rowDrag)||q.addClass(u._buttonClasses.rowDrag)}for(O=0;O<m.length;O++)(i=document.createElement("input")).id=u.idPrefix+"_"+u.columns[m[O]].name+"_"+l,r.isFunction(u.nameFormatter)?i.name=u.nameFormatter(u.idPrefix,u.columns[O].name,l):i.name=i.id,i.type="hidden",x?i.value=t[y][u.columns[m[O]].name]:P(u.columns[m[O]].value)||(i.value=u.columns[m[O]].value),s.appendChild(i);if(u.customRowButtons&&u.customRowButtons.length){for(O=u.customRowButtons.length-1;O>=0;O--){(U=u.customRowButtons[O])&&U.uiButton&&U.click&&U.atTheFront&&r(s).prepend(b(e,U,l))}for(O=0;O<u.customRowButtons.length;O++){var U;(U=u.customRowButtons[O])&&U.uiButton&&U.click&&!U.atTheFront&&r(s).append(b(e,U,l))}}}u.useSubPanel&&(h.appendChild(s=document.createElement("td")),s.className="ui-widget-content",s.colSpan=u._visibleCount+(u._hideLastColumn?0:1),r.isFunction(u.subPanelBuilder)&&u.subPanelBuilder(s,l))}if(0<u.maxBodyHeight&&u._calculateWidth&&!w){var W=r("#"+u._wrapperId+">div.scroller")[0];W.scrollHeight>W.offsetHeight&&(w=!0,u._calculateWidth=!1)}if(N(e,u),w&&u.autoColumnWidth&&u.maxBodyHeight>0&&T(document.getElementById(u._wrapperId)),r.isNumeric(n)?r.isFunction(u.afterRowInserted)&&u.afterRowInserted(e,c,d):r.isFunction(u.afterRowAppended)&&u.afterRowAppended(e,c,d),f&&r.isFunction(u.maxNumRowsReached)&&u.maxNumRowsReached(),u.maintainScroll&&!r.isNumeric(n)){var j=r(e).height();r(e).scrollParent().scrollTop(_+j-v)}return{addedRows:d,parentIndex:c,rowIndex:n}}function g(e,t){var n=r("<button/>").attr({type:"button",tabindex:-1}).button(t.uiButton).click({tbWhole:e},t.click);return t.btnClass&&n.addClass(t.btnClass),t.btnCss&&n.css(t.btnCss),t.btnAttr&&n.attr(t.btnAttr),n}function b(e,t,n){var o=r("<button/>").val(n).attr({type:"button",tabindex:-1}).button(t.uiButton).click({tbWhole:e,uniqueIndex:n},function(e){var n=r(e.data.tbWhole).appendGrid("getRowValue",null,e.data.uniqueIndex);t.click(e,e.data.uniqueIndex,n)});return t.btnClass&&o.addClass(t.btnClass),t.btnCss&&o.css(t.btnCss),t.btnAttr&&o.attr(t.btnAttr),o}function C(e,t,n,o){var l=r(e).data("appendGrid"),i=e.getElementsByTagName("tbody")[0];if(r.isNumeric(n))for(var a=0;a<l._rowOrder.length;a++)if(l._rowOrder[a]==n){t=a;break}if(r.isNumeric(t))(o||"function"!=typeof l.beforeRowRemove||l.beforeRowRemove(e,t))&&(l._rowOrder.splice(t,1),l.useSubPanel?(i.removeChild(i.childNodes[2*t]),i.removeChild(i.childNodes[2*t])):i.removeChild(i.childNodes[t]),N(e,l),O(e,t),r.isFunction(l.afterRowRemoved)&&l.afterRowRemoved(e,t));else{var s=0,u=0;if(l.maintainScroll&&(s=r(e).height(),u=r(e).scrollParent().scrollTop()),(o||!r.isFunction(l.beforeRowRemove)||l.beforeRowRemove(e,l._rowOrder.length-1))&&(n=l._rowOrder.pop(),i.removeChild(i.lastChild),l.useSubPanel&&i.removeChild(i.lastChild),N(e,l),r.isFunction(l.afterRowRemoved)&&l.afterRowRemoved(e,null)),l.maintainScroll){var d=r(e).height();r(e).scrollParent().scrollTop(u+d-s)}}0==l._rowOrder.length&&x(document.getElementById(l._wrapperId),l)}function x(e,t,n){var o=r("<td></td>").text(t._i18n.rowEmpty).attr("colspan",t._finalColSpan);r("table.body tbody",e).append(r("<tr></tr>").addClass("empty").append(o)),!n&&t.maxBodyHeight>0&&(t.autoColumnWidth?T(e):o.width(r("table.head",e).width()-4))}function y(e){var t=r(e).data("appendGrid");r("tbody",e).empty(),t._rowOrder.length=0,t._uniqueIndex=0,N(e,t),x(document.getElementById(t._wrapperId),t)}function O(e,t){var n=r(e).data("appendGrid");if(!n.hideRowNumColumn)for(var o=t;o<n._rowOrder.length;o++)r("#"+n.idPrefix+"_Row_"+n._rowOrder[o]+" td.first",e).text(o+1)}function R(e,t,n){var o,l,i=r(e).data("appendGrid");if(i){if(o=e.getElementsByTagName("tbody")[0],r(o).empty(),i._rowOrder.length=0,i._uniqueIndex=0,null!=t&&t.length){l=_(e,t.length,null,null);for(var a=0;a<l.addedRows.length;a++){for(var s=0;s<i.columns.length;s++)E(i,s,i._rowOrder[a],t[a][i.columns[s].name]);r.isFunction(i.rowDataLoaded)&&i.rowDataLoaded(e,t[a],a,i._rowOrder[a])}}i._isDataLoaded=!0,n&&(i.initData=null),r(e).data("appendGrid",i),r.isFunction(i.dataLoaded)&&i.dataLoaded(e,t)}}function B(e,t){for(var n=0;n<t._rowOrder.length;n++)if(t._rowOrder[n]==e)return n;return null}function P(e){return void 0===e||null==e}function N(e,t){r(e).data("appendGrid",t),r("#"+t.idPrefix+"_rowOrder",e).val(t._rowOrder.join())}function S(e,t,n){for(var o={},l=P(n)?"":"_"+n,i=0;i<e.columns.length;i++)o[e.columns[i].name+l]=I(e,i,t);if(e.useSubPanel&&r.isFunction(e.subPanelGetter)){var a=e.subPanelGetter(t);if(r.isPlainObject(a))if(""==l)r.extend(o,a);else{var s={};for(var u in a)s[u+l]=a[u];r.extend(o,s)}}return o}function I(e,t,n){var o=e.columns[t].type,l=e.columns[t].name;if("custom"==o)return r.isFunction(e.columns[t].customGetter)?e.columns[t].customGetter(e.idPrefix,l,n):null;var i=D(o,e.idPrefix,l,n);return null==i?null:"checkbox"==o?i.checked?1:0:r(i).val()}function D(e,t,n,o){return document.getElementById(t+"_"+n+"_"+o)}function E(e,t,n,o){var l=e.columns[t].type,i=e.columns[t].name;if("custom"==l)r.isFunction(e.columns[t].customSetter)&&e.columns[t].customSetter(e.idPrefix,i,n,o);else{var a=D(0,e.idPrefix,i,n);"checkbox"==l?a.checked=null!=o&&0!=o:"ui-selectmenu"==l?(a.value=null==o?"":o,r(a).selectmenu("refresh")):r(a).val(null==o?"":o)}}function k(e,t){var n=null;return e&&(r.isFunction(e)?n=r(e()):e.nodeType?n=r(e).clone():(e.icon||e.label)&&(n=r("<button/>").attr({type:"button"}).button(e))),n||(n=r("<button/>").attr({type:"button"}).button({icon:t,showLabel:!1})),n}function G(e,t){for(var n=0;n<e.columns.length;n++){var o=e._rowOrder[t],l=I(e,n,o);if(r.isFunction(e.columns[n].emptyCriteria)){if(!e.columns[n].emptyCriteria(l))return!1}else{var i=null;if(P(e.columns[n].emptyCriteria))if("checkbox"==e.columns[n].type)i=0;else if("select"==e.columns[n].type||"ui-selectmenu"==e.columns[n].type){var a=D(e.columns[n].type,e.idPrefix,e.columns[n].name,o).options;i=a.length>0?a[0].value:""}else i="";else i=e.columns[n].emptyCriteria;if(l!=i)return!1}}return!0}function T(e){var t=r("table.body",e),n=r("div.scroller",e),o=t.data("appendGrid"),l=r("table.head tr.columnHead",e)[0],i=r("table.body colgroup",e)[0];if(o._rowOrder.length>0){r("td",l).width("auto"),r("col",i).width("auto"),t.width("auto"),n.width("auto");var a=r("tbody tr",t)[0],s=-2;r.fn.modal&&(s=1);for(var u=Math.min(l.childNodes.length,a.childNodes.length),d=0;d<u;d++){var c=l.childNodes[d].clientWidth+1,m=a.childNodes[d].clientWidth+s;m>c?l.childNodes[d].style.width=m+"px":i.childNodes[d].style.width=c+"px"}}else r("table.body,table.foot",e).width(r("table.head").width());r("table.foot",e).width(t.width()),n.width(t.width()+n[0].offsetWidth-n[0].clientWidth+1)}r.fn.appendGrid=function(e){return w[e]?w[e].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof e&&e?void alert(c.notSupportMethod+e):w.init.apply(this,arguments)}});
//# sourceMappingURL=sourcemaps/Tabular.js.map
