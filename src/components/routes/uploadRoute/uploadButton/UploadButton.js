import React, { useState, useRef, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { BsUpload } from 'react-icons/bs'
import './UploadButton.css'

const UploadButton = (props) => {

    const [state, setState] = useState({
        filename: '',
        numberOfFiles: 0
    })

    useEffect(() => {
        if(props.reset) resetState()
    }, [props.reset])

    const resetState = () => {
        setState({
            filename: '',
            numberOfFiles: 0
        })
    }
    const file = useRef()

    const handleSingleFileChanged = e => {
        props.onChange(e)
        let name = file.current.files[0].name
        setState({...state, filename: name})
    }

    const handleMultipleFileChanged = e => {
        props.onChange(e)
        let number = file.current.files.length
        setState({...state, numberOfFiles: number})
    }

    const uploadButton = !props.multiple
                            ? 
                            <Form.Group>
                                <Form.Control ref={file} onChange={handleSingleFileChanged} id={props.id} type="file"></Form.Control>
                                <Form.Label className="uploadLabel" htmlFor={props.id}>
                                    <p data-testid='upload-button-label'>{state.filename !== '' ? state.filename : props.text}</p>
                                    <BsUpload></BsUpload>
                                    
                                </Form.Label>
                            </Form.Group>

                            : 
                            <Form.Group>
                                <Form.Control multiple ref={file} onChange={handleMultipleFileChanged} id={props.id} type="file"></Form.Control>
                                <Form.Label className="uploadLabel" htmlFor={props.id}>
                                    <p>{state.numberOfFiles !== 0 ? state.numberOfFiles + ' files selected': props.text }</p>
                                    <BsUpload></BsUpload>
                                </Form.Label>
                            </Form.Group>

    return (
        uploadButton
    )
}

export default UploadButton