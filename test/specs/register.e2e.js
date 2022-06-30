const test = require('../pageobjects/test.page');

describe('REGISTER test', () => {
  beforeAll('open browser',()=> {
    browser.url('https://balti-trackgenix-app.vercel.app/register')
  })
  // COMPLETE THE INPUTS WITH NEW VALID DATA PLEASE
  it('Register success', async () => {
    await test.completeLogin('firstname', 'AguanteRosario');
    await test.completeLogin('lastname', 'Central');
    await test.completeLogin('email', 'rcrcrc4001@test.com');
    await test.completeLogin('password', 'asdasdasd123');
    await test.btnCreateLogin.click();
    await browser.debug();
    await test.resultModalTitle.toHaveText('Employee successfully Registered');
    await test.btnModal.click();
    await browser.debug();
    await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/login');
  })
});