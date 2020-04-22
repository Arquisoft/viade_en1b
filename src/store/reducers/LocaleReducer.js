const localeReducer = (state = { locale: "en" }, action = {}) => {
  switch (action.type) {
    case "CHANGE_LOCALE_LANGUAGE_SUCCESS":
      return { ...state, locale: action.locale };
    default:
      return state;
  }
};

export default localeReducer;
