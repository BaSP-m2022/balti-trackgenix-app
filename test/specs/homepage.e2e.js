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
    it('Button Trackgenix from navbar should be clickable', async () => {
      await expect(test.titleNav).toBeClickable();
    });
    it('Button HOMEPAGE from sidebar should be clickable', async () => {
      await expect(test.btnSidebar).toBeClickable();
    });
    // TESTING FUNCTIONALITY BUTTONS ON CLICK
    it('Button Admin on click', async () => {
      await test.btnAdmin.click();
      await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/admins');
    });
    it('Button Super Admin on click', async () => {
      await test.open();
      await test.btnSuperadmin.click();
      await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/super-admins');
    });
    it('Button Employees on click', async () => {
      await test.open();
      await test.btnEmployees.click();
      await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/employees');
    });
    it('Button Projects on click', async () => {
      await test.open();
      await test.btnProjects.click();
      await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/projects');
    });
    it('Button Time sheets on click', async () => {
      await test.open();
      await test.btnTimesheets.click();
      await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/timesheets');
    });
    it('Button Task on click', async () => {
      await test.open();
      await test.btnTasks.click();
      await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/tasks');
    });
    it('Button Twitter on click', async () => {
      await test.open();
      await test.btnTwitter.click();
      await browser.newWindow('https://twitter.com/radiumrocket');
    });
    it('Button Facebook on click', async () => {
      await test.open();
      await test.btnFacebook.click();
      await browser.newWindow('https://www.facebook.com/radiumrocket')
    });
    it('Button Instagram on click', async () => {
      await test.open();
      await test.btnInstagram.click();
      await browser.newWindow('https://www.instagram.com/radium.rocket/')
    });
    it('Button HOMEPAGE on click', async () => {
      await test.open();
      await test.btnHome.click();
      await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/')
    });
    it('Button TRACKGENIX on click', async () => {
      await test.open();
      await test.titleNav.click();
      await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/')
    });
});