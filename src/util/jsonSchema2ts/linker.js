import { Parent } from './types/json_schema.js'
import {isPlainObject} from 'lodash'


/**
 * Traverses over the schema, giving each node a reference to its
 * parent node. We need this for downstream operations.
 */
export function link(schema, parent = null) {
  if (!Array.isArray(schema) && !isPlainObject(schema)) {
    return schema;
  }

  // Handle cycles
  if (schema.hasOwnProperty(Parent)) {
    return schema;
  }

  // Add a reference to this schema's parent
  Object.defineProperty(schema, Parent, {
    enumerable: false,
    value: parent,
    writable: false
  })

  // Arrays
  if (Array.isArray(schema)) {
    schema.forEach(child => link(child, schema))
  }

  // Objects
  for (const key in schema) {
    link(schema[key], schema)
  }

  return schema;
}
