/**
 * This file should contain all user session related
 * helper/utility methods.
 */

/**
 * Get current user
 * @returns logged in users auth token
 */
export async function getToken() {
    const data = await chrome.storage.local.get(["token"]);
    return data.token;
}

export async function getFingerPrintChrome() {
    const data = await chrome.storage.local.get(["fingerprint"]);
    return data.fingerprint;
}

export async function setFingerPrintChrome(fingerprint: string) {
    await chrome.storage.local.set({ "fingerprint": fingerprint });
}
