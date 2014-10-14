var Helpers = {};

Helpers.String = {
    trim: function (str) {
        return str.replace(/^\s+|\s+$/g, "");
    }
};

Helpers.getTranslation = function (key, replacers) {
    var text = "";
    if (typeof Translation != 'undefined' && Translation) {
        text = Translation[key];

        if (typeof text === 'string') {
            if (replacers && replacers.length > 0) {
                for (var i = 0; i < replacers.length; i++) {
                    for (var word in replacers[i]) {
                        var keyToReplace = "{" + word + "}";
                        text = text.replace(keyToReplace, replacers[i][word]);
                    }
                }
            }
        }
        //for test which translation key is needed, add the following line:
        //else text = key;
    }
    return text;
};

Helpers.getProtocolLessUrl = function (url) {
    return 'https:' == document.location.protocol ? url.replace('http:', 'https:') : url;
}

Helpers.LightboxManager = {

    init: function (options, data, callback) {
        var me = this;
        data = data || {};

        // Extends default values with the new options
        var params = $.extend({}, me.defaults, options);

        // Remove previus Lightboxes
        if (params.removePrevLb) {
            me.activeLightbox = null;
            $('.viewerLightbox, #lbDarkBg').remove();
        }

        if (params.tpl) {
            // Get lightbox content from template
            var content = _.template(params.tpl(), data);
            if (!me.activeLightbox) {
                $('<div id="lbDarkBg"></div>').appendTo('#root').fadeIn();
            }
            else {
                me.activeLightbox.fadeOut('fast');
            }
            var lb = $('<div class="viewerLightbox">' + content + '</div>')
                .addClass(params.lbClass)
                .css({ width: params.width, height: params.height, zIndex: me.activeZindex + 1 })
                .insertAfter("#lbDarkBg")
                .hide().delay(300).fadeIn(function () {
                    if (callback)
                        callback();
                });

            // Set current active Lightbox
            me.setActiveLightbox(lb);
            me.activeZindex++;

            // Add close button if option set to true
            if (params.showCloseButton) {
                $('<span class="closeLB"></span>').appendTo(me.activeLightbox);
            }

            me.centerLightbox(lb, params.centerLb);
            me.attachLbEvents();

            return lb;
        }
        else {
            return false;
        }
    },

    activeLightbox: null,

    activeZindex: 1000,

    setActiveLightbox: function (elm) {
        this.activeLightbox = elm;
    },

    confirmationBox: function (options, data, callback) {
        var me = this;
        var all_options = $.extend({}, me.confirmationDefaults, options);
        var all_data = $.extend({}, me.confirmationDefaultsData, data);
        var lb = me.init(all_options, all_data, callback);

        if (all_options.approveCallback) {
            lb.find('.approve').bind('click', function () { all_options.approveCallback() });
        }

        return lb;
    },

    centerLightbox: function (lightbox, centerFromTop) {
        var lb = lightbox || this.activeLightbox;
        var lbHeight = lb.outerHeight();
        var windowWidth = $(window).width(),
            windowHeight = $(window).height();
        var lbToBig = lbHeight > windowHeight;

        // Center the lightbox
        lb.css({
            left: (windowWidth - lb.width()) / 2,
            top: !lbToBig && centerFromTop ? $(window).scrollTop() + ((windowHeight - lbHeight) / 2) : $(window).scrollTop() + 40,
            margin: 0
        });
    },

    attachLbEvents: function () {
        var me = this;

        // Bind resize event to window object
        $(window).bind('resize', function () { me.centerLightbox(me.activeLightbox) });

        // Close Lightbox
        $('#lbDarkBg, .closeLB').bind('click', function () { me.closeActiveLightbox() });
    },

    killLbEvents: function () {
        var me = this;

        // Kill window resize event
        $(window).unbind('resize', function () { me.centerLightbox(me.activeLightbox) });

        // Kill click event for closing Lightboxes
        $('#lbDarkBg, .closeLB').unbind('click', function () { me.closeActiveLightbox() });
    },

    closeActiveLightbox: function () {
        var me = this;
        me.activeLightbox.fadeOut('fast', function () {
            $(this).remove();
            $('.loader').remove();
            if ($('.viewerLightbox').length == 0) {
                me.closeAllLightboxes();
            }
            else {
                me.setActiveLightbox($('.viewerLightbox').first());
                me.activeLightbox.fadeIn('fast');
            }
        });
    },

    closeAllLightboxes: function () {
        var me = this;
        $('.viewerLightbox, #lbDarkBg').fadeOut('fast', function () {
            $(this).remove();
            me.killLbEvents();
            me.setActiveLightbox(null);
        });
    },

    defaults: {
        width: 720,
        height: 500,
        tpl: null,
        removePrevLb: true,
        showCloseButton: true,
        lbClass: '',
        centerLb: true
    },

    confirmationDefaults: {
        height: 'auto',
        lbClass: 'confirmation_box',
        approveCallback: null,
        showCloseButton: false,
        width: 520
    },

    confirmationDefaultsData: {
        title: 'Approve',
        text: 'Are you sure you want to do this action?',
        approveText: 'OK',
        closeText: 'Close'
    }

};

Helpers.regNs = function (f) {
    var d = window, c = f.split(".");
    for (var b = 0; b < c.length; b++) {
        var e = c[b], a = d[e];
        if (!a) {
            a = d[e] = { __namespace: true, __typeName: c.slice(0, b + 1).join(".") };
            a.getName = function () { return this.__typeName; };
        }
        d = a;
    }
};

Helpers.GUID =
{
    create: function () {
        /// <summary>Creates a unique GUID</summary>
        var _S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (_S4() + _S4() + "-" + _S4() + "-" + _S4() + "-" + _S4() + "-" + _S4() + _S4() + _S4());
    },
    empty: '00000000-0000-0000-0000-000000000000'
};

Helpers.timeManipulation = {
    timeAsText: function (timeDate) {
        // Sanity check
        if (timeDate === null || timeDate === '' || timeDate <= 0) {
            return "";
        }

        // Get current time
        var nowDate = new Date();
        var currentTime = parseInt(nowDate.getTime() / 1000);
        var timeInterval = (currentTime - timeDate);

        // If we got negative time, we consider "2" minute margin to be OK, otherwise don't display
        var timeAsString = "";
        if (timeInterval <= 0) {
            if (timeInterval >= -120) {
                timeAsString = "seconds";
            }
            else {
                return "";
            }
        }
            // If time interval is less than a minute
        else if (timeInterval < 60) {
            if (timeInterval < 2) {
                timeAsString = "A second";
            }
            else {
                timeAsString = timeInterval + " seconds";
            }
        }
            // If time interval is less than an hour
        else if (timeInterval < 3600) {
            // Calculate minutes ago
            var minutesAgo = parseInt(timeInterval / 60.0);
            if (minutesAgo < 2) {
                timeAsString = "A minute";
            }
            else {
                timeAsString = minutesAgo + " minutes";
            }
        }
            // If time interval is less than a day
        else if (timeInterval < 3600 * 24) {
            var hoursAgo = parseInt(timeInterval / 3600.0);
            if (hoursAgo < 2) {
                timeAsString = "An hour";
            }
            else {
                timeAsString = hoursAgo + " hours";
            }
        }
            // If time interval is less than a week
        else if (timeInterval < 3600 * 24 * 7) {
            var daysAgo = parseInt(timeInterval / (3600.0 * 24.0));
            if (daysAgo < 2) {
                timeAsString = "A day";
            }
            else {
                timeAsString = daysAgo + " days";
            }
        }
            // If time interval is less than a month
        else if (timeInterval < (3600.0 * 24.0 * 7.0 * 4.2)) {
            var weeksAgo = parseInt(timeInterval / (3600.0 * 24.0 * 7.0));
            if (weeksAgo < 2) {
                timeAsString = "A week";
            }
            else {
                timeAsString = weeksAgo + " weeks";
            }
        }
            // If time interval is less than a year
        else if (timeInterval < (3600.0 * 24.0 * 7.0 * 52)) {
            var monthsAgo = parseInt(timeInterval / (3600.0 * 24.0 * 7.0 * 4.2));
            if (monthsAgo < 2) {
                timeAsString = "A month";
            }
            else {
                timeAsString = monthsAgo + " months";
            }
        }
        else {
            var yearsAgo = parseInt(timeInterval / (3600.0 * 24.0 * 7.0 * 52));
            if (yearsAgo < 2) {
                timeAsString = "A year";
            }
            else {
                timeAsString = yearsAgo + " years";
            }
        }

        // Add ago "suffix"
        timeAsString += " ago";

        return timeAsString;
    }
};

Helpers.validation = {
    validate: function (form) {
        // Errors reset
        form.find('.error').remove();

        var errors = [];
        var inputs = form.find('input[type=text]');
        $.each(inputs, function () {
            var input = $(this);
            var validate = input.data('validate') && input.data('validate') != "" ? (input.data('validate').split('|').length > 0 ? input.data('validate').split('|') : [input.data('validate')]) : null;
            if (validate) {
                var error = false;
                for (var i = 0; i < validate.length; i++) {
                    if (error) break;
                    switch (validate[i]) {
                        case 'empty':
                            // Empty fields
                            if (input.val().length < 1) {
                                error = true;
                                errors.push({
                                    elm: input,
                                    type: 'empty'
                                });
                            }
                            break;
                        case 'email':
                            var emailRegex = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
                            if (input.val().search(emailRegex) < 0) {
                                error = true;
                                errors.push({
                                    type: 'invalidEmail',
                                    elm: input
                                });
                            }
                            break;
                    }
                }
            }
        });

        var passwords = form.find('input[type=password]');
        $.each(passwords, function () {
            var input = $(this);
            var validate = input.data('validate') && input.data('validate') != "" ? (input.data('validate').split('|').length > 0 ? input.data('validate').split('|') : [input.data('validate')]) : null;
            if (validate) {
                var error = false;
                for (var i = 0; i < validate.length; i++) {
                    if (error) break;
                    switch (validate[i]) {
                        case 'empty':
                            // Empty fields
                            if (input.val().length < 1) {
                                error = true;
                                errors.push({
                                    elm: input,
                                    type: 'empty'
                                });
                            }
                            break;
                        case 'identical':
                            if (input.val() != input.parent('.form_row').prev('.form_row').find('input').val()) {
                                error = true;
                                errors.push({
                                    elm: input,
                                    type: 'identical'
                                });
                            }
                            break;
                        case 'specialChars':
                            var iChars = "#^+[]\\\';,{}\":<>?";
                            var detectSpecialChars = false;
                            for (var x = 0; x < input.val().length; x++) {
                                if (iChars.indexOf(input.val().charAt(x)) != -1) {
                                    detectSpecialChars = true;
                                    break;
                                }
                                if (detectSpecialChars) {
                                    error = true;
                                    errors.push({
                                        elm: input,
                                        type: 'specialChars'
                                    });
                                }
                            }
                            break;
                    }
                }
            }
        });

        if (errors.length >= 1) {
            this.errorsCreator(errors);
            return false;
        }
        else {
            return true;
        }
    },

    errorsCreator: function (errors) {
        var me = this;

        for (var i = 0; i < errors.length; i++) {
            var error = errors[i];
            error.elm.parent().append('<div class="notification error">' + me.errorTypes[error.type] + '</div>');
        }
    },

    errorTypes: {
        empty: Helpers.getTranslation('Error_Empty_Text'),
        toLong: Helpers.getTranslation('Error_MaximumLength_Text'),
        select: Helpers.getTranslation('Error_SelectCategory_Text'),
        invalidUrl: Helpers.getTranslation('Error_InvalidUrl_Text'),
        invalidEmail: Helpers.getTranslation('Error_InvalidEmail_Text'),
        identical: Helpers.getTranslation('Error_IdenticalPassword_Text'),
        specialChars: Helpers.getTranslation('Error_SpecialCharacters_Text')
    }
};

Helpers.BrowserDetect = {
    init: function () {
        this.browser_name = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
        return this;
    },

    searchString: function (data) {
        for (var i = 0 ; i < data.length ; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) !== -1) {
                return data[i].identity;
            }
        }
    },

    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },

    isMobileDevice: function () {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) === true;
    },

    dataBrowser: [
        { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
        { string: navigator.userAgent, subString: "MSIE", identity: "Explorer" },
        { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
        { string: navigator.userAgent, subString: "Safari", identity: "Safari" },
        { string: navigator.userAgent, subString: "Opera", identity: "Opera" }
    ]

};

Helpers.tinyMCE = {
    config: { "url": "/Scripts/Common/tiny_mce/tiny_mce.js", "theme": "advanced", "skin": "o2k7", "skin_variant": "silver", "width": "509px", "height": "300px", "plugins": "preview,  directionality", "theme_advanced_buttons1": ",undo,redo,|,code,|, preview,|, fontselect, fontsizeselect, |, bold, italic, underline, |, forecolor, backcolor", "theme_advanced_buttons2": "ltr,rtl,|,justifyleft,justifycenter,justifyright,justifyfull,|,bullist,numlist,|,outdent,indent,|,link,unlink,|,image,|,hr", "theme_advanced_buttons3": "", "theme_advanced_toolbar_location": "top", "theme_advanced_toolbar_align": "left", "theme_advanced_font_sizes": "6pt,8pt,9pt,11pt,14pt,16pt,20pt,24pt", "font_size_style_values": "6pt,8pt,9pt,11pt,14pt,16pt,20pt,24pt", "plugin_preview_width": "350", "plugin_preview_height": "500", "valid_elements": "a[accesskey|charset|class|coords|dir<ltr?rtl|href|hreflang|id|lang|name|rel|rev|shape<circle?default?poly?rect|style|tabindex|target|title|type],abbr[class|dir<ltr?rtl|id|lang|style|title],acronym[class|dir<ltr?rtl|id|id|lang|style|title],address[class|align|dir<ltr?rtl|id|lang|style|title],area[accesskey|alt|class|coords|dir<ltr?rtl|href|id|lang|nohref<nohref|shape<circle?default?poly?rect|style|tabindex|title|target],basefont[color|face|id|size],bdo[class|dir<ltr?rtl|id|lang|style|title],big[class|dir<ltr?rtl|id|lang|style|title],blockquote[cite|class|dir<ltr?rtl|id|lang|style|title],br[class|id|style|title],button[accesskey|class|dir<ltr?rtl|disabled<disabled|id|lang|name|style|tabindex|title|type|value],caption[class|dir<ltr?rtl|id|lang|style|title],cite[class|dir<ltr?rtl|id|lang|style|title],code[class|dir<ltr?rtl|id|lang|style|title],col[align<center?char?justify?left?right|char|charoff|class|dir<ltr?rtl|id|lang|span|style|title|valign<baseline?bottom?middle?top|width],colgroup[align<center?char?justify?left?right|char|charoff|class|dir<ltr?rtl|id|lang|span|style|title|valign<baseline?bottom?middle?top|width],dd[class|dir<ltr?rtl|id|lang|style|title],del[cite|class|datetime|dir<ltr?rtl|id|lang|style|title],dfn[class|dir<ltr?rtl|id|lang|style|title],dir[class|compact<compact|dir<ltr?rtl|id|lang|style|title],div[class|dir<ltr?rtl|id|lang|style|title],dl[class|compact<compact|dir<ltr?rtl|id|lang|style|title],dt[class|dir<ltr?rtl|id|lang|style|title],em/i[class|dir<ltr?rtl|id|lang|style|title],fieldset[class|dir<ltr?rtl|id|lang|style|title],h1[class|dir<ltr?rtl|id|lang|style|title],h2[class|dir<ltr?rtl|id|lang|style|title],h3[class|dir<ltr?rtl|id|lang|style|title],h4[class|dir<ltr?rtl|id|lang|style|title],h5[class|dir<ltr?rtl|id|lang|style|title],h6[class|dir<ltr?rtl|id|lang|style|title],hr[class|dir<ltr?rtl|id|lang|style|title],img[alt=''|class|dir<ltr?rtl|height|id|ismap<ismap|lang|longdesc|name|src|style|title|usemap|width],input[accept|accesskey|alt|checked<checked|class|dir<ltr?rtl|disabled<disabled|id|ismap<ismap|lang|maxlength|name|readonly<readonly|size|src|style|tabindex|title|type<button?checkbox?file?hidden?image?password?radio?reset?submit?text|usemap|value],ins[cite|class|datetime|dir<ltr?rtl|id|lang|style|title],isindex[class|dir<ltr?rtl|id|lang|prompt|style|title],kbd[class|dir<ltr?rtl|id|lang|style|title],label[accesskey|class|dir<ltr?rtl|for|id|lang|style|title],legend[accesskey|class|dir<ltr?rtl|id|lang|style|title],li[class|dir<ltr?rtl|id|lang|style|title|type|value],link[charset|class|dir<ltr?rtl|href|hreflang|id|lang|media|rel|rev|style|title|type],map[class|dir<ltr?rtl|id|lang|name|style|title],ol[class|compact<compact|dir<ltr?rtl|id|lang|start|style|title|type],optgroup[class|dir<ltr?rtl|disabled<disabled|id|label|lang|style|title],option[class|dir<ltr?rtl|disabled<disabled|id|label|lang|selected<selected|style|title|value],-p[class|dir<ltr?rtl|id|lang|style|title],pre/listing/plaintext/xmp[align|class|dir<ltr?rtl|id|lang|style|title|width],q[cite|class|dir<ltr?rtl|id|lang|style|title],s[class|dir<ltr?rtl|id|lang|onclick|ondblclick|style|title],samp[class|dir<ltr?rtl|id|lang|style|title],select[class|dir<ltr?rtl|disabled<disabled|id|lang|multiple<multiple|name|size|style|tabindex|title],small[class|dir<ltr?rtl|id|lang|style|title],span[class|dir<ltr?rtl|id|lang|style|title],strike[class|class|dir<ltr?rtl|id|lang|style|title],strong/b[class|dir<ltr?rtl|id|lang|style|title],style[dir<ltr?rtl|lang|media|title|type],sub[class|dir<ltr?rtl|id|lang|style|title],sup[class|dir<ltr?rtl|id|lang|style|title],table[bgcolor|border|cellpadding|cellspacing|class|dir<ltr?rtl|frame|height|id|lang|rules|style|summary|title|width],tbody[char|class|charoff|dir<ltr?rtl|id|lang|onclick|style|title|valign<baseline?bottom?middle?top],td[abbr|axis|bgcolor|char|charoff|class|colspan|dir<ltr?rtl|headers|height|id|lang|nowrap<nowrap|rowspan|scope<col?colgroup?row?rowgroup|style|title|valign<baseline?bottom?middle?top|width],textarea[accesskey|class|cols|dir<ltr?rtl|disabled<disabled|id|lang|name|readonly<readonly|rows|style|tabindex|title],tfoot[char|charoff|class|dir<ltr?rtl|id|lang|style|title|valign<baseline?bottom?middle?top],th[abbr|axis|bgcolor|char|charoff|class|colspan|dir<ltr?rtl|headers|height|id|lang|nowrap<nowrap|rowspan|scope<col?colgroup?row?rowgroup|style|title|valign<baseline?bottom?middle?top|width],thead[char|charoff|class|dir<ltr?rtl|id|lang|style|title|valign<baseline?bottom?middle?top],title[dir<ltr?rtl|lang],tr[abbr|bgcolor|char|charoff|class|rowspan|dir<ltr?rtl|id|lang|style|title|valign<baseline?bottom?middle?top],tt[class|dir<ltr?rtl|id|lang|style|title],u[class|dir<ltr?rtl|id|lang|style|title],ul[class|compact<compact|dir<ltr?rtl|id|lang|style|title|type],var[class|dir<ltr?rtl|id|lang|style|title]" }
};

Helpers.Currencies = {
    SetCurrenciesDropDown: function (elm) {
        var tpl = $(_.template(ViewerTemplates.common.currencies(), {}));

        tpl.find('.currency_dd_arrow').click(function () {
            var dd = $(this).parent();
            var list = dd.find('.currencies_list');
            if (!dd.hasClass('dd_disabled')) {
                if (dd.hasClass('dd_collapsed')) {
                    $('.currency_custom_dropdown.dd_expanded').removeClass('dd_expanded').addClass('dd_collapsed');
                    dd.removeClass('dd_collapsed').addClass('dd_expanded');
                    var items = list.find('li');
                    if (items.length > 7) {
                        items.addClass('long_list_item');
                    }
                } else if (dd.hasClass('dd_expanded')) {
                    dd.removeClass('dd_expanded').addClass('dd_collapsed');
                }
            }
        });

        tpl.delegate(".currencies_list li", 'click', function (e) {
            var dd = $(this).parents('.currency_custom_dropdown');

            var ddText = dd.find('.currency_dd_text');
            var currencySign = $(this).find('.currency_sign').html() != "--" ? $(this).find('.currency_sign').html() : null;
            var currencyText = $(this).data('val');
            dd.find("input[name='selectedCurrency']").val(currencyText).trigger('change');
            dd.find("input[name='selectedCurrencySign']").val(currencySign).trigger('change');

            ddText.val($(this).find('.currency_sign').html());
            //dd.parents('.edit_zone_input_row').find('.edit_album_lnk').toggle(true);

            dd.removeClass('dd_expanded').addClass('dd_collapsed');
        });

        elm.append(tpl);
    }
};

Helpers.UploadImage = {
    InitializeUploadButton: function (prms) {
        // make sure that all required parameters are valid - return false if not. 
        if (!prms || !prms.btn || !prms.action || !prms.action.length) {
            return false;
        }

        // set default values for optional parameters if missing
        prms.btnText = prms.btnText || '';
        prms.btnClass = prms.btnClass || '';
        prms.btnTextClass = prms.btnTextClass || '';
        prms.uploadParams = prms.uploadParams || {};
        prms.displayPostUploadDialog = prms.displayPostUploadDialog || false;
        prms.expectedSize = prms.expectedSize;
        prms.onSubmitCallback = prms.onSubmitCallback || null;
        prms.onCompleteCallback = prms.onCompleteCallback || null;
        prms.onAbortCrop = prms.onAbortCrop || null;
        prms.previewSize = prms.previewSize || { width: 100, height: 100 };
        prms.previewStyle = prms.previewStyle || null;
        prms.errorContainer = prms.errorContainer || null;
        prms.onUploadError = prms.onUploadError || null;
        prms.enforceSize = prms.enforceSize || false;
        prms.allowRatioChange = prms.allowRatioChange || false;
        prms.enforceMaxSize = prms.enforceMaxSize || false;
        prms.widthLimit = prms.widthLimit || 600;
        prms.heightLimit = prms.heightLimit || 500;
        prms.uncheckKeepRatioCheckbox = prms.uncheckKeepRatioCheckbox || false;

        var self = this;

        // initialize uploader
        new qq.FileUploader({
            element: prms.btn,
            action: prms.action,
            params: prms.uploadParams,
            template: '<div class="qq-uploader"><div class="qq-upload-button ' + prms.btnClass + '"><span class="' + prms.btnTextClass + '">' + prms.btnText + '</span></div><span class="qq-upload-list" style="position: absolute;top: -16px;"></span></div>',
            multiple: false,
            onSubmit: function (id, fileName) { self.ImageUploadOnSubmit(id, fileName, prms.onSubmitCallback); },
            onComplete: function (id, filename, JSONResponse) { self.ImageUploadOnComplete(id, filename, JSONResponse, prms); },
            messages: {
                typeError: "Invalid file extension. Please upload an image file."
            },
            allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
            showMessage: function (message) { self.showErrorMsg(message, prms.errorContainer, prms.onUploadError); }
        });

        return true;
    },
    ImageUploadOnSubmit: function (id, fileName, callback) {
        if (callback && typeof (callback) == "function") {
            callback(id, fileName);
        }
    },
    ImageUploadOnComplete: function (id, filename, JSONResponse, params) {
        var self = this;
        if (JSONResponse && JSONResponse.success) {
            if (params.displayPostUploadDialog) {

                // popup the "post upload" dialog (create it if it's not on the page yet)
                var tpl = Helpers.LightboxManager.init({
                    tpl: ViewerTemplates.common.post_image_upload,
                    lbClass: 'upload_image_new',
                    width: params.widthLimit ? params.widthLimit + 60 : 630,
                    height: 'auto',
                    removePrevLb: false,
                    centerLb: false
                }, {}, function () {
                    Helpers.LightboxManager.centerLightbox();
                    // if a multi_platform_upload dialog is open, hide it (not close) and save its ID
                    var openMultiDialog = $('.multi_platform_upload:visible');
                    if (openMultiDialog.length) {
                        var id = openMultiDialog.attr('id');
                        $('#hidOpenMultiDialogId').val(id);
                        openMultiDialog.parents('.upload_image_new').hide();
                    }
                });

                // TODO: Remove this
                /*if (!$('#postImageUploadDialog').length) {
                    var tpl = $($('#tpl_post_image_upload_dialog').jqote());
                    tpl.dialog({
                        width: 630,
                        modal: true,
                        draggable: true,
                        resizable: false,
                        autoOpen: false,
                        dialogClass: 'upload_image_new',
                        title: 'Crop image',
                        zIndex: 10000,
                        open: function () {
                            $('#postImageUploadDialog').dialog('option', 'position', ['center', 'center']);

                            // if a multi_platform_upload dialog is open, hide it (not close) and save its ID
                            var openMultiDialog = $('.multi_platform_upload:visible');
                            if (openMultiDialog.length) {
                                var id = openMultiDialog.attr('id');
                                $('#hidOpenMultiDialogId').val(id);
                                openMultiDialog.parents('.upload_image_new').hide();
                            }
                        },
                        close: function () {
                            // if a multi_platform_upload dialog is open, show it
                            var openDialogId = $('#hidOpenMultiDialogId').val();
                            if (openDialogId && openDialogId.length) {
                                $('#' + openDialogId).parents('.upload_image_new').show();
                                $('#hidOpenMultiDialogId').val('');
                            }

                            $('#postUploadError').hide();
                            $('#postImageUplaodLoading img').hide();
                            $('#btnSaveImagePostUpload').removeClass('upload_btn_disabled');
                            $('#btnSaveImagePostUpload').unbind('click');
                        }
                    });
                }*/

                $('#btnSaveImagePostUpload').data('device', JSONResponse.deviceType);

                // bind click event on save button
                $('#btnSaveImagePostUpload').click(function () {
                    if (!$(this).hasClass('upload_btn_disabled')) {
                        var coords = $('#btnSaveImagePostUpload').data('coords');
                        var imgPath = $('#btnSaveImagePostUpload').data('imgPath');
                        var device = $('#btnSaveImagePostUpload').data('device');
                        var api = $('#btnSaveImagePostUpload').data('api');
                        if (coords && imgPath && imgPath.length) {
                            var isGS = $('#grayscaleSelect').is(':checked');

                            // display "processing" sign and disable save button
                            $('#postUploadError').hide();
                            $('#postImageUplaodLoading img').show();
                            $('#btnSaveImagePostUpload').addClass('upload_btn_disabled');
                            $('#postImageUploadDialog .ui-dialog-titlebar-close').unbind('click');

                            var actionData = {
                                currImgPath: imgPath,
                                recX: coords.x,
                                recY: coords.y,
                                recWidth: coords.width,
                                recHeight: coords.height,
                                appID: currentAppId || params.uploadParams.appId,
                                grayscale: isGS,
                                deviceType: device,
                                validHeight: params.enforceSize || params.enforceMaxSize ? params.expectedSize.height : 0,
                                validWidth: params.enforceSize || params.enforceMaxSize ? params.expectedSize.width : 0,
                                resize: params.enforceSize,
                                secure: params.uploadParams && params.uploadParams.secure
                            };

                            // save the cropped image in server
                            $.ajax({
                                url: "/upload/SaveCroppedImage",
                                data: actionData,
                                type: "POST",
                                success: function (responseJSON) {
                                    var response = JSON.parse(responseJSON);
                                    if (response && response.success) {
                                        if (params.onCompleteCallback && typeof (params.onCompleteCallback) == "function") {
                                            params.onCompleteCallback(null, null, responseJSON);
                                        }
                                        $('<img />').attr('src', response.img).load(function () {
                                            Helpers.LightboxManager.closeActiveLightbox();
                                        });
                                    } else {
                                        var conatiner = null;
                                        var msg = 'Image processing failed. Please try again';
                                        conatiner = $('#postUploadError');

                                        // if an error message is returned from the server, display it
                                        if (response && response.message && response.message.length) {
                                            msg = response.message;
                                        }

                                        self.showErrorMsg(msg, conatiner, null);
                                    }
                                }
                            });
                        }
                    }
                });

                // show / hide the "ratio release" checkbox
                if (params.allowRatioChange) {
                    $('#ratioArea').show();
                }

                // initialize crop object
                var cropObj = {
                    img: JSONResponse.imgPublicUrl,
                    size: { width: JSONResponse.width, height: JSONResponse.height },
                    //displayLimit: 600,
                    widthLimit: params.widthLimit,
                    heightLimit: params.heightLimit,
                    expectedSize: params.expectedSize,
                    saveElement: $('#btnSaveImagePostUpload'),
                    coordsDataName: 'coords',
                    previewElement: $('#PIUPreviewWrapper img'),
                    previewContainerElement: $('#PIUPreviewWrapperInner'),
                    previewWidthElement: $('#previewSize .preview_width'),
                    previewHeightElement: $('#previewSize .preview_height'),
                    previewSize: params.previewSize,
                    previewSizeFixed: (params.enforceMaxSize && params.allowRatioChange ? false : true)
                };
                var cropper = new Helpers.ImageCropper(cropObj);

                // bind "ratio release" checkbox check event
                $('#chkKeepRatio').unbind('change').change(function (e) {
                    var jcrop_api = $('#btnSaveImagePostUpload').data('api');
                    cropper.ToggleAspectRatio(!this.checked);
                    if (jcrop_api) {
                        jcrop_api.setOptions(this.checked ? { aspectRatio: cropper.GetResultRatio() } : { aspectRatio: 0 });
                        jcrop_api.focus();
                    }
                });

                if (cropper.getOrigianl().length > 0 && cropper.getSize() != null) {
                    var displaySize = cropper.CalculateDisplaySize();
                    cropper.PreloadOriginalImage(function () {
                        // set the crop area image
                        $('#postImageUploadCropArea img').attr('src', cropper.getOrigianl()).css({ width: displaySize.width + 'px', height: displaySize.height + 'px' });

                        //set preview style
                        if (params.previewStyle && params.previewStyle == 'roundCorners') {
                            $('#PIUPreviewWrapper').addClass('prev_rnd_corners');
                            //$('#PIUPreviewWrapperInner').addClass('prev_rnd_corners');
                        }

                        // open the dialog    
                        $('#PIUPreviewWrapper').css({ width: params.previewSize.width, height: params.previewSize.height });
                        $('#PIUPreviewWrapperInner').css({ width: params.previewSize.width, height: params.previewSize.height });

                        // initialize Jcrop
                        var jcrop_api;
                        $('#postImageUploadCropArea img').Jcrop({
                            onChange: function (coords) { cropper.updatePreview(coords); },
                            onSelect: function (coords) { cropper.setSelectedArea(coords); },
                            bgColor: 'transparent',
                            bgOpacity: 0.7,
                            aspectRatio: cropper.GetResultRatio(),
                            setSelect: cropper.CalculateInitialCropCoords(),
                            allowSelect: false
                        }, function () {
                            jcrop_api = this;
                            $('#btnSaveImagePostUpload').data('api', jcrop_api);
                            $('#PIUPreviewWrapper img').attr('src', cropper.getOrigianl());
                            if (params.uncheckKeepRatioCheckbox) {
                                $('#chkKeepRatio').trigger('click');
                            }
                            cropper.setInitialPreview();
                        });

                        cropper.updateSaveElementData('imgPath', cropper.getOrigianl());

                        // bind the "dialoge close" event
                        $("#postImageUploadDialog").bind("dialogclose", function (event, ui) {
                            if (params.onAbortCrop && typeof (params.onAbortCrop) == "function") {
                                params.onAbortCrop();
                            }

                            // reset the dialog                    
                            $('#postImageUploadCropArea img').attr('src', '').css({ width: '0', height: '0' });
                            $('#PIUPreviewWrapper').removeClass('prev_rnd_corners');
                            $('#PIUPreviewWrapperInner').css({ width: params.previewSize.width, height: params.previewSize.height, marginTop: '0' });
                            $('#PIUPreviewWrapper img').attr('src', '').css({ width: '0', height: '0' });
                            $('#grayscaleSelect').attr('checked', false);
                            $('#postImageUplaodLoading img').hide();
                            $('#btnSaveImagePostUpload').removeClass('upload_btn_disabled');
                            $('#ratioArea').hide();
                            $('#chkKeepRatio').attr('checked', true);

                            // destroy Jcropt
                            jcrop_api.destroy();
                        });

                        var preImgUploadDialog = $('#preImageUploadDialog');
                        if (preImgUploadDialog && preImgUploadDialog.is(':visible')) {
                            preImgUploadDialog.find('#preImageUplaodLoading img').hide();
                            Helpers.LightboxManager.closeActiveLightbox();
                        }
                    });
                }
            } else if (params.onCompleteCallback && typeof (params.onCompleteCallback) == "function") {
                var preImgUploadDialog = $('#preImageUploadDialog');
                if (preImgUploadDialog && preImgUploadDialog.is(':visible')) {
                    preImgUploadDialog.find('#preImageUplaodLoading img').hide();
                    Helpers.LightboxManager.closeActiveLightbox();
                }
                params.onCompleteCallback(id, filename, JSONResponse);
            }
        } else {
            var conatiner = params.errorContainer;
            var msg = 'File upload failed. Please try again later';
            // if an error message is returned from the server, display it
            if (JSONResponse && JSONResponse.message && JSONResponse.message.length) {
                msg = JSONResponse.message;
            }

            this.showErrorMsg(msg, conatiner, params.onUploadError);
        }
    },
    PopupPreUploadDialog: function (prms) {
        var me = this;

        // create the pre upload dialog if not already on page
        var tpl = Helpers.LightboxManager.init({
            tpl: ViewerTemplates.common.pre_image_upload,
            lbClass: 'upload_image_new',
            width: 500,
            height: 'auto',
            removePrevLb: false
        }, {});

        // TODO: Remove this
        /*if (!$('#preImageUploadDialog').length) {
            var tpl = $($('#tpl_pre_image_upload_dialog').jqote());
            tpl.dialog({
                width: 500,
                modal: true,
                draggable: false,
                resizable: false,
                autoOpen: false,
                //show: {effect: 'fadeIn', duration: 350},
                dialogClass: 'upload_image_new',
                zIndex: 10000,
                close: function () {
                    // on close - deactivate the upload button and clear the dialog content
                    $('#imgSpecificationsArea span').html('');
                    $('#preUploadSelectBtn').html('');
                    $('#preImageUplaodLoading img').hide();
                    $('#preUploadError').hide();
                    $('#preUploadSelectBtn .upload_btn_gray').removeClass('upload_btn_disabled').find("input[name='file']").removeAttr('disabled');
                }
            });

            // bind "cancel" button click event
            $('#preImageUploadCancel').click(function () {
                $('#preImageUploadDialog').dialog('close');
            });
        }*/

        if (prms) {
            // add parameters for uploader
            prms.btn = $('#preUploadSelectBtn').get(0);
            prms.btnClass = 'upload_btn_gray';
            prms.btnText = 'Browse';
            prms.btnTextClass = '';
            prms.onSubmitCallback = function () {
                $('#preUploadError').hide();
                $('#preImageUplaodLoading img').show();
                $('#preUploadSelectBtn .upload_btn_gray').addClass('upload_btn_disabled');
                $("#preUploadSelectBtn .upload_btn_gray input[name='file']").attr('disabled', 1);
            };
            prms.errorContainer = $('#preUploadError');

            // initialize upload button
            this.InitializeUploadButton(prms);

            // set title and content
            if (prms.expectedSize) {
                var str = prms.expectedSize.width + ' x ' + prms.expectedSize.height;
                $('#imgSpecificationsArea span').html(str);
                $('#imgSpecificationsArea').show();
            } else {
                $('#imgSpecificationsArea').hide();
            }
            var comment = prms.preUploadComment || '';
            $('#imgUploadComment').html(comment);
            var dTitle = prms.preUploadTitle || getTranslation('Submission_Upload_Image_Popup_Title');
            $("#preImageUploadDialog").dialog({ title: dTitle });
        }
    },
    showErrorMsg: function (msg, errorContainer, onError) {
        if (errorContainer && errorContainer.length) {
            // show the error text in a specific place (pre upload dialog, crop dialog)           
            var dialog = errorContainer.parents('.new_upload_dialog');
            var errorArea = dialog.find('.new_upload_process');
            errorContainer.html(msg);
            errorArea.find('img').hide();
            dialog.find('.upload_btn_gray').removeClass('upload_btn_disabled').find("input[name='file']").removeAttr('disabled');
            errorContainer.show();
        } else {
            // popup an "upload error" dialog with the error text
            var tpl = Helpers.LightboxManager.init({
                tpl: ViewerTemplates.common.image_upload_error,
                lbClass: 'upload_image_new',
                width: 500,
                height: 'auto',
                removePrevLb: false
            }, {});

            // TODO: Remove this
            /*if (!$('#imgUplaodErrorDialog').length) {
                var tpl = $($('#tpl_image_upload_error_dialog').jqote());
                tpl.dialog({
                    width: 400,
                    modal: true,
                    draggable: false,
                    resizable: false,
                    autoOpen: false,
                    dialogClass: 'upload_image_new',
                    title: 'Upload failed',
                    zIndex: 10000,
                    close: function () {
                        if (onError) {
                            onError();
                        }
                    }
                });

                // bind "cancel" button click event
                $('#imgUplaodErrorDialog .upload_cancel_button').click(function () {
                    $('#imgUplaodErrorDialog').dialog('close');
                });
            }

            //open the dialog        
            $('#imgUplaodErrorDialog').dialog('open');*/

            // set the error message
            $('#imgUploadErrorMsg').html(msg);
        }
    }
};

Helpers.ImageCropper = function (params) {
    this.orgImg = params.img || '';
    this.orgSize = params.size || { width: 0, height: 0 };
    //this.displayLimit = params.displayLimit || 0;
    this.widthLimit = params.widthLimit || 0;
    this.heightLimit = params.heightLimit || 0;
    this.expectedSize = params.expectedSize || { width: 0, height: 0 };
    this.saveElement = params.saveElement || null;
    this.previewElement = params.previewElement || null;
    this.previewContainerElement = params.previewContainerElement || null;
    this.previewWidthElement = params.previewWidthElement || null;
    this.previewHeightElement = params.previewHeightElement || null;
    this.previewSize = params.previewSize || { width: 0, height: 0 };
    this.coordsDataName = params.coordsDataName || 'coords';
    this.displaySize = {};
    this.resultCoords = {};
    this.initialCropCoords = {};
    this.previewSizeFixed = params.previewSizeFixed;
    this.aspectRatioOff = false;
};

Helpers.ImageCropper.prototype =
{
    getOrigianl: function () {
        return this.orgImg;
    },
    getSize: function () {
        return this.orgSize.width > 0 && this.orgSize.height > 0 ? this.orgSize : null;
    },
    CalculateDisplaySize: function () {
        var result = {};
        var r;
        if (this.orgSize.width > this.widthLimit || this.orgSize.height > this.heightLimit) {    // original image doesn't fit in the display area
            var orgRatio = this.orgSize.height > 0 ? this.orgSize.width / this.orgSize.height : 0;
            if (orgRatio >= (this.widthLimit / this.heightLimit)) {
                r = this.widthLimit / this.orgSize.width;
                result.height = Math.round(r * this.orgSize.height);
                result.width = this.widthLimit;
            } else if (orgRatio != 0) {
                r = this.heightLimit / this.orgSize.height;
                result.height = this.heightLimit;
                result.width = Math.round(r * this.orgSize.width);
            } else {
                result.height = 0;
                result.width = 0;
            }
        } else {    // original image can fit in the display area without resize
            result.width = this.orgSize.width;
            result.height = this.orgSize.height;
        }

        this.displaySize = result;
        return this.displaySize;
    },
    CalculateInitialCropCoords: function () {
        var optimalCropSize = { width: this.GetDisplayOrgRatio() * this.expectedSize.width, height: this.GetDisplayOrgRatio() * this.expectedSize.height };
        var cropSize = {};
        if (optimalCropSize.width > 0 && optimalCropSize.height > 0) {
            // check if the longer dimension of the crop is longer or shorter than the display. resize by ratio if longer.
            var cropRatio = this.GetResultRatio();
            if (cropRatio >= 1) {
                if (optimalCropSize.width > this.displaySize.width) {
                    cropSize.width = this.displaySize.width;
                    cropSize.height = Math.round(cropSize.width / cropRatio);
                } else {
                    cropSize = optimalCropSize;
                }
            } else {
                if (optimalCropSize.height > this.displaySize.height) {
                    cropSize.height = this.displaySize.height;
                    cropSize.width = Math.round(cropSize.height * cropRatio);
                } else {
                    cropSize = optimalCropSize;
                }
            }
            // than check if the shorter dimension of the crop is longer or shorter than the display. resize by ratio if longer.
            if (cropRatio >= 1) {
                if (cropSize.height > this.displaySize.height) {
                    cropSize.height = this.displaySize.height;
                    cropSize.width = Math.round(cropSize.height * cropRatio);
                }
            } else {
                if (cropSize.width > this.displaySize.width) {
                    cropSize.width = this.displaySize.width;
                    cropSize.height = Math.round(cropSize.width / cropRatio);
                }
            }

        } else {
            cropSize = { width: 0, height: 0 };
        }

        // calculate coords around center
        var center = { x: Math.round(this.displaySize.width / 2), y: Math.round(this.displaySize.height / 2) };
        var topLeft = { x: center.x - Math.round(cropSize.width / 2), y: center.y - Math.round(cropSize.height / 2) };
        var bottomRight = { x: topLeft.x + cropSize.width, y: topLeft.y + cropSize.height };
        var coords = [topLeft.x, topLeft.y, bottomRight.x, bottomRight.y];
        var coordsObj = { w: cropSize.width, h: cropSize.height, x: topLeft.x, y: topLeft.y };
        this.setSelectedArea(coordsObj);
        this.initialCropCoords = coordsObj;
        return coords;
    },
    GetDisplayOrgRatio: function () {
        if (this.orgSize.width > 0) {
            return this.displaySize.width / this.orgSize.width;
        } else {
            return 0;
        }
    },
    GetResultRatio: function () {
        if (this.expectedSize.height > 0) {
            return this.expectedSize.width / this.expectedSize.height;
        } else {
            return 0;
        }
    },
    PreloadOriginalImage: function (callback) {
        var src = this.getOrigianl();
        var img = new Image();
        img.onload = function () {
            if (callback && typeof (callback) == "function") {
                callback();
            }
        };
        img.src = src;
    },
    updatePreview: function (coords) {
        if (!coords) {
            coords = this.initialCropCoords;
        }

        if (this.previewSizeFixed) {
            if (this.previewElement) {
                var rx = this.previewSize.width / coords.w;
                var ry = this.previewSize.height / coords.h;

                this.previewElement.css({
                    width: Math.round(rx * this.displaySize.width) + 'px',
                    height: Math.round(ry * this.displaySize.height) + 'px',
                    marginLeft: '-' + Math.round(rx * coords.x) + 'px',
                    marginTop: '-' + Math.round(ry * coords.y) + 'px'
                });
            }
        } else {
            var r = this.GetDisplayOrgRatio();
            if (this.previewElement && this.previewContainerElement) {
                if (coords.w / r < this.expectedSize.width && coords.h / r < this.expectedSize.height) {
                    var rx = this.previewSize.width / (r * this.expectedSize.width);
                    var ry = this.previewSize.height / (r * this.expectedSize.height);

                    this.previewElement.css({
                        width: Math.round(rx * this.displaySize.width) + 'px',
                        height: Math.round(ry * this.displaySize.height) + 'px',
                        marginLeft: '-' + Math.round(rx * coords.x) + 'px',
                        marginTop: '-' + Math.round(ry * coords.y) + 'px'
                    });

                    this.previewContainerElement.css({
                        width: ((coords.w / (r * this.expectedSize.width)) * this.previewSize.width) + 'px',
                        height: ((coords.h / (r * this.expectedSize.height)) * this.previewSize.height) + 'px',
                        marginTop: Math.round((this.previewSize.height - (coords.h / (r * this.expectedSize.height)) * this.previewSize.height) / 2) + 'px'
                    });
                } else if (this.aspectRatioOff) {
                    var rCrop = coords.w / coords.h;
                    var rW = coords.w / this.expectedSize.width;
                    var rH = coords.h / this.expectedSize.height;
                    var rx, ry, pWidth, pHeight;
                    var containerWidth, containerHeight, margin;
                    if (rW > rH) {
                        rx = this.previewSize.width / coords.w;
                        ry = rx;
                        pWidth = Math.round(rx * this.displaySize.width);
                        containerWidth = this.previewSize.width;
                        pHeight = pWidth / (this.displaySize.width / this.displaySize.height);
                        containerHeight = containerWidth / rCrop;
                        margin = Math.round((this.previewSize.height - containerHeight) / 2);
                    } else {
                        ry = this.previewSize.height / coords.h;
                        rx = ry;
                        pHeight = Math.round(ry * this.displaySize.height);
                        pWidth = pHeight * (this.displaySize.width / this.displaySize.height);
                        containerHeight = this.previewSize.height;
                        containerWidth = containerHeight * rCrop;
                        margin = '0';
                    }
                    this.previewElement.css({
                        width: pWidth + 'px',
                        height: pHeight + 'px',
                        marginLeft: '-' + Math.round(rx * coords.x) + 'px',
                        marginTop: '-' + Math.round(ry * coords.y) + 'px'
                    });
                    this.previewContainerElement.css({
                        width: containerWidth + 'px',
                        height: containerHeight + 'px',
                        marginTop: margin + 'px'
                    });
                } else {
                    var rx = this.previewSize.width / coords.w;
                    var ry = this.previewSize.height / coords.h;

                    this.previewElement.css({
                        width: Math.round(rx * this.displaySize.width) + 'px',
                        height: Math.round(ry * this.displaySize.height) + 'px',
                        marginLeft: '-' + Math.round(rx * coords.x) + 'px',
                        marginTop: '-' + Math.round(ry * coords.y) + 'px'
                    });

                    this.previewContainerElement.css({
                        width: this.previewSize.width + 'px',
                        height: this.previewSize.height + 'px',
                        marginTop: '0'
                    });
                }
            }
        }

        if (this.previewWidthElement && this.previewHeightElement) {
            this.previewWidthElement.html(Math.round(coords.w / this.GetDisplayOrgRatio()));
            this.previewHeightElement.html(Math.round(coords.h / this.GetDisplayOrgRatio()));
        }
    },
    setSelectedArea: function (coords) {
        this.resultCoords = {
            x: Math.round(coords.x / this.GetDisplayOrgRatio()),
            y: Math.round(coords.y / this.GetDisplayOrgRatio()),
            width: Math.round(coords.w / this.GetDisplayOrgRatio()),
            height: Math.round(coords.h / this.GetDisplayOrgRatio())
        };
        this.updateSaveElementData(this.coordsDataName, this.resultCoords);
    },
    updateSaveElementData: function (dataName, dataObj) {
        if (this.saveElement.length) {
            this.saveElement.data(dataName, dataObj);
        }
    },
    getInitialCropCoords: function () {
        return this.initialCropCoords;
    },
    setInitialPreview: function () {
        //        if (this.previewElement) {
        //            var cropCoords = this.initialCropCoords;
        //            var rx = this.previewSize.width / cropCoords.w;
        //            var ry = this.previewSize.height / cropCoords.h;
        //            var prevWidth = Math.round(rx * this.displaySize.width);
        //            var displayRatio = this.displaySize.height > 0 ? this.displaySize.width / this.displaySize.height : 1;
        //            this.previewElement.css({
        //                width: prevWidth + 'px',
        //                height: prevWidth / displayRatio + 'px',
        //                marginLeft: '-' + Math.round(rx * cropCoords.x) + 'px',
        //                marginTop: '-' + Math.round(ry * cropCoords.y) + 'px'
        //            });
        //        }
    },
    ToggleAspectRatio: function (isOff) {
        if (isOff) {
            this.aspectRatioOff = true;
        } else {
            this.aspectRatioOff = false;
        }
    },
    getCurrentCoordinates: function () {
        return this.saveElement.data(this.coordsDataName);
    }
};

Helpers.unwrapApiCall = function (ajaxResult) {

    if (ajaxResult.data && typeof ajaxResult.data.success !== "undefined") {
        var apiResult = ajaxResult.data;
        if (apiResult.success) {
            return apiResult.data || apiResult.result;
        } else {
            throw new Error(apiResult.message);
        }
    } else {
        throw new Error("Ajax request failure, status: " + ajaxResult.status);
    }
};

Helpers.formatTs = function (ts, format) {
    var date = new Date(ts * 1000),
                    dateString = format,
                    day = date.getDate(),
                    month = date.getMonth() + 1;

    dateString = dateString.replace(/m/gi, month < 10 ? "0" + month : month);
    dateString = dateString.replace(/d/gi, day < 10 ? "0" + day : day);
    dateString = dateString.replace(/y/gi, date.getFullYear());

    return dateString;
}

Helpers.CookiesManager = {
    getCookie: function (name) {
        var cookiesStrings = document.cookie.split(';');
        for (var i = 0; i < cookiesStrings.length; i++) {
            var cookieString = Helpers.String.trim(cookiesStrings[i]);
            var seperatorIdx = cookieString.indexOf('=');

            var key = cookieString.substring(0, seperatorIdx)
                .toLowerCase();
            if (key == name.toLowerCase())
                return unescape(cookieString.substring(seperatorIdx + 1));
        }
        return null;
    },
    setCookie: function (name, value, path, expires) {
        var cookieParts = [
            [name, value].join('='),
            path ? ['path', path].join('=') : '',
            expires ? ['expires', expires].join('=') : ''
        ];
        document.cookie = cookieParts.join(';');
    },
    setSessionCookie: function (name, value, path) {
        this.setCookie(name, value, path);
    },
    deleteCookie: function (name, path) {
        this.setCookie(name, '', path, 'Thu, 01 Jan 1970 00:00:01 GMT');
    }
};

Helpers.viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]');
Helpers.ua = navigator.userAgent;

Helpers.scaleFix = function () {
    if (Helpers.viewportmeta && /iPhone|iPad|iPod/.test(Helpers.ua) && !/Opera Mini/.test(Helpers.ua)) {
        Helpers.viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
        document.addEventListener('gesturestart', Helpers.gestureStart, false);
    }
};

Helpers.gestureStart = function () {
    Helpers.viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
};

/**
 * Normalized hide address bar for iOS & Android
 * (c) Scott Jehl, scottjehl.com
 * MIT License
 */

// If we split this up into two functions we can reuse
// this function if we aren't doing full page reloads.

// If we cache this we don't need to re-calibrate everytime we call
// the hide url bar
Helpers.BODY_SCROLL_TOP = false;

// So we don't redefine this function everytime we
// we call hideUrlBar
Helpers.getScrollTop = function () {
    var win = window;
    var doc = document;

    return win.pageYOffset || doc.compatMode === 'CSS1Compat' && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
};

// It should be up to the mobile
Helpers.hideUrlBar = function () {
    var win = window;

    // if there is a hash, or Helpers.BODY_SCROLL_TOP hasn't been set yet, wait till that happens
    if (!location.hash && Helpers.BODY_SCROLL_TOP !== false) {
        win.scrollTo(0, Helpers.BODY_SCROLL_TOP === 1 ? 0 : 1);
    }
};

Helpers.hideUrlBarOnLoad = function () {
    var win = window;
    var doc = win.document;
    var bodycheck;

    // If there's a hash, or addEventListener is undefined, stop here
    if (!win.navigator.standalone && !location.hash && win.addEventListener) {

        // scroll to 1
        window.scrollTo(0, 1);
        Helpers.BODY_SCROLL_TOP = 1;

        // reset to 0 on bodyready, if needed
        bodycheck = setInterval(function () {
            if (doc.body) {
                clearInterval(bodycheck);
                Helpers.BODY_SCROLL_TOP = Helpers.getScrollTop();
                Helpers.hideUrlBar();
            }
        }, 15);

        win.addEventListener('load', function () {
            setTimeout(function () {
                // at load, if user hasn't scrolled more than 20 or so...
                if (Helpers.getScrollTop() < 20) {
                    // reset to hide addr bar at onload
                    Helpers.hideUrlBar();
                }
            }, 0);
        }, false);
    }
};

/**
 * Fast Buttons - read wiki below before using
 * https://github.com/h5bp/mobile-boilerplate/wiki/JavaScript-Helper
 */

Helpers.fastButton = function (element, handler, pressedClass) {
    this.handler = handler;
    // styling of .pressed is defined in the project's CSS files
    this.pressedClass = typeof pressedClass === 'undefined' ? 'pressed' : pressedClass;

    Helpers.listenForGhostClicks();

    if (element.length && element.length > 1) {
        for (var singleElIdx in element) {
            this.addClickEvent(element[singleElIdx]);
        }
    } else {
        this.addClickEvent(element);
    }
};

Helpers.fastButton.prototype.handleEvent = function (event) {
    event = event || window.event;

    switch (event.type) {
        case 'touchstart': this.onTouchStart(event); break;
        case 'touchmove': this.onTouchMove(event); break;
        case 'touchend': this.onClick(event); break;
        case 'click': this.onClick(event); break;
    }
};

Helpers.fastButton.prototype.onTouchStart = function (event) {
    var element = event.target || event.srcElement;
    event.stopPropagation();
    element.addEventListener('touchend', this, false);
    document.body.addEventListener('touchmove', this, false);
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;

    element.className += ' ' + this.pressedClass;
};

Helpers.fastButton.prototype.onTouchMove = function (event) {
    if (Math.abs(event.touches[0].clientX - this.startX) > 10 ||
        Math.abs(event.touches[0].clientY - this.startY) > 10) {
        this.reset(event);
    }
};

Helpers.fastButton.prototype.onClick = function (event) {
    event = event || window.event;
    var element = event.target || event.srcElement;
    if (event.stopPropagation) {
        event.stopPropagation();
    }
    this.reset(event);
    this.handler.apply(event.currentTarget, [event]);
    if (event.type == 'touchend') {
        Helpers.preventGhostClick(this.startX, this.startY);
    }
    var pattern = new RegExp(' ?' + this.pressedClass, 'gi');
    element.className = element.className.replace(pattern, '');
};

Helpers.fastButton.prototype.reset = function (event) {
    var element = event.target || event.srcElement;
    rmEvt(element, 'touchend', this, false);
    rmEvt(document.body, 'touchmove', this, false);

    var pattern = new RegExp(' ?' + this.pressedClass, 'gi');
    element.className = element.className.replace(pattern, '');
};

Helpers.fastButton.prototype.addClickEvent = function (element) {
    addEvt(element, 'touchstart', this, false);
    addEvt(element, 'click', this, false);
};

Helpers.preventGhostClick = function (x, y) {
    Helpers.coords.push(x, y);
    window.setTimeout(function () {
        Helpers.coords.splice(0, 2);
    }, 2500);
};

Helpers.ghostClickHandler = function (event) {
    if (!Helpers.hadTouchEvent && Helpers.dodgyAndroid) {
        // This is a bit of fun for Android 2.3...
        // If you change window.location via fastButton, a click event will fire
        // on the new page, as if the events are continuing from the previous page.
        // We pick that event up here, but Helpers.coords is empty, because it's a new page,
        // so we don't prevent it. Here's we're assuming that click events on touch devices
        // that occur without a preceding touchStart are to be ignored.
        event.stopPropagation();
        event.preventDefault();
        return;
    }
    for (var i = 0, len = Helpers.coords.length; i < len; i += 2) {
        var x = Helpers.coords[i];
        var y = Helpers.coords[i + 1];
        if (Math.abs(event.clientX - x) < 25 && Math.abs(event.clientY - y) < 25) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
};

// This bug only affects touch Android 2.3 devices, but a simple ontouchstart test creates a false positive on
// some Blackberry devices. https://github.com/Modernizr/Modernizr/issues/372
// The browser sniffing is to avoid the Blackberry case. Bah
Helpers.dodgyAndroid = ('ontouchstart' in window) && (navigator.userAgent.indexOf('Android 2.3') != -1);

Helpers.listenForGhostClicks = (function () {
    var alreadyRan = false;

    return function () {
        if (alreadyRan) {
            return;
        }

        if (document.addEventListener) {
            document.addEventListener('click', Helpers.ghostClickHandler, true);
        }
        addEvt(document.documentElement, 'touchstart', function () {
            Helpers.hadTouchEvent = true;
        }, false);

        alreadyRan = true;
    };
})();

Helpers.coords = [];

// fn arg can be an object or a function, thanks to handleEvent
// read more about the explanation at: http://www.thecssninja.com/javascript/handleevent
function addEvt(el, evt, fn, bubble) {
    if ('addEventListener' in el) {
        // BBOS6 doesn't support handleEvent, catch and polyfill
        try {
            el.addEventListener(evt, fn, bubble);
        } catch (e) {
            if (typeof fn == 'object' && fn.handleEvent) {
                el.addEventListener(evt, function (e) {
                    // Bind fn as this and set first arg as event object
                    fn.handleEvent.call(fn, e);
                }, bubble);
            } else {
                throw e;
            }
        }
    } else if ('attachEvent' in el) {
        // check if the callback is an object and contains handleEvent
        if (typeof fn == 'object' && fn.handleEvent) {
            el.attachEvent('on' + evt, function () {
                // Bind fn as this
                fn.handleEvent.call(fn);
            });
        } else {
            el.attachEvent('on' + evt, fn);
        }
    }
}

function rmEvt(el, evt, fn, bubble) {
    if ('removeEventListener' in el) {
        // BBOS6 doesn't support handleEvent, catch and polyfill
        try {
            el.removeEventListener(evt, fn, bubble);
        } catch (e) {
            if (typeof fn == 'object' && fn.handleEvent) {
                el.removeEventListener(evt, function (e) {
                    // Bind fn as this and set first arg as event object
                    fn.handleEvent.call(fn, e);
                }, bubble);
            } else {
                throw e;
            }
        }
    } else if ('detachEvent' in el) {
        // check if the callback is an object and contains handleEvent
        if (typeof fn == 'object' && fn.handleEvent) {
            el.detachEvent("on" + evt, function () {
                // Bind fn as this
                fn.handleEvent.call(fn);
            });
        } else {
            el.detachEvent('on' + evt, fn);
        }
    }
}

/**
 * Autogrow
 * http://googlecode.blogspot.com/2009/07/gmail-for-mobile-html5-series.html
 */

Helpers.autogrow = function (element, lh) {
    function handler(e) {
        var newHeight = this.scrollHeight;
        var currentHeight = this.clientHeight;
        if (newHeight > currentHeight) {
            this.style.height = newHeight + 3 * textLineHeight + 'px';
        }
    }

    var setLineHeight = (lh) ? lh : 12;
    var textLineHeight = element.currentStyle ? element.currentStyle.lineHeight : getComputedStyle(element, null).lineHeight;

    textLineHeight = (textLineHeight.indexOf('px') == -1) ? setLineHeight : parseInt(textLineHeight, 10);

    element.style.overflow = 'hidden';
    element.addEventListener ? element.addEventListener('input', handler, false) : element.attachEvent('onpropertychange', handler);
};

/**
 * Enable CSS active pseudo styles in Mobile Safari
 * http://alxgbsn.co.uk/2011/10/17/enable-css-active-pseudo-styles-in-mobile-safari/
 */

Helpers.enableActive = function () {
    document.addEventListener('touchstart', function () { }, false);
};

/**
 * Prevent default scrolling on document window
 */

Helpers.preventScrolling = function () {
    document.addEventListener('touchmove', function (e) {
        if (e.target.type === 'range') { return; }
        e.preventDefault();
    }, false);
};

/**
 * Prevent iOS from zooming onfocus
 * https://github.com/h5bp/mobile-boilerplate/pull/108
 * Adapted from original jQuery code here: http://nerd.vasilis.nl/prevent-ios-from-zooming-onfocus/
 */

Helpers.preventZoom = function () {
    if (Helpers.viewportmeta && navigator.platform.match(/iPad|iPhone|iPod/i)) {
        var formFields = document.querySelectorAll('input, select, textarea');
        var contentString = 'width=device-width,initial-scale=1,maximum-scale=';
        var i = 0;
        var fieldLength = formFields.length;

        var setViewportOnFocus = function () {
            Helpers.viewportmeta.content = contentString + '1';
        };

        var setViewportOnBlur = function () {
            Helpers.viewportmeta.content = contentString + '10';
        };

        for (; i < fieldLength; i++) {
            formFields[i].onfocus = setViewportOnFocus;
            formFields[i].onblur = setViewportOnBlur;
        }
    }
};

/**
 * iOS Startup Image helper
 */

Helpers.startupImage = function () {
    var portrait;
    var landscape;
    var pixelRatio;
    var head;
    var link1;
    var link2;

    pixelRatio = window.devicePixelRatio;
    head = document.getElementsByTagName('head')[0];

    if (navigator.platform === 'iPad') {
        portrait = pixelRatio === 2 ? 'img/startup/startup-tablet-portrait-retina.png' : 'img/startup/startup-tablet-portrait.png';
        landscape = pixelRatio === 2 ? 'img/startup/startup-tablet-landscape-retina.png' : 'img/startup/startup-tablet-landscape.png';

        link1 = document.createElement('link');
        link1.setAttribute('rel', 'apple-touch-startup-image');
        link1.setAttribute('media', 'screen and (orientation: portrait)');
        link1.setAttribute('href', portrait);
        head.appendChild(link1);

        link2 = document.createElement('link');
        link2.setAttribute('rel', 'apple-touch-startup-image');
        link2.setAttribute('media', 'screen and (orientation: landscape)');
        link2.setAttribute('href', landscape);
        head.appendChild(link2);
    } else {
        portrait = pixelRatio === 2 ? "img/startup/startup-retina.png" : "img/startup/startup.png";
        portrait = screen.height === 568 ? "img/startup/startup-retina-4in.png" : portrait;
        link1 = document.createElement('link');
        link1.setAttribute('rel', 'apple-touch-startup-image');
        link1.setAttribute('href', portrait);
        head.appendChild(link1);
    }

    //hack to fix letterboxed full screen web apps on 4" iPhone / iPod with iOS 6
    if (navigator.platform.match(/iPhone|iPod/i) && (screen.height === 568) && navigator.userAgent.match(/\bOS 6_/)) {
        if (Helpers.viewportmeta) {
            Helpers.viewportmeta.content = Helpers.viewportmeta.content
                .replace(/\bwidth\s*=\s*320\b/, 'width=320.1')
                .replace(/\bwidth\s*=\s*device-width\b/, '');
        }
    }
};

Helpers.popupCenter = function popupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }

    return newWindow;
}

Helpers.getXsrfToken = function () {
    var xsrfToken = null;
    try {
        xsrfToken = decodeURIComponent(document.cookie.match(/XSRF-TOKEN=([^ ;]+)/)[1]);
    } catch (e) {
        console.warn("xsrfToken missing", xsrfToken);
    }

    return xsrfToken;
}