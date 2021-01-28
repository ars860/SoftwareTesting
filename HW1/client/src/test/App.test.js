import React from 'react';
import App from '../app/App';
import {mount} from 'enzyme';
import Header from "../app/Header";
import "../setupTests"

describe('App tests', () => {
    it('should render header', function () {
        const app = mount(<App/>)
        expect(app.contains(<Header/>)).toBe(true);
    });
})