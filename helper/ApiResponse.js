/**
 * factory design pattern
 */
class ApiResonse {
  setSuccess(message) {
    this.status = true;
    this.message = message;
    this.data = null;
    return this;
  }
  setError(message) {
    this.status = false;
    this.message = message;
    this.data = null;
    return this;
  }
  setData(data = null) {
    this.data = data;
    return this;
  }
}

module.exports = new ApiResonse();
