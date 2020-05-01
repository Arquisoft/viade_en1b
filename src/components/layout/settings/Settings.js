import React, { useReducer } from "react";
import style from "./Settings.module.css";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import changeLocale from "../../../store/actions/localeAction";
import { FormattedMessage } from "react-intl";

export function Settings(props) {
  const { changeLanguage, locale } = props;

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
  };
  return (
    <div className={style.settings}>
      <h2 className={style.settingsTitle} data-testid="settings-title">
        <FormattedMessage id="SettingsTitle" />
      </h2>

      <div className={style.language}>
        <h2 data-testid="settings-language">
          <FormattedMessage id="Language" />
        </h2>
        <DropdownButton
          data-testid="settings-language-dropdown"
          id="dropdown-basic-button"
          title={<FormattedMessage id={locale.id} />}
        >
          <Dropdown.Item
            data-testid="settings-language-english"
            onClick={() => {
              handleLanguageChange({
                id: "English",
                text: "English",
                locale: "en",
              });
            }}
            href="#"
          >
            <FormattedMessage id="English" />
          </Dropdown.Item>
          <Dropdown.Item
            data-testid="settings-language-spanish"
            onClick={() => {
              handleLanguageChange({
                id: "Spanish",
                text: "Spanish",
                locale: "es",
              });
            }}
            href="#"
          >
            <FormattedMessage id="Spanish" />
          </Dropdown.Item>
        </DropdownButton>
      </div>
      <div className={style.technicalInfo}>
        <h2>
          <FormattedMessage id="Technical" />
        </h2>
        <p>
          <FormattedMessage id="TechnicalDescription" />
          <a
            href="https://arquisoft.github.io/viade_en1b/docs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FormattedMessage id="ThisPage" />
          </a>
        </p>
      </div>
      <div className={style.howToUse}>
        <h2>
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
          </a>
        </p>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    locale: state.localeReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (locale) => dispatch(changeLocale(locale)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Settings));
