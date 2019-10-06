define([
    "skylark-langx/langx",
    "skylark-utils-dom/browser",
    "skylark-utils-dom/eventer",
    "skylark-utils-dom/noder",
    "skylark-utils-dom/geom",
    "skylark-utils-dom/query",
    "./swt",
    "./Widget",
    "skylark-bootstrap3/tab",
    "skylark-bootstrap3/dropdown"
], function(langx, browser, eventer, noder, geom,  $, swt, Widget) {

    var TabStrip = Widget.inherit({
        klassName : "TabStrip",
        pluginName : "lark.tabstrip",

        options : {
          selectors : {
            header : ".nav-tabs",
            tab : "[data-toggle=\"tab\"]",
            content : ".tab-content",
            tabpane : ".tab-pane"
          }
        },

        _init : function() {
          this.$header = this._velm.$(this.options.selectors.header); 
          this.$tabs = this.$header.find(this.options.selectors.tab);
          this.$content = this._velm.$(this.options.selectors.content);
          this.$tabpanes = this.$content.find(this.options.selectors.tabpane);

          this.$header.find('[data-toggle="dropdown"]').dropdown();

          var self = this;
          this.$tabs.each(function(idx,tabEl){
            $(tabEl).tab({
              target : self.$tabpanes[idx]
            });
          });

        },

        add : function() {
          //TODO
        },

        remove : function(){
          //TODO
        }
    });

    return swt.TabStrip = TabStrip;

});