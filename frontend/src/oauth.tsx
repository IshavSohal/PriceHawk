/* https://developer.chrome.com/docs/extensions/mv3/tut_oauth/#create_call was used to get this function done */

function googleSignIn(setUser:any) {
    chrome.identity.getAuthToken({ interactive: true }, function (token:any) {
        let init = {
            method: 'GET',
            async: true,
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            contentType: 'json'
        };
        fetch(
            'https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names&key=AIzaSyCE9WUJp55t9nOJ24IAvKmeYsfkrzPlXwM',
            init)
            .then((response) => response.json())
            .then(function (data) {
                let fields = new FormData()
                fields.append('username', data.emailAddresses[0].value)
                fields.append('password', data.names[0].givenName + data.emailAddresses[0].value + data.names[0].familyName)
                fields.append('first_name', data.names[0].givenName)
                fields.append('last_name', data.names[0].familyName)
                fields.append('email', data.emailAddresses[0].value)
                let get_user = {
                    method: 'POST',
                    body: fields,
                }
                fetch('http://127.0.0.1:8000/users/login/', get_user)
                    .then((response2) => response2.json())
                    .then(function (data2) {
                        if(data2.username == undefined){
                            setUser(data2['first_name'] + ' ' + data2['last_name'])
                        }
                        else{
                            fetch('http://127.0.0.1:8000/users/get/'+data.emailAddresses[0].value, { method : "GET"}).then((response3) => response3.json())
                            .then(function (data3) {
                                setUser(data3['first_name'] + ' ' + data3['last_name'])
                            })
                        }
                    })
            }).catch(() => alert("Error Signing In"));
    })
}

export default googleSignIn