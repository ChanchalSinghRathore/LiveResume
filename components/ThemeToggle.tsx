'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if dark mode is enabled
    const isDark = document.documentElement.classList.contains('dark') || 
                   localStorage.theme === 'dark' ||
                   (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }

  if (!mounted) {
    return (
      <div className="w-12 h-6 bg-gray-300 rounded-full"></div>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-6 bg-primary-mediumDark dark:bg-primary-medium rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 dark:focus:ring-offset-primary-darkest"
      aria-label="Toggle dark mode"
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white dark:bg-primary-lightest rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
          darkMode ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {darkMode ? (
          <Moon className="w-3 h-3 text-primary-darkest" />
        ) : (
          <Sun className="w-3 h-3 text-primary-medium" />
        )}
      </span>
    </button>
  )
}


