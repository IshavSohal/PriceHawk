import { getState, setState } from "./utilities/state";

function findName(): string | undefined {
  const selection = window.getSelection()?.toString();
  if (selection) return selection?.trim();

  const elements = Array.from(document.querySelectorAll(":hover"));
  return elements.pop()?.textContent?.trim() ?? undefined;
}

function findPrice(): { text: string; attributes: string[] } | undefined {
  const elements = Array.from(document.querySelectorAll(":hover")).reverse();

  const rx = /\$(\d+(?:\.\d+)?)/;
  const price = elements.at(0)?.textContent?.match(rx)?.at(1);
  if (price === undefined) return undefined;

  const attributes = elements
    .map((element) => element.className + "," + element.id)
    .filter((attr) => attr.length > 1);

  return {
    text: price,
    attributes: attributes,
  };
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
