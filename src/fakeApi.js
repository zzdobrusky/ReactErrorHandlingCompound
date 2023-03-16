// fake api
export const fakeApiErrors = [
  {
    Field: "input1",
    Message: "User already exists."
  }
];

export const callApi = (formInputs) =>
  new Promise((resolve, reject) => {
    // checks if a string has at least one white space
    if (formInputs.fullName.trim() === "John Doe") reject(fakeApiErrors);
    else resolve("api success");
  });
