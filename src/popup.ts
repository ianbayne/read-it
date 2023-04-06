const dateTimePicker = document.querySelector(
  "#last-viewed-time"
) as HTMLInputElement;

if (dateTimePicker) {
  dateTimePicker.value = new Date(
    new Date().toString().split("GMT")[0] + " UTC"
  )
    .toISOString()
    .split(".")[0];
}

const submitButton = document.querySelector("#submit");

const getTabsAsync = chrome.tabs.query({
  url: ["https://old.reddit.com/r/*/comments/*"],
});

submitButton?.addEventListener("click", async () => {
  getTabsAsync.then((tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id as number, {
        selectedDateTime: dateTimePicker.value,
      });
    });
  });
});
