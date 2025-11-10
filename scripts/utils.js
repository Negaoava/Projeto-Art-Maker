export function make2DArray(rows, cols) {
    let arr = new Array(cols);

    for (let i = 0; i < cols; i++) {
        arr[i] = new Array(rows).fill(0);
    }

<<<<<<< HEAD
    console.log(arr);

=======
>>>>>>> aa54893f431010f518f0046b373797d63c003788
    return arr;
}

export function reset2DArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = 0;
        }
    }
}

export function copy2DArray(source, target) {
    for (let i = 0; i < source.length; i++) {
        for (let j = 0; j < source[i].length; j++) {
            target[i][j] = source[i][j];
        }
    }
<<<<<<< HEAD
=======
}

export function map(value, start1, stop1, start2, stop2, withinBounds = false) {
  let newValue = ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  if (withinBounds) {
    if (stop2 > start2) {
      newValue = Math.min(Math.max(newValue, start2), stop2);
    } else {
      newValue = Math.min(Math.max(newValue, stop2), start2);
    }
  }
  return newValue;
>>>>>>> aa54893f431010f518f0046b373797d63c003788
}