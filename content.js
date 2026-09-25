const ELEMENTS_DATA = [
  {
    id: "message",
    elementSelector: "[data-test-id='message']",
    checkboxId: "message-checkbox",
    propName: "message",
  },
  {
    id: "new-chat-button",
    elementSelector: "[data-test-id='new-chat-button']",
    checkboxId: "new-chat-button-checkbox",
    propName: "newChatButton",
  },
  {
    id: "search-chats-button",
    elementSelector: "[data-test-id='search-chats-button']",
    checkboxId: "search-chats-button-checkbox",
    propName: "searchChatsButton",
  },
  {
    id: "students",
    elementSelector: "[data-test-id='learn-side-nav-entry-button']",
    checkboxId: "students-checkbox",
    propName: "students",
  },
  {
    id: "images",
    elementSelector: "[data-test-id='images-side-nav-entry-button']",
    checkboxId: "images-checkbox",
    propName: "images",
  },
  {
    id: "library",
    elementSelector: "[data-test-id='my-stuff-side-nav-entry-button']",
    checkboxId: "library-checkbox",
    propName: "library",
  },
  {
    id: "notebooks",
    elementSelector: "[data-test-id='notebooks-expandable-section']",
    checkboxId: "notebooks-checkbox",
    propName: "notebooks",
  },
  {
    id: "recents",
    elementSelector: "[data-test-id='chats-expandable-section']",
    checkboxId: "recents-checkbox",
    propName: "recents",
  },
  {
    id: "upgrade-button1",
    elementSelector: "[data-test-id='g1-dynamic-advanced-upsell-button']",
    checkboxId: "upgrade-button-checkbox",
    propName: "upgradeButton",
  },
  {
    id: "upgrade-button2",
    elementSelector: "[data-test-id='g1-dynamic-upsell-button']",
    checkboxId: "upgrade-button-checkbox",
    propName: "upgradeButton",
  },
  {
    id: "temp-chat-button",
    elementSelector: "[data-test-id='temp-chat-button-container']",
    checkboxId: "temp-chat-button-checkbox",
    propName: "tempChatButton",
  },
];

let hiddenElements;

(async () => {
  const browserApi = typeof browser !== "undefined" ? browser : chrome;
  const result = await browserApi.storage.local.get("hiddenElements");

  if (result.hiddenElements) {
    hiddenElements = result.hiddenElements;
  }
})();

const observer = new MutationObserver((mutations, obs) => {
  for (const elementData of ELEMENTS_DATA) {
    const element = document.querySelector(elementData.elementSelector);

    if (element === null) {
      continue;
    }
    if (hiddenElements && hiddenElements[elementData.propName]) {
      element.remove();
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
