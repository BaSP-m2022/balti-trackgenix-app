class AdminsForm {
  get adminsForm() {
    return $('#root > div > div > section > form');
  }
  get firstNameInput() {
    return $('#root > div > div > section > form > div:nth-child(1) > input[type=text]');
  }
  get firstNameLabel() {
    return $('#root > div > div > section > form > div:nth-child(1) > label');
  }
  get firstNameErrorMsg() {
    return $('');
  }
  get lastNameInput() {
    return $('#root > div > div > section > form > div:nth-child(2) > input[type=text]');
  }
  get lastNameLabel() {
    return $('#root > div > div > section > form > div:nth-child(2) > label');
  }
  get lastNameErrorMsg() {
    return $('');
  }
  get emailInput() {
    return $('#root > div > div > section > form > div:nth-child(3) > input[type=email]');
  }
  get emailLabel() {
    return $('#root > div > div > section > form > div:nth-child(3) > label');
  }
  get emailErrorMsg() {
    return $('');
  }
  get passWordInput() {
    return $('#root > div > div > section > form > div:nth-child(4) > input');
  }
  get passwordLabel() {
    return $('#root > div > div > section > form > div:nth-child(4) > label');
  }
  get passwordErrorMsg() {
    return $('');
  }
  get isActiveInput() {
    return $('#root > div > div > section > form > div.Input_check__3GOia > input[type=checkbox]');
  }
  get isActivelabel() {
    return $('#root > div > div > section > form > div.Input_check__3GOia > label');
  }
  get backbtn() {
    return $(
      '#root > div > div > section > form > div.admins_btnsContainer__15-dM > button.Button_btn__3cUFC.Button_redBtn__z6CdP'
    );
  }
  get saveBtn() {
    return $(
      '#root > div > div > section > form > div.admins_btnsContainer__15-dM > button:nth-child(2)'
    );
  }

  async createAdmin(firstname, lastname, email, password) {
    await this.firstNameInput.setValue(firstname);
    await this.lastNameInput.setValue(lastname);
    await this.emailInput.setValue(email);
    await this.passWordInput.setValue(password);
    //await this.isActiveInput.setValue(true);
    await this.saveBtn.click();
  }

  // async nameValue() {
  //   await this.firstNameInput.getValue
  // }
}
module.exports = new AdminsForm();
