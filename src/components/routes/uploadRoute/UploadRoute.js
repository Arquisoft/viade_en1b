import React from "react";
import "./UploadRoute.css";
import { connect } from "react-redux";
import { Form, Button } from 'react-bootstrap'
import { uploadRoute } from './../../../store/actions/RouteActions'
import UploadButton from './uploadButton/UploadButton'
import { LoggedIn, LoggedOut } from "@solid/react";
import { Redirect } from "react-router-dom";

class UploadRoute extends React.Component {

    state = {
        name: '',
        description: '',
        file: '',
        images: [],
        videos: [],
        reset: false
    }

    changeHandlerRoute = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    changeHandlerImages = e => {
        let docs = []
        Array.from(e.target.files).forEach(file => docs.push(file.name))
        this.setState({ ...this.state, images: docs })
    }


    changeHandlerVideos = e => {
        let docs = []
        Array.from(e.target.files).forEach(file => docs.push(file.name))
        this.setState({ ...this.state, videos: docs })
    }


    resetState() {
        return {
            name: '',
            description: '',
            file: '',
            images: [],
            videos: [],
            reset: false

        }
    }

    componentDidUpdate(){
        if(this.state.reset) this.setState(this.resetState())
    }


    submitForm = (e) => {
        e.preventDefault()
        this.props.uploadRoute(this.state);
        alert("Your file has been submitted")
        this.setState({...this.state, reset: true})
    }

    render() {
        return (
            <div className="uploadContainer">
                <LoggedIn>
                    <Form>
                        <div id="form-info">
                            <Form.Group htmlFor="routeName">
                                <Form.Label htmlFor="name">Name of the route</Form.Label>
                                <Form.Control id='name' onChange={this.changeHandlerRoute} placeholder="Route name" value={this.state.name} type="text" />

                            </Form.Group>

                            <Form.Group htmlFor="routeDescription">
                                <Form.Label htmlFor="description">Description</Form.Label>
                                <Form.Control id="description" onChange={this.changeHandlerRoute} value={this.state.description} as="textarea" rows="4" placeholder="Description..." />
                            </Form.Group>
                            <Button id="uploadButton" onClick={this.submitForm} variant="primary" type="submit">
                                Submit
                    </Button>

                        </div>

                        <div id="buttonHolder">

                            <UploadButton reset={this.state.reset} onChange={this.changeHandlerRoute} id="file" text="Choose a route"></UploadButton>

                            <UploadButton reset={this.state.reset} onChange={this.changeHandlerImages} id="images" text="Pick some images" multiple ></UploadButton>

                            <UploadButton reset={this.state.reset} onChange={this.changeHandlerVideos} id="videos" multiple text="Choose a video"></UploadButton>

                        </div>
                    </Form>
                </LoggedIn>
                <LoggedOut>
                    <Redirect to='/'></Redirect>
                </LoggedOut>
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
