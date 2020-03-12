import React from 'react';
import { observer } from 'mobx-react';
import './BasketItem.less';

const BasketItem = ({ item, onTake }) => {
    return (
        <div className="BasketItem">
            <div className="name">{item.name}</div>
            <div className="price">{item.price}원</div>
            <div className="count">{item.count}</div>
            <div className="return" onClick={() => onTake(item.name)}>갖다놓기</div>
        </div>
    );
};

export default observer(BasketItem);