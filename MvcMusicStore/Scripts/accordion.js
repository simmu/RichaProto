// Define our root namespace if necessary
var Repnation = window.Repnation || {};
/**
 * @namespace Functions to check states of the page that we need to know about
 */
Repnation.accordion = {
    accordionSelector: '.accordion',
    trigger: '.item a',
    panel: '.content',

    init: function () {
        if ($(this.accordionSelector).length > 0) {
            this.setup();
            this.hidePanel();
        }
    },
    setup: function () {
        $(this.trigger).each(function () {
            var self = $(this);
            Repnation.accordion.bindEvents(self);
        })
    },
    bindEvents: function (anchorElement) {
        anchorElement.on('click', function () {
            var self = $(this);
            Repnation.accordion.hidePanel();
            Repnation.accordion.showPanel(self);
        })
    },
    showPanel: function (self) {
        self.next().slideDown();
    },
    hidePanel: function () {
        $(this.panel).slideUp();
    }

};

/*
 * SETUP DOM READY AND LOAD EVENTS HERE
 */
$(document).ready(function () {
    Repnation.accordion.init();
});
