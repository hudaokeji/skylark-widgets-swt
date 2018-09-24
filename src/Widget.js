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
