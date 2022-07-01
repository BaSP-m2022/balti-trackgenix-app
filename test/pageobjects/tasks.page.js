const List = require('./list.page');

class Tasks {
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

module.exports = new Tasks();