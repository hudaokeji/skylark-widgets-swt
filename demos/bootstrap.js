requirejs.config({
	baseUrl : "../",
    paths: {
    },
      packages: [
         {
           name : "skylark-langx-arrays",
           location : "../node_modules/skylark-langx-arrays/dist/uncompressed/skylark-langx-arrays",
            main: 'main'
         },
         {
           name : "skylark-langx-aspect",
           location : "../node_modules/skylark-langx-aspect/dist/uncompressed/skylark-langx-aspect",
            main: 'main'
         },
         {
           name : "skylark-langx-async",
           location : "../node_modules/skylark-langx-async/dist/uncompressed/skylark-langx-async",
            main: 'main'
         },
         {
           name : "skylark-langx-datetimes",
           location : "../node_modules/skylark-langx-datetimes/dist/uncompressed/skylark-langx-datetimes",
            main: 'main'
         },
         {
           name : "skylark-langx-emitter",
           location : "../node_modules/skylark-langx-emitter/dist/uncompressed/skylark-langx-emitter",
            main: 'main'
         },
         {
           name : "skylark-langx-funcs",
           location : "../node_modules/skylark-langx-funcs/dist/uncompressed/skylark-langx-funcs",
            main: 'main'
         },
         {
           name : "skylark-langx-hoster",
           location : "../node_modules/skylark-langx-hoster/dist/uncompressed/skylark-langx-hoster",
            main: 'main'
         },
         {
           name : "skylark-langx-klass",
           location : "../node_modules/skylark-langx-klass/dist/uncompressed/skylark-langx-klass",
            main: 'main'
         },
         {
           name : "skylark-langx-ns",
           location : "../node_modules/skylark-langx-ns/dist/uncompressed/skylark-langx-ns",
            main: 'main'
         },
         {
           name : "skylark-langx-numbers",
           location : "../node_modules/skylark-langx-numbers/dist/uncompressed/skylark-langx-numbers",
            main: 'main'
         },
         {
           name : "skylark-langx-objects",
           location : "../node_modules/skylark-langx-objects/dist/uncompressed/skylark-langx-objects",
            main: 'main'
         },
         {
           name : "skylark-langx-strings",
           location : "../node_modules/skylark-langx-strings/dist/uncompressed/skylark-langx-strings",
            main: 'main'
         },
         {
           name : "skylark-langx-topic",
           location : "../node_modules/skylark-langx-topic/dist/uncompressed/skylark-langx-topic",
            main: 'main'
         },
         {
           name : "skylark-langx-types",
           location : "../node_modules/skylark-langx-types/dist/uncompressed/skylark-langx-types",
            main: 'main'
         },
         {
           name : "skylark-langx-xhr",
           location : "../node_modules/skylark-langx-xhr/dist/uncompressed/skylark-langx-xhr",
            main: 'main'
         },
         {
           name : "skylark-langx",
           location : "../node_modules/skylark-langx/dist/uncompressed/skylark-langx",
            main: 'main'
         },
         {
           name : "skylark-utils-dom" ,
           location : "../node_modules/skylark-utils-dom/dist/uncompressed/skylark-utils-dom",
            main: 'main'
         },
         {
           name : "skylark-data-collection" ,
           location : "../node_modules/skylark-data-collection/dist/uncompressed/skylark-data-collection",
            main: 'main'
         },
         {
           name : "skylark-storages-diskfs" ,
           location : "../node_modules/skylark-storages-diskfs/dist/uncompressed/skylark-storages-diskfs",
            main: 'main'
         },
         {
            name: 'skylark-bootstrap3',
            location : "../node_modules/skylark-bootstrap3/dist/uncompressed/skylark-bootstrap3",
            main: 'main'
          },
          {
            name: 'skylark-ui-swt',
            location : "../src",
            main: 'main'
          }      
        ]

});
 
// require(["module/name", ...], function(params){ ... });
require(["skylark-utils-dom/query"], function ($) {
    require(["skylark-ui-swt"], function (swt) {
        if (window.initPage) {
            window.initPage($,swt);
        }
    });
});