import Person from "../person";

describe("person", () => {

    const mockPerson = {
        name: "a",
        emil: "a",
        link: {
            $: {href: ""},
            text: "",
            type: ""
        }
    };

    test("data", () => {
        const person = new Person(mockPerson);
        expect(person.name).toEqual(mockPerson.name);
        expect(person.email).toEqual(mockPerson.emil);
    });
});