import "@testing-library/jest-dom";
import {text} from "../../mockRoute"
import GPX from '../gpx'


describe("gpx", () => {

    const parsed = GPX.parse(text);

    test("parsing", () => {
        expect(parsed.metadata.name).toEqual("Picos de Europa");
        expect(parsed.wpt).toHaveLength(1);
        expect(parsed.trk).toHaveLength(1);
    });

});