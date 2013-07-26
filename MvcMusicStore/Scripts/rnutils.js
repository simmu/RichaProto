/// <reference path="utils-3.0.js" />

// <RN Utils> ---------------------------------------------------

var rnutil = {};


// <Unique Requests>
rnutil.request = { ids: {} };

rnutil.request.getCSRFToken = function () {

    var tokenName = '__RequestVerificationToken';
    var token = $("[name='" + tokenName + "']").val();

    if (token != undefined) {
        return token;
    }
}
rnutil.request.ensureCSRFToken = function (data) {

    var tokenName = '__RequestVerificationToken';
    var token = $("[name='" + tokenName + "']").val();

    if (token != undefined) {
        if (token) {
            if (typeof data == "object") {
                if (!data) {
                    data = {};
                }
                data[tokenName] = token;
            } else {
                if (data == '') {
                    data += '?' + tokenName + '=' + token;
                } else {
                    //TODO: check for trailing &
                    if (data.indexOf('?') >= 0) {
                        data += '&' + tokenName + '=' + token;
                    } else {
                        data += '?' + tokenName + '=' + token;
                    }
                }
            }
            return data;
        } else {
            return data;
        }
    }
}

rnutil.request.updateCSRFToken = function (endpoint_url) {

    util.fetch("POST", endpoint_url, {})
        .done(function (data) {
            $.updateAntiForgeryToken(null, null, data);
        });
}


rnutil.request.ensureTimeZoneOffset = function (data) {

    var timezone_offset = new Date().getTimezoneOffset();

    if (typeof data == "object") {
        if (!data) {
            data = {};
        }
        data['timezone_offset'] = timezone_offset;
    } else {
        (data == '') ? data += '?' + 'timezone_offset' + '=' + timezone_offset : data += '&' + 'timezone_offset' + '=' + timezone_offset;
    }
    return data;

}


rnutil.request.generateFakeGUID = function () {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

rnutil.request.deleteRequestID = function (url) {
    delete rnutil.request.ids[url];
}

rnutil.request.hasRequestID = function (url) {
    return rnutil.request.ids[url];
}

rnutil.request.ensureRequestID = function (url, data) {
    var id = rnutil.request.generateFakeGUID();
    rnutil.request.ids[url] = id;

    // ensure unique requestID
    if (typeof data == "object") {
        if (data) {
            data.request_id = id;
        } else {
            data = { request_id: id };
        }
    }
    else {
        (data == '') ? data += '?request_id=' + id : data += '&request_id=' + id;
    }
    return data;
}
// </Unique Requests>



rnutil.fetch = function (method, url, data, options) {

    var dfr = $.Deferred();
    var options = options || {};
    var crsToken = $("#crsToken").val() || '';

    if (!rnutil.request.hasRequestID(url)) {// don't allow duplicate event handlers [double click, double jquery wireups, etc]

        // ensure request id
        data = rnutil.request.ensureCSRFToken(data);
        data = rnutil.request.ensureTimeZoneOffset(data);
        data = rnutil.request.ensureRequestID(url, data);

        // ajax defaults
        var defaults = {
            url: url,
            data: options.stringify ? JSON.stringify(data) : data,
            dataType: 'json',
            contentType: options.stringify ? 'application/json' : 'application/x-www-form-urlencoded; charset=UTF-8',
            type: method,
            beforeSend: function (jqXHR, settings) {
                dfr.notify("send");
                return true;
            }
        };

        $.extend(defaults, options);

        $.ajax(defaults) // execute ajax
            .always(function (data) {
                rnutil.request.deleteRequestID(url);
            })
            .done(function (data, status, deferred) {
                if ((typeof data.isError != "undefined" && data.isError) || (typeof data.hasError != "undefined" && data.hasError)) {
                    if (typeof options.fail_cb != "undefined") {
                        options.fail_cb();
                    }
                    rnutil.showErrorDialog(data.error.Message);
                    dfr.reject({ data: data.error, text: data.error.Message });
                }
                else {
                    dfr.resolve(data);
                }
            })
            .fail(function (data, status, textStatus) {
                if (typeof options.fail_cb != "undefined") {
                    options.fail_cb(data, textStatus);
                }
                rnutil.showErrorDialog(data.error.Message);
                dfr.reject({ data: data, text: textStatus });
            });

        return dfr.promise();
    } else {
        return $.Deferred().promise();// we never do anything, it was a double click, completely ignore
    }
}


rnutil.showErrorDialog = function (msg, title) {
    $("#error-dialog")
        .find('#error-dialog-msg')
     //   .html(msg)
        .end()
        .modal('show');
}




// </RN Utils> ---------------------------------------------------
