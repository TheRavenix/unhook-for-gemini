const checkboxes = document.querySelectorAll("input[type='checkbox']");

const hiddenElements = {
  message: true,
  newChatButton: false,
  searchChatsButton: true,
  students: true,
  images: true,
  library: true,
  notebooks: true,
  recents: true,
  upgradeButton: true,
  tempChatButton: true,
};

(async () => {
  const browserApi = typeof browser !== "undefined" ? browser : chrome;
  const result = await browserApi.storage.local.get("hiddenElements");

  if (!result.hiddenElements) {
    browserApi.storage.local.set({ hiddenElements });
  }

  checkboxes.forEach(async (checkbox) => {
    const result = await browserApi.storage.local.get("hiddenElements");

    if (result.hiddenElements) {
      checkbox.checked = result.hiddenElements[checkbox.name];
    }

    checkbox.addEventListener("change", async (e) => {
      const result = await browserApi.storage.local.get("hiddenElements");

      if (result.hiddenElements) {
        browserApi.storage.local.set({
          hiddenElements: {
            ...result.hiddenElements,
            [e.target.name]: e.target.checked,
          },
        });
      }
    });
  });
})();
