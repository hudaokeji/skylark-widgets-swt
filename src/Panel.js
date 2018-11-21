define([
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
  "skylark-bootstrap3/collapse",
  "./ui",
  "./Widget"
],function(langx,browser,eventer,noder,geom,$,collapse,ui,Widget){

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }

  var Panel = Widget.inherit({
    klassName : "Panel",

    pluginName : "lark.panel",

    _init : function() {
      this._velm.on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
        var $this   = $(this)

        if (!$this.attr('data-target')) e.preventDefault()

        var $target = getTargetFromTrigger($this)
        var collpasePlugin    = $target.collapse('instance');
        if (collpasePlugin) {
          collpasePlugin.toggle();
        } else {
          $target.collapse($this.data());
        }

      });

    },

    expand : function() {
      // expand this panel
      $(this._elm).collapse("show");
    },

    collapse : function() {
      // collapse this panel
      this._velm.collapse("hide");
    },

    toogle : function() {
      // toogle this panel
     this._velm.collapse("toogle");
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