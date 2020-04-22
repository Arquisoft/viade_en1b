import React from "react";
import "./Settings.css";
import { DropdownButton, Dropdown } from "react-bootstrap";

export default function Settings(props) {
  const { changeLanguage } = props;

  return (
    <div className="GeneralComponent">
      <h2 data-testid="settings-title"> Settings </h2>

      <h1 data-testid="settings-language"> Language </h1>
      <DropdownButton
        data-testid="settings-language-dropdown"
        id="dropdown-basic-button"
        title="Available Languages"
      >
        <Dropdown.Item
          data-testid="settings-language-english"
          onClick={() => changeLanguage("english")}
          active
          href="#"
        >
          {" "}
          English
        </Dropdown.Item>
        <Dropdown.Item
          data-testid="settings-language-spanish"
          onClick={() => changeLanguage("spanish")}
          href="#"
        >
          {" "}
          Spanish{" "}
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
}
