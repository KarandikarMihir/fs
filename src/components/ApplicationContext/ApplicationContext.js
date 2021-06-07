import { createContext, useContext } from 'react'
import useApplicationState from './useApplicationState'

const Context = createContext()
export const useApplicationContext = () => useContext(Context)

const ApplicationContext = ({ children }) => {
    const value = useApplicationState()
    console.log('state', value.state)
    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default ApplicationContext
