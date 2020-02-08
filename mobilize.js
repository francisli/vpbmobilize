function setValue(input, newValue) {
  // https://github.com/facebook/react/issues/11488
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

function insert(data) {
  for (let name of ["firstName", "lastName", "email", "phone", "zip"]) {
    const input = document.querySelector(`input[name="${name}"]`);
    if (input) {
      setValue(input, data[name]);
    } else {
      setTimeout(function() {
        insert(data);
      }, 1000);
      return;
    }
  }
}

browser.runtime.sendMessage({}).then(insert);
