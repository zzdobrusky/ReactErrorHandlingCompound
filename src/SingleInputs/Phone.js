import React from "react";
import PropTypes from "prop-types";

import { FormContext } from "../FormHandler";

import { TextField } from "@material-ui/core";

const numericOnlyRegex = /^[0-9]*$/;

export default class FullName extends React.Component {
  static contextType = FormContext;

  static propTypes = {
    inputName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    disabled: PropTypes.bool
  };

  onChange(value) {
    const { inputName } = this.props;
    const { onChange, onError } = this.context;

    // do internal validation first
    let error = "";
    if (!numericOnlyRegex.test(value)) {
      error = "Enter only numbers";
    } else if (value.length !== 10) {
      error = "Phone must be 10 digits";
    }

    onError(inputName, error); // this will reset any previous error
    onChange(inputName, value); // always send to parent even if its an error
  }

  componentDidMount() {
    // TODO: after component is mounted register with shared context here
    const { inputName, required } = this.props;
    const { addInput } = this.context;
    addInput(inputName, required);
  }
  render() {
    const { required, disabled, inputName, label } = this.props;
    const { formInputs, formErrors } = this.context;
    const customLabel = `${label}${required ? " *" : ""}`;

    return (
      <TextField
        id={inputName}
        error={Boolean(formErrors[inputName])}
        label={customLabel}
        value={formInputs[inputName] || ""}
        helperText={formErrors[inputName]}
        margin="normal"
        onChange={(e) => this.onChange(e.target.value)}
        disabled={disabled}
      />
    );
  }
}
