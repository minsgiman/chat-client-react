import React from 'react'
import useChecks from '../../components/renderhooks/useChecks'
const labels = ['check1', 'check2', 'check3'];

const App = () => {
    const [isAllChecked, renderChecks] = useChecks(labels);

    return (
        <div>
            {renderChecks()}
            <p>
                <button disabled={!isAllChecked}>다음</button>
            </p>
        </div>
    )
}

export default App;