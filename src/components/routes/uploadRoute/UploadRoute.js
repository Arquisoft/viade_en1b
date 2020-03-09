import React from "react";
import "./UploadRoute.css";
import { connect } from "react-redux";
import { uploadRoute } from './../../../store/actions/RouteActions'

class UploadRoute extends React.Component {

    constructor(props) {
        super();
        this.state = {
            route: {
                name_route: {
                    value: ''
                },
                description_route: {
                    value: ''
                },
                route_file: {
                    value: ''
                },
                images: {
                    value: []
                },
                videos: {
                    value: []
                },
            }
        }

    }

    changeHandler = e => {
        e.preventDefault();

        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            route: {
                ...this.state.route, [name]:
                {
                    ...this.state.route[name], value
                }
            }
        });
    }

    submitForm = () => {
        console.dir(this.state.route);
        this.props.uploadRoute(this.props.route.id);
        //document.getElementsByClassName("formToSubmit").reset();
        this.props.history.push('/');
    }
    render() {
        const route = this.props.route ? (
            <div className="route">
                <form>
                    <div>
                        <label>
                            Name of the route:
                        </label>
                        <input type="text" name="name_route" onChange={this.changeHandler} />
                    </div>

                    <div>
                        <label>
                            Description of the route:
                        </label>
                        <input type="text" name="description_route" onChange={this.changeHandler} />
                    </div>
                    <div>
                        <label>
                            Select the route file
                        </label>
                        <input type="file" name="route_file" onChange={this.changeHandler} />
                    </div>

                    <div>
                        <label>
                            Upload images
                        </label>
                        <input type="file" name="images" onChange={this.changeHandler} multiple />
                    </div>
                    <div>
                        <label>
                            Upload videos
                        </label>
                        <input type="file" name="videos" onChange={this.changeHandler} multiple />
                    </div>
                    <div>
                        <button type="submit" onClick={this.submitForm}>
                            Submit
                </button>
                    </div>
                </form>

            </div>
        ) : (
                <div className="center">Loading...</div>
            );
        return (
            <div className="formToSubmit">
                {route}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        route: state.route
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadRoute: (id) => dispatch(uploadRoute(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UploadRoute);
