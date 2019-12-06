/**
 * skylark-widgets-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-swt/
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-langx/langx","skylark-domx-browser","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-query"],function(E,e,r,t,n,s,O){var i={},C={BACKSPACE_KEYCODE:8,COMMA_KEYCODE:188,DELETE_KEYCODE:46,DOWN_ARROW_KEYCODE:40,ENTER_KEYCODE:13,TAB_KEYCODE:9,UP_ARROW_KEYCODE:38},a=function(E){return function(e){return e.keyCode===E}},k=a(C.BACKSPACE_KEYCODE),o=a(C.DELETE_KEYCODE),D=a(C.TAB_KEYCODE),K=a(C.UP_ARROW_KEYCODE),l=a(C.DOWN_ARROW_KEYCODE),_=/&[^\s]*;/;return e.mixin(i,{CONST:C,cleanInput:function(E){for(;_.test(E);)E=O("<i>").html(E).text();return O("<i>").text(E).html()},isBackspaceKey:k,isDeleteKey:o,isShiftHeld:function(E){return!0===E.shiftKey},isTabKey:D,isUpArrow:K,isDownArrow:l}),E.attach("widgets.swt",i)});
//# sourceMappingURL=sourcemaps/swt.js.map
