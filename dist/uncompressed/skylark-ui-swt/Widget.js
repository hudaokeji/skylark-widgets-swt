/**
 * skylark-ui-swt - A version of ui-swt that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-swt/
 * @license MIT
 */
define([
  "skylark-utils/skylark",
  "skylark-utils/langx",
  "skylark-utils/browser",
  "skylark-utils/eventer",
  "skylark-utils/noder",
  "skylark-utils/geom",
  "skylark-utils/query",
  "skylark-utils/widgets",
  "./ui"
],function(skylark,langx,browser,eventer,noder,geom,$,widgets,ui){

/*---------------------------------------------------------------------------------*/

	var Widget = widgets.Widget.inherit({
        klassName: "Widget"
    });

	return ui.Widget = Widget;
});
