const Header = require('../pageobjects/header');
const Sidebar = require('../pageobjects/sidebar');
const Footer = require('../pageobjects/footer');
const ListPage = require('../pageobjects/list.page');
const FormPage = require('../pageobjects/form.page');
const Timesheet = require ('../pageobjects/timesheet.page');

describe('Timesheets CRUD path testing', () => {
    beforeAll('Open browser', ()=> {
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

    it('Title: Timesheets should be displayed', async () => {
        await expect(Header.timesheets).toBeDisplayed();
        Header.timesheets.click();
        await expect(ListPage.listTitle).toBeDisplayed();
        await expect(ListPage.listTitle).toHaveText('TimeSheets');
    });

    it('List table should be displayed', async () => {
      await Timesheet.listDisplayed();
    });
  
    it('Edit button should be displayed', async () => {
      await expect(Timesheet.editBtn).toBeDisplayed();
      await expect(Timesheet.editBtn).toBeClickable();
    });
  
    it('Delete button should be displayed', async () => {
      await expect(Timesheet.deleteBtn).toBeDisplayed();
      await expect(Timesheet.deleteBtn).toBeClickable();
    });
  
    it('Create button should be displayed', async () => {
      await expect(Timesheet.createBtn).toBeDisplayed();
      await expect(Timesheet.createBtn).toBeClickable();
      await expect(Timesheet.createBtn).toHaveText('Create Timesheet');
      await Timesheet.createBtn.click();
    });
  
    it('Title in the tab to create a new Timesheet should be displayed', async () => {
      await expect(FormPage.title).toBeDisplayed();
      await expect(FormPage.title).toHaveText('Time Sheets');
    });

    it('Form to create a new Timesheet should be displayed', async () => {
      await expect(FormPage.form).toBeDisplayed();
      await expect(FormPage.form).toHaveChildren(9);
    });

    it('Back button should work properly', async () => {
      await expect(FormPage.backBtn).toBeDisplayed();
      await expect(FormPage.backBtn).toBeClickable();
      await FormPage.backBtn.click();
    });

    it('A new Timesheet should NOT be created with empty fields', async () => {
      await ListPage.createSaBtn.click();
      await Timesheet.errorInputsMsgs;
      await FormPage.backBtn.click();
    });

    it('Timesheet should not be edited', async () => {
      await expect(Timesheet.editBtn).toBeDisplayed();
      await expect(Timesheet.editBtn).toBeClickable();
      await Timesheet.editBtn.click();
      await expect(FormPage.backBtn).toBeDisplayed();
      await expect(FormPage.backBtn).toBeClickable();
      await FormPage.backBtn.click();
      await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/timesheets');
    });

    it('Timesheet should not be deleted', async () => {
      await Timesheet.deleteCancelFunction();
    });
});