import { observable, action, computed } from 'mobx';

export default class MarketStore {
    @observable selectedItems = [];

    constructor(root) {
        this.root = root;  // this.root.counter.number : counter store access
    }

    @action
    put = (name, price) => {
        const exists = this.selectedItems.find(item => item.name === name);
        if (!exists) {
            this.selectedItems.push({
                name, price, count: 1
            });
        } else {
            exists.count += 1;
        }
    }

    @action
    take = name => {
        const itemToTake = this.selectedItems.find(item => item.name === name);
        itemToTake.count -= 1;
        if (itemToTake.count === 0) {
            this.selectedItems.remove(itemToTake);
        }
    };

    @computed
    get total() {
        return this.selectedItems.reduce((previous, current) => {
            return previous + current.price * current.count;
        }, 0);
    }
}