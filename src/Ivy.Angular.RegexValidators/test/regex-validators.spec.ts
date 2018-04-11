import 'jasmine';

import { RegexValidators } from '../src/Const/regex-validators.const';

describe('RegexValidators', () => {

    // Valid Tests
    it('url validator returns true for valid http url', () => {

        let valid = RegexValidators.url.test('http://www.google.com');

        expect(valid).toBeTruthy();
    });

    it('url validator returns true for valid https url', () => {

        let valid = RegexValidators.url.test('https://www.google.com');

        expect(valid).toBeTruthy();
    });

    it('url validator returns true for valid http url without www', () => {

        let valid = RegexValidators.url.test('http://google.com');

        expect(valid).toBeTruthy();
    });

    it('url validator returns true for valid https url without www', () => {

        let valid = RegexValidators.url.test('https://google.com');

        expect(valid).toBeTruthy();
    });

    it('url validator returns true for valid http url with pdf reference', () => {

        let valid = RegexValidators.url.test('http://www.google.com/test.pdf');

        expect(valid).toBeTruthy();
    });

    it('url validator returns true for valid https url with pdf reference', () => {

        let valid = RegexValidators.url.test('https://www.google.com/test.pdf');

        expect(valid).toBeTruthy();
    });

    it('url validator returns true for valid co url with https', () => {

        let valid = RegexValidators.url.test('https://www.google.co');

        expect(valid).toBeTruthy();
    });

    it('url validator returns true for valid co url with http', () => {

        let valid = RegexValidators.url.test('http://google.co');

        expect(valid).toBeTruthy();
    });

    it('url validator returns true for valid url without http(s)', () => {

        let valid = RegexValidators.url.test('www.google.com');

        expect(valid).toBeTruthy();
    });

    it('url validator returns true for valid co url without https', () => {

        let valid = RegexValidators.url.test('www.google.co');

        expect(valid).toBeTruthy();
    });

    it('url validator returns true for valid https url', () => {

        let valid = RegexValidators.url.test('www.t.co');

        expect(valid).toBeTruthy();
    });


    // Invalid Tests
    it('url validator returns false for url without extension', () => {

        let valid = RegexValidators.url.test('www.google');

        expect(valid).toBeFalsy();
    });

    it('url validator returns false for url with http and no extension', () => {

        let valid = RegexValidators.url.test('http://www.google');

        expect(valid).toBeFalsy();
    });

    it('url validator returns false for url with http, no extension, and no www', () => {

        let valid = RegexValidators.url.test('http://google');

        expect(valid).toBeFalsy();
    });

    it('url validator returns false for invalid url containing #', () => {

        let valid = RegexValidators.url.test('www.google#.com');

        expect(valid).toBeFalsy();
    });

    it('url validator returns false for invalid url with trailing -', () => {

        let valid = RegexValidators.url.test('www.google-.com');

        expect(valid).toBeFalsy();
    });

    it('url validator returns false for invalid url with preceeding -', () => {

        let valid = RegexValidators.url.test('www.-google.com');

        expect(valid).toBeFalsy();
    });

});