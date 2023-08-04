import { base } from './base'
import typeMethods from './typeMethods'
import { ObjectLike } from './Type-type'
import { TypeBoolean, TypeNumber, TypeString } from './Type'

export default function <T extends ObjectLike>(schema: T) {
  const stringSchema = {} as typeof schema
  for (let key in schema) {
    ;(stringSchema as any)[key] = schema[key].required
      ? typeMethods.string()
      : typeMethods.o.string()
  }

  const object = base(stringSchema)(process.env as any)
  const result: any = {}

  for (let key in object) {
    const schemaType = (schema as any)[key]
    const value = object[key]
    result[key] =
      schemaType instanceof TypeString
        ? String(value)
        : schemaType instanceof TypeNumber
        ? Number(value)
        : schemaType instanceof TypeBoolean
        ? Boolean(value)
        : null
  }

  return result as typeof object
}