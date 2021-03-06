const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.phone) {
    errors.phone = "Required";
  }
  if (!values.text) {
    errors.text = "Required";
  }
  if (!values.title) {
    errors.text = "Required";
  }
  if (!values.date) {
    errors.date = "Required";
  }
  return errors;
};

export default validate;
