import { getOwnRoutesNumber, getSharedRoutesNumber } from "../functions";
import "@testing-library/jest-dom"

describe("compute number of routes", () => {

    const routes = [{name: "AAAA", author:"themrcesi"},{name: "AAAA", author:"b"}];
    const userWebId = "https://themrcesi.inrupt.net/profile/card#me";

    test("own routes", () => {
        expect(getOwnRoutesNumber(routes, userWebId)).toBe(1);
    });

    test("share routes", () => {
        expect(getSharedRoutesNumber(routes, userWebId)).toBe(1);
    })

});