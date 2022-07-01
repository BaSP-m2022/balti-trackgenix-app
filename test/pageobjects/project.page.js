const List = require('./list.page');

class Project {
  get editBtn() {
    return $(
      '.list_container__21Buw > table > tbody > tr:nth-child(1) > td:nth-child(7) > a > button'
    );
  }
  get deleteBtn() {
    return $('.list_container__21Buw > table > tbody > tr:nth-child(1) > td:nth-child(8) > span > button');
  }
  get projectNameInput() {
    return $('#root > div > div > section > form > div:nth-child(1) > input[type=text]');
  }
  get descriptionInput() {
    return $('#root > div > div > section > form > div:nth-child(2) > input[type=text]');
  }
  get sDateInput() {
    return $('#root > div > div > section > form > div:nth-child(3) > input');
  }
  get eDateInput() {
    return $('#root > div > div > section > form > div:nth-child(4) > input[type=date]');
  }
  get adminInputDropList() {
    return $('#root > div > div > section > form > div:nth-child(5) > select');
  }
  get clientInput() {
    return $('#root > div > div > section > form > div:nth-child(6) > input[type=text]');
  }
  get employeesInputDropList() {
    return $('#root > div > div > section > form > div:nth-child(7) > select');
  }
  get roleInput() {
    return $('#root > div > div > section > form > div:nth-child(8) > input');
  }
  get rateInput() {
    return $('#root > div > div > section > form > div:nth-child(9) > input[type=number]');
  }
  get hoursInput() {
    return $('#root > div > div > section > form > div:nth-child(10) > input[type=number]');
  }
  get saveBtn() {
    return $('.Form_btnsContainer__21-L8 > button:nth-child(2)');
  }
  get editBtn() {
    return $(
      '.list_container__21Buw > table > tbody > tr:nth-child(1) > td:nth-child(7) > a > button'
    );
  }

  async setProjectName(project) {
    await this.projectNameInput.setValue(project);
  }
  async setDescription(description) {
    await this.descriptionInput.setValue(description);
  }
  async setSdate(start) {
    await this.sDateInput.setValue(start);
  }
  async setEdate(end) {
    await this.eDateInput.setValue(end);
  }
  async setClient(client) {
    await this.clientInput.setValue(client);
  }
  async setRole(role) {
    await this.roleInput.setValue(role);
  }
  async setRate(rate) {
    await this.rateInput.setValue(rate);
  }
  async setHours(hours) {
    await this.hoursInput.setValue(hours);
  }

  async newProject(projectName, description, sDate, eDate, client, role, rate, hours) {
    await this.setProjectName(projectName);
    await this.setDescription(description);
    await this.setSdate(sDate);
    await this.setEdate(eDate);
    await expect(this.adminInputDropList).toBeDisplayed();
    await this.adminInputDropList.click();
    await this.adminInputDropList.selectByVisibleText('bactericio lastname');
    await this.setClient(client);
    await expect(this.employeesInputDropList).toBeDisplayed();
    await this.employeesInputDropList.click();
    await this.employeesInputDropList.selectByVisibleText('Pablo Lampone');
    await this.setRole(role);
    await this.setRate(rate);
    await this.setHours(hours);
    await this.saveBtn.click();
  }
  async deleteCancelFunction() {
    await this.deleteBtn.click();
    await expect(List.deleteModalQuestion).toBeDisplayed();
    await expect(List.deleteModalQuestion).toHaveTextContaining(
      'Are you sure you want to delete this Project?'
    );
    await expect(List.deleteModalCancelBtn).toBeDisplayed();
    await List.deleteModalCancelBtn.click();
  }
  async deleteAcceptFunction() {
    await this.deleteBtn.click();
    await expect(List.deleteModalQuestion).toBeDisplayed();
    await expect(List.deleteModalQuestion).toHaveTextContaining(
      'Are you sure you want to delete this Project?'
    );
    await expect(List.deleteModalAcceptBtn).toBeDisplayed();
    await List.deleteModalAcceptBtn.click();
  }
  async listDisplayed() {
    await expect(List.listTable).toBeDisplayed();
    await expect(List.listHeader).toBeDisplayed();
    await expect(List.listHeader).toHaveChildren(8);
    await expect(List.listHeader).toHaveTextContaining('Project Name');
    await expect(List.listHeader).toHaveTextContaining('Description');
    await expect(List.listHeader).toHaveTextContaining('Start Date');
    await expect(List.listHeader).toHaveTextContaining('Admin');
    await expect(List.listHeader).toHaveTextContaining('Client');
    await expect(List.listHeader).toHaveTextContaining('Is Active?');
    await expect(List.listHeader).toHaveTextContaining('Edit');
    await expect(List.listHeader).toHaveTextContaining('Delete');
  }
}

module.exports = new Project();
