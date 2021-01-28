import React from "react";
import LoginService from "../service/LoginService";
import {mount} from "enzyme";
import Login from "../app/Login";
import {AuthContext} from "../context/auth";
// import Logout from "../Logout";
import {MemoryRouter} from "react-router";
import {act} from "react-dom/test-utils";


beforeAll(() => {
        LoginService.login = (email, _) => {
            // console.log(email)
            if (email === "valid@email") {
                return Promise.resolve({authenticated: true})
            }
            return Promise.resolve({authenticated: false})
        }
    }
)

describe("LoginService tests", () => {
    it('should receive {authenticated: false} on some random email/password', function () {
        return LoginService.login("123@456", "12345")
            .then(res => expect(res.authenticated).toBe(false))
    });
    it('should receive {authenticated: false} on some valid@enail', function () {
        return LoginService.login("valid@email", "12345")
            .then(res => expect(res.authenticated).toBe(true))
    });
})

describe("Login page tests", () => {
    it('should render login form if not authenticated', function () {
        const login = mount(<MemoryRouter><Login register={false}/></MemoryRouter>);

        expect(login.findWhere(n => n.text() === 'Email').exists()).toBe(true)
        expect(login.findWhere(n => n.text() === 'Password').exists()).toBe(true)
        expect(login.findWhere(n => n.name() === 'button' && n.text() === 'Login').exists()).toBe(true)
    });

    it('should render logout link if authenticated', function () {
        const context = {authenticated: true, email: "email"}
        const login = mount(
            <MemoryRouter>
                <AuthContext.Provider value={context}>
                    <Login register={false}/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(login.findWhere(n => n.name() === 'Link' && n.prop('to') === '/logout' && n.text() === 'Logout').exists()).toBe(true)
    });

    it('should authenticate on click', async function () {
        let numberOfCalls = 0;
        const context = {
            authenticated: false, email: undefined, set: (x, y) => {
                numberOfCalls++;
            }
        }

        let login = mount(
            <MemoryRouter>
                <AuthContext.Provider value={context}>
                    <Login register={false}/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        act(() => {
            login.find('[type="email"]').prop('onChange')({target: {value: 'valid@email'}})
        })
        act(() => {
            login.find('[type="password"]').prop('onChange')({target: {value: '12345'}})
        })

        await act(async () => {
            login.find('form').simulate('submit')
        })

        expect(numberOfCalls).toBe(1)
    });
})