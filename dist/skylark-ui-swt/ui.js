/**
 * skylark-ui-swt - A version of ui-swt that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-swt/
 * @license MIT
 */
define(["skylark-utils/skylark","skylark-utils/langx","skylark-utils/browser","skylark-utils/eventer","skylark-utils/noder","skylark-utils/geom","skylark-utils/query"],function(E,t,r,s,e,i,n){var l=E.ui=E.ui||{};sbswt=l.sbswt={};var u={BACKSPACE_KEYCODE:8,COMMA_KEYCODE:188,DELETE_KEYCODE:46,DOWN_ARROW_KEYCODE:40,ENTER_KEYCODE:13,TAB_KEYCODE:9,UP_ARROW_KEYCODE:38},O=function(E){return E.shiftKey===!0},C=function(E){return function(t){return t.keyCode===E}},k=C(u.BACKSPACE_KEYCODE),D=C(u.DELETE_KEYCODE),K=C(u.TAB_KEYCODE),_=C(u.UP_ARROW_KEYCODE),a=C(u.DOWN_ARROW_KEYCODE),y=/&[^\s]*;/,o=function(E){for(;y.test(E);)E=n("<i>").html(E).text();return n("<i>").text(E).html()};return t.mixin(l,{CONST:u,cleanInput:o,isBackspaceKey:k,isDeleteKey:D,isShiftHeld:O,isTabKey:K,isUpArrow:_,isDownArrow:a}),l});
//# sourceMappingURL=sourcemaps/ui.js.map
