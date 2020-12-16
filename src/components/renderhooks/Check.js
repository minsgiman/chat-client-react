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

export default Checks;