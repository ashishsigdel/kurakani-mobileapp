class ApiResponse {
  constructor({
    status = 200,
    message = "Success",
    data = null,
    errors = null,
  }) {
    this.status = status;
    if (data) this.data = data;
    this.message = message;
    if (errors) this.errors = errors;
  }

  send(res) {
    return res.status(this.status).json(this);
  }
}

export default ApiResponse;
