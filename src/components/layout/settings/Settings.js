import React from "react";
import "./Settings.css";
import {
  DropdownButton,
  Dropdown,
  ToggleButton,
  ButtonGroup,
} from "react-bootstrap";
import { connect } from "react-redux";
import changeLocale from "../../../store/actions/localeAction";
import { FormattedMessage } from "react-intl";

export function Settings(props) {
  const { changeTheme } = props;

  return (
    <div className="GeneralComponent">
      <h2 data-testid="settings-title">
        {" "}
        <FormattedMessage id="SettingsTitle" />{" "}
      </h2>
      <h1 data-testid="settings-themes">
        {" "}
        <FormattedMessage id="Themes" />
      </h1>
      <ButtonGroup toggle>
        <ToggleButton
          data-testid="settings-theme-normal"
          type="radio"
          name="radio"
          defaultChecked
          value="Normal"
          onClick={() => changeTheme("normal")}
        >
          <FormattedMessage id="Normal" />
        </ToggleButton>
        <ToggleButton
          data-testid="settings-theme-dark"
          type="radio"
          name="radio"
          value="Dark"
          onClick={() => changeTheme("dark")}
        >
          <FormattedMessage id="Dark" />
        </ToggleButton>
        <ToggleButton
          data-testid="settings-theme-blind"
          type="radio"
          name="radio"
          value="Colorblind"
          onClick={() => changeTheme("blind")}
        >
          <FormattedMessage id="ColorBlind" />
        </ToggleButton>
      </ButtonGroup>
      <h1 data-testid="settings-language">
        {" "}
        <FormattedMessage id="Language" />{" "}
      </h1>
      <DropdownButton
        data-testid="settings-language-dropdown"
        id="dropdown-basic-button"
        title={<FormattedMessage id="LanguageAvailable" />}
      >
        <Dropdown.Item
          data-testid="settings-language-english"
          onClick={() => props.changeLanguage("en")}
          href="#"
        >
          {" "}
          <FormattedMessage id="English" />
        </Dropdown.Item>
        <Dropdown.Item
          data-testid="settings-language-spanish"
          onClick={() => props.changeLanguage("es")}
          href="#"
        >
          {" "}
          <FormattedMessage id="Spanish" />{" "}
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (locale) => dispatch(changeLocale(locale)),
  };
};
export default connect(null, mapDispatchToProps)(Settings);
