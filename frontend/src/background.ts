import { getToken } from "./utilities/session";
import { getState, State } from "./utilities/state";

async function getCurrentTab() {
  let [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  return tab;
}

async function beginTracking(state: State) {
  const authToken = await getToken();
  const res = await fetch("http://localhost:8000/items/create/", {
    method: "POST",
    body: JSON.stringify({
      name: state.name,
      price: state.price_text,
      price_html: state.price_attributes,
      url: state.url,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${authToken}`,
    },
  });
  if (!res.ok) console.log(await res.text());
  return res.ok;
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "PriceHawk",
    title: "Price Hawk - Track Item",
    contexts: ["all"],
  });

  chrome.contextMenus.create({
    id: "PriceHawk-SetName",
    parentId: "PriceHawk",
    title: "Set Name",
    contexts: ["all"],
  });

  chrome.contextMenus.create({
    id: "PriceHawk-SetPrice",
    parentId: "PriceHawk",
    title: "Set Price",
    contexts: ["all"],
  });

  chrome.contextMenus.create({
    id: "PriceHawk-BeginTracking",
    parentId: "PriceHawk",
    title: "Begin Tracking",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener(async (event) => {
  const currentTab = await getCurrentTab();
  if (currentTab?.id === undefined) return;

  const response = await chrome.tabs.sendMessage(
    currentTab.id,
    event.menuItemId
  );

  switch (event.menuItemId) {
    case "PriceHawk-SetName":
      chrome.contextMenus.update("PriceHawk-SetName", {
        title: `Set Name (${response})`,
      });
      break;

    case "PriceHawk-SetPrice":
      chrome.contextMenus.update("PriceHawk-SetPrice", {
        title: `Set Price (${response})`,
      });
      break;

    case "PriceHawk-BeginTracking":
      beginTracking(JSON.parse(response) as State);
      break;
  }
});

chrome.tabs.onActivated.addListener(async (changeInfo) => {
  const tab = await chrome.tabs.get(changeInfo.tabId);
  if (tab?.url === undefined) return;
  const state = await getState(tab.url.split("?")[0]);

  if (state.name) {
    chrome.contextMenus.update("PriceHawk-SetName", {
      title: `Set Name (${state.name})`,
    });
  } else {
    chrome.contextMenus.update("PriceHawk-SetName", {
      title: `Set Name`,
    });
  }

  if (state.price_text) {
    chrome.contextMenus.update("PriceHawk-SetPrice", {
      title: `Set Price (${state.price_text})`,
    });
  } else {
    chrome.contextMenus.update("PriceHawk-SetPrice", {
      title: `Set Price`,
    });
  }
});
