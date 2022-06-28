const Form = require('../pageobjects/form.page');

class SuperAdmin {
  get saveBtn() {
    return $('.super-admins_buttonContainer__2-O00 > button:nth-child(2)');
  }

  async newSuperAdmin(name, surname, email, password) {
    await Form.newItem(name, surname, email, password);
    await this.saveBtn.click();
  }
}

module.exports = new SuperAdmin();