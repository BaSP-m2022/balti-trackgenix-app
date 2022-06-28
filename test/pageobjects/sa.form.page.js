class SuperAdminForm {
  get saTitle() {
      return $(' #root > div > div > section > h2');
  }
  get form() {
      return $('#root > div > div > section > form');
  }
  get nameInput() {
      return $('#root > div > div > section > form > div:nth-child(1) > input[type=text]');
  }
  get surnameInput() {
      return $('#root > div > div > section > form > div:nth-child(2) > input[type=text]');
  }
  get emailInput() {
      return $('#root > div > div > section > form > div:nth-child(3) > input[type=email]');
  }
  get passwordInput() {
      return $('#root > div > div > section > form > div:nth-child(4) > input[type=password]');
  }
  get statusCheckboxBtn() {
      return $('#root > div > div > section > form > div.Input_check__3GOia > input[type=checkbox]');
  }
  get backBtn() {
      return $('.Button_btn__3cUFC.Button_redBtn__z6CdP');
  }
  get saveBtn() {
      return $('.super-admins_buttonContainer__2-O00 > button:nth-child(2)');
  }
  get saCreatedModal() {
      return $('#root > div > div > section > div > div');
  }
  get modalOkBtn() {
      return $('.Modal_buttonWrapper__2L1vP > button');
  }

  async setName(name) {
      await this.nameInput.setValue(name);
  }
  async setSurname(surname) {
      await this.surnameInput.setValue(surname);
  }
  async setEmail(email) {
      await this.emailInput.setValue(email);
  }
  async setPassword(password) {
      await this.passwordInput.setValue(password);
  }
  async newSa (name, surname, email, password) {
      await this.setName(name);
      await this.setSurname(surname);
      await this.setEmail(email);
      await this.setPassword(password);
      await this.statusCheckboxBtn.click();
      await this.saveBtn.click();
  }
}

module.exports = new SuperAdminForm();