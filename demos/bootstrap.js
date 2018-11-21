requirejs.config({
	baseUrl : "../",
    paths: {
    },
      packages: [
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
           name : "skylark-utils-collection" ,
           location : "../node_modules/skylark-utils-collection/dist/uncompressed/skylark-utils-collection",
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