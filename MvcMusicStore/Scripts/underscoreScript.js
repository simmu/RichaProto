var Repnation = window.Repnation || {}

Repnation.demo1 = (function () {

    var template = _.template('<div class="col fourCols" data-name="<%= name %>" data-author="<%=author%>"><div class="mod"><h2> <%= name %></h2><h3> <%= author %> </h3><div class="btnWrapper"><a href="#" class="button rent">Rent</a><a href="#" class="button return">Return</a><div></div></div>');

    //Create a constructor that takes name , author and price as parameter
    var Book = function () {
        this.createHtml = function (name,author) {
            this.name = name;
            this.author = author;
            this.isAvailable = true;
            var tpl = template({ name: this.name, author: this.author })
            var $dom = $(tpl);
           // console.log($dom.data());
            $dom.data("myInstance", this);
            $(".cols").append($dom);
        }

    }

    var book1 = new Book();
    var book2 = new Book();
    var book3 = new Book();
    var book4 = new Book();

    book1.createHtml('Book1','Author1');
    book2.createHtml('Book2', 'Author2');
    book3.createHtml('Book3', 'Author3');
    book4.createHtml('Book4', 'Author4');

    $(".rent").each(function () {
        bindEvent($(this));
    })

    function bindEvent(self) {

        var dfd = $.Deferred();
        dfd.progress(function (data) {
            alert("Hey u have chosen " + data.myInstance.name + " on rent");
        });

        dfd.done(function () {
            alert("Ok you can return the book");
        });

        self.on("click", function () {
            var data = $(this).parents(".col").data();
            dfd.notify(data);
        });

        self.parent().find(".return").on("click", function () {
            var data = $(this).parents(".col").data();
            if (data.myInstance.isAvailable === true) {
                dfd.resolve();
            }
            data.myInstance.isAvailable = false;
        })
    }

    function init() {
        return new Book().createHtml();
    }

}())