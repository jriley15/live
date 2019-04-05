
export const formatErrors = (error) => {

    let errors = [];

    if (error.response) {
  
      switch (error.response.status) {
  
        case 400:
          errors = error.response.data.errors;
          break;
  
        case 500:
          errors.push({ key: "*", message: "Internal server error" });
          break;
  
        default:
          errors.push({ key: "*", message: "Error: " + error.response.status });
          break;
      }
  
    } else {
      errors.push({ key: "*", message: "No response from server" });
    }
  
    return errors;

}