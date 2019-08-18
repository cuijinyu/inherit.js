"use strict";
exports.__esModule = true;
var util = require('util');
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
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            protoObj.apply(this, args);
            originObj.apply(this, args);
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
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            protoObj.apply(this, args);
            originObj.apply(this, args);
        };
        wrap.prototype = new protoObj();
        wrap.prototype.constructor = originObj;
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
        protoTempObj.prototype.constructor = protoTempObj;
        var wrap = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            protoObj.apply(this, args);
            originObj.apply(this, args);
        };
        wrap.prototype = new protoTempObj();
        wrap.prototype.constructor = wrap;
        return wrap;
    },
    /**
     * 支持多重继承的寄生组合式继承
     * @param originObj
     * @param inheritObj
     */
    inherit: function (originObj) {
        var inheritObj = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            inheritObj[_i - 1] = arguments[_i];
        }
        var tempObj = originObj;
        inheritObj.forEach(function (element) {
            tempObj = Inherit.composeParaInherit(tempObj, element);
        });
        return tempObj;
    }
};
// 兼容Commonjs
module.exports = Inherit;
// 兼容ES6 Module
exports["default"] = Inherit;
