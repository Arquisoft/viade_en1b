import React from "react";
import "./UploadRoute.css";
import { connect } from "react-redux";
import { Form, Button } from 'react-bootstrap'
import { uploadRoute } from './../../../store/actions/RouteActions'
import { BsUpload } from 'react-icons/bs'
import UploadButton from '../uploadButton/UploadButton'

class UploadRoute extends React.Component {

    state = {
        name: '',
        description: '',
        file: '',
        images: [],
        videos: []
    }

    changeHandlerRoute = (e) => {
        console.log(e.target.name)
        
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    changeHandlerImages = e => {
        let docs = []
        Array.from(e.target.files).forEach(file => docs.push(file.name))
        this.setState({...this.state, images: docs})
    }


    changeHandlerVideos = e => {
        let docs = []
        Array.from(e.target.files).forEach(file => docs.push(file.name))
        this.setState({...this.state, videos: docs})
    }


    resetState() {
        return {
            name: '',
            description: '',
            file: '',
            images: [],
            videos: []
        }
    }


    submitForm = (e) => {
        e.preventDefault()
        this.props.uploadRoute(this.state);
        this.setState(this.resetState())
        alert("Your file has been submitted")
    }

    render() {
        return (
            <div className="uploadContainer">
                <Form>
                    <Form.Group controlId="routeName">
                        <Form.Label>Name of the route</Form.Label>
                        <Form.Control id='name' onChange={this.changeHandlerRoute} placeholder="Route name" value={this.state.name} type="text" />

                    </Form.Group>

                    <Form.Group controlId="routeDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control id="description" onChange={this.changeHandlerRoute} value={this.state.description} as="textarea" rows="4" placeholder="Description..." />
                    </Form.Group>

                    <div id="buttonHolder">

                    <UploadButton onChange={this.changeHandlerRoute} id="file" text="Choose a route"></UploadButton>

                    <UploadButton onChange={this.changeHandlerImages} id="images" multiple text="Pick some images" ></UploadButton>
                    
                    <UploadButton onChange={this.changeHandlerVideos} id="video" multiple text="Choose a video"></UploadButton>
                    
                    </div>
                    <Button id="uploadButton" onClick={this.submitForm} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadRoute: (route) => dispatch(uploadRoute(route))
    }
}


export default connect(null, mapDispatchToProps)(UploadRoute);
