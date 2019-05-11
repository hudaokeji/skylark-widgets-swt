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
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
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

define('skylark-ui-swt/swt',[
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
  "skylark-utils-dom/datax",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/elmx",
  "skylark-utils-dom/query",
  "skylark-utils-dom/plugins",
  "skylark-utils-collection/Map",
  "./swt"
],function(skylark,langx,browser,datax,eventer,noder,geom,elmx,$,plugins,Map,swt){

/*---------------------------------------------------------------------------------*/

	var Widget = plugins.Plugin.inherit({
    klassName: "Widget",

    _elmx : elmx,

    _construct : function(elm,options) {
        if (langx.isHtmlNode(elm)) {
          options = this._parse(elm,options);
        } else {
          options = elm;
          elm = null;
        }
        this.overrided(elm,options);

        if (!elm) {
          this._velm = this._create();
          this._elm = this._velm.elm();
        } else {
          this._velm = elmx(this._elm);
        }
        
        Object.defineProperty(this,"state",{
          value :this.options.state || new Map()
        });

        //this.state = this.options.state || new Map();
        this._init();
     },

    /**
     * Parses widget options from attached element.
     * This is a callback method called by constructor when attached element is specified.
     * @method _parse
     * @return {Object} options.
     */
    _parse : function(elm,options) {
      var optionsAttr = datax.data(elm,"options");
      if (optionsAttr) {
         var options1 = JSON.parse("{" + optionsAttr + "}");
         options = langx.mixin(options1,options); 
      }
      return options || {};
    },


    /**
     * Create html element for this widget.
     * This is a callback method called by constructor when attached element is not specified.
     * @method _create
     */
    _create : function() {
        var template = this.options.template;
        if (template) {
          return this._elmx(template);
        } else {
          throw new Error("The template is not existed in options!");
        }
    },


    /**
     * Init widget.
     * This is a callback method called by constructor.
     * @method _init
     */
    _init : function() {
      var self = this;
      if (this.widgetClass) {
        this._velm.addClass(this.widgetClass);
      }
      this.state.on("changed",function(e,args) {
        self._refresh(args.data);
      });
    },


    /**
     * Startup widget.
     * This is a callback method called when widget element is added into dom.
     * @method _post
     */
    _startup : function() {

    },


    /**
     * Refresh widget.
     * This is a callback method called when widget state is changed.
     * @method _refresh
     */
    _refresh : function(updates) {
      /*
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
      */
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
     * @method render
     * @return {HtmlElement} HTML element representing the widget.
     */
    render: function() {
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
      this._velm.show();
    },

    /**
     * Sets the visible state to false.
     *
     * @method hide
     * @return {Widget} Current widget instance.
     */
    hide : function() {
      this._velm.hide();
    },

    /**
     * Focuses the current widget.
     *
     * @method focus
     * @return {Widget} Current widget instance.
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
     * Blurs the current widget.
     *
     * @method blur
     * @return {Widget} Current widget instance.
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
     * @return {Widget} Current widget instance.
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

    throb: function(params) {
      return noder.throb(this._elm,params);
    },


    /**
     *  Attach the current widget element to dom document.
     *
     * @method attach
     * @return {Widget} This Widget.
     */
    attach : function(target,position){
        var elm = target;
        if (!position || position=="child") {
            noder.append(elm,this._elm);
        } else  if (position == "before") {
            noder.before(elm,this._elm);
        } else if (position == "after") {
            noder.after(elm,this._elm);
        }
        this._startup();
    },

    /**
     *  Detach the current widget element from dom document.
     *
     * @method html
     * @return {HtmlElement} HTML element representing the widget.
     */
    detach : function() {
      this._velm.remove();
    }
  });

  Widget.inherit = function(meta) {
    var ctor = plugins.Plugin.inherit.apply(this,arguments);

    function addStatePropMethod(name) {
        ctor.prototype[name] = function(value) {
          if (value !== undefined) {
            this.state.set(name,value);
            return this;
          } else {
            return this.state.get(name);
          }
        };
    }
    if (meta.state) {
      for (var name in meta.state) {
          addStatePropMethod(name);
      }
    }

    if (meta.pluginName) {
      plugins.register(ctor,meta.pluginName);
    }
    return ctor;
  };

  Widget.register = function(ctor,widgetName) {
    var meta = ctor.prototype,
        pluginName = widgetName || meta.pluginName;

    function addStatePropMethod(name) {
        ctor.prototype[name] = function(value) {
          if (value !== undefined) {
            this.state.set(name,value);
            return this;
          } else {
            return this.state.get(name);
          }
        };
    }
    if (meta.state) {
      for (var name in meta.state) {
          addStatePropMethod(name);
      }
    }

    if (pluginName) {
      plugins.register(ctor,pluginName);
    }
    return ctor;
  };

	return swt.Widget = Widget;
});

define('skylark-ui-swt/Panel',[
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
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
define('skylark-ui-swt/Accordion',[
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
  "skylark-bootstrap3/collapse",
  "./swt",
  "./Widget",
  "./Panel"
],function(langx,browser,eventer,noder,geom,$,collapse,swt,Widget, Panel){

  var Accordion = Widget.inherit({
    klassName : "Accordion",

    pluginName : "lark.accordion",

    options : {
      panel: {
        selector : "> .panel",
        template : null,
      }
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

    _post : function() {
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

    /**
     * Removes a accordion pane.
     *
     * @method remove
     * @return {Accordion} The current widget.
     */
    remove : function() {

    },

    /**
     * Expands a accordion pane.
     *
     * @method remove
     * @return {Accordion} The current widget.
     */
    expand : function() {
      // expand a panel

    },

    /**
     * Expands all accordion panes.
     *
     * @method expandAll
     * @return {Accordion} The current widget.
     */
    expandAll : function() {
      // expand a panel

    },

    /**
     * Collapse a accordion pane.
     *
     * @method collapse
     * @return {Accordion} The current widget.
     */
    collapse : function() {

    },

    /**
     * Collapses all accordion pane.
     *
     * @method collapseAll
     * @return {Accordion} The current widget.
     */
    collapseAll : function() {

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
      $(this._elm).collapse("hide");
    },

    toogle : function() {
      // toogle this panel
     $(this._elm).collapse("toogle");
    },

    remove : function() {
      this.overided();
    }
  });

  return swt.Accordion = Accordion;
});

define('skylark-ui-swt/Button',[
  "skylark-langx/langx",
  "skylark-utils-dom/query",
  "./swt",
  "./Widget"
],function(langx,$,swt,Widget){

	class Button extends Widget {
		get klassName() {
      return "Button";
    } 

    get pluginName(){
      return "lark.button";
    } 

		get options () {
      return {
        btnSize : "lg",
        btnType : "default",
        leftIcon : null,
        rightIcon : null,
        topIcon : null, // TODO
        bottomIcon : null //TODO        
      }
		}

    get state() {
      return {
        "text" : String
      }
    }

    _parse (elm,options) {
      var $el = $(elm),
          options = langx.mixin({},options);

      if (!options.btnType) {
        if ($el.hasClass("btn-link")) {
          options.btnType = "link";
        } else if ($el.hasClass("btn-default")) {
          options.btnType = "default";
        } else if ($el.hasClass("btn-primary")) {
          options.btnType = "primary";
        } else if ($el.hasClass("btn-info")) {
          options.btnType = "info";
        } else if ($el.hasClass("btn-success")) {
          options.btnType = "success";
        } else if ($el.hasClass("btn-warning")) {
          options.btnType = "warning";
        } else if ($el.hasClass("btn-danger")) {
          options.btnType = "danger";
        }        
      }

      if (!options.btnSize) {
        if ($el.hasClass("btn-xs")) {
          options.btnSize = "xs";
        } else if ($el.hasClass("btn-sm")) {
          options.btnSize = "sm";
        } else if ($el.hasClass("btn-lg")) {
          options.btnSize = "lg";
        }        
      }

      if (!options.href) {
        options.href = $el.attr('href');

        options.target = $el.attr('target');
      }

      if (!options.text) {
        options.text = $el.find('.text').text();
      }

      if (!options.leftIcon) {
        var $fa_icon_left = $el.find('.fa-icon-left');
        if ($fa_icon_left.length > 0) {
          $fa_icon_left.removeClass('fa-icon-left').removeClass('fa');
          options.leftIcon = $fa_icon_left.attr('class');
          $fa_icon_left.addClass('fa-icon-left').addClass('fa');
        }
      }

      if (!options.rightIcon) {
        var $fa_icon_right = $el.find('.fa-icon-right');

        if ($fa_icon_right.length > 0) {
          $fa_icon_right.removeClass('fa-icon-right').removeClass('fa');
          options.rightIcon = $fa_icon_right.attr('class');
          $fa_icon_right.addClass('fa-icon-right').addClass('fa');
        }        
      }
    }

    _refresh (updates) {
      //this.overrided(updates);
      super._refresh(updates);

      var velm = this._velm;

      if (updates.btnType) {
          velm.removeClass('btn-link btn-default btn-primary btn-info btn-success btn-warning btn-danger').addClass("btn-" + updates.btnType.value);
      }

      if (updates.btnSize) {
        velm.removeClass('btn-xs btn-sm btn-lg').addClass("btn-" + updates.btnSize.value);
      }

      if (updates.text) {
        velm.$('.text').text(updates.text.value);
      }

      if (updates.left) {
          velm.$('.fa-icon-left').remove();
          velm.prepend('<i style="word-spacing: -1em;" class="fa fa-icon-left fa-' + updates.iconleft.value + '">&nbsp;</i>\n');
      }

      if (updates.iconright) {
          velm.$('.fa-icon-right').remove();
          if (updates.iconright.value) {
              velm.append('<i style="word-spacing: -1em;" class="fa fa-icon-right fa-' + updates.iconright.value + '">&nbsp;</i>\n');
          }
      }
    }
  };

  Widget.register(Button);
//  class Buttonx extends Button {
//
//  }

//  Widget.register(Buttonx,"lark.button");
  return swt.Button = Button;

});




define('skylark-ui-swt/Carousel',[
    "skylark-langx/langx",
    "skylark-utils-dom/browser",
    "skylark-utils-dom/eventer",
    "skylark-utils-dom/noder",
    "skylark-utils-dom/geom",
    "skylark-utils-dom/query",
    "./swt",
    "./Widget",
    "skylark-bootstrap3/carousel"
], function(langx, browser, eventer, noder, geom,  $, swt, Widget) {

    var Carousel =  Widget.inherit({
        klassName : "Carousel",
        pluginName : "lark.carousel",

        options : {

            items : [],

            indicatorTemplate : "",
            slideTemplate : "",

            templates : {
              container : "<div class=\"carousel slide\" data-ride=\"carousel\">" +
                          "/div",
              indicators : {
                  container : "<ol class=\"carousel-indicators\">" +
                              "</ol>",
                  item :  "<li></li>"
              },

              slides : {
                  container : "<div class=\"carousel-inner\">" +
                              "/div",
                  item :  "<div class=\"item carousel-item\">" +
                            "<img alt=\"First slide\"  src=\"{{url}}\">" +
                          "</div>"
              }
            }
        },

        _init : function() {
          this._bs_carousel = this._velm.carousel(this.options);
          var self = this;          
          this._velm.on("click.lark", "[data-slide],[data-slide-to]", function(e) {
            var $this = $(this)
            var slideIndex = $this.attr('data-slide-to');
            if (slideIndex) {
                self.to(slideIndex);
            } else {
              var slideAction = $this.attr('data-slide');
              if (slideAction == "prev") {
                self.prev();
              } else {
                self.next();
              }
            }

            e.preventDefault();

        });
        },

        to : function(pos) {
          return this._bs_carousel.to(pos);
        },

        pause : function(e) {
          this._bs_carousel.pause(e);
          return this;
        },

        cycle : function(e) {
          return this._bs_carousel.cycle(e);
        },

        next : function() {
          return this._bs_carousel.next();
        },

        prev : function() {
          return this._bs_carousel.prev();
        },

        add : function() {
            
        },

        createIndicator: function (obj) {
          var gallery = this.gallery,
            indicator = this.indicatorPrototype.cloneNode(false)
          var title = gallery.getItemTitle(obj)
          var thumbnailProperty = this.options.thumbnailProperty
          var thumbnailUrl
          var thumbnail
          if (this.options.thumbnailIndicators) {
            if (thumbnailProperty) {
              thumbnailUrl = Gallery.getItemProperty(obj, thumbnailProperty)
            }
            if (thumbnailUrl === undefined) {
              thumbnail = obj.getElementsByTagName && $(obj).find('img')[0]
              if (thumbnail) {
                thumbnailUrl = thumbnail.src
              }
            }
            if (thumbnailUrl) {
              indicator.style.backgroundImage = 'url("' + thumbnailUrl + '")'
            }
          }
          if (title) {
            indicator.title = title;
          }
          return indicator;
      },

      addIndicator: function (index) {
        if (this.indicatorContainer.length) {
          var indicator = this.createIndicator(this.list[index])
          indicator.setAttribute('data-slide-to', index)
          this.indicatorContainer[0].appendChild(indicator)
          this.indicators.push(indicator)
        }
      },

      setActiveIndicator: function (index) {
        if (this.indicators) {
          if (this.activeIndicator) {
            this.activeIndicator.removeClass(this.options.activeIndicatorClass)
          }
          this.activeIndicator = $(this.indicators[index])
          this.activeIndicator.addClass(this.options.activeIndicatorClass)
        }
      },

      initSlides: function (reload) {
        if (!reload) {
          this.indicatorContainer = this.container.find(
            this.options.indicatorContainer
          )
          if (this.indicatorContainer.length) {
            this.indicatorPrototype = document.createElement('li')
            this.indicators = this.indicatorContainer[0].children
          }
        }
        this.overrided(reload);
      },

      addSlide: function (index) {
        this.overrided(index);
        this.addIndicator(index)
      },

      resetSlides: function () {
        this.overrided();
        this.indicatorContainer.empty();
        this.indicators = [];
      },

    });

    return swt.Carousel = Carousel;

});
define('skylark-ui-swt/_Toggler',[
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
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

define('skylark-ui-swt/CheckBox',[
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
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

define('skylark-ui-swt/ComboBox',[
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
  "./swt",
  "./Widget",
  "skylark-bootstrap3/dropdown"
],function(langx,browser,eventer,noder,geom,$,swt,Widget){



	// COMBOBOX CONSTRUCTOR AND PROTOTYPE

	var ComboBox = Widget.inherit({
		klassName: "ComboBox",

		pluginName : "lark.combobox",

		widgetClass : "lark-combobox",

		options : {

			autoResizeMenu: true,
			filterOnKeypress: false,
			showOptionsOnKeypress: false,
			filter: function filter (list, predicate, self) {
				var visible = 0;
				self.$dropMenu.find('.empty-indicator').remove();

				list.each(function (i) {
					var $li = $(this);
					var text = $(this).text().trim();

					$li.removeClass();

					if (text === predicate) {
						$li.addClass('text-success');
						visible++;
					} else if (text.substr(0, predicate.length) === predicate) {
						$li.addClass('text-info');
						visible++;
					} else {
						$li.addClass('hidden');
					}
				});

				if (visible === 0) {
					self.$dropMenu.append('<li class="empty-indicator text-muted"><em>No Matches</em></li>');
				}
			}
		},

		_init : function() {
			this.$element = $(this._elm);

			this.$dropMenu = this.$element.find('.dropdown-menu');
			this.$input = this.$element.find('input');
			this.$button = this.$element.find('.btn');
			this.$button.dropdown();
			this.$inputGroupBtn = this.$element.find('.input-group-btn');

			this.$element.on('click.lark', 'a', langx.proxy(this.itemclicked, this));
			this.$element.on('change.lark', 'input', langx.proxy(this.inputchanged, this));
			this.$element.on('shown.bs.dropdown', langx.proxy(this.menuShown, this));
			this.$input.on('keyup.lark', langx.proxy(this.keypress, this));

			// set default selection
			this.setDefaultSelection();

			// if dropdown is empty, disable it
			var items = this.$dropMenu.children('li');
			if( items.length === 0) {
				this.$button.addClass('disabled');
			}

			// filter on load in case the first thing they do is press navigational key to pop open the menu
			if (this.options.filterOnKeypress) {
				this.options.filter(this.$dropMenu.find('li'), this.$input.val(), this);
			}
		},

		_destroy: function () {
			this.$element.remove();
			// remove any external bindings
			// [none]

			// set input value attrbute in markup
			this.$element.find('input').each(function () {
				$(this).attr('value', $(this).val());
			});

			// empty elements to return to original markup
			// [none]

			return this.$element[0].outerHTML;
		},

		doSelect: function ($item) {

			if (typeof $item[0] !== 'undefined') {
				// remove selection from old item, may result in remove and
				// re-addition of class if item is the same
				this.$element.find('li.selected:first').removeClass('selected');

				// add selection to new item
				this.$selectedItem = $item;
				this.$selectedItem.addClass('selected');

				// update input
				this.$input.val(this.$selectedItem.text().trim());
			} else {
				// this is a custom input, not in the menu
				this.$selectedItem = null;
				this.$element.find('li.selected:first').removeClass('selected');
			}
		},

		clearSelection: function () {
			this.$selectedItem = null;
			this.$input.val('');
			this.$dropMenu.find('li').removeClass('selected');
		},

		menuShown: function () {
			if (this.options.autoResizeMenu) {
				this.resizeMenu();
			}
		},

		resizeMenu: function () {
			var width = this.$element.outerWidth();
			this.$dropMenu.outerWidth(width);
		},

		selectedItem: function () {
			var item = this.$selectedItem;
			var data = {};

			if (item) {
				var txt = this.$selectedItem.text().trim();
				data = langx.mixin({
					text: txt
				}, this.$selectedItem.data());
			} else {
				data = {
					text: this.$input.val().trim(),
					notFound: true
				};
			}

			return data;
		},

		selectByText: function (text) {
			var $item = $([]);
			this.$element.find('li').each(function () {
				if ((this.textContent || this.innerText || $(this).text() || '').trim().toLowerCase() === (text || '').trim().toLowerCase()) {
					$item = $(this);
					return false;
				}
			});

			this.doSelect($item);
		},

		selectByValue: function (value) {
			var selector = 'li[data-value="' + value + '"]';
			this.selectBySelector(selector);
		},

		selectByIndex: function (index) {
			// zero-based index
			var selector = 'li:eq(' + index + ')';
			this.selectBySelector(selector);
		},

		selectBySelector: function (selector) {
			var $item = this.$element.find(selector);
			this.doSelect($item);
		},

		setDefaultSelection: function () {
			var selector = 'li[data-selected=true]:first';
			var item = this.$element.find(selector);

			if (item.length > 0) {
				// select by data-attribute
				this.selectBySelector(selector);
				item.removeData('selected');
				item.removeAttr('data-selected');
			}
		},

		enable: function () {
			this.$element.removeClass('disabled');
			this.$input.removeAttr('disabled');
			this.$button.removeClass('disabled');
		},

		disable: function () {
			this.$element.addClass('disabled');
			this.$input.attr('disabled', true);
			this.$button.addClass('disabled');
		},

		itemclicked: function (e) {
			this.$selectedItem = $(e.target).parent();

			// set input text and trigger input change event marked as synthetic
			this.$input.val(this.$selectedItem.text().trim()).trigger('change', {
				synthetic: true
			});

			// pass object including text and any data-attributes
			// to onchange event
			var data = this.selectedItem();

			// trigger changed event
			this.$element.trigger('changed.lark', data);

			e.preventDefault();

			// return focus to control after selecting an option
			this.$element.find('.dropdown-toggle').focus();
		},

		keypress: function (e) {
			var ENTER = 13;
			//var TAB = 9;
			var ESC = 27;
			var LEFT = 37;
			var UP = 38;
			var RIGHT = 39;
			var DOWN = 40;

			var IS_NAVIGATIONAL = (
				e.which === UP ||
				e.which === DOWN ||
				e.which === LEFT ||
				e.which === RIGHT
			);

			if(this.options.showOptionsOnKeypress && !this.$inputGroupBtn.hasClass('open')){
				this.$button.dropdown('toggle');
				this.$input.focus();
			}

			if (e.which === ENTER) {
				e.preventDefault();

				var selected = this.$dropMenu.find('li.selected').text().trim();
				if(selected.length > 0){
					this.selectByText(selected);
				}else{
					this.selectByText(this.$input.val());
				}

				this.$inputGroupBtn.removeClass('open');
			} else if (e.which === ESC) {
				e.preventDefault();
				this.clearSelection();
				this.$inputGroupBtn.removeClass('open');
			} else if (this.options.showOptionsOnKeypress) {
				if (e.which === DOWN || e.which === UP) {
					e.preventDefault();
					var $selected = this.$dropMenu.find('li.selected');
					if ($selected.length > 0) {
						if (e.which === DOWN) {
							$selected = $selected.next(':not(.hidden)');
						} else {
							$selected = $selected.prev(':not(.hidden)');
						}
					}

					if ($selected.length === 0){
						if (e.which === DOWN) {
							$selected = this.$dropMenu.find('li:not(.hidden):first');
						} else {
							$selected = this.$dropMenu.find('li:not(.hidden):last');
						}
					}
					this.doSelect($selected);
				}
			}

			// Avoid filtering on navigation key presses
			if (this.options.filterOnKeypress && !IS_NAVIGATIONAL) {
				this.options.filter(this.$dropMenu.find('li'), this.$input.val(), this);
			}

			this.previousKeyPress = e.which;
		},

		inputchanged: function (e, extra) {
			var val = $(e.target).val();
			// skip processing for internally-generated synthetic event
			// to avoid double processing
			if (extra && extra.synthetic) {
				this.selectByText(val);
				return;
			}
			this.selectByText(val);

			// find match based on input
			// if no match, pass the input value
			var data = this.selectedItem();
			if (data.text.length === 0) {
				data = {
					text: val
				};
			}

			// trigger changed event
			this.$element.trigger('changed.lark', data);
		}

	});



	ComboBox.prototype.getValue = ComboBox.prototype.selectedItem;



	return swt.ComboBox = ComboBox;
});

define('skylark-ui-swt/InputBox',[
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
  "./swt",
  "./Widget"
],function(langx,browser,eventer,noder,geom,$,swt,Widget){

  var SyncAttrs = [
    'rows', 'spellcheck', 'maxLength', 'size', 'readonly', 'min',
    'max', 'step', 'list', 'pattern', 'placeholder', 'required', 'multiple'
  ];

	var InputBox =  Widget.inherit({
		klassName: "InputBox",

    pluginName: "lark.inputbox",

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
     * Init this widget
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

	return swt.InputBox = InputBox;
});


 define('skylark-ui-swt/ListGroup',[
  "skylark-langx/langx",
  "skylark-utils-dom/query",
  "./swt",
  "./Widget"
],function(langx,$,swt,Widget){

    var ListGroup = Widget.inherit({
        klassName : "ListGroup",

        pluginName : "lark.listgroup",

        options : {
        	multiSelect: false,
          	multiTier : false,
          	toggle : false,
          	classes : {
            	active : "active"
          	},
          	selectors : {
            	item : ".list-group-item"
          	},
          	selected : 0
        },

        state : {
          selected : Object
        },

        _init : function() {
            this.overrided();
            var self = this,
                velm = this._velm,
                itemSelector = this.options.selectors.item;

            this._$items = velm.$(itemSelector);

            velm.on('click', itemSelector, function () {
                var veItem = self._elmx(this);

                if (!veItem.hasClass('disabled')) {
                  var value = veItem.data("value");
                  if (value === undefined) {
                    value = self._$items.index(this);
                  }
                  self.state.set("selected",value);
                }

                //veItem.blur();
                return false;
            });
            this.state.set("selected",this.options.selected);

            var $this = velm,
                $toggle = this.options.toggle,
                obj = this;

            //if (this.isIE() <= 9) {
            //    $this.find("li.active").has("ul").children("ul").collapse("show");
            //    $this.find("li").not(".active").has("ul").children("ul").collapse("hide");
            //} else {
                $this.query("li.active").has("ul").children("ul").addClass("collapse in");
                $this.query("li").not(".active").has("ul").children("ul").addClass("collapse");
            //}

            //add the "doubleTapToGo" class to active items if needed
            if (obj.options.doubleTapToGo) {
                $this.query("li.active").has("ul").children("a").addClass("doubleTapToGo");
            }

            $this.query("li").has("ul").children("a").on("click" + "." + this.pluginName, function(e) {
                e.preventDefault();

                //Do we need to enable the double tap
                if (obj.options.doubleTapToGo) {

                    //if we hit a second time on the link and the href is valid, navigate to that url
                    if (obj.doubleTapToGo($(this)) && $(this).attr("href") !== "#" && $(this).attr("href") !== "") {
                        e.stopPropagation();
                        document.location = $(this).attr("href");
                        return;
                    }
                }

                $(this).parent("li").toggleClass("active").children("ul").collapse("toggle");

                if ($toggle) {
                    $(this).parent("li").siblings().removeClass("active").children("ul.in").collapse("hide");
                }

            });


        },

        _refresh : function(updates) {
          this.overrided(updates);
          var self  = this;

          function findItem(valueOrIdx) {
            var $item;
            if (langx.isNumber(valueOrIdx)) {
              $item = self._$items.eq(valueOrIdx);
            } else {
              $item = self._$items.filter('[data-value="' + valueOrIdx + '"]');
            }
            return $item;
          } 
                 
          function selectOneItem(valueOrIdx) {
            findItem(valueOrIdx).addClass(self.options.classes.active);
          }

          function unselectOneItem(valueOrIdx) {
            findItem(valueOrIdx).removeClass(self.options.classes.active);
          }

          if (updates["selected"]) {
            if (this.options.multiSelect) {
            } else {
              unselectOneItem(updates["selected"].oldValue);
              selectOneItem(updates["selected"].value);
            }

          }
        }

  });

  return ListGroup;

});




define('skylark-ui-swt/Menu',[
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
  "./swt",
  "./Widget"
],function(langx,browser,eventer,noder,geom,$,swt,Widget){
	
	var popup = null;
	var right_to_left ;

	var Menu = swt.Menu = Widget.inherit({
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
  "./swt",
  "./Widget"
],function(langx,browser,eventer,noder,geom,$,swt,Widget){

    'use strict';

    var Pagination = swt.Pagination = Widget.inherit({
        klassName : "Pagination",

        pluginName : "lark.pagination",

        options : {
            tagName : "ul",
            css : "",
            selectors : {
                firstNavi : "li[aria-label='first']",
                prevNavi : "li[aria-label='prev']",
                nextNavi : "li[aria-label='next']",
                lastNavi : "li[aria-label='last']",
                numericNavi : "li:not([aria-label])",
                numericTxt  : "a"
            },
            totalPages: 7,
            maxButtonsVisible: 5,
            currentPage: 1     
        },

        state : {
            totalPages : Number,
            currentPage : Number
        },

        _parse : function(elm,options) {

        },
        
        _create : function(self) {
        },

        _init : function() {
          this.$first = this._velm.$(this.options.selectors.firstNavi);
          this.$prev = this._velm.$(this.options.selectors.prevNavi);
          this.$last = this._velm.$(this.options.selectors.lastNavi);
          this.$next = this._velm.$(this.options.selectors.nextNavi);
          this.$numeric = this._velm.$(this.options.selectors.numericNavi);

          var self = this;

          function checkCanAction(elm) {
            var $elm = $(elm);
            if ($elm.is(".disabled,.active")) {
              return false;
            } else {
              return $elm;
            }
          }

          this.$first.click(function(){
            if (!checkCanAction(this)) {
              return;
            }
            self.currentPage(1);
          });

          this.$prev.click(function(){
            if (!checkCanAction(this)) {
              return;
            }
            self.currentPage(self.currentPage()-1);
          });

          this.$last.click(function(){
            if (!checkCanAction(this)) {
              return;
            }
            self.currentPage(self.totalPages());
          });

          this.$next.click(function(){
            if (!checkCanAction(this)) {
              return;
            }
            self.currentPage(self.currentPage()+1);
          });

          this.$numeric.click(function(){
            var ret = checkCanAction(this)
            if (!ret) {
              return;
            }
            var numeric = ret.find(self.options.selectors.numericTxt).text(),
                pageNo = parseInt(numeric);
            self.currentPage(pageNo);

          });

          this.state.set("currentPage",this.options.currentPage);
          this.state.set("totalPages",this.options.totalPages);

          this.overrided();
        },

        _refresh: function (updates) {
          this.overrided(updates);
          var self = this;

          function changePageNoBtns(currentPage,totalPages) {

            // Create the numeric buttons.
            // Variable of number control in the buttons.
            var totalPageNoBtns = Math.min(totalPages, self.options.maxButtonsVisible);
            var begin = 1;
            var end = begin + totalPageNoBtns - 1;

            /*
             * Align the values in the begin and end variables if the user has the
             * possibility that select a page that doens't appear in the paginador.
             * e.g currentPage = 1, and user go to the 20 page.
             */
            while ((currentPage < begin) || (currentPage > end)) {
              if (currentPage > end) {
                 begin += totalPageNoBtns;
                 end += totalPageNoBtns;

                 if (end > totalPages) {
                   begin = begin - (end - totalPages);
                   end = totalPages;
                 }
               } else {
                 begin -= totalPageNoBtns;
                 end -= totalPageNoBtns;

                 if (begin < 0) {
                   end = end + (begin + totalPageNoBtns);
                   begin = 1;
                 }
               }
            }
           /*
            * Verify if the user clicks in the last page show by paginator.
            * If yes, the paginator advances.
            */
            if ((currentPage === end) && (totalPages != 1)) {
              begin = currentPage - 1;
              end = begin + totalPageNoBtns - 1;

              if (end >= totalPages) {
                begin = begin - (end - (totalPages));
                end = totalPages;
              }
            }

            /*
             * Verify it the user clicks in the first page show by paginator.
             * If yes, the paginator retrogress
             */
             if ((begin === currentPage) && (totalPages != 1)) {
               if (currentPage != 1) {
                 end = currentPage + 1;
                 begin = end - (totalPageNoBtns - 1);
               }
             }

             var count = self.$numeric.size(),
                 visibles = end-begin + 1,
                 i = 0;

             self.$numeric.filter(".active").removeClass("active");
             while (i<visibles) {
               var pageNo = i + begin,
                   $btn = self.$numeric.eq(i);
               $btn.find(self.options.selectors.numericTxt).text(i+begin).show();
               if (pageNo == currentPage) {
                $btn.addClass("active");
               }
               i++;
             }
             while (i<count) {
               self.$numeric.eq(i).find(self.options.selectors.numericTxt).text(i+begin).hide();
               i++;
             }


          }

          function changeLabeldBtns(currentPage,totalPages) {
            if (currentPage < 1) {
              throw('Page can\'t be less than 1');
            } else if (currentPage > totalPages) {
              throw('Page is bigger than total pages');
            }

            if (totalPages < 1) {
              throw('Total Pages can\'t be less than 1');
            }

            if (currentPage == 1 ) {
              self.$first.addClass("disabled");
              self.$prev.addClass("disabled");
            } else {
              self.$first.removeClass("disabled");
              self.$prev.removeClass("disabled");
            }

            if (currentPage == totalPages ) {
              self.$last.addClass("disabled");
              self.$next.addClass("disabled");
            } else {
              self.$last.removeClass("disabled");
              self.$next.removeClass("disabled");
            }
          }

          if (updates.currentPage || updates.totalPages) {
            var currentPage = self.currentPage(),
                totalPages = self.totalPages();

            changePageNoBtns(currentPage,totalPages);
            changeLabeldBtns(currentPage,totalPages);
          }

        }

    });

    return Pagination;
});
define('skylark-ui-swt/Progress',[
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
  "./swt",
  "./Widget"
],function(langx,browser,eventer,noder,geom,$,swt,Widget){

    'use strict';

     var Progress = swt.Progress = Widget.inherit({
     	klassName : "Progress",

     	pluginName : "lark.progress",

     	options : {
     		selectors : {
     			bar : "progress-bar"
     		},
     		min : 0,
     		max : 100
     	},

     	state : {
     		value : Number
     	},

		_init : function() {
			this._vbar = this._velm.find(this.options.selectors.bar);
			this.value(this.options.min);
		},

		_refresh : function() {
	        this.overrided(changed);
	        var self  = this;

	        if (updates["value"] !== undefined) {
	        	var value = updates["value"],
	        		min = this.options.min,
	        		max = this.options.max;

				this._vbar.css("width",(value-min)/(max-min)*100+"%");
	        }
		},

		start : function(max){
			this.value(this.options.min);
			this._velm.slideDown();
		},

		increase : function(tick){
			var value = this.value();
			this.value(value += tick*1.0);
		},

		finish : function(){
			this.value(this.options.min);
			this._velm.slideUp();
		}     	
     });

	return Progress;
	
 });
define('skylark-ui-swt/Radio',[
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
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


define('skylark-ui-swt/SearchBox',[
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
  "./swt",
  "./Widget",
  "skylark-bootstrap3/dropdown"
],function(langx,browser,eventer,noder,geom,$,swt,Widget){


	// SEARCH CONSTRUCTOR AND PROTOTYPE

	var SearchBox = Widget.inherit({
		klassName: "SearchBox",

		pluginName: "lark.searchbox",

		options : {
			clearOnEmpty: false,
			searchOnKeyPress: false,
			allowCancel: false
		},
	
		_init : function() {
			this.$element = $(this._elm);
			this.$repeater = this.$element.closest('.repeater');

			if (this.$element.attr('data-searchOnKeyPress') === 'true'){
				this.options.searchOnKeyPress = true;
			}

			this.$button = this.$element.find('button');
			this.$input = this.$element.find('input');
			this.$icon = this.$element.find('.glyphicon, .fuelux-icon');

			this.$button.on('click.fu.search', langx.proxy(this.buttonclicked, this));
			this.$input.on('keyup.fu.search', langx.proxy(this.keypress, this));

			if (this.$repeater.length > 0) {
				this.$repeater.on('rendered.fu.repeater', langx.proxy(this.clearPending, this));
			}

			this.activeSearch = '';
		},
		destroy: function () {
			this.$element.remove();
			// any external bindings
			// [none]
			// set input value attrbute
			this.$element.find('input').each(function () {
				$(this).attr('value', $(this).val());
			});
			// empty elements to return to original markup
			// [none]
			// returns string of markup
			return this.$element[0].outerHTML;
		},

		search: function (searchText) {
			if (this.$icon.hasClass('glyphicon')) {
				this.$icon.removeClass('glyphicon-search').addClass('glyphicon-remove');
			}
			if (this.$icon.hasClass('fuelux-icon')) {
				this.$icon.removeClass('fuelux-icon-search').addClass('fuelux-icon-remove');
			}

			this.activeSearch = searchText;
			this.$element.addClass('searched pending');
			this.$element.trigger('searched.fu.search', searchText);
		},

		clear: function () {
			if (this.$icon.hasClass('glyphicon')) {
				this.$icon.removeClass('glyphicon-remove').addClass('glyphicon-search');
			}
			if (this.$icon.hasClass('fuelux-icon')) {
				this.$icon.removeClass('fuelux-icon-remove').addClass('fuelux-icon-search');
			}

			if (this.$element.hasClass('pending')) {
				this.$element.trigger('canceled.fu.search');
			}

			this.activeSearch = '';
			this.$input.val('');
			this.$element.trigger('cleared.fu.search');
			this.$element.removeClass('searched pending');
		},

		clearPending: function () {
			this.$element.removeClass('pending');
		},

		action: function () {
			var val = this.$input.val();

			if (val && val.length > 0) {
				this.search(val);
			} else {
				this.clear();
			}
		},

		buttonclicked: function (e) {
			e.preventDefault();
			if ($(e.currentTarget).is('.disabled, :disabled')) return;

			if (this.$element.hasClass('pending') || this.$element.hasClass('searched')) {
				this.clear();
			} else {
				this.action();
			}
		},

		keypress: function (e) {
			var ENTER_KEY_CODE = 13;
			var TAB_KEY_CODE = 9;
			var ESC_KEY_CODE = 27;

			if (e.which === ENTER_KEY_CODE) {
				e.preventDefault();
				this.action();
			} else if (e.which === TAB_KEY_CODE) {
				e.preventDefault();
			} else if (e.which === ESC_KEY_CODE) {
				e.preventDefault();
				this.clear();
			} else if (this.options.searchOnKeyPress) {
				// search on other keypress
				this.action();
			}
		},

		disable: function () {
			this.$element.addClass('disabled');
			this.$input.attr('disabled', 'disabled');

			if (!this.options.allowCancel) {
				this.$button.addClass('disabled');
			}
		},

		enable: function () {
			this.$element.removeClass('disabled');
			this.$input.removeAttr('disabled');
			this.$button.removeClass('disabled');
		}
	});

	return 	swt.SearchBox = SearchBox;
});

define('skylark-ui-swt/SelectList',[
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
  "./swt",
  "./Widget",
  "skylark-bootstrap3/dropdown"
],function(langx,browser,eventer,noder,geom,$,swt,Widget){


	// SELECT CONSTRUCTOR AND PROTOTYPE

	var SelectList = Widget.inherit({
		klassName: "SelectList",

		pluginName : "lark.selectlist",
	
		options : {
			emptyLabelHTML: '<li data-value=""><a href="#">No items</a></li>'

		},

		_init : function() {
			this.$element = $(this._elm);
			//this.options = langx.mixin({}, $.fn.selectlist.defaults, options);


			this.$button = this.$element.find('.btn.dropdown-toggle');
			this.$hiddenField = this.$element.find('.hidden-field');
			this.$label = this.$element.find('.selected-label');
			this.$dropdownMenu = this.$element.find('.dropdown-menu');

			this.$button.dropdown();

			this.$element.on('click.fu.selectlist', '.dropdown-menu a', langx.proxy(this.itemClicked, this));
			this.setDefaultSelection();

			if (this.options.resize === 'auto' || this.$element.attr('data-resize') === 'auto') {
				this.resize();
			}

			// if selectlist is empty or is one item, disable it
			var items = this.$dropdownMenu.children('li');
			if( items.length === 0) {
				this.disable();
				this.doSelect( $(this.options.emptyLabelHTML));
			}

			// support jumping focus to first letter in dropdown when key is pressed
			this.$element.on('shown.bs.dropdown', function () {
					var $this = $(this);
					// attach key listener when dropdown is shown
					$(document).on('keypress.fu.selectlist', function(e){

						// get the key that was pressed
						var key = String.fromCharCode(e.which);
						// look the items to find the first item with the first character match and set focus
						$this.find("li").each(function(idx,item){
							if ($(item).text().charAt(0).toLowerCase() === key) {
								$(item).children('a').focus();
								return false;
							}
						});

				});
			});

			// unbind key event when dropdown is hidden
			this.$element.on('hide.bs.dropdown', function () {
					$(document).off('keypress.fu.selectlist');
			});
		},

		destroy: function () {
			this.$element.remove();
			// any external bindings
			// [none]
			// empty elements to return to original markup
			// [none]
			// returns string of markup
			return this.$element[0].outerHTML;
		},

		doSelect: function ($item) {
			var $selectedItem;
			this.$selectedItem = $selectedItem = $item;

			this.$hiddenField.val(this.$selectedItem.attr('data-value'));
			this.$label.html($(this.$selectedItem.children()[0]).html());

			// clear and set selected item to allow declarative init state
			// unlike other controls, selectlist's value is stored internal, not in an input
			this.$element.find('li').each(function () {
				if ($selectedItem.is($(this))) {
					$(this).attr('data-selected', true);
				} else {
					$(this).removeData('selected').removeAttr('data-selected');
				}
			});
		},

		itemClicked: function (e) {
			this.$element.trigger('clicked.fu.selectlist', this.$selectedItem);

			e.preventDefault();
			// ignore if a disabled item is clicked
			if ($(e.currentTarget).parent('li').is('.disabled, :disabled')) { return; }

			// is clicked element different from currently selected element?
			if (!($(e.target).parent().is(this.$selectedItem))) {
				this.itemChanged(e);
			}

			// return focus to control after selecting an option
			this.$element.find('.dropdown-toggle').focus();
		},

		itemChanged: function (e) {
			//selectedItem needs to be <li> since the data is stored there, not in <a>
			this.doSelect($(e.target).closest('li'));

			// pass object including text and any data-attributes
			// to onchange event
			var data = this.selectedItem();
			// trigger changed event
			this.$element.trigger('changed.fu.selectlist', data);
		},

		resize: function () {
			var width = 0;
			var newWidth = 0;
			var sizer = $('<div/>').addClass('selectlist-sizer');


			if (Boolean($(document).find('html').hasClass('fuelux'))) {
				// default behavior for fuel ux setup. means fuelux was a class on the html tag
				$(document.body).append(sizer);
			} else {
				// fuelux is not a class on the html tag. So we'll look for the first one we find so the correct styles get applied to the sizer
				$('.fuelux:first').append(sizer);
			}

			sizer.append(this.$element.clone());

			this.$element.find('a').each(function () {
				sizer.find('.selected-label').text($(this).text());
				newWidth = sizer.find('.selectlist').outerWidth();
				newWidth = newWidth + sizer.find('.sr-only').outerWidth();
				if (newWidth > width) {
					width = newWidth;
				}
			});

			if (width <= 1) {
				return;
			}

			this.$button.css('width', width);
			this.$dropdownMenu.css('width', width);

			sizer.remove();
		},

		selectedItem: function () {
			var txt = this.$selectedItem.text();
			return langx.mixin({
				text: txt
			}, this.$selectedItem.data());
		},

		selectByText: function (text) {
			var $item = $([]);
			this.$element.find('li').each(function () {
				if ((this.textContent || this.innerText || $(this).text() || '').toLowerCase() === (text || '').toLowerCase()) {
					$item = $(this);
					return false;
				}
			});
			this.doSelect($item);
		},

		selectByValue: function (value) {
			var selector = 'li[data-value="' + value + '"]';
			this.selectBySelector(selector);
		},

		selectByIndex: function (index) {
			// zero-based index
			var selector = 'li:eq(' + index + ')';
			this.selectBySelector(selector);
		},

		selectBySelector: function (selector) {
			var $item = this.$element.find(selector);
			this.doSelect($item);
		},

		setDefaultSelection: function () {
			var $item = this.$element.find('li[data-selected=true]').eq(0);

			if ($item.length === 0) {
				$item = this.$element.find('li').has('a').eq(0);
			}

			this.doSelect($item);
		},

		enable: function () {
			this.$element.removeClass('disabled');
			this.$button.removeClass('disabled');
		},

		disable: function () {
			this.$element.addClass('disabled');
			this.$button.addClass('disabled');
		}

	});	


	SelectList.prototype.getValue = SelectList.prototype.selectedItem;



	return swt.SelectList = SelectList;
});

define('skylark-ui-swt/TabStrip',[
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

    return TabStrip;

});
define('skylark-ui-swt/Toolbar',[
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
  "./swt",
  "./Widget"
],function(langx,browser,eventer,noder,geom,$,swt,Widget){

	var Toolbar = swt.Toolbar = Widget.inherit({
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

define('skylark-ui-swt/Uploader',[
  "skylark-langx/langx",
  "skylark-utils-dom/browser",
  "skylark-utils-dom/eventer",
  "skylark-utils-dom/noder",
  "skylark-utils-dom/geom",
  "skylark-utils-dom/query",
  "skylark-utils-collection/ArrayList",
  "skylark-utils-filer/uploader",
  "./swt",
  "./Widget"
],function(langx,browser,eventer,noder,geom,$,ArrayList,uploader,swt,Widget){

    /**
     * This model represents a file.
     *
     */
    var FileItem = langx.Stateful.inherit({
        state: "pending",

        /**
         * Start upload.
         *
         */
        start: function ()  {
            if (this.isPending()) {
                this.get('processor').submit();
                this.state = "running";

                // Dispatch event
                this.trigger('filestarted', this);
            }
        },

        /**
         * Cancel a file upload.
         *
         */
        cancel: function () {
            this.get('processor').abort();
            this.destroy();

            // Dispatch event
            this.state = "canceled";
            this.trigger('filecanceled', this);
        },

        /**
         * Notify file that progress updated.
         *
         */
        progress: function (data)  {
            // Dispatch event
            this.trigger('fileprogress', this.get('processor').progress());
        },

        /**
         * Notify file that upload failed.
         *
         */
        fail: function (error)  {
            // Dispatch event
            this.state = "error";
            this.trigger('filefailed', error);
        },

        /**
         * Notify file that upload is done.
         *
         */
        done: function (result)  {
            // Dispatch event
            this.state = "error";
            this.trigger('filedone', result);
        },

        /**
         * Is this file pending to be uploaded ?
         *
         */
        isPending: function ()  {
            return this.getState() == "pending";
        },

        /**
         * Is this file currently uploading ?
         *
         */
        isRunning: function () {
            return this.getState() == "running";
        },

        /**
         * Is this file uploaded ?
         *
         */
        isDone: function () {
            return this.getState() == "done";
        },

        /**
         * Is this upload in error ?
         *
         */
        isError: function () {
            return this.getState() == "error" || this.getState == "canceled";
        },

        /**
         * Get the file state.
         *
         */
        getState: function () {
            return this.state;
        }
    });

    /**
     * This is a file collection, used to manage the selected
     * and processing files.
     *
     */
    var FileItemCollection = ArrayList.inherit({
        item: FileItem
    });

    /**
     * A file view, which is the view that manage a single file
     * process in the upload manager.
     *
     */
    var FileItemWidget = Widget.inherit({
        className: 'upload-manager-file row',

        options : {
          selectors : {
            fileName : ".name",
            fileSize : ".size",
            cancel : ".cancel",
            clear : ".clear",
            progress : ".progress",
            message : ".message"
          }
        },

        state : {
          fileName : String,
          fileSize : Number
        },

        _init: function () {
            this.processUploadMsg = this.options.processUploadMsg;
            this.doneMsg = this.options.doneMsg;

            this.fileName(this.options.fileName);
            this.fileSize(this.options.fileSize);

            // Bind model events
            this.model.on('destroy', this.close, this);
            this.model.on('fileprogress', this.updateProgress, this);
            this.model.on('filefailed', this.hasFailed, this);
            this.model.on('filedone', this.hasDone, this);

            // In each case, update view
            this.model.on('all', this.update, this);

            // Bind events
            this.bindEvents();

            // Update elements
            this.update();            
        },

        _refresh : function(updates) {

        },

        /**
         * Update upload progress.
         *
         */
        updateProgress: function (progress) {
            var percent = parseInt(progress.loaded / progress.total * 100, 10);
            var progressHTML = this.getHelpers().displaySize(progress.loaded)+' of '+this.getHelpers().displaySize(progress.total);
            if (percent >= 100 && this.processUploadMsg) { progressHTML = this.processUploadMsg; }

            $('.progress', this.el)
                .find('.bar')
                .css('width', percent+'%')
                .parent()
                .find('.progress-label')
                .html(progressHTML);
        },

        /**
         * File upload has failed.
         *
         */
        hasFailed: function (error){
            $('.message', this.el).html('<i class="icon-error"></i> '+error);
        },

        /**
         * File upload is done.
         *
         */
        hasDone: function (result){
            $('.message', this.el).html('<i class="icon-success"></i> ' + (this.doneMsg || 'Uploaded'));
        },

        /**
         * Update view without complete rendering.
         *
         */
        update: function () {
            var selectors = this.options.selectors,
                when_pending = this._velm.$(selectors.size + "," + selectors.cancel),
                when_running = this._velm.$(selectors.progress + "," + selectors.cancel),
                when_done = this._velm.$(selectors.message + "," + selectors.clear);

            if (this.model.isPending()) {
                when_running.add(when_done).addClass('hidden');
                when_pending.removeClass('hidden');
            } else if (this.model.isRunning()) {
                when_pending.add(when_done).addClass('hidden');
                when_running.removeClass('hidden');
            } else if (this.model.isDone() || this.model.isError()) {
                when_pending.add(when_running).addClass('hidden');
                when_done.removeClass('hidden');
            }
        },

        /**
         * Startup widget with binding events
         * @override
         *
         */
        _startup: function () {
            var self = this;

            // DOM events
            this._velm.$(this.options.selectors.cancel).click(function(){
                self.model.cancel();
                self.collection.remove(self.model);
            });
            this._velm.$(this.options.selectors.clear).click(function(){
                self.model.destroy();
                self.collection.remove(self.model);
            });
        },

        /**
         * Compute data to be passed to the view.
         *
         */
        computeData: function () {
            return $.extend(this.getHelpers(), this.model.get('data'));
        }
    });


    var Uploader =  Widget.inherit({
        klassName : "Uploader",
        pluginName : "lark.uploader",

        options: {

            uploadUrl: '/upload',
            autoUpload: false,
            selectors : {
              fileList : '.file-list',
              nodata : ".file-list .no-data",
              pickFiles: '.file-picker',
              startUploads: '.start-uploads',
              cancelUploads: '.cancel-uploads',
            },

            dataType: 'json',

            fileItem : {
            	selectors : {

            	},

            	template : null
            }
        },

        state : {
          files : FileItemCollection
        },

        /**
         * Render the main part of upload manager.
         *
         */
        _init: function () {
            var self = this;


            // Create the file list
            var files = this.files(new FileItemCollection());

            // Add add files handler
            var filePicker = this._velm.$(this.options.selectors.pickFiles), self = this;

            this.uploadProcess =  uploader(this._elm,{  //$.$(this.el).fileupload({
                dataType: this.options.dataType,
                url: this.options.uploadUrl,
                formData: this.options.formData,
                autoUpload: this.options.autoUpload,
                singleFileUploads: true,
                picker : filePicker,

                'add' : function (e, data) {
                    // Create an array in which the file objects
                    // will be stored.
                    data.uploadManagerFiles = [];

                    // A file is added, process for each file.
                    // Note: every times, the data.files array length is 1 because
                    //       of "singleFileUploads" option.
                    langx.each(data.files, function (index, file_data) {
                        // Create the file object
                        file_data.id = self.file_id++;
                        var file = new FileItem({
                            data: file_data,
                            processor: data
                        });

                        // Add file in data
                        data.uploadManagerFiles.push(file);

                        // Trigger event
                        //self.trigger('fileadd', file);
                        // Add it to current list
                        self.files.add(file);

                        // Create the view
                        self.renderFile(file);


                    });
                },
                'progress' : function (e, data) {
                    langx.each(data.uploadManagerFiles, function (index, file) {
                        //self.trigger('fileprogress', file, data);

                        file.progress(progress);
                    });
                },

                'fail' : function (e, data) {
                    langx.each(data.uploadManagerFiles, function (index, file) {
                        var error = "Unknown error";
                        if (typeof data.errorThrown == "string") {
                            error = data.errorThrown;
                        } else if (typeof data.errorThrown == "object") {
                            error = data.errorThrown.message;
                        } else if (data.result) {
                            if (data.result.error) {
                                error = data.result.error;
                            } else if (data.result.files && data.result.files[index] && data.result.files[index].error) {
                                error = data.result.files[index].error;
                            } else {
                                error = "Unknown remote error";
                            }
                        }

                        //self.trigger('filefail', file, error);
                        file.fail(error);
                    });
                },

                'done' : function (e, data) {
                    langx.each(data.uploadManagerFiles, function (index, file) {
                        //self.trigger('filedone', file, data);
                        file.done(data.result);
                    });
                }

            });

            // Add upload process events handlers
            this.bindProcessEvents();

            // Add cancel all handler
            this._velm.$(this.options.selectors.cancelUploads).click(function(){
                while (self.files.length) {
                    self.files.at(0).cancel();
                }
            });

            // Add start uploads handler
            this._velm.$(this.options.selectors.startUploads).click(function(){
                self.files.forEach(function(file){
                    file.start();
                });
            });

            // Render current files
            /*
            this.files.forEach(function (file) {
                self.renderFile(file);
            });
            */

            this._refresh({files:true});
        
        },

        _refresh : function(updates) {
            var self = this;
            function updateFileList()  {
                var selectors = self.options.selectors,
                    files = self.files();
                var with_files_elements = self._velm.$(selectors.cancelUploads + ',' + selectors.startUploads);
                var without_files_elements = self._velm.$(selectors.nodata);
                if (files.length > 0) {
                    with_files_elements.removeClass('hidden');
                    without_files_elements.addClass('hidden');
                } else {
                    with_files_elements.addClass('hidden');
                    without_files_elements.removeClass('hidden');
                }
            }

            if (updates["files"]) {
              updateFileList();
            }

        },

        /**
         * Render a file.
         *
         */
        renderFile: function (file) {
            var file_view = new FileItemWidget(langx.mixin({},this.options, {
              model: file,
              template : this.options.fileItem.template
            }));
            //this._velm.$(this.options.selectors.fileList).append(file_view.render());
            file_view.attach(this._velm.$(this.options.selectors.fileList));
        },

        /**
         * Bind events on the upload processor.
         *
         */
        bindProcessEvents: function () {
        }
    });

    return swt.Uploader = Uploader;
});

define('skylark-ui-swt/main',[
    "./swt",
    "./Widget",
    "./Accordion",
    "./Button",
    "./Carousel",
    "./CheckBox",
    "./ComboBox",
    "./InputBox",
    "./ListGroup",
    "./Menu",
    "./Pagination",
    "./Progress",
    "./Radio",
    "./SearchBox",
    "./SelectList",
    "./TabStrip",
    "./Toolbar",
    "./Uploader"
], function(swt) {
    return swt;
});
define('skylark-ui-swt', ['skylark-ui-swt/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-ui-swt.js.map
