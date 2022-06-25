class test {
//GETTERS
    get textHeader () { return $('#root > div > div > section > h2'); }
    get titleNav () { return $('#root > div > header > nav > div > h1 > a'); }
    get btnAdmin () { return $('#root > div > header > nav > ul > li:nth-child(1) > a'); }
    get textSidebar () { return $('#root > div > div > aside > nav > span') }
    get textFooter () { return $('.footer_copyright__1FoOh') }
    get btnInstagram () { return $('#root > div > footer > div > div:nth-child(1) > a:nth-child(3) > img') }
    get btnTwitter () { return $('#root > div > footer > div > div:nth-child(1) > a:nth-child(2) > img') }
    get btnFacebook () { return $('#root > div > footer > div > div:nth-child(1) > a:nth-child(1) > img') }
    get btnAdmin () { return $('#root > div > header > nav > ul > li:nth-child(1) > a') }
    get btnSuperadmin () { return $('#root > div > header > nav > ul > li:nth-child(2) > a') }
    get btnEmployees () { return $('#root > div > header > nav > ul > li:nth-child(3) > a') }
    get btnProjects () { return $('#root > div > header > nav > ul > li:nth-child(4) > a') }
    get btnTasks () { return $('#root > div > header > nav > ul > li:nth-child(6) > a') }
    get btnTimesheets () { return $('#root > div > header > nav > ul > li:nth-child(5) > a') }
// METHODS
    open () {
        return test.open('https://balti-trackgenix-app.vercel.app/');
    }
}

module.exports = new test();

