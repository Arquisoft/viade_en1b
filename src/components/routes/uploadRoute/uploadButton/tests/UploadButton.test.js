import React from "react";
import { render, waitForElement ,fireEvent, queryByTestId } from "@testing-library/react";
import "@testing-library/jest-dom";
import UploadButton from "../UploadButton";

let uploadButton = null;
let rerenderFunc = () => {};
let input = null;
beforeEach(() => {
    const { container, rerender } = render(<UploadButton onChange={(e) => e} text={"No images selected"}></UploadButton>);
    uploadButton = container;
    input = container.querySelector("input");
    rerenderFunc = rerender;
    
});

describe("Everything is rendered correctly", () => {
    test("label is correctly displayed when there are no files selected for a single file button", () => {
        waitForElement(() => {
            expect(queryByTestId(uploadButton, "upload-button-label").textContent).toBe("No images selected");
        });
    });
    test("label is correctly displayed when there are no files selected for a multple file button", () => {
        rerenderFunc(<UploadButton multiple text="No files selected" onChange={(e) => e}></UploadButton>);
        waitForElement(() => {
            expect(queryByTestId(uploadButton, "upload-button-label").textContent).toBe("No files selected");
        });
    });
    
});

describe("Upload an element to a single file button", () => {
    test("label changes accordingly with the name of the file uploaded in single file button", () => {
        let filename = "test.png";
        let mockFile = new File(["test"], filename, {type: "image/png"});
        
        Object.defineProperty(input, "files", {
            value: [mockFile]
        });
        fireEvent.change(input);
        expect(queryByTestId(uploadButton, "upload-button-label").textContent).toBe(filename);
    });


    test("label changes accordingly with the name of the file uploaded in multiple file button", () => {
        let mockFile1 = new File(["test1"], "filename1.png", {type: "image/png"});
        let mockFile2 = new File(["test2"], "filename2.png", {type: "image/png"});
        let mockFile3 = new File(["test3"], "filename3.png", {type: "image/png"});
        
        let myRef = React.createRef();
        rerenderFunc(<UploadButton text="No images" ref={myRef} onChange={(e) => e} multiple></UploadButton>);
        waitForElement(() => {
            Object.defineProperty(input, "files", {
                value: [mockFile1, mockFile2, mockFile3]
            });
            fireEvent.change(input);
            expect(queryByTestId(uploadButton, "upload-button-label").textContent).toBe("3 files selected");
        });
    });
});

describe("State is resetet when the prop 'reset' is provided", () => {
    test("state resets for single file button", () => {
        rerenderFunc(<UploadButton onChange={(e) => e} text="No file selected" reset></UploadButton>);
        waitForElement(() => {
            expect(queryByTestId(uploadButton, "upload-button-label").textContent).toBe("No file selected");
        });
    });
    test("state resets for multiple file button", () => {

    });
});
