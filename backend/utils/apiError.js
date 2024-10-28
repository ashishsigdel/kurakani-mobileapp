class ApiError extends Error {
  constructor({
    status = 500,
    message = "Something went wrong!",
    data = null,
    errors = null,
  }) {
    super(message);
    this.status = status;
    if (data) this.data = data;
    this.message = message;
    if (errors) this.errors = errors;
  }
}

export default ApiError;
