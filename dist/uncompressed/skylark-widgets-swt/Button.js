define([
  "skylark-langx/langx",
  "skylark-domx-query",
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



