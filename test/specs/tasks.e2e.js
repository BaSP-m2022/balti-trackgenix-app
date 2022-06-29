const test = require('../pageobjects/test.page');

describe('Tasks entity test', () => {
  beforeAll('open browser',()=> {
    browser.url('https://balti-trackgenix-app.vercel.app/')
  })
  // BUTTONS
  it('Button Tasks on click', async () => {
    await test.open();
    await test.btnTasks.click();
    await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/tasks');
  })
  it('Button Create Tasks on click', async () => {
    await test.btnCreateT.click();
    await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/tasks/form');
  })
  // TEXTS CHECKS
  it('Testing Title form', async ()=> {
    await expect(test.textTasks).toHaveTextContaining('Tasks');
  })
  // ERRORS
  it('If project input its no selected', async ()=> {
    await test.btnOnlySelectP.click()
    await browser.pause(800);
    await test.btnOnlySelectP.click()
    await test.btnSave2.click()
    await expect (test.errorProject).toHaveText('"Project ID" is not allowed to be empty')
  })
  it('Empty title should be error', async ()=> {
    await test.open();
    await test.btnTasks.click()
    await test.btnCreateT.click()
    await test.btnSelectEmployee.click()
    await test.btnSelectProject.click()
    await test.setTitle('')
    await test.btnSave2.click()
    await expect (test.errorTitle).toHaveText('"Title" is not allowed to be empty')
  })
  // COMPLETE ALL VALIDATIONS SUCCESS
  it('Task created successfully', async ()=> {
      await test.btnSelectT.click()
      await test.btnSelectEmployee.click()
      await expect (test.btnSelectEmployee).toHaveText('Naruto Uzumaki')
      await browser.pause(800);
      await test.btnSelectProject.click()
      await expect (test.btnSelectProject).toHaveText('Trackgenix')
      await browser.pause(800);
      await test.setTitle('Create modal')
      await browser.pause(800);
      await test.setDescription('Create modal from success tasks')
      await browser.pause(800);
      await test.btnDate.click()
      await test.btnDatePicker.setValue('18/01/2022')
      await test.btnDone.click()
      await test.btnSave2.click()
      await test.resultModal.waitForDisplayed(3000)
      await test.btnModal.click()
      await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/tasks');
  })
});