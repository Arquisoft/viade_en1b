import React, { useState, useRef } from 'react'
import { Form } from 'react-bootstrap'
import { BsUpload } from 'react-icons/bs'


const UploadButton = (props) => {

    const [state, setState] = useState({
        filename: '',
        numberOfFiles: ''
    })
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
                                <Form.Label for={props.id}>
                                    <BsUpload></BsUpload>
                                    {state.filename !== '' ? state.filename : props.text}
                                </Form.Label>
                            </Form.Group>

                            : 
                            <Form.Group>
                                <Form.Control multiple ref={file} onChange={handleMultipleFileChanged} id={props.id} type="file"></Form.Control>
                                <Form.Label for={props.id}>
                                    <BsUpload></BsUpload>
                                    {state.numberOfFiles !== 0 ? state.numberOfFiles + ' files selected': props.text }
                                </Form.Label>
                            </Form.Group>

    return (
        uploadButton
    )
}

export default UploadButton