import {isPlainObject, memoize} from 'lodash';
export const Parent= Symbol('Parent');


export const getRootSchema = memoize(
  (schema) => {
    const parent = schema[Parent]
    if (!parent) {
      return schema
    }
    return getRootSchema(parent)
  }
);
export  function isPrimitive(schema){
  return !isPlainObject(schema)
}

export function isCompound(schema) {
  return Array.isArray(schema.type) || 'anyOf' in schema || 'oneOf' in schema
}
