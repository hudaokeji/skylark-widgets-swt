 define([
  "skylark-langx/langx",
  "skylark-domx-query",
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
              children : "ul",  // "> .list-group"
              hasChildren : ":has(ul)"
            },
            tree : {
              classes : {
                expandIcon: 'glyphicon-plus',    // "glyphicon-chevron-down", 'glyphicon-folder-open'
                collapseIcon: 'glyphicon-minus', // "glyphicon-chevron-right", 'glyphicon-folder-close'
                children : ""                              // "list-group children"
              },
              templates : {
                treeIcon : "<i class=\"glyphicon\"></i>",
                itemGroup: ""

              },
              selectors : {
                treeIcon : " > i"
              }
            },

            accordion : {
              selectors : {
                toggler : " > a"
              }

            }
          },

        	toggle : false,
        	classes : {
          	active : "active"
        	},


        	selectors : {
          	item : "li",                   // ".list-group-item"

        	},

          item : {
            template : "<span><i class=\"glyphicon\"></i><a href=\"javascript: void(0);\"></a> </span>",
            checkable : false,
            selectors : {
              icon : " > span > i",
              text : " > span > a"
            }
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
                hasChildrenSelector = this.options.multiTier.selectors.hasChildren,
                childrenSelector = this.options.multiTier.selectors.children,
                iconSelector = this.options.item.selectors.icon,
                textSelector = this.options.item.selectors.text,
                itemTemplate = this.options.item.template,                
                obj = this;


            if (multiTierMode) {
              if (multiTierMode == "tree") {
                   var treeIconTemplate = this.options.multiTier.tree.templates.treeIcon,
                       treeIconSelector = this.options.multiTier.tree.selectors.treeIcon,
                       expandIconClass = this.options.multiTier.tree.classes.expandIcon,
                       collapseIconClass = this.options.multiTier.tree.classes.collapseIcon;

                   this._$items.each(function(){
                     if($(this).is(hasChildrenSelector)) {
                        var children = $(this).find(childrenSelector);
                        $(children).remove();
                        text = $(this).text().trim();
                        $(this).html(treeIconTemplate+itemTemplate);
                        $(this).find(treeIconSelector).addClass(expandIconClass).on("click" + "." + self.pluginName, function(e) {
                            e.preventDefault();

                            $(this).toggleClass(expandIconClass).toggleClass(collapseIconClass);

                            $(this).closest("li").toggleClass("active").children("ul").collapse("toggle");

                            if ($toggle) {
                                $(this).closest("li").siblings().removeClass("active").children("ul.in").collapse("hide");
                            }
                        });

                        $(this).find(iconSelector).addClass('glyphicon-folder-open');
                        $(this).find(textSelector).text(text);
                        $(this).append(children);



                      }  else {
                        text = $(this).text().trim();
                        $(this).html(treeIconTemplate+itemTemplate);
                        $(this).find(iconSelector).addClass('glyphicon-file');
                        $(this).find(textSelector).text(text);
                    }

                   });
              } else if (multiTierMode == "accordion") {
                var togglerSelector = self.options.multiTier.accordion.selectors.toggler;

                this._$items.has(childrenSelector).find(togglerSelector).on("click" + "." + this.pluginName, function(e) {
                    e.preventDefault();

                    $(this).closest(itemSelector).toggleClass("active").children(childrenSelector).collapse("toggle");

                    if ($toggle) {
                        $(this).closest(itemSelector).siblings().removeClass("active").children(childrenSelector+".in").collapse("hide");
                    }
                });
              }


             this._$items.filter(".active").has(childrenSelector).children(childrenSelector).addClass("collapse in");
             this._$items.not(".active").has(childrenSelector).children(childrenSelector).addClass("collapse");

              
            }   
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



