const util = require('util');
type InheritParam = <Sub = {}, Super = {}, Params = {}>(originObj: new (...args: any) => any, protoObj: new (...args: any) => any) => new (...args:any[]) => {} & Sub & Super
type MultiInheritParam = <Sub = {}, Super = {}, Params = []>(originObj: new (...args: any) => any, ...inheritObj: any[]) => any

type InheritType = {
  protoInherit: InheritParam,
  callInherit: InheritParam,
  composeInherit: InheritParam,
  composeParaInherit: InheritParam,
  inherit: MultiInheritParam
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
    let wrap = function (...args) {
      protoObj.apply(this, args);
      originObj.apply(this, args);
    }
    return wrap as any;
  },

  /**
   * 组合继承
   * @param originObj 
   * @param protoObj 
   */
  composeInherit: function (originObj, protoObj) {
    let wrap = function (...args) {
      protoObj.apply(this, args);
      originObj.apply(this, args);
    }
    wrap.prototype = new protoObj();
    wrap.prototype.constructor = originObj;
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
    protoTempObj.prototype.constructor = protoTempObj;
    let wrap = function (...args) {
      protoObj.apply(this, args);
      originObj.apply(this, args);
    }
    wrap.prototype = new protoTempObj();
    wrap.prototype.constructor = wrap;
    return wrap as any;
  },

  /**
   * 支持多重继承的寄生组合式继承
   * @param originObj 
   * @param inheritObj 
   */
  inherit: function (originObj, ...inheritObj) {
    let tempObj = originObj;
    inheritObj.forEach(element => {
      tempObj = Inherit.composeParaInherit(tempObj, element);
    });
    return tempObj as any;
  }
}

// 兼容Commonjs
module.exports = Inherit;

// 兼容ES6 Module
export default Inherit;
