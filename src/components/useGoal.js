import { useState } from 'react'

const KEY = 'jummoney_goal'

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY))
  } catch {
    return null
  }
}

export default function useGoal() {
  const [goal, setGoal] = useState(read)

  const save = (g) => {
    localStorage.setItem(KEY, JSON.stringify(g))
    setGoal(g)
  }
  const clear = () => {
    localStorage.removeItem(KEY)
    setGoal(null)
  }

  return { goal, save, clear }
}