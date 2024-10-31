const validate = (data, rules) => {
  for (const [field, validations] of Object.entries(rules)) {
    for (const validation of validations) {
      const { rule, message } = validation;

      // Check for required fields
      if (
        rule === "required" &&
        (!data[field] || data[field].toString().trim() === "")
      ) {
        return new Error(message);
      }

      // validation email format
      if (rule === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data[field])) {
        return new Error(message);
      }

      // validation password length
      if (rule === "minLength" && data[field].length < validation.length) {
        return new Error(message);
      }
    }
  }
  return null;
};

export default validate;
