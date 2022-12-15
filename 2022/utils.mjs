// TODO: zip vs zipLongest
export function zip(...arrays) {
  const length = Math.min(...arrays.map((a) => a.length));
  return Array.from({ length }, (_, i) => arrays.map((a) => a[i]));
}

export function sortNumbers(array) {
  return array.sort((a, b) => a - b);
}

export function range(start, end) {
  return Array.from({ length: end - start }, (_, i) => i + start);
}
