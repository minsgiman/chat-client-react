import socketClient from './../src/services/socket-client';
import {eventBus, EVENT} from './../src/services/events';

const loginId = 'login_tester';
let firstLoginResult, secondLoginResult;

beforeEach(async function (done) {
    function login (id) {
        return new Promise(resolve => {
            eventBus.subscribe(EVENT.LOGIN_RESULT, {id: 'logintest', callback: res => resolve(res)});
            socketClient.login(id);
        });
    }

    firstLoginResult = await login(loginId);
    secondLoginResult = await login(loginId);
    socketClient.logout();
    done();
}, 5 * 1000);

it('login try twice', () => {
    expect(firstLoginResult.code).toBe(1);
    expect(secondLoginResult.code).toBe(-1);
});