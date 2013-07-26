// Define our root namespace if necessary
var Repnation = window.Repnation || {};
/**
 * @namespace Functions to check states of the page that we need to know about
 */
Repnation.addPara = {
    pSelector: '.delegate',

    init: function () {
        this.bindEvent();
    },

    bindEvent: function () {
        $(this.pSelector).delegate('li', 'click', function () {
            $(this).after("<li class='well'>Click me to get Another li</li>");
        })
    },
};

Repnation.createAlbum = (function () {

    /* caching selectors to be used */
    var chacheSelectors = {
        mainContainer: '.cols',
        dataSelector: '.dataAttr'
    };

    return {
        init: function () {
            var stringTemplate = '<% _.each( listItems, function( listItem ){ %><div class="col threeCols"><div class="mod"><h2><%= listItem.title %></h2><p>Author: <%= listItem.author %></p><a href="#" data-rent= "true" class="btn rent">Rent</a><a href="#" class="btn return">Return</a></div></div><% }); %>';
            var template = _.template(stringTemplate);
            var temp = _.template($("#tmpl-books").html())
            var templateData = {
                listItems: [
                      {
                          "title": "Myst: The Book of Atrus",
                          "author": "Rand Miller",
                          "rent": true,
                      },
                      {
                          "title": "The Hobbit",
                          "author": "J.R.R. Tolkien"
                      },
                      {
                          "title": "Stardust",
                          "author": "Neil Gaiman"
                      }
                ]
            };

            $(chacheSelectors.mainContainer).html(
                template(templateData)
            );

            var $container = '',
                album = [{
                    name: "Maroon",
                    price: 32,
                    rent: true,
                }, {
                    name: "White & Black",
                    price: 34
                }, {
                    name: "Lady Gaga",
                    price: 21
                }],
                getData = $("mod").data("myInstance", album);
                getData = $("mod").data();

            for (var i = 0 ; i < getData.myInstance.length; i++) {
                $container += ("<div class='col threeCols'><div class='mod'><h2>" + getData.myInstance[i].name + "</div></h2></div>")
            }

            $(chacheSelectors.mainContainer).append("<div class='cols'>"+$container+"</div>");

        }
    }
}
	());

Repnation.deferredDemo = (function () {
    var chacheSelectors = {
        rentBtnSelector: '.rent',
        returnBtnSelector: '.return'
    };

    function setup() {
        
        $(chacheSelectors.rentBtnSelector).each(function () {
            bindEvent($(this));
        });
    }

    function bindEvent(self) {
        var dfd = $.Deferred();
        var showData = $("body").data();
        dfd.progress(function (self) {
            setTimeout(function () {
                console.log("Do you want to rent " + showData.myInstance.rent);
            }, 1000)
        });

        dfd.done(function () {
            alert("Hey u did it!");
        });
        
        self.on("click", function () {
            dfd.notify(self);
        });

        self.parent().find(".return").on("click", function () {
            dfd.resolve();
        })
    }

    return {
        init: function () {
            if ($(chacheSelectors.rentBtnSelector).length > 0) {
                setup();
            }
        }
    }
}
	());

/*
 * SETUP DOM READY AND LOAD EVENTS HERE
 */
$(document).ready(function () {
    Repnation.addPara.init();
    Repnation.createAlbum.init();
    Repnation.deferredDemo.init();
});
