class SuperAdminHomePage {
  get listTitle() {
      return $(' #root > div > div > section > h2');
  }
  get listTable() {
      return $('.list_container__21Buw > table');
  }
  get listHeader() {
      return $('.list_container__21Buw > table > thead > tr');
  }
  get listBody() {
      return $('.list_container__21Buw > table > tbody');
  }
  get createSaBtn() {
      return $('#root > div > div > section > div:nth-child(3) > a > button');
  }
  get editBtn() {
      return $('.list_container__21Buw > table > tbody > tr:nth-child(1) > td:nth-child(5) > a > button');
  }
  get deleteBtn() {
      return $('.list_container__21Buw > table > tbody > tr:nth-child(1) > td:nth-child(6) > span > button');
  }
  get deleteModalQuestion() {
      return $('#root > div > div > section > div.Modal_modalOverlay__1ukkt > div');
  }
  get deleteModalAcceptBtn() {
      return $('.Button_btn__3cUFC.Button_btnBlock__36Rss');
  }
  get deleteModalCancelBtn() {
      return $('.Button_btn__3cUFC.Button_redBtn__z6CdP');
  }
  get modalSuccessDelete() {
      return $('.Modal_modalOverlay__1ukkt > div');
  }

  async listDisplayed () {
      await expect(this.listTable).toBeDisplayed();
      await expect(this.listHeader).toBeDisplayed();
      await expect(this.listHeader).toHaveChildren(6);
      await expect(this.listHeader).toHaveTextContaining('First name');
      await expect(this.listHeader).toHaveTextContaining('Last name');
      await expect(this.listHeader).toHaveTextContaining('Email');
      await expect(this.listHeader).toHaveTextContaining('is Active');
      await expect(this.listHeader).toHaveTextContaining('Edit');
      await expect(this.listHeader).toHaveTextContaining('Delete');
  }
  async deleteCancelFunction () {
      await this.deleteBtn.click();
      await expect(this.deleteModalQuestion).toBeDisplayed();
    await expect(this.deleteModalQuestion).toHaveTextContaining(
      'Are you sure you want to delete this super admin?');
      await expect(this.deleteModalCancelBtn).toBeDisplayed();
      await this.deleteModalCancelBtn.click();
  }
  async deleteAcceptFunction () {
      await this.deleteBtn.click();
      await expect(this.deleteModalQuestion).toBeDisplayed();
      await expect(this.deleteModalQuestion).toBeHaveText('Are you sure you want to delete this super admin?');
      await expect(this.deleteModalAcceptBtn).toBeClickable();
      await this.deleteModalAcceptBtn.click();
  }
}

module.exports = new SuperAdminHomePage();