class SignUp {
  get nameLabel() {
    return $('.auth_inputsContainer__2a_pl > div:nth-child(1) > label');
  }
  get surnameLabel() {
    return $('.auth_inputsContainer__2a_pl > div:nth-child(2) > label');
  }
  get emailLabel() {
    return $('.auth_inputsContainer__2a_pl > div:nth-child(3) > label');
  }
  get passwordLabel() {
    return $('.auth_inputsContainer__2a_pl > div:nth-child(4) > label');
  }
  get nameInput() {
    return $('.auth_inputsContainer__2a_pl > div:nth-child(1) > input[type=text]');
  }
  get surnameInput() {
    return $('.auth_inputsContainer__2a_pl > div:nth-child(2) > input[type=text]');
  }
  get emailInput() {
    return $('.auth_inputsContainer__2a_pl > div:nth-child(3) > input[type=email]');
  }
  get passwordInput() {
    return $('.auth_inputsContainer__2a_pl > div:nth-child(4) > input[type=password]');
  }
  get createAccountBtn() {
    return $('.auth_btnsContainer__26mUq > button:nth-child(1)');
  }
  get cancelBtn() {
    return $('.auth_btnsContainer__26mUq > button.Button_btn__3cUFC.Button_redBtn__z6CdP');
  }
  get subtitle(){
    return $('.auth_btnsContainer__26mUq > p');
  }
  get loginLink() {
    return $('.auth_btnsContainer__26mUq > p > a');
  }
}

module.exports = new SignUp();