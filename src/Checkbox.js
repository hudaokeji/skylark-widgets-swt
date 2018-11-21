define([
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
  "./ui",
  "./_Toggler"
],function(langx,browser,eventer,noder,geom,$,ui,_Toggler){

  var Checkbox = ui.Checkbox = _Toggler.inherit({
    klassName: "Checkbox",

    pluginName : "lark.checkbox",

    _parse : function() {
      var $chk = this.$chk;

      // get current state of input
      var checked = $chk.prop('checked');
      var disabled = $chk.prop('disabled');

      this.state.set("checked",checked);
      this.state.set(("disabled",disabled));

    },

    _init : function() {
      //this.options = langx.mixin({}, $.fn.checkbox.defaults, options);
      var element = this.domNode;
      var $element = $(element);

      if (element.tagName.toLowerCase() !== 'label') {
        logError('Checkbox must be initialized on the `label` that wraps the `input` element. See https://github.com/ExactTarget/fuelux/blob/master/reference/markup/checkbox.html for example of proper markup. Call `.checkbox()` on the `<label>` not the `<input>`');
        return;
      }

      // cache elements
      this.$label = $element;
      this.$chk = this.$label.find('input[type="checkbox"]');
      this.$container = $element.parent('.checkbox'); // the container div

      if (!this.options.ignoreVisibilityCheck && this.$chk.css('visibility').match(/hidden|collapse/)) {
        logError('For accessibility reasons, in order for tab and space to function on checkbox, checkbox `<input />`\'s `visibility` must not be set to `hidden` or `collapse`. See https://github.com/ExactTarget/fuelux/pull/1996 for more details.');
      }

      // determine if a toggle container is specified
      var containerSelector = this.$chk.attr('data-toggle');
      this.$toggleContainer = $(containerSelector);


      // set default state
      this.setInitialState();
    },

    _sync : function() {
      // handle internal events
      var self = this;
      this.$chk.on('change', function(evt) {
        //var $chk = $(evt.target);
        var checked = self.$chk.prop('checked');
        self.state.set("checked",checked);
      });
    },

    _refresh : function(updates) {

        function setCheckedState (checked) {
          var $chk = self.$chk;
          var $lbl = self.$label;
          var $containerToggle = self.$toggleContainer;

          if (checked) {
            $chk.prop('checked', true);
            $lbl.addClass('checked');
            $containerToggle.removeClass('hide hidden');
          } else {
            $chk.prop('checked', false);
            $lbl.removeClass('checked');
            $containerToggle.addClass('hidden');
          }
        }

        function setDisabledState (disabled) {
          var $chk = self.$chk;
          var $lbl = self.$label;

          if (disabled) {
            $chk.prop('disabled', true);
            $lbl.addClass('disabled');
          } else {
            $chk.prop('disabled', false);
            $lbl.removeClass('disabled');
          }
        }

        // update visual with attribute values from control
        this.overrided(changed);
        var self  = this;

        if (updates["checked"]) {
          setCheckedState(updates["checked"].value);
        }
        if (updates["disabled"]) {
          setDisabledState(updates["disabled"].value);
        }
    }
  });

	return Checkbox;
});
