const Form = require('../pageobjects/form.page');
const List = require('../pageobjects/list.page');

class Admin {
  get saveBtn() {
    return $('.admins_btnsContainer__15-dM > button:nth-child(2)');
  }
  get modalOkBtn() {
    return $('.Modal_buttonWrapper__2L1vP');
  }

  async newAdmin(name, surname, email, password) {
    await Form.newItem(name, surname, email, password);
    await this.saveBtn.click();
  }
  async deleteCancelFunction () {
    await List.deleteBtn.click();
    await expect(List.deleteModalQuestion).toBeDisplayed();
  await expect(List.deleteModalQuestion).toHaveTextContaining(
    'Are you sure you want to delete this admin?');
    await expect(List.deleteModalCancelBtn).toBeDisplayed();
    await List.deleteModalCancelBtn.click();
}
}

module.exports = new Admin();
