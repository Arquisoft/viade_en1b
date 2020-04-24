import React from "react";
import "./Settings.css";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import changeLocale from "../../../store/actions/localeAction";
import { FormattedMessage } from "react-intl";

export function Settings(props) {
  return (
    <div className="GeneralComponent">
      <h2 data-testid="settings-title">
        {" "}
        <FormattedMessage id="SettingsTitle" />{" "}
      </h2>

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
      <h2>
        <FormattedMessage id="Technical" />
      </h2>
      <p>
        <FormattedMessage id="TechnicalDescription" />{" "}
        <a
          href="https://arquisoft.github.io/viade_en1b/docs/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FormattedMessage id="ThisPage" />
        </a>{" "}
      </p>
      <h2>
        {" "}
        <FormattedMessage id="HowToUse" />
      </h2>
      <p>
        <FormattedMessage id="HowToUseDescription" /> <br></br>
        <a
          href="https://lamasumas.github.io/Solid/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FormattedMessage id="Here" />
        </a>{" "}
      </p>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (locale) => dispatch(changeLocale(locale)),
  };
};
export default connect(null, mapDispatchToProps)(Settings);
