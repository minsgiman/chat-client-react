import React, { Component } from 'react';
import Counter from '../../components/supermarket/Counter';
import SuperMarket from '../../components/supermarket/SuperMarket';

class App extends Component {
    render() {
        return (
            <div>
                <Counter/>
                <hr/>
                <SuperMarket/>
            </div>
        );
    }
}

export default App;