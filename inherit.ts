type InheritParam = <Sub = {}, Super = {}>(originObj: new (...args: any) => any, protoObj: new (...args: any) => any) => new (...args) => {} & Sub & Super

type InheritType = {
  protoInherit: InheritParam,
  callInherit: InheritParam,
  composeInherit: InheritParam,
  composeParaInherit: InheritParam,
  inherit: (originObj: new (...args: any) => any, ...inheritObjs: any) => any
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
    let wrap = function (...args) {
      protoObj.apply(this, args);
      originObj.apply(this, args);
    }
    protoTempObj.constructor = wrap;
    wrap.prototype = new protoTempObj();
    return wrap as any;
  },

  /**
   * 支持多重继承的寄生组合式继承
   * @param originObj 
   * @param inheritObj 
   */
  inherit: function (originObj, ...inheritObj) {
    let tempObj;
    inheritObj.forEach(element => {
      tempObj = Inherit.composeParaInherit(originObj, element);
    });
    return tempObj as any;
  }
}

// 兼容Commonjs
module.exports = Inherit;

// 兼容ES6 Module
export default Inherit;