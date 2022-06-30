const test = require('../pageobjects/test.page');

describe('Employees entity test', () => {
  beforeAll('open browser',()=> {
    browser.url('https://balti-trackgenix-app.vercel.app/')
  })
  // BUTTONS CHECKS
  it('Button Employees on click', async () => {
    await test.open();
    await test.btnEmployees.click();
    await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/employees');
  });
  it('Button Create Employees on click', async () => {
    await test.btnCreateE.click();
    await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/employees/form');
  });
  it('Testing Title form', async ()=> {
    await expect(test.textEmployee).toHaveTextContaining('Employees');
  })
  // EMPTY FIELDS SHOULD DISPLAY ERROR
  it('Empty first name should display error', async ()=> {
      await test.setFirstName('');
      await test.btnSave.click();
      await expect(test.errorName).toHaveText('First Name cannot be an empty field');
  })
  it('Page should be refreshed', async () => {
    await browser.refresh();
    await browser.pause(800);
})
  it('Empty last name should display error', async ()=> {
    await test.setFirstName('Matias');
    await test.setLastName('');
    await test.btnSave.click();
    await expect(test.errorLastName).toHaveText('Last Name cannot be an empty field');
  })
  it('Page should be refreshed', async () => {
    await browser.refresh();
    await browser.pause(800);
  })
  it('Empty email should display error', async ()=> {
    await test.setFirstName('Matias');
    await test.setLastName('Reynoso');
    await test.setEmail('');
    await test.btnSave.click();
    await expect(test.errorEmail).toHaveText('Email cannot be an empty field');
  })
  it('Empty password should display error', async ()=> {
    await test.setFirstName('Matias');
    await test.setLastName('Reynoso');
    await test.setEmail('tester@test.com');
    await test.setPassword('');
    await test.btnSave.click();
    await expect(test.errorPassword).toHaveText('Password cannot be an empty field');
  })
  it('Create employee with error', async () => {
    await test.completeFields('name', 'Matias')
    await test.completeFields('lastname', 'Reynoso')
    await test.completeFields('email', 'tester@test.com')
    await test.completeFields('password', 'asdasdasd123')
    await test.btnSelectPEmployees.click()
    await expect (test.btnSelectPEmployees).toHaveText('Trackgenix')
    await test.btnDone.click()
    await test.btnSave.click()
    await test.resultModalEmp.waitForDisplayed(3000)
    await expect (test.resultModalTitle).toHaveText('"password" is not allowed')
  });
});