import { observable, action } from 'mobx';

export default class CounterStore {
    @observable number = 0;

    constructor(root) {
        this.root = root;
    }

    @action increase = () => {
        this.number += 1;
    }

    @action decrease = () => {
        this.number -= 1;
    }
}