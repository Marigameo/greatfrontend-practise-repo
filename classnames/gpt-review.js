/**
 * Use of for...in Loop: While using a for...in loop to iterate over object properties is valid, it's generally recommended to use Object.keys() or Object.entries() to iterate over object properties. This ensures that only own enumerable properties are iterated over, avoiding potential issues with prototype properties.
 * String Concatenation: String concatenation using += within a loop can be inefficient, especially for large numbers of iterations. Consider using array methods like map() followed by join(' ') to build the string, which can be more efficient.
 */

let classNamesString = '';

const classNames = (...args) => {

    const getClassNamesFromObject = (obj) => {
        return Object.keys(obj).filter(key => obj[key]).join(' ');
    }

    args.forEach(arg => {
        if (arg !== null && arg !== undefined && arg !== false && arg !== '') { // I didn't like this anyhow :)
            switch (typeof arg) {
                case 'string':
                case 'number':
                    classNamesString += `${arg} `;
                    break;
                case 'object':
                    if (Array.isArray(arg)) {
                        arg.forEach(element => classNames(element));
                    } else {
                        classNamesString += getClassNamesFromObject(arg) + ' ';
                    }
                    break;
            }
        }
    })

    return classNamesString.trim();
}

console.log(classNames('foo', 'bar')); // 'foo bar'

console.log(classNames('foo', { bar: true })); // 'foo bar'
console.log(classNames({ 'foo-bar': true })); // 'foo-bar'
console.log(classNames({ 'foo-bar': false })); // ''
console.log(classNames({ foo: true }, { bar: true })); // 'foo bar'
console.log(classNames({ foo: true, bar: true })); // 'foo bar'
console.log(classNames({ foo: true, bar: false, qux: true })); // 'foo qux'
console.log(classNames('a', ['b', { c: true, d: false }])); // 'a b c'
console.log(classNames(
    'foo',
    {
        bar: true,
        duck: false,
    },
    'baz',
    { quux: true },
)); // 'foo bar baz quux'
console.log(classNames(null, false, 'bar', undefined, { baz: null }, '')); // 'bar'
