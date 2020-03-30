import {
    render,
    queryByTestId
  } from "@testing-library/react";
  import '@testing-library/jest-dom'
  import { removeEmpty, allDatesToISOString } from "../utils.js";
  import React from "react";
  
  let dictionary = null;
  let dictionaryISO = null;
  let dictionaryWithEmpties = null;

  beforeEach(() => {
    dictionary = {
        date1: new Date("2020-11-03T00:00:00Z"),
        date2: new Date("1998-12-07T23:00:00Z"),
        notADate: "It was me Dio, all alone",
        anotherDictionary: {
            date3: new Date("1969-08-16T23:00:00Z")
        }
    }
    dictionaryISO = {
        date1: "2020-11-03T00:00:00Z",
        date2: "1998-12-07T23:00:00Z",
        date3: "1969-08-16T23:00:00Z"
    }
    dictionaryWithEmpties = {
        empty1: null,
        empty2: null,
        notEmpty: "My name is Jeff",
        anotherDictionary: {
            empty11: null,
            notEmpty12: "Morty, Im a pickle"
        }
    }
  });
  
  describe("Utils function", () => {
    test("Check allDatesToISOStrings converter", () => {
        allDatesToISOString(dictionary);
        expect(dictionaryISO.date1).toEqual(dictionary.date1);
        expect(dictionaryISO.date2).toEqual(dictionary.date2);
        expect(dictionaryISO.date3).toEqual(dictionary.anotherDictionary.date3);
    });
    test("Check removeEmpty", () => {
        expect(4).toEqual(Object.keys(dictionaryWithEmpties).length);
        removeEmpty(dictionaryWithEmpties);
        expect(2).toEqual(Object.keys(dictionaryWithEmpties).length);
        expect(1).toEqual(Object.keys(dictionaryWithEmpties.anotherDictionary).length);

    });
  });





  
