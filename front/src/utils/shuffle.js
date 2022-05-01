export const shuffle = (array) => {
  let arr = array;
  for (let index = arr.length - 1; index > 0; index--) {
    const randomPosition = Math.floor(Math.random() * (index + 1));
    const temporary = arr[index];
    arr[index] = arr[randomPosition];
    arr[randomPosition] = temporary;
  }
  return arr;
};
