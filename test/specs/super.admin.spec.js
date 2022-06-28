const Header = require('../pageobjects/header');
const Sidebar = require('../pageobjects/sidebar');
const Footer = require('../pageobjects/footer');
const SuperAdminHomePage = require('../pageobjects/sa.list.page');
const SuperAdminForm = require('../pageobjects/sa.form.page');

describe('Super Admins CRUD path testing', () => {
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

  it('Title: Super Admins should be displayed', async () => {
    await expect(Header.superAdmins).toBeDisplayed();
    Header.superAdmins.click();
    await expect(SuperAdminHomePage.saTitle).toBeDisplayed();
    await expect(SuperAdminHomePage.saTitle).toHaveText('Super Admins');
  });

  it('List table should be displayed', async () => {
    await SuperAdminHomePage.listDisplayed();
  });

  it('Edit button should be displayed', async () => {
    await expect(SuperAdminHomePage.editBtn).toBeDisplayed();
    await expect(SuperAdminHomePage.editBtn).toBeClickable();
  });

  it('Delete button should be displayed', async () => {
    await expect(SuperAdminHomePage.deleteBtn).toBeDisplayed();
    await expect(SuperAdminHomePage.deleteBtn).toBeClickable();
  });

  it('Create button should be displayed', async () => {
    await expect(SuperAdminHomePage.createSaBtn).toBeDisplayed();
    await expect(SuperAdminHomePage.createSaBtn).toBeClickable();
    await expect(SuperAdminHomePage.createSaBtn).toHaveText('Create Super Admin');
    await SuperAdminHomePage.createSaBtn.click();
  });

  it('Title in the tab to create a new SA should be displayed', async () => {
    await expect(SuperAdminForm.saTitle).toBeDisplayed();
    await expect(SuperAdminForm.saTitle).toHaveText('Super Admins');
  });

  it('Form to create a new SA should be displayed', async () => {
    await expect(SuperAdminForm.form).toBeDisplayed();
    await expect(SuperAdminForm.form).toHaveChildren(6);
  });

  it('Back button should work properly', async () => {
    await expect(SuperAdminForm.backBtn).toBeDisplayed();
    await expect(SuperAdminForm.backBtn).toBeClickable();
    await SuperAdminForm.backBtn.click();
  });

  it('A new Super Admin should NOT be created', async () => {
    await SuperAdminHomePage.createSaBtn.click();
    await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/super-admins/form');
    await SuperAdminForm.errorInputsMsgs;
    await SuperAdminForm.backBtn.click();
  });

  /* This tests were comented as the super admin form has been modified by devs
it('A new Super Admin should be created', async () => {
    await expect(SuperAdminHomePage.createSaBtn).toBeDisplayed();
    await expect(SuperAdminHomePage.createSaBtn).toBeClickable();
    await SuperAdminHomePage.createSaBtn.click();
    await SuperAdminForm.newSa('Evelyn', 'Heredia', 'evefhrd@hotmail.com', '12345678p');
});

it('Success message should be displayed', async () => {
    await expect(saFormPage.saCreatedModal).toBeDisplayed();
    await expect(saFormPage.saCreatedModal).toHaveText('');
});

it('OK button should close success message.', async () => {
    await expect(saFormPage.modalOkBtn).toBeDisplayed();
    await expect(saFormPage.modalOkBtn).toHaveText('OK');
    await expect(saFormPage.modalOkBtn).toBeClickable();
    await saFormPage.modalOkBtn.click();
});
*/
it('Super Admin should not be deleted', async () => {
  await SuperAdminHomePage.deleteCancelFunction();
});
/*
it('Super Admin should be deleted', async () => {
    await SuperAdminHomePage.deleteAcceptFunction();
});

it('Successful deletion message should be displayed', async () => {
    await expect(SuperAdminHomePage.modalSuccessDelete).toBeDisplayed();
    await expect(SuperAdminHomePage.modalSuccessDelete).toHaveText('Super Admin deleted');
});

it('OK button should close successful deletion message.', async () => {
    await expect(SuperAdminHomePage.modalSuccessDelete).toBeDisplayed();
    await expect(SuperAdminHomePage.modalSuccessDelete).toHaveText('OK');
    await expect(SuperAdminHomePage.modalSuccessDelete).toBeClickable();
    await SuperAdminHomePage.modalSuccessDelete.click();
});*/
});
