"use strict";
exports.__esModule = true;
var Inherit = {
    /**
     * 原型继承
     * @param originObj
     * @param protoObj
     */
    protoInherit: function (originObj, protoObj) {
        originObj.prototype = new protoObj();
        return originObj;
    },
    /**
     * 构造继承
     * @param originObj
     * @param protoObj
     */
    callInherit: function (originObj, protoObj) {
        var wrap = function () {
            protoObj.call(this);
            originObj.call(this);
        };
        return wrap;
    },
    /**
     * 组合继承
     * @param originObj
     * @param protoObj
     */
    composeInherit: function (originObj, protoObj) {
        var wrap = function () {
            protoObj.call(this);
            originObj.call(this);
        };
        wrap.prototype = new protoObj();
        wrap.constructor = wrap;
        return wrap;
    },
    /**
     * 寄生组合式继承
     * @param originObj
     * @param protoObj
     */
    composeParaInherit: function (originObj, protoObj) {
        var protoTempObj = function () { };
        protoTempObj.prototype = protoObj.prototype;
        var wrap = function () {
            protoObj.call(this);
            originObj.call(this);
        };
        protoTempObj.constructor = wrap;
        wrap.prototype = new protoTempObj();
        return wrap;
    }
};
module.exports = Inherit;
exports["default"] = Inherit;
