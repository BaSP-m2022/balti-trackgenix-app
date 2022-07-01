const Header = require('../pageobjects/header');
const Sidebar = require('../pageobjects/sidebar');
const Footer = require('../pageobjects/footer');
const Login = require('../pageobjects/login.page');
const Form = require('../pageobjects/form.page');

describe('Login path testing', () => {
  beforeAll('Open browser', () => {
    browser.url('https://balti-trackgenix-app.vercel.app/');
  });

  it('Login page should be displayed', async () => {
    await expect(Sidebar.login).toBeDisplayed();
    await expect(Sidebar.login).toBeClickable();
    await Sidebar.login.click();
    await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/login');
  });

  it('Login should NOT be successful', async () => {
    await expect(Sidebar.login).toBeDisplayed();
    await expect(Sidebar.login).toBeClickable();
    await Sidebar.login.click();
    await Login.loginFunction('evefhrd@gmail.com', '123456');
    await expect(Login.invalidPassword).toBeDisplayed();
  });

  it('Back button should work properly', async () => {
    await expect(Form.backBtn).toBeDisplayed();
    await expect(Form.backBtn).toBeClickable();
    await Form.backBtn.click();
  });

  it('Sign up button should work properly', async () => {
    await expect(Sidebar.login).toBeDisplayed();
    await expect(Sidebar.login).toBeClickable();
    await Sidebar.login.click();
    await expect(Login.signupLink).toBeDisplayed();
    await expect(Login.signupLink).toBeClickable();
    await Login.signupLink.click();
    await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/register');
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

  it('Login should be successful', async () => {
    await expect(Sidebar.login).toBeDisplayed();
    await expect(Sidebar.login).toBeClickable();
    await Sidebar.login.click();
    await Login.loginFunction('evefhrd@gmail.com', '12345678p');
  });
});