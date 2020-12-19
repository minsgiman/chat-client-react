import React from "react";

const Checks = ({
    checkList,
    labels,
    onCheck}) => {
    return (
        <ul>
            {labels.map((label, idx) => (
                <li key={idx}>
                    <label>
                        <input
                            type='checkbox'
                            checked={checkList[idx]}
                            onChange={() => {}}
                            onClick={() => onCheck(idx)}
                        />
                    </label>
                </li>
            ))}
        </ul>
    )
};

export default React.memo(Checks, (prevProp, nextProp) => {
    let i, len = nextProp.checkList.length;

    for (i = 0; i < len; i+=1) {
        if (prevProp.checkList[i] !== nextProp.checkList[i]) {
            return false;
        }
    }
    return true;
});