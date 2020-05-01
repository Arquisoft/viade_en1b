const localeReducer = (
  state = { id: "English", text: "English", locale: "en" },
  action = {}
) => {
  switch (action.type) {
    case "CHANGE_LOCALE_LANGUAGE_SUCCESS":
      return {
        ...state,
        id: action.payload.id,
        text: action.payload.text,
        locale: action.payload.locale,
      };
    default:
      return state;
  }
};

export default localeReducer;
