import {
  getRoute0,
  getRoute1,
  getRoute2,
  getRoute3,
  getRoute4
} from "./exampleRoutes";

describe("Example Routes", () => {

  test("Check example routes", async() => {
    const route0 = getRoute0();
    const route1 = getRoute1();
    const route2 = getRoute2();
    const route3 = getRoute3();
    const route4 = getRoute4();

    expect(route0.id).toBe(0);
    expect(route1.id).toBe(1);
    expect(route2.id).toBe(2);
    expect(route3.id).toBe(3);
    expect(route4.id).toBe(4);

    expect(route0.name).toEqual("Hiking Naranco");
    expect(route1.name).toEqual("Hiking Ruta de las Xanas");
    expect(route2.name).toEqual("Senda del Oso");
    expect(route3.name).toEqual(route0.name);
    expect(route4.name).toEqual(route2.name);
  });

});
