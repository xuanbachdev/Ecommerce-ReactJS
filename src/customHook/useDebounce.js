import {useState,useEffect} from "react"

const useDebounce = (value,delay) => {
    const [ debounceVlue,setDebounceVlue] = useState (value)
    useEffect (()=> {
        const timeID = setTimeout(() => {
            setDebounceVlue(value)
        },delay)

        return () => {
            clearTimeout(timeID)
        }
    },[value,delay])

    return debounceVlue
}

export default useDebounce