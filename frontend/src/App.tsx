import { useState } from "react";
import googleSignIn from "./googleSignIn";

function App() {
    const [user, setUser] = useState('')
    return (<>
        {user ? <p>Hi! {user}</p> : <button id="google-login" onClick={() => googleSignIn(setUser)}>Sign In With Google</button>}
    </>
    )
}

export default App;
