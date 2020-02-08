function setValue(input, newValue) {
  let lastValue = input.value;
  input.value = newValue;
  let event = new Event('input', { bubbles: true });
  // hack React15
  event.simulated = true;
  // hack React16
  let tracker = input._valueTracker;
  if (tracker) {
    tracker.setValue(lastValue);
  }
  input.dispatchEvent(event);
}

browser.runtime.sendMessage({}).then(function(data) {
  for (let name of ["firstName", "lastName", "email", "phone", "zip"]) {
    const input = document.querySelector(`input[name="${name}"]`);
    if (input) {
      setValue(input, data[name]);
    }
  }
});
