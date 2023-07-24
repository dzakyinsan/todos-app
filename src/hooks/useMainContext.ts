import { useContext } from 'react'
import MainContext from '../context/mainContext'

const useMainContext = (): IMainContext => useContext(MainContext);

export default useMainContext;