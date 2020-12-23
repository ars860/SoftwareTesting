import React from 'react';
import App from '../App';
import {mount} from 'enzyme';
import Header from "../Header";
import "../setupTests"

describe('App tests', () => {
    it('should render header', function () {
        const app = mount(<App/>)
        expect(app.contains(<Header/>)).toBe(true);
    });

    it('should render links to all pages', () => {
        const app = mount(<App/>)

        const pages = ['counter', 'logout', 'blog']

        for (let page of pages) {
            expect(app.find("[to='/" + page + "']").exists()).toBeTruthy()
        }
    })
})