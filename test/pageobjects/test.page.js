class test {
    //GETTERS
    // TEXTS
    get textHeader () { return $('#root > div > div > section > h2'); }
    get titleNav () { return $('#root > div > header > nav > div > h1 > a'); }
    get textSidebar () { return $('#root > div > div > aside > nav > span') }
    get textFooter () { return $('.footer_copyright__1FoOh') }
    get textEmployee () { return $('#root > div > div > section > h2') }
    get textTasks () { return $('#root > div > div > section > h2') }
    get resultModal () { return $('#root > div > div > section > div > div') }
    get resultModalTitle () { return $('#root > div > div > section > div > div > div.Modal_childrenContainer__CYvdG') }
    get resultModalEmp () { return $('#root > div > div > section > div') }
    // BUTTONS
    get btnAdmin () { return $('#root > div > header > nav > ul > li:nth-child(1) > a'); }
    get btnInstagram () { return $('#root > div > footer > div > div:nth-child(1) > a:nth-child(3) > img') }
    get btnTwitter () { return $('#root > div > footer > div > div:nth-child(1) > a:nth-child(2) > img') }
    get btnFacebook () { return $('#root > div > footer > div > div:nth-child(1) > a:nth-child(1) > img') }
    get btnAdmin () { return $('#root > div > header > nav > ul > li:nth-child(1) > a') }
    get btnSuperadmin () { return $('#root > div > header > nav > ul > li:nth-child(2) > a') }
    get btnEmployees () { return $('#root > div > header > nav > ul > li:nth-child(3) > a') }
    get btnProjects () { return $('#root > div > header > nav > ul > li:nth-child(4) > a') }
    get btnTasks () { return $('#root > div > header > nav > ul > li:nth-child(6) > a') }
    get btnTimesheets () { return $('#root > div > header > nav > ul > li:nth-child(5) > a') }
    get btnHome () { return $('#root > div > div > aside > nav > ul > li:nth-child(1) > a') }
    get btnSidebar () { return $('#root > div > div > aside > nav > ul > li:nth-child(1) > a') }
    get btnCreateP () { return $('#root > div > div > section > div:nth-child(3) > a > button') }
    get btnCreateE () { return $('#root > div > div > section > div:nth-child(3) > a > button') }
    get btnSave () { return $('.employee_btnsContainer__3bOE8 > button:nth-child(2)') }
    get btnBack () { return $('.employee_btnsContainer__3bOE8 > button.Button_btn__3cUFC.Button_redBtn__z6CdP') }
    get btnCreateT () { return $('#root > div > div > section > div:nth-child(3) > a > button') }
    get btnSelectT () { return $('#root > div > div > section > form > div:nth-child(1) > select') }
    get btnSelectEmployee () { return $('#root > div > div > section > form > div:nth-child(1) > select > option:nth-child(3)') }
    get btnSelectProject () { return $('#root > div > div > section > form > div:nth-child(2) > select > option:nth-child(2)') }
    get btnDate () { return $('#root > div > div > section > form > div:nth-child(5) > input[type=date]') }
    get btnDatePicker () { return $('//*[@id="root"]/div/div/section/form/div[5]/input') }
    get btnDatePickerTS () { return $('//*[@id="root"]/div/div/section/form/div[4]/input') }
    get btnDone () { return $('#root > div > div > section > form > div.Input_check__3GOia') }
    get btnModal () { return $('.Modal_buttonWrapper__2L1vP > button') }
    get btnSave2 () { return $('#root > div > div > section > form > div.tasks_btnsContainer__1K5l4 > button:nth-child(2)') }
    get btnOnlySelectP () { return $('#root > div > div > section > form > div:nth-child(2) > select') }
    get btnOnlySelectP2 () { return $('#root > div > div > section > form > div:nth-child(1) > select') }
    get btnSaveTimeSheets () { return $('.Form_buttonContainer__2as7i > button:nth-child(2)') }
    get btnBackTasks () { return $('.Button_redBtn__z6CdP') }
    get btnSelectPEmployees () { return $('#root > div > div > section > form > div.Select_inputContainer__1-U2d > select > option:nth-child(2)') }
    get btnOnlySelectProjectTS () { return $('#root > div > div > section > form > div:nth-child(1) > select > option:nth-child(2)') }
    get btnSelectTask () { return $('#root > div > div > section > form > div:nth-child(8) > select > option:nth-child(2)') }
    // INPUTS
    get inputFirstName () { return $('#root > div > div > section > form > div:nth-child(1) > input') }
    get inputLastName () { return $('#root > div > div > section > form > div:nth-child(2) > input') }
    get inputEmail () { return $('#root > div > div > section > form > div:nth-child(3) > input[type=email]') }
    get inputPassword () { return $('#root > div > div > section > form > div:nth-child(4) > input[type=password]') }
    get inputProjects () { return $('.Select_inputContainer__1-U2d > select') }
    get inputTitle () { return $('#root > div > div > section > form > div:nth-child(3) > input[type=text]') }
    get inputDescription () { return $('#root > div > div > section > form > div:nth-child(4) > input[type=text]') }
    get inputEmail () { return $('#root > div > div > section > form > div:nth-child(3) > input') }
    get inputPassword () { return $('#root > div > div > section > form > div:nth-child(4) > input') }
    get inputRole () { return $('#root > div > div > section > form > div:nth-child(3) > input[type=text]') }
    get inputRate () { return $('#root > div > div > section > form > div:nth-child(5) > input[type=number]') }
    get inputWh () { return $('#root > div > div > section > form > div:nth-child(6) > input[type=number]') }
    // ERRORS
    get errorName () { return $('#root > div > div > section > form > div:nth-child(1) > p') }
    get errorProject () { return $('#root > div > div > section > form > div:nth-child(2) > p') }
    get errorTitle () { return $('#root > div > div > section > form > div:nth-child(3) > p') }
    get errorLastName () { return $('#root > div > div > section > form > div:nth-child(2) > p') }
    get errorEmail() { return $('#root > div > div > section > form > div:nth-child(3) > p') }
    get errorPassword () { return $('#root > div > div > section > form > div:nth-child(4) > p') }
    get errorRole () { return $('#root > div > div > section > form > div:nth-child(3) > p') }
    get errorTimeSheetPr () { return $('#root > div > div > section > form > div:nth-child(1) > p') }
    get errorTimeSheetEmp () { return $('#root > div > div > section > form > div:nth-child(2) > p') }
    get errorDate () { return $('#root > div > div > section > form > div:nth-child(4) > p') }
    get errorRate () { return $('#root > div > div > section > form > div:nth-child(5) > p') }
    get errorWH () { return $('#root > div > div > section > form > div:nth-child(6) > p') }
    get errorTask () { return $('#root > div > div > section > form > div:nth-child(8) > p') }
    // SETTERS
    async setTitle(title) {
      await this.inputTitle.setValue(title);
    }
    async setDescription(description) {
      await this.inputDescription.setValue(description);
    }
    async setFirstName(firstName) {
      await this.inputFirstName.setValue(firstName);
    }
    async setLastName(lastName) {
      await this.inputLastName.setValue(lastName);
    }
    async setEmail(email) {
      await this.inputEmail.setValue(email);
    }
    async setPassword(password) {
      await this.inputPassword.setValue(password);
    }
    async setRole(role) {
      await this.inputRole.setValue(role);
    }
    async setRate(rate) {
      await this.inputRole.setValue(rate);
    }
    async setWh(workedhour) {
      await this.inputWh.setValue(workedhour);
    }
    // METHODS
    open () {
      return browser.url('https://balti-trackgenix-app.vercel.app/');
    }
    async OnClick (btnName) {
      switch (btnName) {
          case 'create':
              await this.btnCreateT.click();
              break;
          case 'back':
              await this.btnBackTasks.click();
              break;
          case 'confirm':
              await this.btnSave2.click();
              break;
          case 'ok':
              await this.btnModal.click();
              break;
          case 'Select':
              await this.btnSelectPEmployees.click();
              break;
      };
  };
  async completeFields(inputName, inputValue) {
    switch (inputName) {
      case 'name':
        await this.inputFirstName.setValue(inputValue);
        break;
      case 'lastname':
        await this.inputLastName.setValue(inputValue);
        break;
      case 'email':
        await this.inputEmail.setValue(inputValue);
        break;
      case 'password':
        await this.inputPassword.setValue(inputValue);
        break;
    }
  }
}

module.exports = new test();

