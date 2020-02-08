function scrape() {
  const data = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zip: ""
  };
  //// extract name
  const personPhonePanel = document.querySelector(".person-phone-panel h1 span");
  if (personPhonePanel) {
    let name = personPhonePanel.innerText;
    if (name) {
      const index = name.indexOf("–");
      if (index >= 0) {
        name = name.substring(0, index).trim();
      }
      const tokens = name.split(" ");
      if (tokens.length > 0) {
        data.firstName = tokens[0];
      }
      if (tokens.length > 1) {
        data.lastName = tokens[tokens.length - 1];
      }
    }
  } else {
    setTimeout(scrape, 1000);
    return;
  }
  //// extract phone number and zip
  const additionalInfoTable = document.querySelectorAll("#spanTableAdditionalInfo .input-unit");
  for (let row of additionalInfoTable) {
    const label = row.querySelector(".input-label");
    const value = row.querySelector(".form-control");
    if (label && value) {
      if (label.innerText == "Preferred Phone") {
        data.phone = value.innerText.replace(/[\(\)\- ]/gi, "");
      } else if (label.innerText == "Voting City and Zip") {
        const match = value.innerText.match(/\d{5}/g);
        if (match) {
          data.zip = match[0];
        }
      }
    }
  }
  //// extract first email
  const vanId = document.querySelector('input[type="hidden"][name="VanID"]');
  if (vanId) {
    const emailTable = document.querySelectorAll(`#ctl00_ContentPlaceHolderVANPage_VANSectionHeadingWide_ctl00_innerContentPanel_EMail_${vanId.value}_Content table tr td:nth-child(2)`);
    for (let row of emailTable) {
      let email = row.innerText;
      if (email.endsWith("*")) {
        email = email.substring(0, email.length - 1);
      }
      data.email = email;
      break;
    }
  }
  //// send to background script
  browser.runtime.sendMessage(data)
}

//// execute after a delay, due to async data loading after page load
setTimeout(scrape, 1000);
