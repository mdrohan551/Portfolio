'use client'

import NextTopLoader from 'nextjs-toploader'
import { useEffect, useState } from 'react'

export default function TopLoader() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') as 'light' | 'dark' || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    setTheme(currentTheme)
  }, [])

  return (
    <NextTopLoader
      color={theme === 'dark' ? 'white' : 'var(--color-primary)'}
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={true} 
      
      easing="ease"
      speed={200}
      
      shadow={`0 0 10px ${theme === 'dark' ? 'var(--color-Dark_primary)' : 'var(--color-primary)'}`}
    />
  )
}