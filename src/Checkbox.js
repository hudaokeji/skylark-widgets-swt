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

  var CheckBox =  _Toggler.inherit({
    klassName: "CheckBox",

    pluginName : "lark.checkbox",

    options : {
      selectors : {
        chk : "input[type=checkbox]",
        lbl : "checkbox-label"
      },
      template : undefined,
      checked : undefined,
      label : undefined,
      value : undefined
    },

    /*
     *@override
     */
    _parse : function(elm,options) {
      options = this.overrided(elm,options);
      var $el = $(elm),
          chkSelector = options.selectors && options.selectors.chk,
          lblSelector = options.selectors && options.selectors.lbl;

      if (!chkSelector) {
        chkSelector = this.options.selectors.chk;
      }
      if (!lblSelector) {
        lblSelector = this.options.selectors.lbl;
      }

      var $chk = $el.find(chkSelector),
          $lbl = $el.find(lblSelector);

      if (options.checked == undefined) {
        options.checked = $chk.prop('checked')
      } else {
        $chk.prop('checked',options.checked);
      }

      if (options.disabled == undefined) {
        options.disabled = $chk.prop('disabled')
      } else {
        $chk.prop('disabled',options.disabled);
      }

      return options;
    },

    /*
     *@override
     */
    _create : function() {
      //TODO
    },

    /*
     *@override
     */
    _init : function() {
      var elm = this._elm;

      // cache elements
      this.$lbl = this._velm.$(this.options.selectors.lbl);
      this.$chk = this._velm.$(this.options.selectors.chk);
    },


    /*
     *@override
     */
    _startup : function() {
      // handle internal events
      var self = this;
      this.$chk.on('change', function(evt) {
        //var $chk = $(evt.target);
        var checked = self.$chk.prop('checked');
        self.state.set("checked",checked);
      });
    },

    /*
     *@override
     */
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

	return swt.CheckBox = CheckBox;
});
