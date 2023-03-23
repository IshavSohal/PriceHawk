/* 
    https://developer.chrome.com/docs/extensions/mv3/tut_oauth/#create_call was used to get this function done 
    https://stackoverflow.com/questions/38985220/google-chrome-extension-how-to-find-out-if-a-user-has-signed-in-to-the-chrome-b for error
*/
import { getToken } from './session';

async function googleSignIn(setUser: any, fingerprint: string) {
    chrome.identity.getAuthToken({ interactive: true }, async function (token: any) {
        if (!token) {
            alert("Error Occured Signing In")
        }
        let init = {
            method: 'GET',
            async: true,
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            contentType: 'json'
        };

        const res1 = await fetch('https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names&key=AIzaSyCE9WUJp55t9nOJ24IAvKmeYsfkrzPlXwM', init).then((response) => response.json())

        let get_user = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: res1.emailAddresses[0].value,
                password: res1.names[0].givenName + res1.emailAddresses[0].value + res1.names[0].familyName
            })
        }
        const res2 = await fetch('http://127.0.0.1:8000/token-auth/', get_user).then((resp) => resp.json())

        if (res2.token !== undefined) {
            await chrome.storage.local.set({ "token": res2.token })
        }
        else {
            get_user = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: res1.emailAddresses[0].value,
                    email: res1.emailAddresses[0].value,
                    password: res1.names[0].givenName + res1.emailAddresses[0].value + res1.names[0].familyName
                })
            }
            await fetch('http://127.0.0.1:8000/googleRegister/', get_user)
            get_user = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: res1.emailAddresses[0].value,
                    password: res1.names[0].givenName + res1.emailAddresses[0].value + res1.names[0].familyName
                })
            }
            if (fingerprint) {
                await fetch("http://localhost:8000/users/migrate/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: res1.emailAddresses[0].value,
                        guestid: fingerprint
                    })
                })
            }
            await fetch('http://127.0.0.1:8000/token-auth/', get_user).then((resp) => resp.json()).then(async (data) => await chrome.storage.local.set({ "token": data.token }))

        }

        const response = await fetch("http://localhost:8000/users/current/", {
            headers: {
                "Authorization": `Token ${await getToken()}`
            }
        })
        setUser(await response.json());
    })
}

export default googleSignIn