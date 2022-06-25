const test = require('../pageobjects/test.page');

describe('My Trackgenix test aplication', () => {
  beforeAll('open browser',()=> {
    browser.url('https://balti-trackgenix-app.vercel.app/')
  })
    it('The Header title should be Home', async () => {
      await expect(test.textHeader).toHaveTextContaining('Home');
    });
});


