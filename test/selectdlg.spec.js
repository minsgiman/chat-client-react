import React from 'react';
import ReactDOM from 'react-dom';
import {act} from 'react-dom/test-utils';
import SelectDlg from './../src/components/selectDlg';

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it('select dialog test', () => {
    const title = 'TestTitle';
    const message = 'TestMessage';
    const okValue = 'ok';
    const nokValue = 'nok';

    act(() => {
        ReactDOM.render(<SelectDlg onDlgClose={()=>alert('close')}
                title={title}
                message={message}
                onSelect={selectCb}
                firstvalue={okValue}
                secondvalue={nokValue}
        />, container);
    });
    expect(container.textContent).toContain(title);
    expect(container.textContent).toContain(message);

    const firstBtn = container.querySelector('button');
    act(() => {
        firstBtn.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    function selectCb(value) {
        expect(value).toBe(okValue);
    }
});