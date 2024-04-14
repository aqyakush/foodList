import React from 'react';
import { useState } from 'react';

const useToggle = (initialValue: boolean): [boolean, () => void] => {
    const [isExpanded, setIsExpanded] = useState(initialValue);

    const onExpand = React.useCallback(() => {
        setIsExpanded(previous => !previous);
    }, []);

    return [isExpanded, onExpand];
};

export default useToggle;
