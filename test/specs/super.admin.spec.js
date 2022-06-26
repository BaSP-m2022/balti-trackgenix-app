import Header from '../pageobjects/header';
import Sidebar from '../pageobjects/sidebar';
import Footer from '../pageobjects/footer';

describe('Super Admins CRUD path testing', () => {
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

    it('Title: Super Admins should be displayed', async () => {
        await expect(Header.superAdmins).toBeDisplayed();
        Header.superAdmins.click();
        await expect(SuperAdminHomePage.saTitle).toBeDisplayed();
        await expect(SuperAdminHomePage.saTitle).toHaveText('Super Admins');
    });
});