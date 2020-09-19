import 'reflect-metadata';
declare function Required(target: Object, propKey: string | symbol, paramIndex: number): void;
declare function Validate(target: any, propName: string, descriptor: TypedPropertyDescriptor<Function>): void;
export { Required, Validate, };
