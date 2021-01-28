class LoginService {
    static login(email, password) {
        return fetch("http://localhost:3000/login",
            {
                body: JSON.stringify({email: email, password: password}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, method: "POST"
            })
            .then(res => res.json())
    }

    static register(email, password) {
        return fetch("http://localhost:3000/register",
            {
                body: JSON.stringify({email: email, password: password}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, method: "POST"
            })
            .then(res => res.json())
    }
}

export default LoginService;