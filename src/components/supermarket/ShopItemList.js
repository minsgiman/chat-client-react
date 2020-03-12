import React from 'react';
import ShopItem from './ShopItem';
import { inject, observer } from 'mobx-react';

const items = [
    {
        name: 'aa',
        price: 850,
    },
    {
        name: 'bb',
        price: 900,
    }
];

const ShopItemList = ({ onPut }) => {
    const itemList = items.map(item => <ShopItem {...item} key={item.name} onPut={onPut} />);
    return <div>{itemList}</div>;
};

export default inject(({ market }) => ({
    onPut: market.put
}))(observer(ShopItemList));
