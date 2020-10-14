import React from "react";
import LoginService from "../service/LoginService";
import {mount} from "enzyme";
import Login from "../Login";
import {AuthContext} from "../context/auth";
import Logout from "../Logout";
import {MemoryRouter} from "react-router";
import {act} from "react-dom/test-utils";

global.fetch = jest.fn((path, init) => {
        return Promise.resolve({
            json: () => {
                const body = JSON.parse(init.body)
                let res = {authenticated: false};
                if (body.email === "valid@email") {
                    res.authenticated = true;
                }
                return Promise.resolve(res)
            },
        })
    }
);

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

//TODO: this test doesn't work
// look at some act() shenanigans
describe("Login page tests", () => {
    it('should render login form if not authenticated', function () {
        const login = mount(<Login/>);

        expect(login.findWhere(n => n.prop('controlId') === 'email').exists()).toBe(true)
        expect(login.findWhere(n => n.prop('controlId') === 'password').exists()).toBe(true)
        expect(login.findWhere(n => n.name() === 'Button' && n.text() === 'Login').exists()).toBe(true)
    });

    it('should render logout link if authenticated', function () {
        const context = {authenticated: true, email: "email"}
        const login = mount(
            <MemoryRouter>
                <AuthContext.Provider value={context}>
                    <Login/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(login.findWhere(n => n.name() === 'Link' && n.prop('to') === '/logout' && n.text() === 'Logout').exists()).toBe(true)
    });

    it('should authenticate on click', function () {
        let numberOfCalls = 0;
        const context = {
            authenticated: false, email: undefined, set: (x, y) => {
                act(() => {
                    console.log("a");
                    numberOfCalls++;
                })
            }
        }

        const login = mount(
            <MemoryRouter>
                <AuthContext.Provider value={context}>
                    <Login/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        act(() => {
            login.find("#email").simulate('change', {target: {value: "valid@email"}})
        })
        act(() => {
            login.find('#password').simulate('change', {target: {value: "12345"}})
        })
        act(() => {
            login.find('form').simulate('submit')
        })

        expect(numberOfCalls).toBe(1)
    });
})