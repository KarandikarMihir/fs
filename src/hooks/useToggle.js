import { useState, useCallback } from 'react'

const useToggle = (defaultValue = false) => {
    const [isEnabled, setIsEnabled] = useState(defaultValue)

    const toggle = useCallback(() => setIsEnabled((value) => !value), [])

    return [isEnabled, toggle, setIsEnabled]
}

export default useToggle
