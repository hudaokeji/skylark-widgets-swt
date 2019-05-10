/**
 * skylark-ui-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-swt/
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-langx/langx","skylark-utils-dom/browser","skylark-utils-dom/eventer","skylark-utils-dom/noder","skylark-utils-dom/geom","skylark-utils-dom/query"],function(E,r,t,e,s,i,n){var l=E.ui=E.ui||{};sbswt=l.sbswt={};var O={BACKSPACE_KEYCODE:8,COMMA_KEYCODE:188,DELETE_KEYCODE:46,DOWN_ARROW_KEYCODE:40,ENTER_KEYCODE:13,TAB_KEYCODE:9,UP_ARROW_KEYCODE:38},u=function(E){return function(r){return r.keyCode===E}},C=u(O.BACKSPACE_KEYCODE),k=u(O.DELETE_KEYCODE),o=u(O.TAB_KEYCODE),D=u(O.UP_ARROW_KEYCODE),K=u(O.DOWN_ARROW_KEYCODE),a=/&[^\s]*;/;return r.mixin(l,{CONST:O,cleanInput:function(E){for(;a.test(E);)E=n("<i>").html(E).text();return n("<i>").text(E).html()},isBackspaceKey:C,isDeleteKey:k,isShiftHeld:function(E){return!0===E.shiftKey},isTabKey:o,isUpArrow:D,isDownArrow:K}),l});
//# sourceMappingURL=sourcemaps/swt.js.map
