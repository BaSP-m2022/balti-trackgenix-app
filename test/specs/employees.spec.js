const Header = require('../pageobjects/header');
const Sidebar = require('../pageobjects/sidebar');
const Footer = require('../pageobjects/footer');
const ListPage = require('../pageobjects/list.page');
const FormPage = require('../pageobjects/form.page');
const Employee = require('../pageobjects/employee.page');

describe('Employee CRUD path testing', () => {
  beforeAll('Open browser', () => {
    browser.url('https://balti-trackgenix-app.vercel.app/');
  });

  it('Header should be displayed and interactive', async () => {
    await Header.wholeHeaderDisplay();
  });

  it('TG logo in the header should redirect to homepage', async () => {
    await Header.TGredirection();
  });

  it('Footer should be displayed and interactive', async () => {
    await Footer.wholeFooterDisplay();
  });

  it('Sidebar should be displayed and interactive', async () => {
    await Sidebar.wholeSidebarDisplay();
  });

  it('Title: Employees should be displayed', async () => {
    await expect(Header.employees).toBeDisplayed();
    Header.employees.click();
    await expect(ListPage.listTitle).toBeDisplayed();
    await expect(ListPage.listTitle).toHaveText('Employees');
  });

  it('List table should be displayed', async () => {
    await Employee.listDisplayed();
  });

  it('Edit button should be displayed', async () => {
    await expect(ListPage.editBtn).toBeDisplayed();
    await expect(ListPage.editBtn).toBeClickable();
  });

  it('Delete button should be displayed', async () => {
    await expect(ListPage.deleteBtn).toBeDisplayed();
    await expect(ListPage.deleteBtn).toBeClickable();
  });

  it('Create button should be displayed', async () => {
    await expect(ListPage.createSaBtn).toBeDisplayed();
    await expect(ListPage.createSaBtn).toBeClickable();
    await expect(ListPage.createSaBtn).toHaveText('Create Employee');
    await ListPage.createSaBtn.click();
  });

  it('Title in the tab to create a new Employee should be displayed', async () => {
    await expect(FormPage.title).toBeDisplayed();
    await expect(FormPage.title).toHaveText('Employees');
  });

  it('Form to create a new Employee should be displayed', async () => {
    await expect(FormPage.form).toBeDisplayed();
    await expect(FormPage.form).toHaveChildren(7);
  });

  it('Back button should work properly', async () => {
    await expect(FormPage.backBtn).toBeDisplayed();
    await expect(FormPage.backBtn).toBeClickable();
    await FormPage.backBtn.click();
  });

  it('A new Employee should NOT be created with empty fields', async () => {
    await ListPage.createSaBtn.click();
    await FormPage.errorInputsMsgs;
    await FormPage.backBtn.click();
  });

  it('A new Employee should be created', async () => {
    await expect(ListPage.createSaBtn).toBeDisplayed();
    await expect(ListPage.createSaBtn).toBeClickable();
    await ListPage.createSaBtn.click();
    await Employee.newEmployee('Evelyn', 'Heredia', 'evefhrd@hotmail.com', '12345678p');
  });

  it('OK button should close success message.', async () => {
    await expect(FormPage.modalOkBtn).toBeDisplayed();
    await expect(FormPage.modalOkBtn).toHaveText('OK');
    await expect(FormPage.modalOkBtn).toBeClickable();
    await FormPage.modalOkBtn.click();
  });

  it('Employee should not be edited', async () => {
    await expect(ListPage.editBtn).toBeDisplayed();
    await expect(ListPage.editBtn).toBeClickable();
    await ListPage.editBtn.click();
    await expect(FormPage.backBtn).toBeDisplayed();
    await expect(FormPage.backBtn).toBeClickable();
    await FormPage.backBtn.click();
    await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/employees');
  });

  it('Employee should be edited', async () => {
    await expect(ListPage.editBtn).toBeDisplayed();
    await expect(ListPage.editBtn).toBeClickable();
    await ListPage.editBtn.click();
    await Employee.newEmployee('Evelyn', 'Updated', 'evefhrd@hotmail.com', '12345678p');
    await expect(FormPage.modalOkBtn).toBeDisplayed();
    await expect(FormPage.modalOkBtn).toBeClickable();
    await FormPage.modalOkBtn.click();
  });

  it('Employee should not be deleted', async () => {
    await Employee.deleteCancelFunction();
  });
});
