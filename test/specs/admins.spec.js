const Header = require('../pageobjects/header');
const Sidebar = require('../pageobjects/sidebar');
const Footer = require('../pageobjects/footer');
const ListPage = require('../pageobjects/list.page');
const FormPage = require('../pageobjects/form.page');
const Admin = require('../pageobjects/admin.page');

describe('Admin CRUD path testing', () => {
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

  it('Title: Admins should be displayed', async () => {
    await expect(Header.admins).toBeDisplayed();
    Header.admins.click();
    await expect(ListPage.listTitle).toBeDisplayed();
    await expect(ListPage.listTitle).toHaveText('Admins');
  });

  it('List table should be displayed', async () => {
    await ListPage.listDisplayed();
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
    await expect(ListPage.createSaBtn).toHaveText('Create Admin');
    await ListPage.createSaBtn.click();
  });

  it('Title in the tab to create a new Admin should be displayed', async () => {
    await expect(FormPage.title).toBeDisplayed();
    await expect(FormPage.title).toHaveText('Admins');
  });

  it('Form to create a new Admin should be displayed', async () => {
    await expect(FormPage.form).toBeDisplayed();
    await expect(FormPage.form).toHaveChildren(6);
  });

  it('Back button should work properly', async () => {
    await expect(FormPage.backBtn).toBeDisplayed();
    await expect(FormPage.backBtn).toBeClickable();
    await FormPage.backBtn.click();
  });

  it('A new Admin should NOT be created with empty fields', async () => {
    await ListPage.createSaBtn.click();
    await FormPage.errorInputsMsgs;
    await FormPage.backBtn.click();
  });

  it('A new Admin should be created', async () => {
    await expect(ListPage.createSaBtn).toBeDisplayed();
    await expect(ListPage.createSaBtn).toBeClickable();
    await ListPage.createSaBtn.click();
    await Admin.newAdmin('Evelyn', 'Heredia', 'evefhrd@hotmail.com', '12345678p');
  });

  it('OK button should close success message.', async () => {
    await expect(FormPage.modalOkBtn).toBeDisplayed();
    await expect(FormPage.modalOkBtn).toHaveText('OK');
    await expect(FormPage.modalOkBtn).toBeClickable();
    await FormPage.modalOkBtn.click();
  });

  it('Admin should not be edited', async () => {
    await expect(ListPage.editBtn).toBeDisplayed();
    await expect(ListPage.editBtn).toBeClickable();
    await ListPage.editBtn.click();
    await expect(FormPage.backBtn).toBeDisplayed();
    await expect(FormPage.backBtn).toBeClickable();
    await FormPage.backBtn.click();
    await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/admins');
  });

  it('Admin should be edited', async () => {
    await expect(ListPage.editBtn).toBeDisplayed();
    await expect(ListPage.editBtn).toBeClickable();
    await ListPage.editBtn.click();
    await Admin.newAdmin('Evelyn', 'Updated', 'evefhrd@hotmail.com', '12345678p');
    await expect(Admin.modalOkBtn).toBeDisplayed();
    await expect(Admin.modalOkBtn).toBeClickable();
    await Admin.modalOkBtn.click();
  });

  it('Admin should not be deleted', async () => {
    await Admin.deleteCancelFunction();
  });
});
