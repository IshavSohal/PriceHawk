export type State = {
  url?: string;
  name?: string;
  price_text?: string;
  price_attributes?: string;
};

export async function getState(url: string): Promise<State> {
  const storageResults = await chrome.storage.local.get([url]);
  if (storageResults[url]) {
    return JSON.parse(storageResults[url]);
  }

  return {};
}

export async function setState(url: string, state: State) {
  state.url = url;
  await chrome.storage.local.set({ [url]: JSON.stringify(state) });
}
