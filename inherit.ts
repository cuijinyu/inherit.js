type InheritParam = <Sub = {}, Super = {}>(originObj: new (...args: any) => any, protoObj: new (...args: any) => any) => new (...args) => {} & Sub & Super

type InheritType = {
  protoInherit: InheritParam,
  callInherit: InheritParam,
  composeInherit: InheritParam,
  composeParaInherit: InheritParam
}

declare var module;

const Inherit: InheritType = {
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
    let wrap = function () {
      protoObj.call(this);
      originObj.call(this);
    }
    return wrap as any;
  },

  /**
   * 组合继承
   * @param originObj 
   * @param protoObj 
   */
  composeInherit: function (originObj, protoObj) {
    let wrap = function () {
      protoObj.call(this);
      originObj.call(this);
    }
    wrap.prototype = new protoObj();
    wrap.constructor = wrap;
    return wrap as any;
  },

  /**
   * 寄生组合式继承
   * @param originObj 
   * @param protoObj 
   */
  composeParaInherit: function (originObj, protoObj) {
    let protoTempObj = function () {};
    protoTempObj.prototype = protoObj.prototype;
    let wrap = function () {
      protoObj.call(this);
      originObj.call(this);
    }
    protoTempObj.constructor = wrap;
    wrap.prototype = new protoTempObj();
    return wrap as any;
  }
}

// 兼容Common.js
module.exports = Inherit;

// 兼容ES6 Module
export default Inherit;