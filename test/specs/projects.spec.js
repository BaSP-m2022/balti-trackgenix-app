const Header = require('../pageobjects/header');
const Sidebar = require('../pageobjects/sidebar');
const Footer = require('../pageobjects/footer');

describe('Projects CRUD path testing', () => {
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

    it('Title: Projects should be displayed', async () => {
        await expect(Header.projects).toBeDisplayed();
        Header.projects.click();
        //await expect(SuperAdminHomePage.saTitle).toBeDisplayed();
        //await expect(SuperAdminHomePage.saTitle).toHaveText('Super Admins');
    });
});