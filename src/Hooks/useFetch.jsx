import React,{useState,useEffect} from 'react'
import api from '../Api/api'

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
   const fetchData = async () => {
    try {
        setLoading(true)
        setError(false)

        const res = await api.get(url)
        setData(res.data)
    } catch (error) {
        setError(true)
    } finally{
        setLoading(false)
    }
   }
   fetchData()
    }, [url])

  return { data, loading, error }; // return object
}

export default useFetch
