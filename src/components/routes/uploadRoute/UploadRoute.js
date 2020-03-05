import React from "react";
import "./UploadRoute.css";
import { connect } from "react-redux";

class UploadRoute extends React.Component {

    constructor(props) {
        super();
        this.state = {
            form: {
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
            form: {
                ...this.state.form, [name]:
                {
                    ...this.state.form[name], value
                }
            }
        });
    }

    submitForm = () => {
        console.dir(this.state.form);
        document.getElementsByClassName("formToSubmit").reset();
    }
    render() {
        return (
            <div className="formToSubmit">
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
                        <input type="file" name="images" onChange={this.changeHandler} multiple/>
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
        )
    }
}

function mapStatetoProps(state){
    return {
        form: state.form
    };
}


export default connect(mapStatetoProps)(UploadRoute);
