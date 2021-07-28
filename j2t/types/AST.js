export function hasStandaloneName(ast) {
  return 'standaloneName' in ast && ast.standaloneName != null && ast.standaloneName !== ''
}

export function hasComment(ast){
  return 'comment' in ast && ast.comment != null && ast.comment !== ''
}

export const TAny  = {
  type: 'ANY'
}

export const T_ANY_ADDITIONAL_PROPERTIES = {
  keyName: '[k: string]',
  type: 'ANY'
}

export const TUnknown = {
  type: 'UNKNOWN'
}

export const T_UNKNOWN_ADDITIONAL_PROPERTIES  = {
  keyName: '[k: string]',
  type: 'UNKNOWN'
}