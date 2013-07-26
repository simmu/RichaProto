var Repnation = window.Repnation || {}

Repnation.demo2 = (function () {

    //var selectors = {
    //    leftButton: ".left",
    //    rightButton: ".right"
    //}

    var template = _.template('<div class="col twoCols carDemo" id= <%= id%> ><p>Name : <%= name %></p><p>Make : <%= make %></p><span class="carBg carMove"> <span class="wheel carLeftWheel"></span> <span class="wheel carRightWheel"></span> </span>')
    var Car = function () {
        /*Options will take Car Object properties eg: name, make, posX, posY */
        this.createACar = function (options) {
            //console.log(options);
            this.id = options.id;
            this.name = options.name;
            this.make = options.make;
            this.posX = options.posX;
            this.posY = options.posY;
            this.isDestroyed = false;
            this.carColor = options.color;
            var tpl = template({ name: this.name, make: this.make, id: this.id })
            var $dom = $(tpl);
            this.car = $dom;
            $dom.data("myInstance", this);
            $dom.find(".carBg").css({ 'background': this.carColor, 'left': this.posX + 'px', 'top': this.posY + 'px' });
            $(".cols").append($dom);
        };

        this.renderController = function () {
            var controllerTemplate = _.template('<div class="btnWrapper"><%= value %></div>')
            var ctpl = controllerTemplate({ value: ' <a href="#" class="button left">Move Left</a><a href="#" class="button right">Move Right</a><a href="#" class="button gold destroy">Destroy</a></div>' })
            var $btnWrapper = $(ctpl);
            $(".col").each(function () {
                $(this).append($btnWrapper);
            });
        };
        
        this.moveleft = function () {
            $(".left", '#'+this.id).on("click", function (e) {
                e.preventDefault(); 
                $(this).parents(".col").find(".carMove").toggleClass("carChange");
            });
        };

        this.moveRight = function () {
            $(".right", '#'+this.id).on("click", function (e) {
                e.preventDefault();
                $(this).parents(".col").find(".carMove").toggleClass("carChange");
            });
        };

        this.destroy = function () {
            var dfd = $.Deferred();

            dfd.done(function (self) {
                self.parents(".col").remove();
            });

            $(".destroy", '#' + this.id).on("click", function (e) {
                e.preventDefault();
                var self = $(this),
                    data = self.parents(".col").data();
                self.parents(".col").find(".carBg").css({ 'animation': 'myfirst 5s', '-webkit-animation': 'myfirst 5s' })
                data.myInstance.isDestroyed = true;
                if (data.myInstance.isDestroyed === true) {
                    setTimeout(function () { dfd.resolve(self) }, 5000);
                    data.myInstance.isDestroyed = false;
                }
            });
        };
    }

    var car1 = new Car();
    var car2 = new Car();
    var car3 = new Car();
    var car4 = new Car();

    car1.createACar({
        id: "car1",
        name: 'Maruti',
        make: 'India',
        posX: 0,
        posY: 0,
        color: 'cyan',
        duration: 5000
    });
    car1.renderController();
    car1.moveleft();
    car1.moveRight();
    car1.destroy();

    car2.createACar({
        id: "car2",
        name: 'Maruti2',
        make: 'India2',
        posX: 350,
        posY: 0,
        color: 'yellow',
        duration: 2000
    });
    car2.renderController();
    car2.moveleft();
    car2.moveRight();
    car2.destroy();

    car3.createACar({
        id: "car3",
        name: 'Maruti3',
        make: 'India3',
        posX: 100,
        posY: 0,
        color: 'red',
        duration: 1000
    });
    car3.renderController();
    car3.moveleft();
    car3.moveRight();
    car3.destroy();

    //car4.createACar({
    //    id: "car4",
    //    name: 'Maruti4',
    //    make: 'India4',
    //    posX: 200,
    //    posY: 0,
    //    color: 'lightGreen',
    //    duration: 1000
    //});
    //car4.renderController();
    //car4.moveleft();
    //car4.moveRight();
    //car4.destroy();

}());

Repnation.demo3 = {
 
    //var json = {
    //    "events": {
    //        "data": [
    //            {
    //                "name": "yellow Day",
    //                "id": "1"
    //            },
    //            {
    //                "name": "ref day",
    //                "id": "2"
    //            }
    //        ]
    //    }
    //},

    showDatePicker: function () {
        $(function () {
            $("#datepicker").datepicker();
        });
    },

    openDialog: function () {
        $(function () {
            $("#dialog").dialog({
                autoOpen: false,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                hide: {
                    effect: "explode",
                    duration: 1000
                }
            });

            $(".ui-state-default").each(function (i) {
                Repnation.demo3.bindEvent($(this),i);
            });
        });
    },

    bindEvent: function (self,count) {

        self.on("click", function () {
        
           $("#dialog").text("You clicked on date : " + $(this).text());
           $("#dialog").dialog("open");
           $(".ui-dialog-titlebar-close").on("click", function () {
               $(".ui-dialog").css("display", "none!important");
           });
        })


    },

    init: function () {
        this.showDatePicker();
        this.openDialog();
    }
};

$(document).ready(function () {
    Repnation.demo3.init();
});