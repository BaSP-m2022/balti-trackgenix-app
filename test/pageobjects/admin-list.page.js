class AdminsPage {
  //admins lst
  get adminsTitle() {
    return $('#root > div > div > section > h2');
  }
  get adminsList() {
    return $('#root > div > div > section > div.list_container__21Buw > table');
  }
  get createBtn() {
    return $('#root > div > div > section > div:nth-child(3) > a');
  }
  get editBtn() {
    return $(
      '#root > div > div > section > div.list_container__21Buw > table > tbody > tr:nth-child(1) > td:nth-child(5) > a'
    );
  }
  get deleteBtn() {
    return $(
      '#root > div > div > section > div.list_container__21Buw > table > tbody > tr:last-child > td:nth-child(6) > span > button'
    );
  }
}

module.exports = new AdminsPage();
