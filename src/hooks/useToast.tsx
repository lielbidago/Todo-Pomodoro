// extention - react snippets

import { useCallback, useState } from "react"

export default function useToast(){
    const [showToast, setShowToast] = useState(false)
    const toggleShowToast = useCallback(() => { setShowToast(!showToast)}, [setShowToast])

    return ({
        showToast,
        setShowToast,
        toggleShowToast
    })
}