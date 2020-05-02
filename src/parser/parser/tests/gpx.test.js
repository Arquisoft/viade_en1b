import "@testing-library/jest-dom";
import {text} from "../../test/mockRoute"
import GPX from '../gpx'


describe("gpx", () => {

  const parsed = GPX.parse(text);

  test("parsing", () => {
    expect(parsed.metadata.name).toEqual("Picos de Europa");
    expect(parsed.wpt).toHaveLength(1);
    expect(parsed.trk).toHaveLength(1);
  });

  const toStringText = parsed.toString();
  expect(/lat="43.17326" lon="-4.86853"/.test(toStringText)).toBeTruthy();
  expect(/lat="43.15408" lon="-4.80607"/.test(toStringText)).toBeTruthy();

  expect(GPX.parse("fakeGPX")).toBeUndefined();

});
