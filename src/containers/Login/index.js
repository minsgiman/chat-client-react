import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import socketClient from './../../services/socket-client'
import {eventBus, EVENT} from './../../services/events'
import './login.less'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: ''
        };
        eventBus.subscribe(EVENT.LOGIN_RESULT, {callback: this.onLoginResult, id: 'login'});
    }

    componentWillUnmount() {
        eventBus.unsubscribe(EVENT.LOGIN_RESULT, 'login');
    }

    onLoginResult = (res) => {
        if (res.code === 1) {
            this.props.history.push('chatlist');
        } else {
            this.props.onAlert('로그인 실패', '로그인에 실패하였습니다.');
        }
    };

    onInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.connect();
        }
    };

    updateUserId = (event) => {
        this.setState({userId: event.target.value});
    };

    connect = () => {
        if (!this.state.userId) {
            this.props.onAlert('로그인 실패', 'ID를 입력해주세요');
            return;
        }
        socketClient.login(this.state.userId);
    };

    render() {
        return (
            <div className="login">
                <h2>Chatting App</h2>
                <input type="text" placeholder="ID" onChange={this.updateUserId} onKeyPress={this.onInputKeyPress}></input>
                <button onClick={this.connect}>로그인</button>
            </div>
        )
    }
}

export default withRouter(Login)