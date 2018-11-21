define([
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



