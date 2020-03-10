import React from "react";
import "./UploadRoute.css";
import { connect } from "react-redux";
import { uploadRoute } from './../../../store/actions/RouteActions'

class UploadRoute extends React.Component {

    state = {
        name: '',
        description: '',
        file: '',
        images: [],
        videos: []
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }


    submitForm = (e) => {
        e.preventDefault()
        this.props.uploadRoute(this.state);
        //document.getElementsByClassName("formToSubmit").reset();
        //this.props.history.push('/');
    }

    render() {
        return (
            <div className="formToSubmit">
                <div className="route">
                    <form>
                        <div>
                            <label>
                                Name of the route:
                        </label>
                            <input type="text" id="name" onChange={this.changeHandler} />
                        </div>

                        <div>
                            <label>
                                Description of the route:
                        </label>
                            <input type="text" id="description" onChange={this.changeHandler} />
                        </div>
                        <div>
                            <label>
                                Select the route file
                        </label>
                            <input type="file" id="file" onChange={this.changeHandler} />
                        </div>

                        <div>
                            <label>
                                Upload images
                        </label>
                            <input type="file" id="images" onChange={this.changeHandler} multiple />
                        </div>
                        <div>
                            <label>
                                Upload videos
                        </label>
                            <input type="file" id="videos" onChange={this.changeHandler} multiple />
                        </div>
                        <div>
                            <button type="submit" onClick={this.submitForm}>
                                Submit
                </button>
                        </div>
                    </form>

                </div>
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
