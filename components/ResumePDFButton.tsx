'use client'

import { Download } from 'lucide-react'

interface ResumePDFButtonProps {
  username: string
}

export default function ResumePDFButton({ username }: ResumePDFButtonProps) {
  const handleDownload = () => {
    window.open(`/api/resume/${username}/pdf`, '_blank')
  }

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center px-4 py-2 bg-primary-medium dark:bg-primary-mediumDark text-white dark:text-primary-lightest rounded-lg font-medium hover:bg-primary-mediumDark dark:hover:bg-primary-medium transition-colors shadow-md hover:shadow-lg"
    >
      <Download className="h-4 w-4 mr-2" />
      Download PDF
    </button>
  )
}



