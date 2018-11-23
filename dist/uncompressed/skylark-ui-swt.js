/**
 * skylark-ui-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-ui-swt/
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                exports: null
            };
            require(id);
        } else {
            map[id] = factory;
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.exports) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args);
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx/skylark");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-ui-swt/ui',[
  "skylark-langx/skylark",
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query"
],function(skylark,langx,browser,eventer,noder,geom,$){
	var ui = skylark.ui = skylark.ui || {};
		sbswt = ui.sbswt = {};

	var CONST = {
		BACKSPACE_KEYCODE: 8,
		COMMA_KEYCODE: 188, // `,` & `<`
		DELETE_KEYCODE: 46,
		DOWN_ARROW_KEYCODE: 40,
		ENTER_KEYCODE: 13,
		TAB_KEYCODE: 9,
		UP_ARROW_KEYCODE: 38
	};

	var isShiftHeld = function isShiftHeld (e) { return e.shiftKey === true; };

	var isKey = function isKey (keyCode) {
		return function compareKeycodes (e) {
			return e.keyCode === keyCode;
		};
	};

	var isBackspaceKey = isKey(CONST.BACKSPACE_KEYCODE);
	var isDeleteKey = isKey(CONST.DELETE_KEYCODE);
	var isTabKey = isKey(CONST.TAB_KEYCODE);
	var isUpArrow = isKey(CONST.UP_ARROW_KEYCODE);
	var isDownArrow = isKey(CONST.DOWN_ARROW_KEYCODE);

	var ENCODED_REGEX = /&[^\s]*;/;
	/*
	 * to prevent double encoding decodes content in loop until content is encoding free
	 */
	var cleanInput = function cleanInput (questionableMarkup) {
		// check for encoding and decode
		while (ENCODED_REGEX.test(questionableMarkup)) {
			questionableMarkup = $('<i>').html(questionableMarkup).text();
		}

		// string completely decoded now encode it
		return $('<i>').text(questionableMarkup).html();
	};

	langx.mixin(ui, {
		CONST: CONST,
		cleanInput: cleanInput,
		isBackspaceKey: isBackspaceKey,
		isDeleteKey: isDeleteKey,
		isShiftHeld: isShiftHeld,
		isTabKey: isTabKey,
		isUpArrow: isUpArrow,
		isDownArrow: isDownArrow
	});

	return ui;

});

define('skylark-ui-swt/Widget',[
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

define('skylark-ui-swt/Panel',[
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
define('skylark-ui-swt/Accordion',[
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
  "skylark-bootstrap3/collapse",
  "./ui",
  "./Widget",
  "./Panel"
],function(langx,browser,eventer,noder,geom,$,collapse,ui,Widget, Panel){

  var Accordion = Widget.inherit({
    klassName : "Accordion",

    pluginName : "lark.accordion",

    options : {
      panel: {
        selector : "> .panel",
        template : null,
      }
    },
    _parse : function() {
      //
    },

    _init : function() {
      var panels = [];
      this._velm.$(this.options.panel.selector).forEach(function(panelEl){
        var panel = new Accordion.Panel(panelEl,{

        });
        panels.push(panel);
      });
      this._panels = panels;
    },

    _sync : function() {
      // handle internal events
    },

    _refresh : function(updates) {
    },

    panels : {
      get : function() {

      }
    },


    addPanel : function() {
      var $newPanel = $template.clone();
      $newPanel.find(".collapse").removeClass("in");
      $newPanel.find(".accordion-toggle").attr("href",  "#" + (++hash))
               .text("Dynamic panel #" + hash);
      $newPanel.find(".panel-collapse").attr("id", hash).addClass("collapse").removeClass("in");
      $("#accordion").append($newPanel.fadeIn());

    },

    removePanel : function() {

    },

    expandPanel : function() {
      // expand a panel

    },

    expandAllPanel : function() {
      // expand a panel

    },

    collapsePanel : function() {

    },

    collapseAllPanel : function() {

    }


  });


  Accordion.Panel = Panel.inherit({
    klassName : "AccordionPanel",

    _init : function() {
      //this._velm.collapse();
      this.overrided();
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

    remove : function() {
      this.overided();
    }
  });

  return Accordion;

});

define('skylark-ui-swt/Button',[
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
  "./ui",
  "./Widget"
],function(langx,browser,eventer,noder,geom,$,ui,Widget){

	var Button = Widget.inherit({
		klassName : "Button",

    pluginName : "lark.button",

		options : {
			btnSize : "lg",
      btnType : "default",
      leftIcon : null,
      rightIcon : null,
      topIcon : null,
      bottomIcon : null
		},

    init: function () {
      var $el = jQuery(this.element.$);

      if ($el.hasClass("btn-link")) {
        this.data.btntype = "btn-link";
      } else if ($el.hasClass("btn-default")) {
        this.data.btntype = "btn-default";
      } else if ($el.hasClass("btn-primary")) {
        this.data.btntype = "btn-primary";
      } else if ($el.hasClass("btn-info")) {
        this.data.btntype = "btn-info";
      } else if ($el.hasClass("btn-success")) {
        this.data.btntype = "btn-success";
      } else if ($el.hasClass("btn-warning")) {
        this.data.btntype = "btn-warning";
      } else if ($el.hasClass("btn-danger")) {
        this.data.btntype = "btn-danger";
      }

      if ($el.hasClass("btn-xs")) {
        this.data.btnsize = "btn-xs";
      } else if ($el.hasClass("btn-sm")) {
        this.data.btnsize = "btn-sm";
      } else if ($el.hasClass("btn-lg")) {
        this.data.btnsize = "btn-lg";
      }

      this.data.href = $el.attr('href');

      this.data.target = $el.attr('target');

      this.data.text = jQuery('.text', $el).text();

      var bs_icon_left = jQuery('.bs-icon-left', $el);
      var bs_icon_right = jQuery('.bs-icon-right', $el);
      var fa_icon_left = jQuery('.fa-icon-left', $el);
      var fa_icon_right = jQuery('.fa-icon-right', $el);

      if (bs_icon_left.length > 0) {
        bs_icon_left.removeClass('bs-icon-left').removeClass('glyphicon');
        this.data.bsiconleft = bs_icon_left.attr('class');
        bs_icon_left.addClass('bs-icon-left').addClass('glyphicon');
      }

      if (bs_icon_right.length > 0) {
        bs_icon_right.removeClass('bs-icon-right').removeClass('glyphicon');
        this.data.bsiconright = bs_icon_right.attr('class');
        bs_icon_right.addClass('bs-icon-right').addClass('glyphicon');
      }

      if (fa_icon_left.length > 0) {
        fa_icon_left.removeClass('fa-icon-left').removeClass('fa');
        this.data.faiconleft = fa_icon_left.attr('class');
        fa_icon_left.addClass('fa-icon-left').addClass('fa');
      }

      if (fa_icon_right.length > 0) {
        fa_icon_right.removeClass('fa-icon-right').removeClass('fa');
        this.data.faiconright = fa_icon_right.attr('class');
        fa_icon_right.addClass('fa-icon-right').addClass('fa');
      }
    },

    _refresh: function (updates) {
      var $el = this.$el;

      if (updates.btntype) {
          $el.removeClass('btn-link btn-default btn-primary btn-info btn-success btn-warning btn-danger').addClass("btn-" + updates.btntype.value);
      }

      $el.removeClass('btn-xs btn-sm btn-lg');
			if (updates.btnsize) {
                $el.addClass("btn-" + updates.btnsize.value);
      }

      if (updates.text) {
          $('.text', $el).text(updates.text.value);
      }


      if (updates.iconleft) {
          $('.fa-icon-left', $el).remove();
          if (updates.iconleft) {
              $el.prepend('<i style="word-spacing: -1em;" class="fa fa-icon-left fa-' + updates.iconleft.value + '">&nbsp;</i>\n');
          }
      }

      if (updates.iconright) {
          $('.fa-icon-right', $el).remove();
          if (updates.iconright.value) {
              $el.append('<i style="word-spacing: -1em;" class="fa fa-icon-right fa-' + updates.iconright.value + '">&nbsp;</i>\n');
          }
      }
    }
  });

  return Button;

});




define('skylark-ui-swt/Carousel',[
    "skylark-langx/langx",
    "skylark-utils-dom/browser",
    "skylark-utils-dom/eventer",
    "skylark-utils-dom/noder",
    "skylark-utils-dom/geom",
    "skylark-utils-dom/query",
    "./ui",
    "./Widget",
    "skylark-bootstrap3/carousel"
], function(langx, browser, eventer, noder, geom,  $, ui, Widget) {

    var Carousel = Widget.inherit({
        klassName : "Carousel",
        pluginName : "lark.carousel",

    });

    return Carousel;

});
define('skylark-ui-swt/_Toggler',[
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
  "./ui",
  "./Widget"
],function(langx,browser,eventer,noder,geom,$,ui,Widget){

  var _Toggler = ui._Toggler = Widget.inherit({
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

define('skylark-ui-swt/Checkbox',[
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

define('skylark-ui-swt/Menu',[
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
  "./ui",
  "./Widget"
],function(langx,browser,eventer,noder,geom,$,ui,Widget){
	
	var popup = null;
	var right_to_left ;

	var Menu = ui.Menu = Widget.inherit({
        klassName: "Menu",

	    pluginName : "lark.menu",

        init : function(elm,options) {
        	if (!options) {
        		options = elm;
        		elm = null;
        	}
			var self = this,$el;

			this._options = langx.mixin({
					hide_onmouseleave	: 0,
					icons				: true

			},options);

			if (!elm) {
				$el = this.$el = $("<ul class='vakata-context'></ul>");
			} else {
				$el = this.$el = $(elm);
			}

			var to = false;
			$el.on("mouseenter", "li", function (e) {
					e.stopImmediatePropagation();

					if(noder.contains(this, e.relatedTarget)) {
						// премахнато заради delegate mouseleave по-долу
						// $(this).find(".vakata-context-hover").removeClass("vakata-context-hover");
						return;
					}

					if(to) { clearTimeout(to); }
					$el.find(".vakata-context-hover").removeClass("vakata-context-hover").end();

					$(this)
						.siblings().find("ul").hide().end().end()
						.parentsUntil(".vakata-context", "li").addBack().addClass("vakata-context-hover");
					self._show_submenu(this);
				})
				// тестово - дали не натоварва?
				.on("mouseleave", "li", function (e) {
					if(noder.contains(this, e.relatedTarget)) { return; }
					$(this).find(".vakata-context-hover").addBack().removeClass("vakata-context-hover");
				})
				.on("mouseleave", function (e) {
					$(this).find(".vakata-context-hover").removeClass("vakata-context-hover");
					if(self._options.hide_onmouseleave) {
						to = setTimeout(
							(function (t) {
								return function () { self.hide(); };
							}(this)), self._options.hide_onmouseleave);
					}
				})
				.on("click", "a", function (e) {
					e.preventDefault();
				//})
				//.on("mouseup", "a", function (e) {
					if(!$(this).blur().parent().hasClass("vakata-context-disabled") && self._execute($(this).attr("rel")) !== false) {
						self.hide();
					}
				})
				.on('keydown', 'a', function (e) {
						var o = null;
						switch(e.which) {
							case 13:
							case 32:
								e.type = "click";
								e.preventDefault();
								$(e.currentTarget).trigger(e);
								break;
							case 37:
								self.$el.find(".vakata-context-hover").last().closest("li").first().find("ul").hide().find(".vakata-context-hover").removeClass("vakata-context-hover").end().end().children('a').focus();
								e.stopImmediatePropagation();
								e.preventDefault();
								break;
							case 38:
								o = self.$el.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").prevAll("li:not(.vakata-context-separator)").first();
								if(!o.length) { o = self.$el.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").last(); }
								o.addClass("vakata-context-hover").children('a').focus();
								e.stopImmediatePropagation();
								e.preventDefault();
								break;
							case 39:
								self.$el.find(".vakata-context-hover").last().children("ul").show().children("li:not(.vakata-context-separator)").removeClass("vakata-context-hover").first().addClass("vakata-context-hover").children('a').focus();
								e.stopImmediatePropagation();
								e.preventDefault();
								break;
							case 40:
								o = self.$el.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").nextAll("li:not(.vakata-context-separator)").first();
								if(!o.length) { o = self.$el.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").first(); }
								o.addClass("vakata-context-hover").children('a').focus();
								e.stopImmediatePropagation();
								e.preventDefault();
								break;
							case 27:
								self.hide();
								e.preventDefault();
								break;
							default:
								//console.log(e.which);
								break;
						}
					})
				.on('keydown', function (e) {
					e.preventDefault();
					var a = self.$el.find('.vakata-contextmenu-shortcut-' + e.which).parent();
					if(a.parent().not('.vakata-context-disabled')) {
						a.click();
					}
				});

			this.render();
        },

        render : function() {
        	var items = this._options.items;
			if(this._parse(items)) {
				this.$el.html(this.html);
			}
			this.$el.width('');
        },

		_trigger : function (event_name) {
			$(document).trigger("context_" + event_name + ".sbswt", {
				"reference"	: this.reference,
				"element"	: this.$el,
				"position"	: {
					"x" : this.position_x,
					"y" : this.position_y
				}
			});
		},        

		_execute : function (i) {
			i = this.items[i];
			return i && (!i._disabled || (langx.isFunction(i._disabled) && !i._disabled({ "item" : i, "reference" : this.reference, "element" : this.$el }))) && i.action ? i.action.call(null, {
						"item"		: i,
						"reference"	: this.reference,
						"element"	: this.$el,
						"position"	: {
							"x" : this.position_x,
							"y" : this.position_y
						}
					}) : false;
		},
		_parse : function (o, is_callback) {
			var self = this,
				reference = self._options.reference;

			if(!o) { return false; }
			if(!is_callback) {
				self.html		= "";
				self.items	= [];
			}
			var str = "",
				sep = false,
				tmp;

			if(is_callback) { str += "<"+"ul>"; }
			langx.each(o, function (i, val) {
				if(!val) { return true; }
				self.items.push(val);
				if(!sep && val.separator_before) {
					str += "<"+"li class='vakata-context-separator'><"+"a href='#' " + (self._options.icons ? '' : 'style="margin-left:0px;"') + ">&#160;<"+"/a><"+"/li>";
				}
				sep = false;
				str += "<"+"li class='" + (val._class || "") + (val._disabled === true || (langx.isFunction(val._disabled) && val._disabled({ "item" : val, "reference" : reference, "element" : self.$el })) ? " vakata-contextmenu-disabled " : "") + "' "+(val.shortcut?" data-shortcut='"+val.shortcut+"' ":'')+">";
				str += "<"+"a href='#' rel='" + (self.items.length - 1) + "' " + (val.title ? "title='" + val.title + "'" : "") + ">";
				if(self._options.icons) {
					str += "<"+"i ";
					if(val.icon) {
						if(val.icon.indexOf("/") !== -1 || val.icon.indexOf(".") !== -1) { str += " style='background:url(\"" + val.icon + "\") center center no-repeat' "; }
						else { str += " class='" + val.icon + "' "; }
					}
					str += "><"+"/i><"+"span class='vakata-contextmenu-sep'>&#160;<"+"/span>";
				}
				str += (langx.isFunction(val.label) ? val.label({ "item" : i, "reference" : reference, "element" : self.$el }) : val.label) + (val.shortcut?' <span class="vakata-contextmenu-shortcut vakata-contextmenu-shortcut-'+val.shortcut+'">'+ (val.shortcut_label || '') +'</span>':'') + "<"+"/a>";
				if(val.submenu) {
					tmp = self._parse(val.submenu, true);
					if(tmp) { str += tmp; }
				}
				str += "<"+"/li>";
				if(val.separator_after) {
					str += "<"+"li class='vakata-context-separator'><"+"a href='#' " + (self._options.icons ? '' : 'style="margin-left:0px;"') + ">&#160;<"+"/a><"+"/li>";
					sep = true;
				}
			});
			str  = str.replace(/<li class\='vakata-context-separator'\><\/li\>$/,"");
			if(is_callback) { str += "</ul>"; }
			/**
			 * triggered on the document when the contextmenu is parsed (HTML is built)
			 * @event
			 * @plugin contextmenu
			 * @name context_parse.vakata
			 * @param {jQuery} reference the element that was right clicked
			 * @param {jQuery} element the DOM element of the menu itself
			 * @param {Object} position the x & y coordinates of the menu
			 */
			if(!is_callback) { self.html = str; self._trigger("parse"); }
			return str.length > 10 ? str : false;
		},
		_show_submenu : function (o) {
			o = $(o);
			if(!o.length || !o.children("ul").length) { return; }
			var e = o.children("ul"),
				xl = o.offset().left,
				x = xl + o.outerWidth(),
				y = o.offset().top,
				w = e.width(),
				h = e.height(),
				dw = $(window).width() + $(window).scrollLeft(),
				dh = $(window).height() + $(window).scrollTop();
			// може да се спести е една проверка - дали няма някой от класовете вече нагоре
			if(right_to_left) {
				o[x - (w + 10 + o.outerWidth()) < 0 ? "addClass" : "removeClass"]("vakata-context-left");
			}
			else {
				o[x + w > dw  && xl > dw - x ? "addClass" : "removeClass"]("vakata-context-right");
			}
			if(y + h + 10 > dh) {
				e.css("bottom","-1px");
			}

			//if does not fit - stick it to the side
			if (o.hasClass('vakata-context-right')) {
				if (xl < w) {
					e.css("margin-right", xl - w);
				}
			} else {
				if (dw - x < w) {
					e.css("margin-left", dw - x - w);
				}
			}

			e.show();
		},
		show : function (reference, position, data) {
			var o, e, x, y, w, h, dw, dh, cond = true;
			switch(cond) {
				case (!position && !reference):
					return false;
				case (!!position && !!reference):
					this.reference	= reference;
					this.position_x	= position.x;
					this.position_y	= position.y;
					break;
				case (!position && !!reference):
					this.reference	= reference;
					o = reference.offset();
					this.position_x	= o.left + reference.outerHeight();
					this.position_y	= o.top;
					break;
				case (!!position && !reference):
					this.position_x	= position.x;
					this.position_y	= position.y;
					break;
			}
			if(!!reference && !data && $(reference).data('vakata_contextmenu')) {
				data = $(reference).data('vakata_contextmenu');
			}

			if(this.items.length) {
				this.$el.appendTo(document.body);
				e = this.$el;
				x = this.position_x;
				y = this.position_y;
				w = e.width();
				h = e.height();
				dw = $(window).width() + $(window).scrollLeft();
				dh = $(window).height() + $(window).scrollTop();
				if(right_to_left) {
					x -= (e.outerWidth() - $(reference).outerWidth());
					if(x < $(window).scrollLeft() + 20) {
						x = $(window).scrollLeft() + 20;
					}
				}
				if(x + w + 20 > dw) {
					x = dw - (w + 20);
				}
				if(y + h + 20 > dh) {
					y = dh - (h + 20);
				}

				this.$el
					.css({ "left" : x, "top" : y })
					.show()
					.find('a').first().focus().parent().addClass("vakata-context-hover");
				this.is_visible = true;

				popup = this;

				/**
				 * triggered on the document when the contextmenu is shown
				 * @event
				 * @plugin contextmenu
				 * @name context_show.vakata
				 * @param {jQuery} reference the element that was right clicked
				 * @param {jQuery} element the DOM element of the menu itself
				 * @param {Object} position the x & y coordinates of the menu
				 */
				this._trigger("show");
			}
		},
		hide : function () {
			if(this.is_visible) {
				this.$el.hide().find("ul").hide().end().find(':focus').blur().end().detach();
				this.is_visible = false;
				popup = null;
				/**
				 * triggered on the document when the contextmenu is hidden
				 * @event
				 * @plugin contextmenu
				 * @name context_hide.vakata
				 * @param {jQuery} reference the element that was right clicked
				 * @param {jQuery} element the DOM element of the menu itself
				 * @param {Object} position the x & y coordinates of the menu
				 */
				this._trigger("hide");
			}
		}

    });	

	$(function () {
		right_to_left = $(document.body).css("direction") === "rtl";

		$(document)
			.on("mousedown.sbswt.popup", function (e) {
				if(popup && popup.$el[0] !== e.target  && !noder.contains(popup.$el[0], e.target)) {
					popup.hide();
				}
			})
			.on("context_show.sbswt.popup", function (e, data) {
				popup.$el.find("li:has(ul)").children("a").addClass("vakata-context-parent");
				if(right_to_left) {
					popup.$el.addClass("vakata-context-rtl").css("direction", "rtl");
				}
				// also apply a RTL class?
				popup.$el.find("ul").hide().end();
			});
	});

	Menu.popup = function (reference, position, data) {
		var m = new Menu({
			reference : reference,
			items : data
		});
		m.show(reference,position);
	};

	Menu.hide = function() {
		if (popup) {
			popup.hide();
		}
	}

	return Menu;

});

define('skylark-ui-swt/Pagination',[
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
  "./ui",
  "./Widget"
],function(langx,browser,eventer,noder,geom,$,ui,Widget){


    /* This module used the following source code
     * !
     * jQuery pagination plugin v1.4.2
     * http://josecebe.github.io/twbs-pagination/
     *
     * Copyright 2014-2018, Eugene Simakin
     * Released under Apache 2.0 license
     * http://apache.org/licenses/LICENSE-2.0.html
     */

    'use strict';

    var Pagination = ui.Pagination = Widget.inherit({
        klassName : "Pagination",

        pluginName : "lark.pagination",


        options : {
            totalPages: 1,
            startPage: 1,
            visiblePages: 5,
            initiateStartPageClick: true,
            hideOnlyOnePage: false,
            href: false,
            pageVariable: '{{page}}',
            totalPagesVariable: '{{total_pages}}',
            page: null,
            first: 'First',
            prev: 'Previous',
            next: 'Next',
            last: 'Last',
            loop: false,
            beforePageClick: null,
            onPageClick: null,
            paginationClass: 'pagination',
            nextClass: 'page-item next',
            prevClass: 'page-item prev',
            lastClass: 'page-item last',
            firstClass: 'page-item first',
            pageClass: 'page-item',
            activeClass: 'active',
            disabledClass: 'disabled',
            anchorClass: 'page-link'         
        },


        _create : function(element, options) {
            this.$element = $(element);
            this.options = $.extend({}, $.fn.twbsPagination.defaults, options);

            if (this.options.startPage < 1 || this.options.startPage > this.options.totalPages) {
                throw new Error('Start page option is incorrect');
            }

            this.options.totalPages = parseInt(this.options.totalPages);
            if (isNaN(this.options.totalPages)) {
                throw new Error('Total pages option is not correct!');
            }

            this.options.visiblePages = parseInt(this.options.visiblePages);
            if (isNaN(this.options.visiblePages)) {
                throw new Error('Visible pages option is not correct!');
            }

            if (this.options.beforePageClick instanceof Function) {
                this.$element.first().on('beforePage', this.options.beforePageClick);
            }

            if (this.options.onPageClick instanceof Function) {
                this.$element.first().on('page', this.options.onPageClick);
            }

            // hide if only one page exists
            if (this.options.hideOnlyOnePage && this.options.totalPages == 1) {
                if (this.options.initiateStartPageClick) {
                    this.$element.trigger('page', 1);
                }
                return this;
            }

            if (this.options.href) {
                this.options.startPage = this.getPageFromQueryString();
                if (!this.options.startPage) {
                    this.options.startPage = 1;
                }
            }

            var tagName = (typeof this.$element.prop === 'function') ?
                this.$element.prop('tagName') : this.$element.attr('tagName');

            if (tagName === 'UL') {
                this.$listContainer = this.$element;
            } else {
                var elements = this.$element;
                var $newListContainer = $([]);
                elements.each(function(index) {
                    var $newElem = $("<ul></ul>");
                    $(this).append($newElem);
                    $newListContainer.push($newElem[0]);
                });
                this.$listContainer = $newListContainer;
                this.$element = $newListContainer;
            }

            this.$listContainer.addClass(this.options.paginationClass);

            if (this.options.initiateStartPageClick) {
                this.show(this.options.startPage);
            } else {
                this.currentPage = this.options.startPage;
                this.render(this.getPages(this.options.startPage));
                this.setupEvents();
            }

            return this;

        },

        _destroy: function () {
            this.$element.empty();
            this.$element.removeData('twbs-pagination');
            this.$element.off('page');

            return this;
        },

        show: function (page) {
            if (page < 1 || page > this.options.totalPages) {
                throw new Error('Page is incorrect.');
            }
            this.currentPage = page;

            this.$element.trigger('beforePage', page);

            var pages = this.getPages(page);
            this.render(pages);
            this.setupEvents();

            this.$element.trigger('page', page);

            return pages;
        },

        enable: function () {
            this.show(this.currentPage);
        },

        disable: function () {
            var _this = this;
            this.$listContainer.off('click').on('click', 'li', function (evt) {
                evt.preventDefault();
            });
            this.$listContainer.children().each(function () {
                var $this = $(this);
                if (!$this.hasClass(_this.options.activeClass)) {
                    $(this).addClass(_this.options.disabledClass);
                }
            });
        },

        _build: function (pages) {
            var listItems = [];

            if (this.options.first) {
                listItems.push(this.buildItem('first', 1));
            }

            if (this.options.prev) {
                var prev = pages.currentPage > 1 ? pages.currentPage - 1 : this.options.loop ? this.options.totalPages  : 1;
                listItems.push(this.buildItem('prev', prev));
            }

            for (var i = 0; i < pages.numeric.length; i++) {
                listItems.push(this.buildItem('page', pages.numeric[i]));
            }

            if (this.options.next) {
                var next = pages.currentPage < this.options.totalPages ? pages.currentPage + 1 : this.options.loop ? 1 : this.options.totalPages;
                listItems.push(this.buildItem('next', next));
            }

            if (this.options.last) {
                listItems.push(this.buildItem('last', this.options.totalPages));
            }

            return listItems;
        },

        _buildItem: function (type, page) {
            var $itemContainer = $('<li></li>'),
                $itemContent = $('<a></a>'),
                itemText = this.options[type] ? this.makeText(this.options[type], page) : page;

            $itemContainer.addClass(this.options[type + 'Class']);
            $itemContainer.data('page', page);
            $itemContainer.data('page-type', type);
            $itemContainer.append($itemContent.attr('href', this.makeHref(page)).addClass(this.options.anchorClass).html(itemText));

            return $itemContainer;
        },

        getPages: function (currentPage) {
            var pages = [];

            var half = Math.floor(this.options.visiblePages / 2);
            var start = currentPage - half + 1 - this.options.visiblePages % 2;
            var end = currentPage + half;

            var visiblePages = this.options.visiblePages;
            if (visiblePages > this.options.totalPages) {
                visiblePages = this.options.totalPages;
            }

            // handle boundary case
            if (start <= 0) {
                start = 1;
                end = visiblePages;
            }
            if (end > this.options.totalPages) {
                start = this.options.totalPages - visiblePages + 1;
                end = this.options.totalPages;
            }

            var itPage = start;
            while (itPage <= end) {
                pages.push(itPage);
                itPage++;
            }

            return {"currentPage": currentPage, "numeric": pages};
        },

        render: function (pages) {
            var _this = this;
            this.$listContainer.children().remove();
            var items = this.buildListItems(pages);
            $.each(items, function(key, item){
                _this.$listContainer.append(item);
            });

            this.$listContainer.children().each(function () {
                var $this = $(this),
                    pageType = $this.data('page-type');

                switch (pageType) {
                    case 'page':
                        if ($this.data('page') === pages.currentPage) {
                            $this.addClass(_this.options.activeClass);
                        }
                        break;
                    case 'first':
                            $this.toggleClass(_this.options.disabledClass, pages.currentPage === 1);
                        break;
                    case 'last':
                            $this.toggleClass(_this.options.disabledClass, pages.currentPage === _this.options.totalPages);
                        break;
                    case 'prev':
                            $this.toggleClass(_this.options.disabledClass, !_this.options.loop && pages.currentPage === 1);
                        break;
                    case 'next':
                            $this.toggleClass(_this.options.disabledClass,
                                !_this.options.loop && pages.currentPage === _this.options.totalPages);
                        break;
                    default:
                        break;
                }

            });
        },

        setupEvents: function () {
            var _this = this;
            this.$listContainer.off('click').on('click', 'li', function (evt) {
                var $this = $(this);
                if ($this.hasClass(_this.options.disabledClass) || $this.hasClass(_this.options.activeClass)) {
                    return false;
                }
                // Prevent click event if href is not set.
                !_this.options.href && evt.preventDefault();
                _this.show(parseInt($this.data('page')));
            });
        },

        changeTotalPages: function(totalPages, currentPage) {
            this.options.totalPages = totalPages;
            return this.show(currentPage);
        },

        makeHref: function (page) {
            return this.options.href ? this.generateQueryString(page) : "#";
        },

        makeText: function (text, page) {
            return text.replace(this.options.pageVariable, page)
                .replace(this.options.totalPagesVariable, this.options.totalPages)
        },

        getPageFromQueryString: function (searchStr) {
            var search = this.getSearchString(searchStr),
                regex = new RegExp(this.options.pageVariable + '(=([^&#]*)|&|#|$)'),
                page = regex.exec(search);
            if (!page || !page[2]) {
                return null;
            }
            page = decodeURIComponent(page[2]);
            page = parseInt(page);
            if (isNaN(page)) {
                return null;
            }
            return page;
        },

        generateQueryString: function (pageNumber, searchStr) {
            var search = this.getSearchString(searchStr),
                regex = new RegExp(this.options.pageVariable + '=*[^&#]*');
            if (!search) return '';
            return '?' + search.replace(regex, this.options.pageVariable + '=' + pageNumber);
        },

        getSearchString: function (searchStr) {
            var search = searchStr || window.location.search;
            if (search === '') {
                return null;
            }
            if (search.indexOf('?') === 0) search = search.substr(1);
            return search;
        },

        getCurrentPage: function () {
            return this.currentPage;
        },

        getTotalPages: function () {
            return this.options.totalPages;
        }

    });

    // PLUGIN DEFINITION

    $.fn.twbsPagination = function (option) {
        var args = Array.prototype.slice.call(arguments, 1);
        var methodReturn;

        var $this = $(this);
        var data = $this.data('twbs-pagination');
        var options = typeof option === 'object' ? option : {};

        if (!data) $this.data('twbs-pagination', (data = new TwbsPagination(this, options) ));
        if (typeof option === 'string') methodReturn = data[ option ].apply(data, args);

        return ( methodReturn === undefined ) ? $this : methodReturn;
    };

    return Pagination;
});
define('skylark-ui-swt/Progressbar',[
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
  "./ui",
  "./Widget"
],function(langx,browser,eventer,noder,geom,$,ui,Widget){

    'use strict';

    /* This module used the following source code
     * !
	 * bootstrap-progressbar v0.9.0 by @minddust
	 * Copyright (c) 2012-2015 Stephan Groß
	 *
	 * http://www.minddust.com/project/bootstrap-progressbar/
	 *
	 * Licensed under the MIT license:
	 * http://www.opensource.org/licenses/MIT
     */    

     var Progressbar = ui.Progressbar = Widget.inherit({
     	klassName : "Progressbar",

     	pluginName : "lark.progressbar",

	    options : {
	        transition_delay: 300,
	        refresh_speed: 50,
	        display_text: 'none',
	        use_percentage: true,
	        percent_format: function(percent) { return percent + '%'; },
	        amount_format: function(amount_part, amount_max, amount_min) { return amount_part + ' / ' + amount_max; },
	        update: $.noop,
	        done: $.noop,
	        fail: $.noop
	    },

     	_construt : function(element, options) {
	        this.$element = $(element);
	        this.options = $.extend({}, Progressbar.defaults, options);
     	},


	    transition : function() {
	        var $this = this.$element;
	        var $parent = $this.parent();
	        var $back_text = this.$back_text;
	        var $front_text = this.$front_text;
	        var options = this.options;
	        var data_transitiongoal = parseInt($this.attr('data-transitiongoal'));
	        var aria_valuemin = parseInt($this.attr('aria-valuemin')) || 0;
	        var aria_valuemax = parseInt($this.attr('aria-valuemax')) || 100;
	        var is_vertical = $parent.hasClass('vertical');
	        var update = options.update && typeof options.update === 'function' ? options.update : Progressbar.defaults.update;
	        var done = options.done && typeof options.done === 'function' ? options.done : Progressbar.defaults.done;
	        var fail = options.fail && typeof options.fail === 'function' ? options.fail : Progressbar.defaults.fail;

	        if (isNaN(data_transitiongoal)) {
	            fail('data-transitiongoal not set');
	            return;
	        }
	        var percentage = Math.round(100 * (data_transitiongoal - aria_valuemin) / (aria_valuemax - aria_valuemin));

	        if (options.display_text === 'center' && !$back_text && !$front_text) {
	            this.$back_text = $back_text = $('<span>').addClass('progressbar-back-text').prependTo($parent);
	            this.$front_text = $front_text = $('<span>').addClass('progressbar-front-text').prependTo($this);

	            var parent_size;

	            if (is_vertical) {
	                parent_size = $parent.css('height');
	                $back_text.css({height: parent_size, 'line-height': parent_size});
	                $front_text.css({height: parent_size, 'line-height': parent_size});

	                $(window).resize(function() {
	                    parent_size = $parent.css('height');
	                    $back_text.css({height: parent_size, 'line-height': parent_size});
	                    $front_text.css({height: parent_size, 'line-height': parent_size});
	                }); // normal resizing would brick the structure because width is in px
	            }
	            else {
	                parent_size = $parent.css('width');
	                $front_text.css({width: parent_size});

	                $(window).resize(function() {
	                    parent_size = $parent.css('width');
	                    $front_text.css({width: parent_size});
	                }); // normal resizing would brick the structure because width is in px
	            }
	        }

	        setTimeout(function() {
	            var current_percentage;
	            var current_value;
	            var this_size;
	            var parent_size;
	            var text;

	            if (is_vertical) {
	                $this.css('height', percentage + '%');
	            }
	            else {
	                $this.css('width', percentage + '%');
	            }

	            var progress = setInterval(function() {
	                if (is_vertical) {
	                    this_size = $this.height();
	                    parent_size = $parent.height();
	                }
	                else {
	                    this_size = $this.width();
	                    parent_size = $parent.width();
	                }

	                current_percentage = Math.round(100 * this_size / parent_size);
	                current_value = Math.round(aria_valuemin + this_size / parent_size * (aria_valuemax - aria_valuemin));

	                if (current_percentage >= percentage) {
	                    current_percentage = percentage;
	                    current_value = data_transitiongoal;
	                    done($this);
	                    clearInterval(progress);
	                }

	                if (options.display_text !== 'none') {
	                    text = options.use_percentage ? options.percent_format(current_percentage) : options.amount_format(current_value, aria_valuemax, aria_valuemin);

	                    if (options.display_text === 'fill') {
	                        $this.text(text);
	                    }
	                    else if (options.display_text === 'center') {
	                        $back_text.text(text);
	                        $front_text.text(text);
	                    }
	                }
	                $this.attr('aria-valuenow', current_value);

	                update(current_percentage, $this);
	            }, options.refresh_speed);
	        }, options.transition_delay);
	    }

     });

	return Progressbar;
	
 });
define('skylark-ui-swt/Radio',[
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
  "./ui",
  "./_Toggler"
],function(langx,browser,eventer,noder,geom,$,ui,_Toggler){

  var Radio = ui.Radio = _Toggler.inherit({
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


define('skylark-ui-swt/Textbox',[
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
  "./ui",
  "./Widget"
],function(langx,browser,eventer,noder,geom,$,ui,Widget){


  var SyncAttrs = [
    'rows', 'spellcheck', 'maxLength', 'size', 'readonly', 'min',
    'max', 'step', 'list', 'pattern', 'placeholder', 'required', 'multiple'
  ];

	var Textbox = ui.Textbox = Widget.inherit({
		klassName: "Textbox",

    pluginName: "lark.textbox",

    /*
     * Parse options from attached dom element.
     * @override
     */
    _parse : function() {
      var  velm = this._velm;

      // get multiline option
      this.options.multiline = velm.is("textarea");
      
      // get current state of input
      var value = $chk.prop('checked');
      var disabled = $chk.prop('disabled');
      this.state.set("value",value);
      this.state.set(("disabled",disabled));

    },

    /*
     * Create a new  dom element for this widget
     * @override
     */
    _create : function() {
      var tagName = "input",attrs = {},
          options = this.options;

      langx.each([
        'rows', 'spellcheck', 'maxLength', 'size', 'readonly', 'min',
        'max', 'step', 'list', 'pattern', 'placeholder', 'required', 'multiple'
      ], function (name) {
        attrs[name] = options[name];
      });

      if (options.multiline) {
        tagName = "textarea"
      } 
      if (options.subtype) {
        attrs.type = options.subtype;
      }
      this._elm = this._dom.noder.createElement(tagName,attrs);
    },

    /*
     * Init  this widget
     * @override
     */
    _init : function() {
    },

    /*
     * Sync dom element to widget state 
     * @override
     */
    _sync : function() {
      // handle internal events
      var self = this;
      this._velm.on('change', function(evt) {
        var value = self._velm.prop('value');
        self.state.set("value",value);
      });
    },

    _refresh : function(updates) {
        var self  = this;

        if (updates["value"] !== undefined) {
          if (self._velm.value() !== e.value) {
            self._velm.value(updates.value);
          }
        }
        if (updates["disabled"] !== undefined) {
          self._velm.disable(updates["disabled"]);
        }

        // update visual with attribute values from control
        this.overrided(changed);
    },

  });

	return Textbox;
});


define('skylark-ui-swt/Toolbar',[
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
  "./ui",
  "./Widget"
],function(langx,browser,eventer,noder,geom,$,ui,Widget){

	var Toolbar = ui.Toolbar = Widget.inherit({
        klassName: "Toolbar",

	    pluginName : "lark.toolbar",

        init : function(elm,options) {
			var self = this;
			this._options = langx.mixin({
					autoredraw: true,
					buttons: {},
					context: {},
					list: [],
					show: true,
			},options);


			this.$container = $('<nav class="navbar"/>');
			this.$el = $(elm).append(this.$container);

			this.$container.on('mousedown.bs.dropdown.data-api', '[data-toggle="dropdown"]',function(e) {
				$(this).dropdown();
			}); 

			this.render();
        },


		render : function () {
			function createToolbarItems(items,container) {
				langx.each(items,function(i,item)  {
					var type = item.type;
					if (!type) {
						type = "button";
					}
					switch (type) {
						case "buttongroup":
							// Create an element with the HTML
							createButtonGroup(item,container);
							break;
						case "button":
							createButton(item,container)
							break;
						case "dropdown":
						case "dropup":
							createDrop(item,container)
							break;
						case "input":
							createInput(item,container)
							break;
						default:
							throw "Wrong widget button type";
					}
				});

			}

			function createButtonGroup(item,container) {
				var  group = $("<div/>", { class: "btn-group", role: "group" });
				container.append(group);
				createToolbarItems(item.items,group);
				return group;
			}

			function createButton(item,container) {
				// Create button
				var button = $('<button type="button" class="btn btn-default"/>'),
					attrs = langx.mixin({},item);

				// If has icon
				if ("icon" in item) {
					button.append($("<span/>", { class: item.icon }));
					delete attrs.icon;
				}
				// If has text
				if ("text" in attrs) {
					button.append(" " + item.text);
					delete attrs.text;
				}

				button.attr(attrs);

				// Add button to the group
				container.append(button);

			}

			function createDrop(item,container) {
				// Create button
				var dropdown_group = $('<div class="btn-group" role="group"/>');
				var dropdown_button = $('<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>');
				var dropdown_list = $('<ul class="dropdown-menu"/>');

				var	attrs = langx.mixin({},item);

				if(item.type === "dropup") {
					dropdown_group.addClass("dropup");
				}

				// If has icon
				if ("icon" in item) {
					dropdown_button.append($("<span/>", { class: item.icon }));
					delete attrs.icon;
				}
				// If has text
				if ("text" in item) {
					dropdown_button.append(" " + item.text);
					delete attrs.text;
				}
				// Add caret
				dropdown_button.append(' <span class="caret"/>');

				// Add list of options
				for(var i in item.list) {
					var dropdown_option = item.list[i];
					var dropdown_option_li = $('<li/>');

					// If has icon
					if ("icon" in dropdown_option) {
						dropdown_option_li.append($("<span/>", { class: dropdown_option.icon }));
					}

					// If has text
					if ("text" in dropdown_option) {
						dropdown_option_li.append(" " + dropdown_option.text);
					}
					// Set attributes
					dropdown_option_li.attr(dropdown_option);

					// Add to dropdown list
					dropdown_list.append(dropdown_option_li);
				}
				
				// Set attributes
				dropdown_group.attr(attrs);

				dropdown_group.append(dropdown_button);
				dropdown_group.append(dropdown_list);
				container.append(dropdown_group);

			}

			function createInput(item,container) {
				var input_group = $('<div class="input-group"/>');
				var input_element = $('<input class="form-control"/>');
				
				var	attrs = langx.mixin({},item);

				// Add prefix addon
				if("prefix" in item) {
					var input_prefix = $('<span class="input-group-addon"/>');
					input_prefix.html(item.prefix);
					input_group.append(input_prefix);

					delete attrs.prefix;
				}
				
				// Add input
				input_group.append(input_element);

				// Add sufix addon
				if("sufix" in item) {
					var input_sufix = $('<span class="input-group-addon"/>');
					input_sufix.html(item.sufix);
					input_group.append(input_sufix);

					delete attrs.sufix;
				}

				attrs.type = attrs.inputType;

				delete attrs.inputType;

				// Set attributes
				input_element.attr(attrs);

				container.append(input_group);

			}

			var items = this._options.items;
			if (items) {
				createToolbarItems(items,this.$container);
			}
		}

	});


	$.fn.toolbar = function (options) {
		options = options || {};

		return this.each(function () {
			return new Toolbar(this, langx.mixin({}, options,true));
		});
	};

	return Toolbar;

});

define('skylark-ui-swt/main',[
    "./ui",
    "./Widget",
    "./Accordion",
    "./Button",
    "./Carousel",
    "./Checkbox",
    "./Menu",
    "./Pagination",
    "./Progressbar",
    "./Radio",
    "./Textbox",
    "./Toolbar"
/*    
    "./checkbox",
    "./combobox",
    "./datepicker",
    "./dropdown-autoflip",
    "./infinite-scroll",
    "./loader",
    "./menu",
    "./picker",
    "./pillbox",
    "./placard",
    "./radio",
    "./scheduler",
    "./search",
    "./selectlist",
    "./spinbox",
    "./toolbar",
    "./wizard"
*/
], function(ui) {
    return ui;
});
define('skylark-ui-swt', ['skylark-ui-swt/main'], function (main) { return main; });


},this);