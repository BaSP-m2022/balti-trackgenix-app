const Form = require('./form.page');
const List = require('./list.page');

class Timesheet {
  get saveBtn() {
    return $('.Timesheet_btnsContainer__3bOE8 > button:nth-child(2)');
  }
  get editBtn() {
    return $(
      '.list_container__21Buw > table > tbody > tr:nth-child(1) > td:nth-child(6) > a > button');
  }
  get deleteBtn() {
    return $('.list_container__21Buw > table > tbody > tr:nth-child(1) > td:nth-child(7) > span');
  }
  get createBtn() {
    return $('#root > div > div > section > div:nth-child(3) > a > button');
  }
  get rateInputError() {
    return $('#root > div > div > section > form > div:nth-child(5) > p');
  }
  get workedHsInputError() {
    return $('#root > div > div > section > form > div:nth-child(6) > p');
  }
  get taskInputError() {
    return $('#root > div > div > section > form > div:nth-child(8) > p');
  }
  get modalOkBtn() {
    return $('.Modal_buttonWrapper__2L1vP');
  }
  get TimesheetsDropList() {
    return $('.Select_inputContainer__1-U2d > select');
  }
  get TGoptionDropList() {
    return $('.Select_inputContainer__1-U2d > select > option:nth-child(2)');
  }

  async setRate(rate) {
    await this.rateInputError.setValue(rate);
  }
  async setHours(hours) {
    await this.workedHsInputError.setValue(hours);
  }
  async setTask(task) {
    await this.taskInputError.setValue(task);
  }
  async deleteCancelFunction() {
    await this.deleteBtn.click();
    await expect(List.deleteModalQuestion).toBeDisplayed();
    await expect(List.deleteModalQuestion).toHaveTextContaining(
      'Are you sure you want to delete this timesheet?'
    );
    await expect(List.deleteModalCancelBtn).toBeDisplayed();
    await List.deleteModalCancelBtn.click();
  }
  async listDisplayed() {
    await expect(List.listTable).toBeDisplayed();
    await expect(List.listHeader).toBeDisplayed();
    await expect(List.listHeader).toHaveChildren(7);
    await expect(List.listHeader).toHaveTextContaining('Date');
    await expect(List.listHeader).toHaveTextContaining('Employee');
    await expect(List.listHeader).toHaveTextContaining('Project');
    await expect(List.listHeader).toHaveTextContaining('Role');
    await expect(List.listHeader).toHaveTextContaining('Task');
    await expect(List.listHeader).toHaveTextContaining('Edit');
    await expect(List.listHeader).toHaveTextContaining('Delete');
  }
  async errorInputsMsgs() {
    await this.saveBtn.click();
    await Form.nameInputError.toBeDisplayed();
    await Form.nameInputError.toHaveText('Project cannot be an empty field');
    await Form.surnameInputError.toBeDisplayed();
    await Form.surnameInputError.toHaveText('Employee cannot be an empty field');
    await Form.emailInputError.toBeDisplayed();
    await Form.emailInputError.toHaveText('"Role" must be one of [DEV, QA, PM, TL]');
    await Form.passwordInputError.toBeDisplayed();
    await Form.passwordInputError.toHaveText('"Date" must be a valid date');
    await this.rateInputError.toBeDisplayed();
    await this.rateInputError.toHaveText('"Rate" must be a number');
    await this.workedHsInputError.toBeDisplayed();
    await this.workedHsInputError.toHaveText('"Worked Hours" must be a number');
    await this.taskInputError.toBeDisplayed();
    await this.taskInputError.toHaveText('Task cannot be an empty field');
  }
}

module.exports = new Timesheet();