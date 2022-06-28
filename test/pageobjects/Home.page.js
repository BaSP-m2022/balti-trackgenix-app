//import Page from './page';

class HomePage {
  //header
  get headerTitle() {
    return $('#root > div > header > nav > div > h1');
  }
  get titleLink() {
    return $('#root > div > header > nav > div > h1 > a');
  }

  get headerList() {
    return $('.header_rutes__WhruE');
  }
  get adminLink() {
    return $('#root > div > header > nav > ul > li:nth-child(1) > a');
  }
  get superAdminLink() {
    return $('#root > div > header > nav > ul > li:nth-child(2) > a');
  }
  get employeeLink() {
    return $('#root > div > header > nav > ul > li:nth-child(3) > a');
  }
  get projectLink() {
    return $('#root > div > header > nav > ul > li:nth-child(4) > a');
  }
  get timeSheetLink() {
    return $('#root > div > header > nav > ul > li:nth-child(5) > a');
  }
  get taskLink() {
    return $('#root > div > header > nav > ul > li:nth-child(6) > a');
  }
  //sidebar
  get asideContainer() {
    return $('#root > div > div > aside');
  }
  get asideList() {
    return $('#root > div > div > aside > nav > ul');
  }
  get homepageShortCut() {
    return $('#root > div > div > aside > nav > ul > li:nth-child(1) > a');
  }
  get whatIsShortCut() {
    return $('#root > div > div > aside > nav > ul > li:nth-child(2) > a');
  }
  get whyShortCut() {
    return $('#root > div > div > aside > nav > ul > li:nth-child(3) > a');
  }
  get aboutShortCut() {
    return $('#root > div > div > aside > nav > ul > li:nth-child(4) > a');
  }
  get touchShortCut() {
    return $('#root > div > div > aside > nav > ul > li:nth-child(5) > a');
  }
  get loginShortCut() {
    return $('#root > div > div > aside > nav > ul > li:nth-child(6) > a');
  }
  //section
  get sectionContainer() {
    return $('#root > div > div > section');
  }
  get sectionTitle() {
    return $('#root > div > div > section > h2');
  }
  //footer
  get facebookLink() {
    return $('#root > div > footer > div > div:nth-child(1) > a:nth-child(1)');
  }
  get twitterLink() {
    return $('#root > div > footer > div > div:nth-child(1) > a:nth-child(2)');
  }
  get instaLink() {
    return $('#root > div > footer > div > div:nth-child(1) > a:nth-child(3)');
  }
  get copyright() {
    return $('#root > div > footer > div > div.footer_copyright__1FoOh');
  }
}

module.exports = new HomePage();
