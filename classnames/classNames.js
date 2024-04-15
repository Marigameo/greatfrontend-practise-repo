/**
 * classnames is a commonly-used utility in modern front end applications to conditionally join CSS class names together. 
 * If you've written React applications, you likely have used a similar library.
 * Implement the classnames function.
 * 
    classNames('foo', 'bar'); // 'foo bar'
    classNames('foo', { bar: true }); // 'foo bar'
    classNames({ 'foo-bar': true }); // 'foo-bar'
    classNames({ 'foo-bar': false }); // ''
    classNames({ foo: true }, { bar: true }); // 'foo bar'
    classNames({ foo: true, bar: true }); // 'foo bar'
    classNames({ foo: true, bar: false, qux: true }); // 'foo qux'
    classNames('a', ['b', { c: true, d: false }]); // 'a b c'
    classNames(
    'foo',
    {
        bar: true,
        duck: false,
    },
    'baz',
    { quux: true },
    ); // 'foo bar baz quux'
    classNames(null, false, 'bar', undefined, { baz: null }, ''); // 'bar'
 */
let classNamesString = '';

const classNames = (...args) => {

    const getClassNamesFromObject = (obj) => {
        let classnames = '';
        for (property in obj) {
            if (obj[property]) {
                classnames += `${property} `;
            }
        }
        return classnames;
    }

    args.forEach(arg => {
        if (!!arg) {
            switch (typeof arg) {
                case 'string': 
                case 'number':
                    classNamesString += `${arg} `;
                    break;
                case 'object':
                    if (Array.isArray(arg)) {
                        arg.forEach(element => classNames(element));
                        break;
                    }
                    classNamesString += getClassNamesFromObject(arg);
                    break;
            }
        }
    })
    return classNamesString;
}

// console.log(classNames('foo', { bar: true }, [2, { test: true }]));

// console.log(classNames('foo', 'bar')); // 'foo bar'

// console.log(classNames('foo', { bar: true })); // 'foo bar'
// console.log(classNames({ 'foo-bar': true })); // 'foo-bar'
// console.log(classNames({ 'foo-bar': false })); // ''
// console.log(classNames({ foo: true }, { bar: true })); // 'foo bar'
// console.log(classNames({ foo: true, bar: true })); // 'foo bar'
// console.log(classNames({ foo: true, bar: false, qux: true })); // 'foo qux'
