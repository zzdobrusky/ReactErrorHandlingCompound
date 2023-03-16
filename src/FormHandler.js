import React from "react";
import PropTypes from "prop-types";

const FormContext = React.createContext(null);
export { FormContext };

export default class FormHandler extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  state = {
    // all key names are the input names and correspond to the value ones
    formInputs: {},
    formErrors: {},
    requiers: {},

    validate: "did not validate requires" // for testing only
  };

  validateRequiers = () => {
    const { formInputs, formErrors, requiers } = this.state;
    const updatedFormErrors = { ...formErrors };
    // specific components' internal errors have a precedence
    Object.entries(formErrors).forEach(([key, value]) => {
      if (!value && requiers[key]) {
        if (formInputs[key].trim() === "") {
          updatedFormErrors[key] = "Name field should not be empty.";
        }
      }
    });

    this.setState({ formErrors: updatedFormErrors });

    return (
      Object.values(updatedFormErrors).filter((err) => err !== "").length === 0
    );
  };

  addInput = (inputName, required) => {
    // update state asynchronously
    this.setState(({ formInputs, formErrors, requiers }) => ({
      formInputs: { ...formInputs, [inputName]: "" },
      formErrors: { ...formErrors, [inputName]: "" },
      requiers: { ...requiers, [inputName]: required }
    }));
  };

  removeInput = (inputName) => {
    // update state asynchronously
    this.setState(({ formInputs, formErrors, requiers }) => {
      // delete object property
      delete formInputs[inputName];
      delete formErrors[inputName];
      delete requiers[inputName];
      return {
        formInputs,
        formErrors,
        requiers
      };
    });
  };

  onChange = (inputName, value) => {
    this.setState(({ formInputs }) => ({
      formInputs: { ...formInputs, [inputName]: value }
    }));
  };

  onError = (inputName, error) => {
    this.setState(({ formErrors }) => ({
      formErrors: { ...formErrors, [inputName]: error }
    }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    // validate requirements first
    const { formInputs } = this.state;
    if (this.validateRequiers()) {
      this.setState({ validate: "Successfully validated requires" }); // for testing only
      this.props.onSubmit(formInputs);
    }
  };

  // for now enter key is disabled and submit is done by clicking submit btn only
  render() {
    const { children } = this.props;
    const { formInputs, formErrors, validate } = this.state;
    console.log("formErrors: ", formErrors);
    return (
      <form onSubmit={(e) => this.onSubmit(e)}>
        <FormContext.Provider
          value={{
            formInputs,
            formErrors,
            onError: this.onError,
            addInput: this.addInput,
            onChange: this.onChange
          }}
        >
          {children}
        </FormContext.Provider>

        <br />
        <div>Inputs: {JSON.stringify(formInputs)}</div>
        <br />
        <div>Errors: {JSON.stringify(formErrors)}</div>
        <br />
        <div>validate: {validate}</div>
      </form>
    );
  }
}
