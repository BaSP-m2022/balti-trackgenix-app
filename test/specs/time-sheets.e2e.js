const test = require('../pageobjects/test.page');

describe('Time-Sheets entity test', () => {
  beforeAll('open browser',()=> {
    browser.url('https://balti-trackgenix-app.vercel.app/')
  })
  // BUTTONS
  it('Button Time-Sheets on click', async () => {
    await test.open();
    await test.btnTimesheets.click();
    await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/timesheets');
  })
  it('Button Back on click', async () => {
    await test.btnCreateT.click();
    await test.btnBackTasks.click();
    await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/timesheets');
  })
  it('Button Create Time-Sheets on click', async () => {
    await test.btnCreateT.click();
    await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/timesheets/form');
  })
  // TEXTS CHECKS
  it('Testing Title form', async ()=> {
    await expect(test.textTasks).toHaveTextContaining('Time Sheets');
  })
  // ERRORS
  it('If project input its no selected should be error', async ()=> {
    await test.btnOnlySelectP2.click()
    await browser.pause(800);
    await test.btnOnlySelectP2.click()
    await test.btnSaveTimeSheets.click()
    await expect (test.errorTimeSheetPr).toHaveText('Project cannot be an empty field')
  })
  it('Page should be refreshed', async () => {
    await browser.refresh();
    await browser.pause(800);
  })
  it('If employees input its no selected should be error', async ()=> {
    await test.btnOnlySelectProjectTS.click()
    await test.btnOnlySelectP.click()
    await browser.pause(800);
    await test.btnOnlySelectP.click()
    await test.btnSaveTimeSheets.click()
    await expect (test.errorTimeSheetEmp).toHaveText('Employee cannot be an empty field')
  })
  it('Empty ROLE should be error', async ()=> {
    await test.open();
    await test.btnTimesheets.click()
    await test.btnCreateT.click()
    await test.btnOnlySelectProjectTS.click()
    await test.btnSelectProject.click()
    await test.setRole('')
    await test.btnSaveTimeSheets.click()
    await expect (test.errorRole).toHaveText('"Role" must be one of [DEV, QA, PM, TL]')
  })
  it('Empty DATE should be error', async ()=> {
    await test.open();
    await test.btnTimesheets.click()
    await test.btnCreateT.click()
    await test.btnOnlySelectProjectTS.click()
    await test.btnSelectProject.click()
    await test.setRole('QA')
    await test.btnSaveTimeSheets.click()
    await expect (test.errorDate).toHaveText('"Date" must be a valid date')
  })
  it('Empty RATE should be error', async ()=> {
    await test.open();
    await test.btnTimesheets.click()
    await test.btnCreateT.click()
    await test.btnOnlySelectProjectTS.click()
    await test.btnSelectProject.click()
    await test.setRole('QA')
    await test.btnDatePickerTS.setValue('18/01/2022')
    await test.btnSaveTimeSheets.click()
    await browser.pause(800);
    await expect (test.errorRate).toHaveText('"Rate" must be a number')
  })
  it('Empty WORKED HOURS should be error', async ()=> {
    await test.open();
    await test.btnTimesheets.click()
    await test.btnCreateT.click()
    await test.btnOnlySelectProjectTS.click()
    await test.btnSelectProject.click()
    await test.setRole('QA')
    await test.btnDatePickerTS.setValue('18/01/2022')
    await test.btnSaveTimeSheets.click()
    await browser.pause(800);
    await test.setRate('22');
    await expect (test.errorWH).toHaveText('"Worked Hours" must be a number')
  })
  it('If task input its no selected should be error', async ()=> {
    await test.open();
    await test.btnTimesheets.click()
    await test.btnCreateT.click()
    await test.btnOnlySelectProjectTS.click()
    await test.btnSelectProject.click()
    await test.setRole('QA')
    await test.btnDatePickerTS.setValue('18/01/2022')
    await browser.pause(800);
    await test.setRate('22');
    await test.setWh('48');
    await test.btnSaveTimeSheets.click()
    await expect (test.errorTask).toHaveText('Task cannot be an empty field')
  })
  // CREATE TIME-SHEETS SUCCESSFULLY
  it('Tasks validations complete', async ()=> {
    await test.open();
    await test.btnTimesheets.click()
    await test.btnCreateT.click()
    await test.btnOnlySelectProjectTS.click()
    await test.btnSelectProject.click()
    await test.setRole('QA')
    await test.btnDatePickerTS.setValue('18/01/2022')
    await browser.pause(800);
    await test.setRate('22');
    await test.setWh('48');
    await test.setDescription2('Create timesheets')
    await test.btnSelectTask.click()
    await test.btnSaveTimeSheets.click()
  });
});
