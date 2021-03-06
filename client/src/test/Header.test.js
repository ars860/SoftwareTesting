import React from "react";
import Header from "../app/Header";
import {mount} from "enzyme";
import {MemoryRouter} from "react-router-dom";
import {AuthContext} from "../app/context/auth";

describe('Header tests', () => {
    it("should contain only login and register if not authenticated", () => {
        const header = mount((<MemoryRouter><Header/></MemoryRouter>))

        expect(header.find('Link')).toHaveLength(2)
        expect(header.findWhere(n => n.name() === 'Link' && n.prop('to') === '/login').text()).toBe('Login')
        expect(header.findWhere(n => n.name() === 'Link' && n.prop('to') === '/register').text()).toBe('Register')
    })

    it("should contain logout, blog and email if authenticated", () => {
        const email = 'abacaba'
        const context = {
            authenticated: true,
            email: email
        }
        const header = mount(
            <MemoryRouter>
                <AuthContext.Provider value={context}>
                    <Header/>
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect(header.find('Link')).toHaveLength(3)
        expect(header.findWhere(n => n.name() === 'Link' && n.prop('to') === '/blog').text()).toBe('Blog o testirovanii')
        expect(header.findWhere(n => n.name() === 'Link' && n.prop('to') === '/logout').text()).toBe('Logout')
        expect(header.findWhere(n => n.name() === 'Link' && n.prop('to') === '/counter').text()).toBe('Counter')
        expect(header.findWhere(n => n.text() === email).exists()).toBe(true)
    })
})