let data = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  zip: ""
};
browser.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (sender.url.startsWith("https://www.votebuilder.com") || sender.url.startsWith("https://www.openvpb.com")) {
    //// store updated contact info
    data = message;
    //// refresh any events pages so form is reset
    browser.tabs.query({url: "https://events.berniesanders.com/event/*"}).then(function(tabs) {
      for (let tab of tabs) {
        browser.tabs.reload(tab.id);
      }
    });
  } else {
    //// this is a request from an events page, so send back the data
    sendResponse(data);
  }
});
