import type { Appwrite } from '../types'
import { useNuxtApp } from '#imports'

export const useAppwrite = () => {
  const { $appwrite } = useNuxtApp()
  if (!$appwrite) {
    console.log('Appwrite plugin not accessible')
  }
  return $appwrite as Appwrite
}
