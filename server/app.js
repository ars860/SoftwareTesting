const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json());
app.use(cors());

const port = 3000

let counter = 0;

// I am to lazy to do bd stuff here
const users = [
    {email: "Arkasha@ma.il", password: "12345"},
    {email: "Aba@Caba", password: "menya_ne_vzlomat!"},
    {email: "admi@n", password: "admin"}
]

const usersDict = new Map(users.map(user => [user.email, user]));

app.get('/', (req, res, next) => {
    res.send('Hello World!')
})

app.get('/counter', (req, res, next) => {
    res.send(`${counter}`)
    counter++
})

app.post('/login', (req, res, next) => {
    const email = req.body.email
    // very safe shit right here
    const password = req.body.password

    const user = usersDict.get(email);
    if (user !== undefined && user.password === password) {
        res.send({authenticated: true})
    } else {
        res.send({authenticated: false})
    }
})

app.post('/register', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const checkPassword = pass => pass.indexOf('@') !== -1 && pass.indexOf("123") !== -1;

    if (checkPassword(password)) {
        if (usersDict.get(email) === undefined) {
            usersDict.set(email, {email: email, password: password});
            res.send({success: true})
        } else {
            res.send({success: false, msg: "User with that email already exists!"})
        }
    } else {
        res.send({success: false, msg: 'Password must contain at least one "@" and one "123"!'})
    }
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})