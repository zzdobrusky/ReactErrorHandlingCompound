import React from "react";

import { Button } from "@material-ui/core";

import FormHandler from "./FormHandler";
import FullName from "./SingleInputs/FullName";
import Phone from "./SingleInputs/Phone";

// fake api
import { callApi } from "./fakeApi";

export default class App extends React.Component {
  state = {
    apiMessage: "Did not run yet"
  };

  onSubmitHandle = (formInputs) => {
    console.log("onSubmitHandle() formInputs: ", formInputs);
    callApi(formInputs)
      .then((response) => this.setState({ apiMessage: response }))
      .catch((apiErrors) => {
        // TODO: this.mapApiErrorsToFormErrors(apiErrors); // might not be needed if matched
        this.setState({ apiMessage: JSON.stringify(apiErrors) });
      });
  };

  render() {
    const { apiMessage } = this.state;

    return (
      <>
        <FormHandler onSubmit={this.onSubmitHandle}>
          <div>
            <FullName inputName="fullName" label="Full Name" required />
          </div>
          <div>
            <Phone inputName="domesticPhone" label="Domestic Phone" required />
          </div>
          <div>
            <Phone inputName="internationalPhone" label="International Phone" />
          </div>
          <div>
            <Button disabled={false} type="submit" variant="contained">
              Submit
            </Button>
          </div>
        </FormHandler>
        <br />
        <div>Api call: {apiMessage}</div>
      </>
    );
  }
}
