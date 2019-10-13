/**
 * skylark-widgets-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-swt/
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-query"],function(E,r,e,n,t,s,i){var O=E.ui=E.ui||{};sbswt=O.sbswt={};var C={BACKSPACE_KEYCODE:8,COMMA_KEYCODE:188,DELETE_KEYCODE:46,DOWN_ARROW_KEYCODE:40,ENTER_KEYCODE:13,TAB_KEYCODE:9,UP_ARROW_KEYCODE:38},k=function(E){return function(r){return r.keyCode===E}},o=k(C.BACKSPACE_KEYCODE),D=k(C.DELETE_KEYCODE),K=k(C.TAB_KEYCODE),a=k(C.UP_ARROW_KEYCODE),l=k(C.DOWN_ARROW_KEYCODE),_=/&[^\s]*;/;return r.mixin(O,{CONST:C,cleanInput:function(E){for(;_.test(E);)E=i("<i>").html(E).text();return i("<i>").text(E).html()},isBackspaceKey:o,isDeleteKey:D,isShiftHeld:function(E){return!0===E.shiftKey},isTabKey:K,isUpArrow:a,isDownArrow:l}),O});
//# sourceMappingURL=sourcemaps/swt.js.map
