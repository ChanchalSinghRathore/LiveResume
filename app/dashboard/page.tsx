import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { FileText, Edit } from 'lucide-react'
import ResumeEditor from '@/components/ResumeEditor'
import DashboardActions from '@/components/DashboardActions'
import SignOutButton from '@/components/SignOutButton'
import ThemeToggle from '@/components/ThemeToggle'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login')
  }

  const resumeData = await prisma.resume.findUnique({
    where: { userId: session.user.id },
  })

  // Parse JSON strings to objects
  const resume = resumeData ? {
    ...resumeData,
    experiences: JSON.parse(resumeData.experiences || '[]'),
    education: JSON.parse(resumeData.education || '[]'),
    skills: JSON.parse(resumeData.skills || '[]'),
    projects: JSON.parse(resumeData.projects || '[]'),
    certifications: JSON.parse(resumeData.certifications || '[]'),
    languages: JSON.parse(resumeData.languages || '[]'),
  } : null

  const resumeUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/u/${session.user.username}/resume`

  return (
    <div className="min-h-screen bg-primary-lightest dark:bg-primary-darkest">
      {/* Header */}
      <nav className="border-b border-primary-light/20 dark:border-primary-mediumDark/50 bg-white/80 dark:bg-primary-darkest/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <FileText className="h-8 w-8 text-primary-medium dark:text-primary-light" />
              <span className="ml-2 text-xl font-bold text-primary-darkest dark:text-primary-lightest">Live Resume</span>
            </Link>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link
                href="/"
                className="text-primary-darkest dark:text-primary-lightest hover:text-primary-medium dark:hover:text-primary-light px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <SignOutButton />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="bg-white dark:bg-primary-dark rounded-xl shadow-lg dark:shadow-primary-darkest/50 border border-primary-lightest dark:border-primary-mediumDark p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary-darkest dark:text-primary-lightest">Dashboard</h1>
              <p className="text-primary-mediumDark dark:text-primary-light mt-1">Manage your resume and share it with the world</p>
            </div>
            <DashboardActions resumeUrl={resumeUrl} username={session.user.username} />
          </div>
        </div>

        {/* Resume Editor */}
        <div className="bg-white dark:bg-primary-dark rounded-xl shadow-lg dark:shadow-primary-darkest/50 border border-primary-lightest dark:border-primary-mediumDark p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-primary-darkest dark:text-primary-lightest flex items-center">
              <Edit className="h-5 w-5 mr-2 text-primary-medium dark:text-primary-light" />
              Edit Resume
            </h2>
          </div>
          <ResumeEditor initialResume={resume} />
        </div>
      </div>
    </div>
  )
}

