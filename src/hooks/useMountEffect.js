import { useEffect } from 'react'

// eslint-disable-next-line react-hooks/exhaustive-deps
const useMountEffect = (fn) => useEffect(fn, [])

export default useMountEffect
