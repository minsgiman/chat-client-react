import React from 'react';
import { mount } from 'enzyme';
import SelectDlg from './../src/components/selectDlg';
import jest from 'jest-mock';

describe('SelectDlg', () => {
    const title = 'TestTitle';
    const message = 'TestMessage';
    const okValue = 'ok';
    const nokValue = 'nok';
    const selectFn = jest.fn();
    let component = null;

    beforeEach(() => {
        component = mount(<SelectDlg onDlgClose={()=>alert('close')}
                                     title={title}
                                     message={message}
                                     onSelect={selectFn}
                                     firstvalue={okValue}
                                     secondvalue={nokValue}/>);
    });

    afterEach(() => {
        component.unmount();
    });


    it('match snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    it('renders title and message', () => {
        expect(component.props().title).toBe(title);
        expect(component.props().message).toBe(message);
        expect(component.find('h2').contains(title)).toBe(true);
        expect(component.find('p').text()).toBe(message);
    });

    it('click select button', () => {
        const firstBtn = component.find('button:first-child');
        firstBtn.simulate('click');
        expect(selectFn).toBeCalledWith(okValue);
    });
});

