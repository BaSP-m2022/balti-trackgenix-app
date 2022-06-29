const test = require('../pageobjects/test.page');

describe('Employees entity test', () => {
  beforeAll('open browser',()=> {
    browser.url('https://balti-trackgenix-app.vercel.app/')
  })
  // TEXTS CHECKS
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
})/*
  it('Empty first name should display error', async ()=> {
      await test.inputName('');
      await test.btnSave.click();
      await expect(test.errorName).toHaveText('First Name cannot be an empty field');
  })*/
});