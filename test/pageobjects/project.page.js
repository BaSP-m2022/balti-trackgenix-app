const Form = require('./form.page');
const List = require('./list.page');

class Project {
  get saveBtn() {
    return $('.Project_btnsContainer__3bOE8 > button:nth-child(2)');
  }
  get modalOkBtn() {
    return $('.Modal_buttonWrapper__2L1vP');
  }
  get projectsDropList() {
    return $('.Select_inputContainer__1-U2d > select');
  }
  get TGoptionDropList() {
    return $('.Select_inputContainer__1-U2d > select > option:nth-child(2)');
  }

  async newProject(name, surname, email, password) {
    await Form.newItem(name, surname, email, password);
    await expect(this.projectsDropList).toBeDisplayed();
    await this.projectsDropList.click();
    await expect(this.TGoptionDropList).toBeDisplayed();
    await this.TGoptionDropList.click();
    await this.saveBtn.click();
  }
  async deleteCancelFunction() {
    await List.deleteBtn.click();
    await expect(List.deleteModalQuestion).toBeDisplayed();
    await expect(List.deleteModalQuestion).toHaveTextContaining(
      'Are you sure you want to delete this Project'
    );
    await expect(List.deleteModalCancelBtn).toBeDisplayed();
    await List.deleteModalCancelBtn.click();
  }
  async listDisplayed() {
    await expect(List.listTable).toBeDisplayed();
    await expect(List.listHeader).toBeDisplayed();
    await expect(List.listHeader).toHaveChildren(6);
    await expect(List.listHeader).toHaveTextContaining('First Name');
    await expect(List.listHeader).toHaveTextContaining('Last Name');
    await expect(List.listHeader).toHaveTextContaining('Mail');
    await expect(List.listHeader).toHaveTextContaining('Active');
    await expect(List.listHeader).toHaveTextContaining('Edit');
    await expect(List.listHeader).toHaveTextContaining('Delete');
  }
}

module.exports = new Project();