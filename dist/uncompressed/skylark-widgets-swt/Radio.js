define([
  "skylark-langx/langx",
  "skylark-domx-browser",
  "skylark-domx-eventer",
  "skylark-domx-noder",
  "skylark-domx-geom",
  "skylark-domx-query",
  "./swt",
  "./_Toggler"
],function(langx,browser,eventer,noder,geom,$,swt,_Toggler){

  var Radio = swt.Radio = _Toggler.inherit({
    klassName: "Radio",

    pluginName : "lark.radio",

    _parse : function() {
      var $radio = this.$radio;

      // get current state of input
      var checked = $radio.prop('checked');
      var disabled = $radio.prop('disabled');

      this.state.set("checked",checked);
      this.state.set(("disabled",disabled));

    },

    _init : function() {
      //this.options = langx.mixin({}, $.fn.checkbox.defaults, options);
      var element = this.domNode;
      var $element = $(element);

      if (element.tagName.toLowerCase() !== 'label') {
        logError('Radio must be initialized on the `label` that wraps the `input` element. See https://github.com/ExactTarget/fuelux/blob/master/reference/markup/checkbox.html for example of proper markup. Call `.checkbox()` on the `<label>` not the `<input>`');
        return;
      }

      // cache elements
      this.$label = $element;
      this.$radio = this.$label.find('input[type="checkbox"]');
      this.$container = $element.parent('.checkbox'); // the container div

      if (!this.options.ignoreVisibilityCheck && this.$radio.css('visibility').match(/hidden|collapse/)) {
        logError('For accessibility reasons, in order for tab and space to function on checkbox, checkbox `<input />`\'s `visibility` must not be set to `hidden` or `collapse`. See https://github.com/ExactTarget/fuelux/pull/1996 for more details.');
      }

      // determine if a toggle container is specified
      var containerSelector = this.$radio.attr('data-toggle');
      this.$toggleContainer = $(containerSelector);


      // set default state
      this.setInitialState();
    },

    _sync : function() {
      // handle internal events
      var self = this;
      this.$radio.on('change', function(evt) {
        //var $radio = $(evt.target);
        var checked = self.$radio.prop('checked');
        self.state.set("checked",checked);
      });
    },

    _refresh : function(updates) {

        function setCheckedState (checked) {
          var $radio = self.$radio;
          var $lbl = self.$label;
          var $containerToggle = self.$toggleContainer;

          if (checked) {
            // reset all items in group
            this.resetGroup();

            $radio.prop('checked', true);
            $lbl.addClass('checked');
            $containerToggle.removeClass('hide hidden');
          } else {
            $radio.prop('checked', false);
            $lbl.removeClass('checked');
            $containerToggle.addClass('hidden');
          }
        }

        function setDisabledState (disabled) {
          var $radio = self.$radio;
          var $lbl = self.$label;

          if (disabled) {
            $radio.prop('disabled', true);
            $lbl.addClass('disabled');
          } else {
            $radio.prop('disabled', false);
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
    },

    resetGroup: function resetGroup () {
      var $radios = $('input[name="' + this.groupName + '"]');
      $radios.each(function resetRadio (index, item) {
        var $radio = $(item);
        var $lbl = $radio.parent();
        var containerSelector = $radio.attr('data-toggle');
        var $containerToggle = $(containerSelector);


        $lbl.removeClass('checked');
        $containerToggle.addClass('hidden');
      });
    }
  });

  return Radio;
});

