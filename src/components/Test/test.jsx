import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);
    }

    function forceRerender() {
        setCount(count);
    }

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={forceRerender}>Force Rerender</button>
        </div>
    );
}

export  default Counter