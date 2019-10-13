 define([
  "skylark-langx/langx",
  "skylark-utils-dom/query",
  "./swt",
  "./Widget"
],function(langx,$,swt,Widget){

    var Listing = Widget.inherit({
        klassName : "Listing",

        pluginName : "lark.listing",

        options : {
        	multiSelect: false,
        	//multiTier : false,

          multiTier : {
            mode   : "",  // "tree" or "accordion" or "popup"
            levels : 2,
            selectors :  {
              children : "> ul",  // "> .list-group"
              hasChildren : ":has(ul)"
            },
            classes : {
              expandIcon: 'glyphicon glyphicon-plus',    // "glyphicon-chevron-down"
              collapseIcon: 'glyphicon glyphicon-minus', // "glyphicon-chevron-right"
              children : ""                              // "list-group children"
            },
            templates : {
              tree : {
                item : "<span><i class=\"glyphicon\"></i><a href=\"javascript: void(0);\"></a> </span>",
                itemGroup: ""

              }
                            
            }
          },

        	toggle : false,
        	classes : {
          	active : "active"
        	},
        	selectors : {
          	item : "li"                   // ".list-group-item"
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
                multiTierMode = this.options.multiTier.mode,
                obj = this;

            if (multiTierMode == "tree") {
                 $this.query(this.options.selectors.item).each(function(){
                   if($(this).is(self.options.multiTier.selectors.hasChildren)) {
                      var children = $(this).find(' > ul');
                      $(children).remove();
                      text = $(this).text().trim();
                      $(this).html(self.options.multiTier.templates.tree.item);
                      $(this).find(' > span > i').addClass('glyphicon-folder-open');
                      $(this).find(' > span > a').text(text);
                      $(this).append(children);
                    }  else {
                      text = $(this).text().trim();
                      $(this).html(self.options.multiTier.templates.tree.item);
                      $(this).find(' > span > i').addClass('glyphicon-file');
                      $(this).find(' > span > a').text(text);
                  }

                 });
            }

            //if (this.isIE() <= 9) {
            //    $this.find("li.active").has("ul").children("ul").collapse("show");
            //    $this.find("li").not(".active").has("ul").children("ul").collapse("hide");
            //} else {
                $this.query("li.active").has("ul").children("ul").addClass("collapse in");
                $this.query("li").not(".active").has("ul").children("ul").addClass("collapse");
            //}




            $this.query("li").has("ul").find("a").on("click" + "." + this.pluginName, function(e) {
                e.preventDefault();

                $(this).closest("li").toggleClass("active").children("ul").collapse("toggle");

                if ($toggle) {
                    $(this).closest("li").siblings().removeClass("active").children("ul.in").collapse("hide");
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

  return swt.Listing = Listing;

});



