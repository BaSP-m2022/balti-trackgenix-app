const Header = require('../pageobjects/header');
const Sidebar = require('../pageobjects/sidebar');
const Footer = require('../pageobjects/footer');
const ListPage = require('../pageobjects/list.page');
const FormPage = require('../pageobjects/form.page');
const Tasks = require('../pageobjects/tasks.page');

describe('Tasks CRUD path testing', () => {
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

    it('Title: Tasks should be displayed', async () => {
        await expect(Header.tasks).toBeDisplayed();
        Header.tasks.click();
        await expect(ListPage.listTitle).toBeDisplayed();
        await expect(ListPage.listTitle).toHaveText('Tasks');
    });

    it('List table should be displayed', async () => {
      await Tasks.listDisplayed();
    });
});