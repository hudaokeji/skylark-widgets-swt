/**
 * skylark-ui-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-swt/
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-langx/langx","skylark-utils-dom/browser","skylark-utils-dom/eventer","skylark-utils-dom/noder","skylark-utils-dom/geom","skylark-utils-dom/query"],function(E,r,t,e,s,i,n){var l=E.ui=E.ui||{};sbswt=l.sbswt={};var O={BACKSPACE_KEYCODE:8,COMMA_KEYCODE:188,DELETE_KEYCODE:46,DOWN_ARROW_KEYCODE:40,ENTER_KEYCODE:13,TAB_KEYCODE:9,UP_ARROW_KEYCODE:38},u=function(E){return E.shiftKey===!0},C=function(E){return function(r){return r.keyCode===E}},k=C(O.BACKSPACE_KEYCODE),o=C(O.DELETE_KEYCODE),D=C(O.TAB_KEYCODE),K=C(O.UP_ARROW_KEYCODE),a=C(O.DOWN_ARROW_KEYCODE),_=/&[^\s]*;/,y=function(E){for(;_.test(E);)E=n("<i>").html(E).text();return n("<i>").text(E).html()};return r.mixin(l,{CONST:O,cleanInput:y,isBackspaceKey:k,isDeleteKey:o,isShiftHeld:u,isTabKey:D,isUpArrow:K,isDownArrow:a}),l});
//# sourceMappingURL=sourcemaps/ui.js.map
