import { useState } from 'react'

const useToggle = (defaultValue = false) => {
    const [isEnabled, setIsEnabled] = useState(defaultValue)

    const toggle = () => setIsEnabled((value) => !value)

    return [isEnabled, toggle]
}

export default useToggle
