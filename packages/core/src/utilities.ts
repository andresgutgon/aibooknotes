import { isNil, isUndefined, omitBy } from 'lodash'

export function compact(obj: Record<string, unknown>) {
  return omitBy(omitBy(obj, isNil), isUndefined)
}
