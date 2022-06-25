const test = require('../pageobjects/test.page');

describe('My Trackgenix test aplication', () => {
  beforeAll('open browser',()=> {
    browser.url('https://balti-trackgenix-app.vercel.app/')
  })
  // TEXTS CHECKS
    it('The Header title should be Home', async () => {
      await expect(test.textHeader).toHaveTextContaining('Home');
    });
    it('The Navbar title should be TRACKGENIX', async () => {
      await expect(test.titleNav).toHaveTextContaining('TRACKGENIX');
    });
    it('The Sidebar title should be Shortcuts', async () => {
      await expect(test.textSidebar).toHaveTextContaining('Shortcuts');
    });
    it('The Footer text should be Copyright © 2021 Radium Rocket', async () => {
      await expect(test.textFooter).toHaveTextContaining('Copyright © 2021 Radium Rocket');
    });
    // TESTING BUTTONS TO BE CLICKABLE
    it('Button facebook should be clickable', async () => {
    await expect(test.btnFacebook).toBeClickable();
    });
    it('Button instagram should be clickable', async () => {
      await expect(test.btnInstagram).toBeClickable();
    });
    it('Button twitter should be clickable', async () => {
      await expect(test.btnTwitter).toBeClickable();
    });
    it('Button Admin should be clickable', async () => {
      await expect(test.btnAdmin).toBeClickable();
    });
    it('Button Super Admin should be clickable', async () => {
      await expect(test.btnSuperadmin).toBeClickable();
    });
    it('Button Employees should be clickable', async () => {
      await expect(test.btnEmployees).toBeClickable();
    });
    it('Button Projects should be clickable', async () => {
      await expect(test.btnProjects).toBeClickable();
    });
    it('Button Time-sheets should be clickable', async () => {
      await expect(test.btnTasks).toBeClickable();
    });
    it('Button Tasks should be clickable', async () => {
      await expect(test.btnTimesheets).toBeClickable();
    });
    // TESTING FUNCTIONALITY BUTTONS ON CLICK
    it('Button Twitter on click', async () => {
      await test.btnTwitter.Click();
      await expect(browser).toHaveUrl('https://twitter.com/radiumrocket');
    });
});


