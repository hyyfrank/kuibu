const delay = (ms) => new Promise(resolve => { setTimeout(resolve, ms) })
const debounce = (fn, delay, immediate = false) => {
    let timer;
    return (...args) => {
        const callNow = immediate && !timer;
        clearTimeout(timer);
        if (callNow) {
            fn(...args);
        } else {
            timer = setTimeout(() => {
                fn(...args);
            }, delay);
        }
    };
}
const debounce_promise_last = (fn, delay) => {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        return new Promise((resolve) => {
            timer = setTimeout(
                () => resolve(fn(...args)),
                delay,
            );
            return fn(...args)
        });
    };
}

function debounce_promise_all(inner, ms = 0) {
    let timer = null;
    let resolves = [];

    return function (...args) {
        // Run the function after a certain amount of time
        clearTimeout(timer);
        timer = setTimeout(() => {
            // Get the result of the inner function, then apply it to the resolve function of
            // each promise that has been created since the last time the inner function was run
            let result = inner(...args);
            resolves.forEach(r => r(result));
            resolves = [];
        }, ms);

        return new Promise(r => resolves.push(r));
    };
}

var button = document.getElementById("debounce");



const fn = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['possible', 'things', 'that', 'were', 'found'])
        }, 750)
    })
}

button.addEventListener('click', debounce_promise_last(fn, 3000))

debounce_promise_last(fn, 3000)().then((res) => {
    console.log(res)
})
