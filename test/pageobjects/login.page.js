class Login {
  get loginTitle() {
    return $('#root > div > div > section > h2');
  }
  get emailLabel() {
    return $('#root > div > div > section > form > div:nth-child(1) > label');
  }
  get passwordLabel() {
    return $('#root > div > div > section > form > div:nth-child(2) > label');
  }
  get emailInput() {
    return $('#root > div > div > section > form > div:nth-child(1) > input[type=email]');
  }
  get passwordInput() {
    return $('#root > div > div > section > form > div:nth-child(2) > input[type=password]');
  }
  get LoginBtn() {
    return $('.login_buttonContainer__1xUy1 > button:nth-child(2)');
  }
  get subtitle() {
    return $('#root > div > div > section > p');
  }
  get signupLink() {
    return $('#root > div > div > section > p > a');
  }
}

module.exports = new Login();