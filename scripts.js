
document.getElementById('generate-array').addEventListener('click', generateArray);
document.getElementById('start-sorting').addEventListener('click', startSorting);

let array = [];
let arraySize = 50;
let sortingSpeed = 50;
let arrayContainer = document.getElementById('array-container');

function generateArray() {
    arrayContainer.innerHTML = '';
    array = [];
    arraySize = document.getElementById('array-size').value || 50;
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 400) + 1);
    }
    displayArray();
}

function displayArray() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value}px`;
        arrayContainer.appendChild(bar);
    });
}

function startSorting() {
    const algorithm = document.getElementById('algorithm').value;
    if (algorithm === 'bubble') {
        bubbleSort(array);
    } else if (algorithm === 'quick') {
        quickSort(array, 0, array.length - 1);
    } else if (algorithm === 'merge') {
        mergeSort(array, 0, array.length - 1);
    } else if (algorithm === 'selection') {
        selectionSort(array);
    } else if (algorithm === 'insertion') {
        insertionSort(array);
    }
}

async function bubbleSort(arr) {
    let bars = document.getElementsByClassName('bar');
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                bars[j].style.height = `${arr[j]}px`;
                bars[j + 1].style.height = `${arr[j + 1]}px`;
                await new Promise(resolve => setTimeout(resolve, sortingSpeed));
            }
        }
    }
}

async function quickSort(arr, low, high) {
    if (low < high) {
        let pi = await partition(arr, low, high);
        await Promise.all([
            quickSort(arr, low, pi - 1),
            quickSort(arr, pi + 1, high)
        ]);
    }
}

async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    let bars = document.getElementsByClassName('bar');
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            bars[i].style.height = `${arr[i]}px`;
            bars[j].style.height = `${arr[j]}px`;
            await new Promise(resolve => setTimeout(resolve, sortingSpeed));
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    bars[i + 1].style.height = `${arr[i + 1]}px`;
    bars[high].style.height = `${arr[high]}px`;
    await new Promise(resolve => setTimeout(resolve, sortingSpeed));
    return i + 1;
}

async function mergeSort(arr, l, r) {
    if (l < r) {
        const m = Math.floor((l + r) / 2);
        await Promise.all([
            mergeSort(arr, l, m),
            mergeSort(arr, m + 1, r)
        ]);
        await merge(arr, l, m, r);
    }
}

async function merge(arr, l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;
    const L = new Array(n1);
    const R = new Array(n2);
    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    let i = 0, j = 0, k = l;
    let bars = document.getElementsByClassName('bar');
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        bars[k].style.height = `${arr[k]}px`;
        await new Promise(resolve => setTimeout(resolve, sortingSpeed));
        k++;
    }
    while (i < n1) {
        arr[k] = L[i];
        bars[k].style.height = `${arr[k]}px`;
        await new Promise(resolve => setTimeout(resolve, sortingSpeed));
        i++;
        k++;
    }
    while (j < n2) {
        arr[k] = R[j];
        bars[k].style.height = `${arr[k]}px`;
        await new Promise(resolve => setTimeout(resolve, sortingSpeed));
        j++;
        k++;
    }
}

async function selectionSort(arr) {
    let bars = document.getElementsByClassName('bar');
    for (let i = 0; i < arr.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            bars[i].style.height = `${arr[i]}px`;
            bars[minIdx].style.height = `${arr[minIdx]}px`;
            await new Promise(resolve => setTimeout(resolve, sortingSpeed));
        }
    }
}

async function insertionSort(arr) {
    let bars = document.getElementsByClassName('bar');
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            bars[j + 1].style.height = `${arr[j + 1]}px`;
            await new Promise(resolve => setTimeout(resolve, sortingSpeed));
            j--;
        }
        arr[j + 1] = key;
        bars[j + 1].style.height = `${arr[j + 1]}px`;
        await new Promise(resolve => setTimeout(resolve, sortingSpeed));
    }
}
