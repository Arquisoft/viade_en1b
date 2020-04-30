import {parseGPX} from "./parser";
import "@testing-library/jest-dom";
import {text} from './mockRoute'

describe("gpx parser", () => {

    test("nº points", () => {
        const parsed = parseGPX(text);
        expect(parsed).toHaveLength(2);
    });
});