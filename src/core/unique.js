import uuidv1 from 'uuid/v1'

export const generateUniqueUrl = (base, extension) => {
  const filename = uuidv1() + '.' + extension
  return base + '?' + filename
}
