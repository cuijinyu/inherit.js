declare type InheritParam = <Sub = {}, Super = {}, Params = {}>(originObj: new (...args: any) => any, protoObj: new (...args: any) => any) => new (...args: any[]) => {} & Sub & Super;
declare type MultiInheritParam = <Sub = {}, Super = {}, Params = []>(originObj: new (...args: any) => any, ...inheritObj: any[]) => any;
declare type InheritType = {
    protoInherit: InheritParam;
    callInherit: InheritParam;
    composeInherit: InheritParam;
    composeParaInherit: InheritParam;
    inherit: MultiInheritParam;
};
declare const Inherit: InheritType;
export default Inherit;
