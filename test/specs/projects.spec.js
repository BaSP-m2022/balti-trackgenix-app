const Header = require('../pageobjects/header');
const Sidebar = require('../pageobjects/sidebar');
const Footer = require('../pageobjects/footer');
const ListPage = require('../pageobjects/list.page');
const FormPage = require('../pageobjects/form.page');
const Project = require('../pageobjects/project.page');

describe('Projects CRUD path testing', () => {
  beforeAll('Open browser', () => {
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

  it('Title: Projects should be displayed', async () => {
    await expect(Header.projects).toBeDisplayed();
    Header.projects.click();
    await expect(ListPage.listTitle).toBeDisplayed();
    await expect(ListPage.listTitle).toHaveText('Projects');
  });

  it('List table should be displayed', async () => {
    await Project.listDisplayed();
  });

  it('Edit button should be displayed', async () => {
    await expect(Project.editBtn).toBeDisplayed();
    await expect(Project.editBtn).toBeClickable();
  });

  it('Delete button should be displayed', async () => {
    await expect(Project.deleteBtn).toBeDisplayed();
    await expect(Project.deleteBtn).toBeClickable();
  });

  it('Create button should be displayed', async () => {
    await expect(ListPage.createSaBtn).toBeDisplayed();
    await expect(ListPage.createSaBtn).toBeClickable();
    await expect(ListPage.createSaBtn).toHaveText('Create Project');
    await ListPage.createSaBtn.click();
  });

  it('Title in the tab to create a new Project should be displayed', async () => {
    await expect(FormPage.title).toBeDisplayed();
    await expect(FormPage.title).toHaveText('Projects');
  });

  it('Form to create a new Project should be displayed', async () => {
    await expect(FormPage.form).toBeDisplayed();
    await expect(FormPage.form).toHaveChildren(12);
  });

  it('Back button should work properly', async () => {
    await expect(FormPage.backBtn).toBeDisplayed();
    await expect(FormPage.backBtn).toBeClickable();
    await FormPage.backBtn.click();
  });

  it('A new Project should NOT be created with empty fields', async () => {
    await ListPage.createSaBtn.click();
    await FormPage.errorInputsMsgs;
    await FormPage.backBtn.click();
  });

  it('A new Project should be created', async () => {
    await expect(ListPage.createSaBtn).toBeDisplayed();
    await expect(ListPage.createSaBtn).toBeClickable();
    await ListPage.createSaBtn.click();
    await Project.newProject(
      'Testing Project',
      'This project has been created for testing purposes',
      '25/05/2022',
      '25/06/2022',
      'Radium',
      'QA',
      '120',
      '50'
    );
  });

  it('OK button should close success message.', async () => {
    await expect(FormPage.modalOkBtn).toBeDisplayed();
    await expect(FormPage.modalOkBtn).toHaveText('OK');
    await expect(FormPage.modalOkBtn).toBeClickable();
    await FormPage.modalOkBtn.click();
  });

  it('Project should NOT be edited', async () => {
    await expect(Project.editBtn).toBeDisplayed();
    await expect(Project.editBtn).toBeClickable();
    await Project.editBtn.click();
    await expect(FormPage.backBtn).toBeDisplayed();
    await expect(FormPage.backBtn).toBeClickable();
    await FormPage.backBtn.click();
    await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/projects');
  });

  it('Project should be edited', async () => {
    await expect(Project.editBtn).toBeDisplayed();
    await expect(Project.editBtn).toBeClickable();
    await Project.editBtn.click();
    await Project.newProject(
      'Testing Project UPDATED',
      'This project has been created for testing purposes',
      '25/05/2022',
      '25/06/2022',
      'Radium',
      'QA',
      '120',
      '50'
    );
    await expect(FormPage.modalOkBtn).toBeDisplayed();
    await expect(FormPage.modalOkBtn).toBeClickable();
    await FormPage.modalOkBtn.click();
  });

  it('Project should NOT be deleted', async () => {
    await Project.deleteCancelFunction();
  });
/*
  it('Project should be deleted', async () => {
    await Project.deleteAcceptFunction();
  });

  it('Successful deletion message should be displayed', async () => {
      await expect(ListPage.modalSuccessDelete).toBeDisplayed();
      await expect(ListPage.modalSuccessDelete).toHaveText('Project deleted Successfully');
  });

  it('OK button should close successful deletion message.', async () => {
      await expect(ListPage.modalSuccessDelete).toBeDisplayed();
      await expect(ListPage.modalSuccessDelete).toHaveText('OK');
      await expect(ListPage.modalSuccessDelete).toBeClickable();
      await ListPage.modalSuccessDelete.click();
  });*/
});
