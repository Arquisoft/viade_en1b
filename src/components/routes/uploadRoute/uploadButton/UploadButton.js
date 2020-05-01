import React, { useState, useRef, useEffect } from "react";
import { Form } from "react-bootstrap";
import { BsUpload } from "react-icons/bs";
import "./UploadButton.css";

const UploadButton = (props) => {

    const [state, setState] = useState({
        filename: "",
        numberOfFiles: 0
    });

    useEffect(() => {
        if (props.reset) { resetState(); }
    }, [props.reset]);

    const resetState = () => {
        setState({
            filename: "",
            numberOfFiles: 0
        });
    };
    const file = useRef()

    const checkFileIsGPX = (file) => {
        var parts = file.split(".");
        var ext = parts[parts.length - 1];
        switch (ext.toLowerCase()) {
            case "gpx":
                return true;
            default:
                return false;
        }
    };

    const handleSingleFileChanged = (e) => {
        props.onChange(e);
        if (file.current.files[0] !== undefined && checkFileIsGPX(file.current.files[0].name)) {
            let name = file.current.files[0].name;
            setState({ ...state, filename: name });
        }
        else {
            let name = "";
            setState({ ...state, filename: name });
        }

    };

    const handleMultipleFileChanged = (e) => {
        props.onChange(e);
        let number = file.current.files.length;
        setState({ ...state, numberOfFiles: number });
    };

    const uploadButton = (props.file)
        ?
        <Form.Group className={props.className}>
            <Form.Control ref={file} onChange={handleSingleFileChanged} id={props.id} type="file" accept=".gpx"></Form.Control>
            <Form.Label className="uploadLabel" htmlFor={props.id}>
                <p data-testid="upload-button-label">{state.filename !== "" ? state.filename : props.text}</p>
                <BsUpload></BsUpload>
            </Form.Label>
        </Form.Group>
        :
        (props.videos ?
            <Form.Group className={props.className}>
                <Form.Control multiple ref={file} onChange={handleMultipleFileChanged} id={props.id} type="file" accept="video/*"></Form.Control>
                <Form.Label className="uploadLabel" htmlFor={props.id}>
                    <p>{state.numberOfFiles !== 0 ? state.numberOfFiles + " files selected" : props.text}</p>
                    <BsUpload></BsUpload>
                </Form.Label>
            </Form.Group> :
            <Form.Group className={props.className}>
                <Form.Control multiple ref={file} onChange={handleMultipleFileChanged} id={props.id} type="file" accept="image/*"></Form.Control>
                <Form.Label className="uploadLabel" htmlFor={props.id}>
                    <p>{state.numberOfFiles !== 0 ? state.numberOfFiles + " files selected" : props.text}</p>
                    <BsUpload></BsUpload>
                </Form.Label>
            </Form.Group>
        )

    return (
        uploadButton
    );
};

export default UploadButton;