export function randomIntFrom0(max) {
  return Math.floor(Math.random() * max);
}

export function randomInt(min, max) {
  return min + randomIntFrom0(max - min);
}

export function choice(arr) {
    return arr[randomIntFrom0(arr.length)]
}
