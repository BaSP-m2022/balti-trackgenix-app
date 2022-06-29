const test = require('../pageobjects/test.page');

describe('Projects entity test', () => {
  beforeAll('open browser',()=> {
    browser.url('https://balti-trackgenix-app.vercel.app/')
  })
  it('Button Projects on click', async () => {
    await test.open();
    await test.btnProjects.click();
    await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/projects');
  });
  it('Button Create Project on click', async () => {
    await test.btnCreateP.click();
    await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/projects/form');
  });
});