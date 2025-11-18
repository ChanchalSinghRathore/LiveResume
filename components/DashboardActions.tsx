'use client'

import Link from 'next/link'
import { ExternalLink, Download } from 'lucide-react'

interface DashboardActionsProps {
  resumeUrl: string
  username: string
}

export default function DashboardActions({ resumeUrl, username }: DashboardActionsProps) {
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(resumeUrl)
    alert('URL copied to clipboard!')
  }

  const handleDownloadPDF = () => {
    window.open(`/api/resume/${username}/pdf`, '_blank')
  }

  return (
    <>
      <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
        <Link
          href={resumeUrl}
          target="_blank"
          className="inline-flex items-center justify-center px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg text-sm font-medium text-primary-darkest dark:text-primary-lightest bg-white dark:bg-primary-dark hover:bg-primary-lightest dark:hover:bg-primary-mediumDark transition-colors"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View Public Resume
        </Link>
        <button
          onClick={handleDownloadPDF}
          className="inline-flex items-center justify-center px-4 py-2 bg-primary-medium dark:bg-primary-mediumDark text-white dark:text-primary-lightest rounded-lg text-sm font-medium hover:bg-primary-mediumDark dark:hover:bg-primary-medium transition-colors shadow-md hover:shadow-lg"
        >
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </button>
      </div>

      {/* Share URL */}
      <div className="mt-6 p-4 bg-primary-lightest dark:bg-primary-mediumDark rounded-lg border border-primary-light dark:border-primary-mediumDark">
        <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">
          Your Resume URL
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={resumeUrl}
            readOnly
            className="flex-1 px-4 py-2 bg-white dark:bg-primary-dark border border-primary-medium dark:border-primary-light rounded-lg text-sm font-mono text-primary-darkest dark:text-primary-lightest"
            aria-label="Resume URL"
          />
          <button
            onClick={handleCopyUrl}
            className="px-4 py-2 bg-primary-medium dark:bg-primary-mediumDark text-white dark:text-primary-lightest rounded-lg text-sm font-medium hover:bg-primary-mediumDark dark:hover:bg-primary-medium transition-colors"
          >
            Copy
          </button>
        </div>
      </div>
    </>
  )
}



