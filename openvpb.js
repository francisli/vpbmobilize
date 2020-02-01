function extract() {
  const data = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zip: ""
  };
  //// extract name
  const personPhonePanel = document.querySelector(".script-person-header h2");
  if (personPhonePanel) {
    const name = personPhonePanel.innerText;
    if (name) {
      const tokens = name.split(" ");
      if (tokens.length > 0) {
        data.firstName = tokens[0];
      }
      if (tokens.length > 1) {
        data.lastName = tokens[tokens.length - 1];
      }
    }
  }
  //// extract phone number and zip
  const additionalInfoTable = document.querySelectorAll(".openvpb-sidebar-fields ul li");
  for (let row of additionalInfoTable) {
    const label = row.querySelector("h4");
    const value = row.querySelector("p");
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
  //// TODO extract email- need example HTML to determine selector...?

  //// send to background script
  browser.runtime.sendMessage(data)
}

//// execute after a delay, due to async data loading after page load
setTimeout(extract, 1000);

//// set up handler to do the same after every button click (Skip/Save/etc)
//// since this is an SPA wihout an explicit refresh
document.addEventListener('click', function(e) {
  if (e.target.tagName == 'BUTTON') {
    setTimeout(extract, 1000);
  }
});
