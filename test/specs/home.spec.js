//import Page from '../pageobjects/page';
const HomePage = require('../pageobjects/Home.page');

describe('Homepage testing path', () => {
  beforeAll('Open browser', () => {
    browser.url('https://balti-trackgenix-app.vercel.app/');
  });
  //header
  it('Title App should be display and have a link', async () => {
    await expect(HomePage.headerTitle).toBeDisplayed();
    await expect(HomePage.titleLink).toBeClickable();
    await expect(HomePage.titleLink).toHaveHrefContaining('/');
  });

  it('Header list and its elements should be display', async () => {
    await expect(HomePage.headerList).toBeDisplayed();
    await expect(HomePage.adminLink).toBeDisplayed();
    await expect(HomePage.superAdminLink).toBeDisplayed();
    await expect(HomePage.employeeLink).toBeDisplayed();
    await expect(HomePage.projectLink).toBeDisplayed();
    await expect(HomePage.timeSheetLink).toBeDisplayed();
    await expect(HomePage.taskLink).toBeDisplayed();
  });

  it('Testing the function of the header list links', async () => {
    await expect(HomePage.adminLink).toHaveHrefContaining('/admins');
    await expect(HomePage.adminLink).toBeClickable();
    await expect(HomePage.superAdminLink).toHaveHrefContaining('/super-admins');
    await expect(HomePage.superAdminLink).toBeClickable();
    await expect(HomePage.employeeLink).toHaveHrefContaining('/employees');
    await expect(HomePage.employeeLink).toBeClickable();
    await expect(HomePage.projectLink).toHaveHrefContaining('/projects');
    await expect(HomePage.projectLink).toBeClickable();
    await expect(HomePage.timeSheetLink).toHaveHrefContaining('/timesheets');
    await expect(HomePage.timeSheetLink).toBeClickable();
    await expect(HomePage.taskLink).toHaveHrefContaining('/tasks');
    await expect(HomePage.taskLink).toBeClickable();
  });
  //sidebar
  it('Sidebar should be displayed', async () => {
    await expect(HomePage.asideContainer).toBeDisplayed();
    await expect(HomePage.asideList).toBeDisplayed();
  });

  it('Sidebar links function', async () => {
    await expect(HomePage.homepageShortCut).toBeDisplayed();
    //await expect(HomePage.homepageShortCut).toHaveHrefContaining();
    await expect(HomePage.homepageShortCut).toBeClickable();
    await expect(HomePage.whatIsShortCut).toBeDisplayed();
    //await expect(HomePage.whatIsShortCut).toHaveHrefContaining();
    await expect(HomePage.whatIsShortCut).toBeClickable();
    await expect(HomePage.whyShortCut).toBeDisplayed();
    //await expect(HomePage.whyShortCut).toHaveHrefContaining();
    await expect(HomePage.whyShortCut).toBeClickable();
    await expect(HomePage.aboutShortCut).toBeDisplayed();
    //await expect(HomePage.aboutShortCut).toHaveHrefContaining();
    await expect(HomePage.aboutShortCut).toBeClickable();
    await expect(HomePage.touchShortCut).toBeDisplayed();
    //await expect(HomePage.touchShortCut).toHaveHrefContaining();
    await expect(HomePage.touchShortCut).toBeClickable();
    await expect(HomePage.loginShortCut).toBeDisplayed();
    //await expect(HomePage.loginShortCut).toHaveHrefContaining();
    await expect(HomePage.loginShortCut).toBeClickable();
  });
  //footer
  it('Social media links should be displayed and redirect correctly', async () => {
    await expect(HomePage.facebookLink).toBeDisplayed();
    await expect(HomePage.facebookLink).toHaveHrefContaining(
      'https://www.facebook.com/radiumrocket'
    );
    await expect(HomePage.facebookLink).toBeClickable();
    await expect(HomePage.twitterLink).toBeDisplayed();
    await expect(HomePage.twitterLink).toHaveHrefContaining('https://twitter.com/radiumrocket');
    await expect(HomePage.twitterLink).toBeClickable();
    await expect(HomePage.instaLink).toBeDisplayed();
    await expect(HomePage.instaLink).toHaveHrefContaining(
      'https://www.instagram.com/radium.rocket/'
    );
    await expect(HomePage.instaLink).toBeClickable();
  });

  it('Copyright is displayed', async () => {
    await expect(HomePage.copyright).toBeDisplayed();
  });
});
