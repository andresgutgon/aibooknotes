const exceptions = {
  E_MISSING_SECRET_KEY: {
    message: "The value for \"config.secretKey\" is undefined",
    status: 500,
    code: "E_MISSING_SECRET_KEY",
    help: [
      "Missing \"config.secretKey\" config in Drive",
      "You need to pass a secure secret key to make image signupUrls work"
    ]
  },
  E_INSECURE_SECRET_KEY: {
    message: "The value of \"app.appKey\" is not secure",
    status: 500,
    code: "E_INSECURE_SECRET_KEY",
    help: [
      "The length of the \"config.secretKey\" must be 16 characters long",
      "Yout can generate a key using \"openssl rand -base64 32\""
    ]
  }
}

export default exceptions
