const HomePage = require('../pageobjects/Home.page');
const SuperAdminsList = require('../pageobjects/superadmin-list.page');
const SuperadminsForm = require('../pageobjects/superadmin-form.page');

describe('Admin testing path', () => {
  beforeAll('Open browser', () => {
    browser.url('https://balti-trackgenix-app.vercel.app/');
  });

  it('Go to Admins page', async () => {
    await HomePage.superAdminLink.click();
  });

  it('Elements that should be display in super admins page', async () => {
    await expect(SuperAdminsList.superadminsTitle).toBeDisplayed();
    await expect(SuperAdminsList.superadminsList).toBeDisplayed();
    await expect(SuperAdminsList.deleteBtn).toBeDisplayed();
    await expect(SuperAdminsList.editBtn).toBeDisplayed();
  });

  it('goToSuperAdminsForm', async () => {
    await SuperAdminsList.createBtn.click();
  });

  it('Super admins Form testing', async () => {
    await expect(SuperadminsForm.superAdminsForm).toBeDisplayed();
    await expect(SuperadminsForm.firstNameInput).toBeDisplayed();
    await expect(SuperadminsForm.firstNameLabel).toBeDisplayed();
    await expect(SuperadminsForm.lastNameInput).toBeDisplayed();
    await expect(SuperadminsForm.lastNameLabel).toBeDisplayed();
    await expect(SuperadminsForm.emailInput).toBeDisplayed();
    await expect(SuperadminsForm.emailLabel).toBeDisplayed();
    await expect(SuperadminsForm.passWordInput).toBeDisplayed();
    await expect(SuperadminsForm.passwordLabel).toBeDisplayed();
    await expect(SuperadminsForm.isActiveInput).toBeDisplayed();
    await expect(SuperadminsForm.isActivelabel).toBeDisplayed();
    await expect(SuperadminsForm.backbtn).toBeDisplayed();
    await expect(SuperadminsForm.backbtn).toBeClickable();
    await expect(SuperadminsForm.saveBtn).toBeDisplayed();
    await expect(SuperadminsForm.saveBtn).toBeClickable();
  });

  it('Should not create a super admin', async () => {
    await SuperadminsForm.createSuperAdmin('', '', '', '');
  });

  it('Should not create a super admin', async () => {
    await SuperadminsForm.createSuperAdmin('', 'puente', 'titopuente@gmail.com', 'Titopuente2022');
  });

  it('Should not create a super admin', async () => {
    await SuperadminsForm.createSuperAdmin('tito', '', 'titopuente@gmail.com', 'Titopuente2022');
  });

  it('Should not create a super admin', async () => {
    await SuperadminsForm.createSuperAdmin('tito', 'puente', '', 'Titopuente2022');
  });

  it('Should not create a super admin', async () => {
    await SuperadminsForm.createSuperAdmin('tito', 'puente', 'titopuente@gmail.com', '');
  });

  // it('Create an Admin successfully', async () => {
  //   await SuperadminsForm.createAdmin('tito', 'puente', 'titopuente@gmail.com', 'Titopuente2022');
  // });

  it('Back to Super admins list', async () => {
    await SuperadminsForm.backbtn.click();
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
