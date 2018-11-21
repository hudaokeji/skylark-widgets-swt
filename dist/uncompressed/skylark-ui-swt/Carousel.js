define([
    "skylark-langx/langx",
    "skylark-utils-dom/browser",
    "skylark-utils-dom/eventer",
    "skylark-utils-dom/noder",
    "skylark-utils-dom/geom",
    "skylark-utils-dom/query",
    "./ui",
    "./Widget",
    "skylark-bootstrap3/carousel"
], function(langx, browser, eventer, noder, geom,  $, ui, Widget) {

    var Carousel = Widget.inherit({
        klassName : "Carousel",
        pluginName : "lark.carousel",

    });

    return Carousel;

});