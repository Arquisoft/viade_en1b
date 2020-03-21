import React from "react";
import "./Settings.css";
import { DropdownButton, Dropdown,  ToggleButton, ButtonGroup } from "react-bootstrap";

export default function Settings(props) {

    return(
        <div className="GeneralComponent">

            <h2> Settings </h2>
            <h1> Themes</h1>
            <ButtonGroup toggle  >
                <ToggleButton type="radio" name="radio" defaultChecked value="Normal">
                    Normal
                    </ToggleButton>
                <ToggleButton type="radio" name="radio" value="Dark">
                    Dark
                </ToggleButton>
                <ToggleButton type="radio" name="radio" value="Colorblind">
                    Blind
                </ToggleButton>

            </ButtonGroup>
            <h1> Language </h1>
            <DropdownButton
                id="dopdown-basic-button" title="Available Languages">
                <Dropdown.Item active href="#"> English</Dropdown.Item>
                <Dropdown.Item href="#"> Spanish </Dropdown.Item>
            </DropdownButton>
        </div>
    );

}
