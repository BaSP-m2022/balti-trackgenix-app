class Header {
  get title() {
      return $('#root > div > header > nav > div > h1 > a');
  }
  get admins() {
      return $(' #root > div > header > nav > ul > li:nth-child(1) > a');
  }
  get superAdmins() {
      return $('#root > div > header > nav > ul > li:nth-child(2) > a');
  }
  get employees() {
      return $('#root > div > header > nav > ul > li:nth-child(3) > a');
  }
  get projects() {
      return $('#root > div > header > nav > ul > li:nth-child(4) > a');
  }
  get timesheets() {
      return $('#root > div > header > nav > ul > li:nth-child(5) > a');
  }
  get tasks() {
      return $('#root > div > header > nav > ul > li:nth-child(6) > a');
  }

  async titleDisplay() {
      await expect(this.title).toBeDisplayed();
      await expect(this.title).toHaveText('TRACKGENIX');
  }
  async adminsDisplay() {
      await expect(this.admins).toBeDisplayed();
      await expect(this.admins).toHaveText('Admins');
      await expect(this.admins).toBeClickable();
  }
  async superAdmDisplay() {
      await expect(this.superAdmins).toBeDisplayed();
      await expect(this.superAdmins).toHaveText('Super Admins');
      await expect(this.superAdmins).toBeClickable();
  }
  async employeesDisplay() {
      await expect(this.employees).toBeDisplayed();
      await expect(this.employees).toHaveText('Employees');
      await expect(this.employees).toBeClickable();
  }
  async projectsDisplay() {
      await expect(this.projects).toBeDisplayed();
      await expect(this.projects).toHaveText('Projects');
      await expect(this.projects).toBeClickable();
  }
  async timeshDisplay() {
      await expect(this.timesheets).toBeDisplayed();
      await expect(this.timesheets).toHaveText('Timesheets');
      await expect(this.timesheets).toBeClickable();
  }
  async taskDisplay() {
      await expect(this.tasks).toBeDisplayed();
      await expect(this.tasks).toHaveText('Tasks');
      await expect(this.tasks).toBeClickable();
  }

  async wholeHeaderDisplay() {
      await this.titleDisplay();
      await this.adminsDisplay();
      await this.superAdmDisplay();
      await this.employeesDisplay();
      await this.projectsDisplay();
      await this.timeshDisplay();
      await this.taskDisplay();
  }

  async TGredirection() {
      await expect(this.title).toBeClickable();
      await this.title.click();
      await expect(browser).toHaveUrl('https://balti-trackgenix-app.vercel.app/');
  }
}

export default new Header();