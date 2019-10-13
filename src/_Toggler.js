define([
  "skylark-langx/langx",
  "skylark-domx-browser",
  "skylark-domx-eventer",
  "skylark-domx-noder",
  "skylark-domx-geom",
  "skylark-domx-query",
  "./swt",
  "./Widget"
],function(langx,browser,eventer,noder,geom,$,swt,Widget){

  var _Toggler = swt._Toggler = Widget.inherit({
    klassName: "_Toggler",

    toggle: function () {
      var checked = this.isChecked();

      if (checked) {
        this.uncheck();
      } else {
        this.check();
      }
    },

    check: function  () {
      this.state.set('checked',true);
      return this;
    },

    uncheck: function () {
      this.state.set('checked',false);
      return this;
    },

    /**
     * Getter function for the checked state.
     *
     * @method isChecked
     * @return {Boolean} True/false 
     */
    isChecked: function () {
      return this.state.get('checked');
    }
  });

	return _Toggler;
});
