browser.runtime.sendMessage({}).then(function(data) {
  console.log("response received:", data);
  for (let name of ["firstName", "lastName", "email", "phone", "zip"]) {
    const input = document.querySelector(`input[name="${name}"]`);
    if (input) {
      input.value = data[name];
    }
  }
});
