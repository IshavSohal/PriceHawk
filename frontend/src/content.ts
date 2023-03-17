import { getState, setState } from "./utilities/state";

function findName(): string | undefined {
  const selection = window.getSelection()?.toString();
  if (selection) return selection?.trim();

  const elements = Array.from(document.querySelectorAll(":hover"));
  return elements.pop()?.textContent?.trim() ?? undefined;
}

function findPrice(): { text: string; attributes: string } | undefined {
  let current = window.getSelection()?.getRangeAt(0)
    .startContainer.parentElement;
  while (current) {
    const rx = /\$(\d+(?:\.\d+)?)/;
    const price = current.textContent?.match(rx)?.at(1);
    if (price && current.className.length > 0) {
      return {
        text: price,
        attributes: `${current.className},${current.id}`,
      };
    }
    current = current.parentElement;
  }

  return undefined;
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  (async () => {
    const url = window.location.href.split("?")[0];
    const state = await getState(url);

    switch (msg) {
      case "PriceHawk-SetName":
        const name = findName();
        if (name === undefined) {
          sendResponse("Invalid name");
          break;
        }
        state.name = name;
        await setState(url, state);
        sendResponse(name);
        break;

      case "PriceHawk-SetPrice":
        const price = findPrice();
        if (price === undefined) {
          sendResponse("Invalid price");
          break;
        }
        state.price_text = price.text;
        state.price_attributes = price.attributes;
        await setState(url, state);
        sendResponse(price.text);
        break;

      case "PriceHawk-BeginTracking":
        sendResponse(JSON.stringify(state));
        break;
    }
  })();

  return true;
});
