class HttpCode {
  constructor(code, statusText) {
    this.code = code;
    this.statusText = statusText;
  }
}

module.exports = {
  200: new HttpCode(200, 'OK'),
  201: new HttpCode(201, 'Created'),
  400: new HttpCode(400, 'Bad Request'),
  401: new HttpCode(401, 'Unauthorized'),
  403: new HttpCode(403, 'Forbidden'),
  404: new HttpCode(404, 'Not Found'),
  409: new HttpCode(409, 'Conflict'),
  500: new HttpCode(500, 'Internal Server Error')
};
