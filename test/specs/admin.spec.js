const HomePage = require('../pageobjects/Home.page');
const AdminsList = require('../pageobjects/admin-list.page');
const AdminsForm = require('../pageobjects/admin-form.page');

describe('Admin testing path', () => {
  beforeAll('Open browser', () => {
    browser.url('https://balti-trackgenix-app.vercel.app/');
  });

  it('Go to Admins page', async () => {
    await HomePage.adminLink.click();
  });

  it('Elements that should be display in admins page', async () => {
    await expect(AdminsList.adminsList).toBeDisplayed();
    await expect(AdminsList.adminsTitle).toBeDisplayed();
    await expect(AdminsList.adminsList).toBeDisplayed();
    await expect(AdminsList.deleteBtn).toBeDisplayed();
    await expect(AdminsList.editBtn).toBeDisplayed();
  });

  it('goToAdminsForm', async () => {
    await AdminsList.createBtn.click();
  });

  it('Admins Form testing', async () => {
    await expect(AdminsForm.adminsForm).toBeDisplayed();
    await expect(AdminsForm.firstNameInput).toBeDisplayed();
    await expect(AdminsForm.firstNameLabel).toBeDisplayed();
    await expect(AdminsForm.lastNameInput).toBeDisplayed();
    await expect(AdminsForm.lastNameLabel).toBeDisplayed();
    await expect(AdminsForm.emailInput).toBeDisplayed();
    await expect(AdminsForm.emailLabel).toBeDisplayed();
    await expect(AdminsForm.passWordInput).toBeDisplayed();
    await expect(AdminsForm.passwordLabel).toBeDisplayed();
    await expect(AdminsForm.isActiveInput).toBeDisplayed();
    await expect(AdminsForm.isActivelabel).toBeDisplayed();
    await expect(AdminsForm.backbtn).toBeDisplayed();
    await expect(AdminsForm.backbtn).toBeClickable();
    await expect(AdminsForm.saveBtn).toBeDisplayed();
    await expect(AdminsForm.saveBtn).toBeClickable();
  });

  it('Should not create an Admin', async () => {
    await AdminsForm.createAdmin('', '', '', '');
  });

  it('Should not create an Admin', async () => {
    await AdminsForm.createAdmin('', 'puente', 'titopuente@gmail.com', 'Titopuente2022');
  });

  it('Should not create an Admin', async () => {
    await AdminsForm.createAdmin('tito', '', 'titopuente@gmail.com', 'Titopuente2022');
  });

  it('Should not create an Admin', async () => {
    await AdminsForm.createAdmin('tito', 'puente', '', 'Titopuente2022');
  });

  it('Should not create an Admin', async () => {
    await AdminsForm.createAdmin('tito', 'puente', 'titopuente@gmail.com', '');
  });

  // it('Create an Admin successfully', async () => {
  //   await AdminsForm.createAdmin('tito', 'puente', 'titopuente@gmail.com', 'Titopuente2022');
  // });

  it('Back to Admins list', async () => {
    await AdminsForm.backbtn.click();
  });

  // it('Edit an admin', async () => {
  //   await AdminsList.editBtn.click();
  //   await AdminsList.firstNameInput.setValue('newname');
  //   await AdminsList.saveBtn.click();
  // });

  // it('Delete and admin', async () => {
  //   await AdminsList.deleteBtn.click();
  // });

  // it('Error messages should be displayed', async () => {
  //   await expect(AdminsForm.firstNameErrorMsg).toBeDisplayed();
  //   await expect(AdminsForm.lastNameErrorMsg).toBeDisplayed();
  //   await expect(AdminsForm.emailErrorMsg).toBeDisplayed();
  //   await expect(AdminsForm.passwordErrorMsg).toBeDisplayed();
  // });
});
