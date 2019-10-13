define([
    "skylark-langx/langx",
    "skylark-domx-browser",
    "skylark-domx-eventer",
    "skylark-domx-noder",
    "skylark-domx-geom",
    "skylark-domx-query",
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