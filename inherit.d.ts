declare type InheritParam = <Sub = {}, Super = {}>(originObj: new (...args: any) => any, protoObj: new (...args: any) => any) => new (...args: any[]) => {} & Sub & Super;
declare type InheritType = {
    protoInherit: InheritParam;
    callInherit: InheritParam;
    composeInherit: InheritParam;
    composeParaInherit: InheritParam;
};
declare const Inherit: InheritType;
export default Inherit;
