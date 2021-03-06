"use strict";
define("src/model/upload/main11-debug", ["alinw/upload/2.1.2/upload-debug", "model/modal/main-debug", "common/myWidget-debug", "common/jquery-debug"], function(require, exports, module) {
    function fixResponseFileName(nodeMap, name) {
        var rtv;
        return name = name.split(".")[0], MyWidget.breakEachObj(nodeMap, function(val, key) {
            if (key.indexOf(name) !== -1) return rtv = key, !0
        }), rtv
    }
    var nwUpload = require("alinw/upload/2.1.2/upload-debug"),
        Modal = require("model/modal/main-debug"),
        MyWidget = require("common/myWidget-debug"),
        $ = require("common/jquery-debug"),
        handlerbars = MyWidget.handlerbars,
        documentMode = document.documentMode,
        TEMPLATE_WAITE = handlerbars.compile(['<span class="file-list fn-VATop">', "上传中...", "</span>"].join("")),
        TEMPLATE_ONE = handlerbars.compile(['<span class="file-list JS-target-item fn-VATop" data-id="{{id}}">', '<input type="checkbox" checked="checked" name="UploadFileInput" value="{{id}}" style="display:none;"/><a class="file-list-text fn-btn-link" href="{{url}}" target="_blank">{{name}}</a> <span class="fn-CuPo kuma-icon kuma-icon-close JS-trigger-click-remove" aria-hidden="true"></span>', "</span>"].join("")),
        TEMPLATE_LIST = handlerbars.compile(["{{#each this}}", TEMPLATE_ONE.source, "{{/each}}"].join("")),
        Upload = MyWidget.extend({
            clssName: "Upload",
            attrs: {
                trigger: null,
                name: "uploadFile",
                inputName: "list",
                fileRewrite: null,
                action: "/fileOperation/upload.json",
                deleteFile: "/fileOperation/deleteFile.json",
                rule: "(\\.jpg|\\.jpeg|\\.png|\\.bmp|\\.msg|\\.pdf|\\.doc|\\.docx|\\.rar|\\.zip|\\.xls|\\.xlsx|\\.txt|\\.mp3|\\.wav|\\.cda)$",
                list: [],
                size: 10
            },
            events: {
                "click .JS-trigger-click-remove": function(e) {
                    var me = this,
                        target = me.closest(e.target, ".JS-target-item"),
                        oldHtml = target.html();
                    target.html("删除中..."), me.http(me.get("deleteFile"), {
                        fileIdStr: target.data("id")
                    }, function(err, rtv, mes, con) {
                        err ? (me.log(err), Modal.alert(0, err), target.html(oldHtml)) : (target.remove(), me.uploadToggle().uploadParseData())
                    })
                }
            },
            initProps: function() {
                var nodeMap, me = this,
                    triggerNode = me.triggerNode,
                    fileRewrite = me.jQuery(me.get("fileRewrite"));
                me.set("trigger", triggerNode), me.set("parentNode", fileRewrite.length ? fileRewrite : triggerNode.parent()), nodeMap = me.nodeMap = {}, me.inputName = triggerNode.parent().find('[name="' + me.get("inputName") + '"]'), me.nwUpload = me.initUpload()
            },
            initUpload: function() {
                var me = this,
                    nodeMap = me.nodeMap;
                return new nwUpload({
                    trigger: me.triggerNode,
                    name: me.get("name"),
                    action: me.get("action"),
                    accept: me.get("accept"),
                    change: function(e) {
                        var name = e[0].name,
                            rule = new RegExp(me.get("rule"), "i");
                        if (me.log("log", "验证格式:", rule, "文件名称:", name, "验证结果:", rule.test(name)), !rule.test(name)) return me.resetUpload(), Modal.alert(0, me.get("ruleErrMsg") || "上传格式不正确");
                        var node = me.tempNode = nodeMap[name] = $(TEMPLATE_WAITE());
                        me.tempName = name, me.element.append(node), this.submit()
                    },
                    success: function(response) {
                        var content;
                        if (response)
                            if (response = JSON.parse(response), content = response.content, !response.hasError && content.isSuccess) {
                                response = content.retValue;
                                var node, fileName = response.fileName;
                                (node = nodeMap[fileName]) || (fileName = fixResponseFileName(nodeMap, fileName), node = nodeMap[fileName]), node.replaceWith(TEMPLATE_ONE({
                                    id: response.securityId,
                                    name: response.fileName,
                                    url: response.url
                                })), delete nodeMap[fileName], me.trigger("success", response), documentMode && documentMode <= 9 && me.resetUpload(), me.uploadToggle().uploadParseData()
                            } else Modal.alert(0, response.content.message), me.tempNode.remove(), delete nodeMap[me.tempName];
                        else me.log("上传失败。"), me.tempNode.remove(), delete nodeMap[me.tempName]
                    }
                })
            },
            resetUpload: function() {
                var me = this;
                return clearInterval(me.nwUpload.get("runner")), me.nwUpload.destroy(), me.nwUpload = me.initUpload(), me
            },
            setup: function() {
                var me = this;
                me.render(), me.uploadRenderList()
            },
            destroy: function() {
                var me = this;
                clearInterval(me.nwUpload.get("runner")), me.nwUpload.destroy(), Upload.superclass.destroy.call(me)
            },
            uploadRenderList: function() {
                var me = this,
                    list = [].concat(me.get("list"));
                return me.element.append(TEMPLATE_LIST(list)), me.uploadToggle(), me
            },
            uploadRenderClear: function() {
                var me = this,
                    inputName = me.inputName;
                return me.element.empty(), inputName.val(""), me.uploadToggle(), me
            },
            uploadToggle: function() {
                var me = this,
                    nwUpload = me.nwUpload,
                    size = me.get("size");
                return me.$(".JS-target-item").length >= size ? nwUpload.get("form").hide() : nwUpload.get("form").show(), me
            },
            uploadParseData: function() {
                var me = this,
                    inputName = me.inputName;
                return inputName.val(me.serialize(me.element).UploadFileInput), inputName.trigger("blur"), me
            },
            Statics: {
                use: function(query, config) {
                    var me = this,
                        list = [];
                    return $(query).each(function() {
                        $(this);
                        list.push(new me($.extend({
                            trigger: this
                        }, config)))
                    }), list
                },
                remove: function(query) {
                    $(query).each(function() {
                        var self = $(this);
                        self.data("myWidget").destroy()
                    })
                }
            }
        });
    return Upload
});
"use strict";
define("common/jquery-debug", [], function(require, exports) {
    return jQuery
});