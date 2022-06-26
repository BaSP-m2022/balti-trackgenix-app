class Footer {
  get facebook() {
      return $('#root > div > footer > div > div:nth-child(1) > a:nth-child(1) > img');
  }
  get twitter() {
      return $('#root > div > footer > div > div:nth-child(1) > a:nth-child(2) > img');
  }
  get instagram() {
      return $('#root > div > footer > div > div:nth-child(1) > a:nth-child(3) > img');
  }
  get copyright() {
      return $('#root > div > footer > div > div.footer_copyright__1FoOh');
  }

  async facebookDisplay() {
      await expect(this.facebook).toBeDisplayed();
      await expect(this.facebook).toBeClickable();
  }
  async twitterDisplay() {
      await expect(this.twitter).toBeDisplayed();
      await expect(this.twitter).toBeClickable();
  }
  async instaDisplay() {
      await expect(this.instagram).toBeDisplayed();
      await expect(this.instagram).toBeClickable();
  }
  async copyDisplay() {
      await expect(this.copyright).toBeDisplayed();
      await expect(this.copyright).toHaveText('Copyright © 2021 Radium Rocket');
  }

  async wholeFooterDisplay() {
      await this.facebookDisplay();
      await this.twitterDisplay();
      await this.instaDisplay();
      await this.copyDisplay();
  }
}

export default new Footer();