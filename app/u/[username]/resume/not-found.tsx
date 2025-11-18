import Link from 'next/link'
import { FileText } from 'lucide-react'

export default function ResumeNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-lightest dark:from-primary-darkest to-white dark:to-primary-dark flex items-center justify-center px-4">
      <div className="text-center">
        <FileText className="h-16 w-16 text-primary-medium dark:text-primary-light mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-primary-darkest dark:text-primary-lightest mb-2">Resume Not Found</h1>
        <p className="text-xl text-primary-mediumDark dark:text-primary-light mb-8">
          This resume doesn't exist or hasn't been created yet.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary-medium dark:bg-primary-mediumDark text-white dark:text-primary-lightest px-6 py-3 rounded-lg font-semibold hover:bg-primary-mediumDark dark:hover:bg-primary-medium transition-colors shadow-lg hover:shadow-xl"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}



