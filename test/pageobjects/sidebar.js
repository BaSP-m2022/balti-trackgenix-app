class Sidebar {
  get title() {
      return $('#root > div > div > aside > nav > span');
  }
  get homepage() {
      return $('#root > div > div > aside > nav > ul > li:nth-child(1)');
  }
  get whatIsTG() {
      return $('#root > div > div > aside > nav > ul > li:nth-child(2)');
  }
  get whyChooseTG() {
      return $('#root > div > div > aside > nav > ul > li:nth-child(3)');
  }
  get aboutTG() {
      return $('#root > div > div > aside > nav > ul > li:nth-child(4)');
  }
  get contactTG() {
      return $('#root > div > div > aside > nav > ul > li:nth-child(5)');
  }
  get login() {
      return $('#root > div > div > aside > nav > ul > li:nth-child(6)');
  }

  async titleDisplay() {
      await expect(this.title).toBeDisplayed();
      await expect(this.title).toHaveText('Shortcuts');
  }
  async hpDisplay() {
      await expect(this.homepage).toBeDisplayed();
      await expect(this.homepage).toHaveText('Homepage');
      await expect(this.homepage).toBeClickable();
  }
  async whatDisplay() {
      await expect(this.whatIsTG).toBeDisplayed();
      await expect(this.whatIsTG).toHaveText('What is Trackgenix?');
      await expect(this.whatIsTG).toBeClickable();
  }
  async whyDisplay() {
      await expect(this.whyChooseTG).toBeDisplayed();
      await expect(this.whyChooseTG).toHaveText('Why choose Trackgenix?');
      await expect(this.whyChooseTG).toBeClickable();
  }
  async aboutDisplay() {
      await expect(this.aboutTG).toBeDisplayed();
      await expect(this.aboutTG).toHaveText('About us');
      await expect(this.aboutTG).toBeClickable();
  }
  async contactDisplay() {
      await expect(this.contactTG).toBeDisplayed();
      await expect(this.contactTG).toHaveText('Get in touch');
      await expect(this.contactTG).toBeClickable();
  }
  async loginLinkDisplay() {
      await expect(this.login).toBeDisplayed();
      await expect(this.login).toHaveText('Log in');
      await expect(this.login).toBeClickable();
  }

  async wholeSidebarDisplay() {
      await this.titleDisplay();
      await this.hpDisplay();
      await this.whatDisplay();
      await this.whyDisplay();
      await this.aboutDisplay();
      await this.contactDisplay();
      await this.loginLinkDisplay();
  }
}

module.exports = new Sidebar();