import React from 'react';

// https://dev.to/selbekk/persisting-your-react-state-in-9-lines-of-code-9go

export default function usePersistedState(key,defaultValue)
{
    const[state, setState] = React.useState(() => {
        const persistedState = localStorage.getItem(key);
        return persistedState ? JSON.parse(persistedState) : defaultValue;
    });

    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [state,key]);
    return [state,useState];
}