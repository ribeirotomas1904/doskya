'use strict';

const fs = require('node:fs');

const fileContent = fs.readFileSync(`./example.dsk`, `utf-8`);
console.log(fileContent);
const tokens = tokenize(fileContent);
const ast = parse(tokens);

function tokenize(source) {
    let index = 0;
    const tokens = [];

    while (index < source.length) {
        if (source[index] === ' ' || source[index] === '\t' || source[index] === '\n') {
            index++;
            continue;
        }

        if (source[index] === '+') {
            index++;
            tokens.push({ tag: 'plus' });
            continue;
        }

        if (source[index] === '=') {
            index++;

            if (index < source.length && source[index] === '=') {
                index++;
                tokens.push({ tag: 'doubleEquals' });
            } else {
                tokens.push({ tag: 'equals' });
            }

            continue;
        }

        if (source[index] === '$') {
            index++;

            if (index < source.length && source[index] === '$') {
                index++;
                tokens.push({ tag: 'twoCharTokenExample' });
            } else {
                throw new Error('todo');
            }

            continue;
        }

        if (isDigit(source[index])) {
            const firstDigitIndex = index;
            index++;

            while (index < source.length && isDigit(source[index])) {
                index++;
            }

            const int = source.slice(firstDigitIndex, index);
            tokens.push({ tag: 'int', value: int });
            continue;
        }

        if (isLetter(source[index])) {
            const firstLetterIndex = index;
            index++;

            while (index < source.length && (isLetter(source[index]) || isDigit(source[index]))) {
                index++;
            }

            const ident = source.slice(firstLetterIndex, index);

            if (isKeyword(ident)) {
                tokens.push({ tag: 'keyword' });
            } else {
                tokens.push({ tag: 'ident', value: ident });
            }

            continue;
        }

        throw new Error('unknown character');
    }

    return tokens;
}

function parse(tokens) {

}

function typeCheck() {

}

function isDigit(char) {
    throw new Error('todo');
}

function isLetter(char) {
    throw new Error('todo');
}

function isLowercaseLetter(char) {
    throw new Error('todo');
}

function isUppercaseLetter(char) {
    throw new Error('todo');
}