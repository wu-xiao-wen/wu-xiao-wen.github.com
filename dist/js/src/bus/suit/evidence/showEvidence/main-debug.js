"use strict";
define("src/bus/suit/evidence/showEvidence/main-debug", ["bus/global/main-debug", "common/jquery-debug"], function(require, exports, module) {
    require("bus/global/main-debug");
    var $ = require("common/jquery-debug"),
        JWIN = $(window),
        needPrint = $("#needPrint"),
        print = $("#print"),
        showEvidenceMenu = $("#showEvidenceMenu"),
        focus = showEvidenceMenu.find('[data-target="focus"]'),
        steps = $('[data-role="step"]');
    JWIN.on("scroll", function() {
        var top = window.scrollY || document.documentElement.scrollTop,
            index = 0;
        steps.each(function(i) {
            var self = $(this);
            self.offset().top - 30 < top && (index = i)
        }), focus.removeClass("ch-focus").eq(index).addClass("ch-focus")
    }), JWIN.trigger("scroll"), print.on("click", function() {
        function main() {
            $(tempDoc).find('[data-role="step"]').css("width", "100%"), $(tempDoc).find("#showEvidenceMenu").remove(), $(tempDoc).find("#print").remove(), $(tempDoc).find("#printBox").remove(), $(tempDoc).find("#logistics").css("height", "auto"), $(tempDoc).find("#logo").removeClass("fn-hide"), $(tempDoc).find("#Inscription").removeClass("fn-hide"), tempWin.print(), tempWin.close()
        }
        var tempWin = window.open(),
            tempDoc = tempWin.document;
        tempDoc.open("about:blank"), tempDoc.write('<!DOCTYPE html><html lang="en"><head>'), tempDoc.write('<link rel="stylesheet" type="text/css" href="' + window.CONFIG.assetsLink + '/assets/css/main.css" />'), tempDoc.write('<style type="text/css">body{font-size:18px;}.global-tab{font-size:20px;line-height:40px;margin-top:30px;}</style>'), tempDoc.write("</head><body>"), tempDoc.write(needPrint.html()), tempDoc.write("</body></html>"), tempDoc.close(), tempWin.onload = main, "complete" === tempDoc.readyState && main()
    })
});
"use strict";
define("common/jquery-debug", [], function(require, exports) {
    return jQuery
});