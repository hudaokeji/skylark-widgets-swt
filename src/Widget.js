define([
  "skylark-langx/skylark",
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/elmx",
  "skylark-utils-dom/query",
  "skylark-utils-dom/plugins",
  "skylark-utils-collection/Map",
  "./ui"
],function(skylark,langx,browser,eventer,noder,geom,elmx,$,plugins,Map,ui){

/*---------------------------------------------------------------------------------*/

	var Widget = plugins.Plugin.inherit({
    klassName: "Widget",

    _construct : function(elm,options) {
        if (langx.isHtmlNode(elm)) {
          options = this._setting(elm,options);
        } else {
          options = elm;
          elm = null;
        }
        this.overrided(elm,options);

        if (!elm) {
          this._elm = this._create();
        }
        this._velm = elmx(this._elm);
        this.state = this.options.state || new Map();
        this._init();
      },

    _setting : function(elm,options) {
      options = options || {};
      // TODO : parse options from element
      return options;
    },


    _create : function() {
     
    },

    _init : function() {

    },

    _render : function() {
      state.on("changed",function() {
        self._sync();
      });

    },

    _refresh : function(updates) {
      var _ = this._,
          model = _.model,
          dom = _.dom,
          props = {

          };
      updates = updates || {};
      for (var attrName in updates){
          var v = updates[attrName].value;
          if (v && v.toCss) {
              v.toCss(props);
              updates[attrName].processed = true;
          }

      };

      this.css(props);

      if (updates["disabled"]) {
          var v = updates["disabled"].value;
          dom.aria('disabled', v);
          self.classes.toggle('disabled', v);
      }
    },                


    _build : function(el,options) {

    },


    mapping : {
      "events" : {
  //       'mousedown .title':  'edit',
  //       'click .button':     'save',
  //       'click .open':       function(e) { ... }            
      },

      "attributs" : {

      },

      "properties" : {

      },

      "styles" : {

      }
    },

    /**
     * Returns a html element representing the widget.
     *
     * @method html
     * @return {HtmlElement} HTML element representing the widget.
     */
    html: function() {
      return this._elm;
    },


    /**
     * Returns a parent widget  enclosing this widgets, or null if not exist.
     *
     * @method getEnclosing
     * @return {Widget} The enclosing parent widget, or null if not exist.
     */
    getEnclosing : function(selector) {
      return null;
    },

    /**
     * Returns a widget collection with all enclosed child widgets.
     *
     * @method getEnclosed
     * @return {List} Collection with all enclosed child widgets..
     */
    getEnclosed : function() {
      var self = this;
          children = new ArrayList();
      return children;
    },

    /**
     * Sets the visible state to true.
     *
     * @method show
     * @return {Widget} Current widget instance.
     */

    show : function() {

    },

    /**
     * Sets the visible state to false.
     *
     * @method hide
     * @return {Widget} Current widget instance.
     */
    hide : function() {

    },

    /**
     * Focuses the current control.
     *
     * @method focus
     * @return {tinymce.ui.Control} Current control instance.
     */
    focus :function() {
      try {
        this._velm.focus();
      } catch (ex) {
        // Ignore IE error
      }

      return this;
    },

    /**
     * Blurs the current control.
     *
     * @method blur
     * @return {tinymce.ui.Control} Current control instance.
     */
    blur : function() {
      this._velm.blur();

      return this;
    },

    enable: function () {
      this.state.set('disabled',false);
      return this;
    },

    disable: function () {
      this.state.set('disabled',true);
      return this;
    },

    /**
     * Sets the specified aria property.
     *
     * @method aria
     * @param {String} name Name of the aria property to set.
     * @param {String} value Value of the aria property.
     * @return {tinymce.ui.Control} Current control instance.
     */
    aria : function(name, value) {
      const self = this, elm = self.getEl(self.ariaTarget);

      if (typeof value === 'undefined') {
        return self._aria[name];
      }

      self._aria[name] = value;

      if (self.state.get('rendered')) {
        elm.setAttribute(name === 'role' ? name : 'aria-' + name, value);
      }

      return self;
    },

    attr: function (name,value) {
        var velm = this._velm,
            ret = velm.attr(name,value);
        return ret == velm ? this : ret;
    },

    css: function (name, value) {
        var velm = this._velm,
            ret = velm.css(name, value);
        return ret == velm ? this : ret;
    },

    data: function (name, value) {
        var velm = this._velm,
            ret = velm.data(name,value);
        return ret == velm ? this : ret;
    },

    prop: function (name,value) {
        var velm = this._velm,
            ret = velm.prop(name,value);
        return ret == velm ? this : ret;
    },

    remove : function() {
      this._velm.remove();
    }
  });

  Widget.inherit = function(meta) {
    var ctor = plugins.Plugin.inherit.apply(this,arguments);

    if (meta.pluginName) {
      plugins.register(ctor,meta.pluginName);
    }
    return ctor;
  };

	return ui.Widget = Widget;
});
