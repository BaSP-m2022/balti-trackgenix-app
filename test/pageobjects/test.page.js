class test {

    get textHeader () { return $('#root > div > div > section > h2'); }

    get titleNav () { return $('#root > div > header > nav > div > h1 > a'); }

    get btnAdmin () { return $('#root > div > header > nav > ul > li:nth-child(1) > a'); }

    open () {
        return super.open('https://balti-trackgenix-app.vercel.app/');
    }
}

module.exports = new test();

