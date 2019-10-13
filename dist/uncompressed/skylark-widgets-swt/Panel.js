define([
  "skylark-langx/langx",
  "skylark-domx-browser",
  "skylark-domx-eventer",
  "skylark-domx-noder",
  "skylark-domx-geom",
  "skylark-domx-query",
  "skylark-bootstrap3/collapse",
  "./swt",
  "./Widget"
],function(langx,browser,eventer,noder,geom,$,collapse,swt,Widget){

  var Panel = Widget.inherit({
    klassName : "Panel",

    pluginName : "lark.panel",

    options : {
      toggler : {
        selector : ".panel-heading [data-toggle=\"collapse\"]"
      },

      body : {
        selector : ".panel-collapse"
      }
    },

    _init : function() {
      var self = this;
      this.$toggle = this._velm.find(this.options.toggler.selector);
      this.$body = this._velm.find(this.options.body.selector);
      this.$toggle.on('click.lark',function (e) {
        var $this   = $(this);
        var collpasePlugin    = self.$body.collapse('instance');
        if (collpasePlugin) {
          collpasePlugin.toggle();
        } else {
          self.$body.collapse($this.data());
        }
      });

    },

    expand : function() {
      // expand this panel
      this.$body.collapse("show");
    },

    collapse : function() {
      // collapse this panel
      this.$body.collapse("hide");
    },

    toogle : function() {
      // toogle this panel
     this.body.collapse("toogle");
    },

    full : function() {

    },

    unfull : function() {

    },

    toogleFull : function() {

    },
    
    close: function () {
      var panel_dom = this.dom(id);
      this.minimize(id, true).promise().then(function () {
        panel_dom.fadeOut();
      });
    }


  });


  return Panel;

});