"use strict";
// Borrowed from tronWeb
// https://github.com/tronprotocol/tron-web/blob/master/src/utils/base58.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode58 = exports.encode58 = void 0;
const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const ALPHABET_MAP = {};
for (let i = 0; i < ALPHABET.length; i++) {
    ALPHABET_MAP[ALPHABET.charAt(i)] = i;
}
const BASE = 58;
function encode58(buffer) {
    if (buffer.length === 0) {
        return '';
    }
    let i;
    let j;
    const digits = [0];
    for (i = 0; i < buffer.length; i++) {
        for (j = 0; j < digits.length; j++) {
            digits[j] <<= 8;
        }
        digits[0] += buffer[i];
        let carry = 0;
        for (j = 0; j < digits.length; ++j) {
            digits[j] += carry;
            carry = (digits[j] / BASE) | 0;
            digits[j] %= BASE;
        }
        while (carry) {
            digits.push(carry % BASE);
            carry = (carry / BASE) | 0;
        }
    }
    for (i = 0; buffer[i] === 0 && i < buffer.length - 1; i++) {
        digits.push(0);
    }
    return digits
        .reverse()
        .map((digit) => ALPHABET[digit])
        .join('');
}
exports.encode58 = encode58;
function decode58(s) {
    if (s.length === 0) {
        return [];
    }
    let i;
    let j;
    const bytes = [0];
    for (i = 0; i < s.length; i++) {
        const c = s[i];
        if (!(c in ALPHABET_MAP)) {
            throw new Error('Non-base58 character');
        }
        for (j = 0; j < bytes.length; j++) {
            bytes[j] *= BASE;
        }
        bytes[0] += ALPHABET_MAP[c];
        let carry = 0;
        for (j = 0; j < bytes.length; ++j) {
            bytes[j] += carry;
            carry = bytes[j] >> 8;
            bytes[j] &= 0xff;
        }
        while (carry) {
            bytes.push(carry & 0xff);
            carry >>= 8;
        }
    }
    for (i = 0; s[i] === '1' && i < s.length - 1; i++) {
        bytes.push(0);
    }
    return bytes.reverse();
}
exports.decode58 = decode58;
//# sourceMappingURL=base58.js.map