import * as Schema from './core/Schema'
import * as Types from './core/Schema.type'
import { Mutable, ReadonlyArray } from './utils.type'

function createMethods<R extends boolean>(required: R) {
  return {
    object<T extends Types.InputObject>(arg: T) {
      return new Schema.SchemaObject(arg, { isRequired: required })
    },

    or<const T extends ReadonlyArray<Types.InputOr>>(...args: T) {
      return new Schema.SchemaOr(args as Mutable<typeof args>, {
        isRequired: required,
      })
    },
    tuple<const T extends ReadonlyArray<Types.InputTuple>>(...args: T) {
      return new Schema.SchemaTuple(args as Mutable<typeof args>, {
        isRequired: required,
      })
    },
    array<const T extends ReadonlyArray<Types.InputArray>>(...args: T) {
      return new Schema.SchemaArray(args as Mutable<typeof args>, {
        isRequired: required,
      })
    },

    string<const T extends ReadonlyArray<Types.InputString>>(...args: T) {
      return new Schema.SchemaString(args as Mutable<typeof args>, {
        isRequired: required,
      })
    },
    number<const T extends ReadonlyArray<Types.InputNumber>>(...args: T) {
      return new Schema.SchemaNumber(args as Mutable<typeof args>, {
        isRequired: required,
      })
    },
    boolean<const T extends ReadonlyArray<Types.InputBoolean>>(...args: T) {
      return new Schema.SchemaBoolean(args as Mutable<typeof args>, {
        isRequired: required,
      })
    },
  }
}

const requiredMethods = createMethods(true)
const optionalMethods = createMethods(false)

export default {
  ...requiredMethods,
  o: optionalMethods,
  opt: optionalMethods,
  optional: optionalMethods,

  types: requiredMethods,
  optionalTypes: optionalMethods,
}
