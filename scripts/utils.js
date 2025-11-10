export function make2DArray(rows, cols) {
    let arr = new Array(cols);

    for (let i = 0; i < cols; i++) {
        arr[i] = new Array(rows).fill(0);
    }

    console.log(arr);

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
}