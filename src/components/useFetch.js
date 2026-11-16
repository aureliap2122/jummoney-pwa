import { useEffect, useState, useCallback } from 'react'
import { api } from '../config/api'

export default function useFetch(url) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    setLoading(true)
    setError('')
    api
      .get(url)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [url])

  useEffect(() => {
    load()
  }, [load])

  return { data, error, loading, reload: load }
}