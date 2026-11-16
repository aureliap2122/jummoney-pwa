import { useSyncExternalStore } from 'react'

// Menyimpan apakah pengantar (onboarding) sudah pernah dilihat.
const KEY = 'jummoney_onboarded'
const subs = new Set()
let memo = null // cadangan kalau localStorage tidak bisa dipakai

const read = () => {
  if (memo !== null) return memo
  try {
    return localStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

const subscribe = (fn) => {
  subs.add(fn)
  return () => subs.delete(fn)
}

export const setOnboarded = (v) => {
  memo = v
  try {
    if (v) localStorage.setItem(KEY, '1')
    else localStorage.removeItem(KEY)
  } catch {
    /* abaikan */
  }
  subs.forEach((fn) => fn())
}

export default function useOnboarding() {
  return useSyncExternalStore(subscribe, read, () => true)
}
