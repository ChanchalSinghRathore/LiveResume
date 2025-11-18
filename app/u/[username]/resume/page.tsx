import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'
import { FileText, Mail, Phone, MapPin, Globe, Linkedin, Github, Download } from 'lucide-react'
import ResumePDFButton from '@/components/ResumePDFButton'

export default async function PublicResumePage({
  params,
}: {
  params: { username: string }
}) {  
  const user = await prisma.user.findUnique({
    where: { username: params.username },
    include: { resume: true },
  })

  if (!user || !user.resume) {
    notFound()
  }

  // Parse JSON strings to objects
  const resume = {
    ...user.resume,
    experiences: JSON.parse(user.resume.experiences || '[]'),
    education: JSON.parse(user.resume.education || '[]'),
    skills: JSON.parse(user.resume.skills || '[]'),
    projects: JSON.parse(user.resume.projects || '[]'),
    certifications: JSON.parse(user.resume.certifications || '[]'),
    languages: JSON.parse(user.resume.languages || '[]'),
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    try {
      const date = new Date(dateString + '-01')
      return format(date, 'MMM yyyy')
    } catch {
      return dateString
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-primary-darkest">
      {/* Header with Download Button */}
      <div className="border-b border-primary-light/20 dark:border-primary-mediumDark/50 bg-primary-lightest/50 dark:bg-primary-darkest/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <FileText className="h-6 w-6 text-primary-medium dark:text-primary-light mr-2" />
              <span className="text-lg font-semibold text-primary-darkest dark:text-primary-lightest">Live Resume</span>
            </Link>
            <ResumePDFButton username={params.username} />
          </div>
        </div>
      </div>

      {/* Resume Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="resume-content">
          {/* Header Section */}
          <header className="mb-8 pb-8 border-b-2 border-primary-medium dark:border-primary-light">
            <h1 className="text-4xl font-bold text-primary-darkest dark:text-primary-lightest mb-2">{resume.fullName}</h1>
            {resume.summary && (
              <p className="text-lg text-primary-mediumDark dark:text-primary-light mt-4 leading-relaxed">{resume.summary}</p>
            )}
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-primary-mediumDark dark:text-primary-light">
              {resume.email && (
                <a href={`mailto:${resume.email}`} className="flex items-center hover:text-primary-medium dark:hover:text-primary-light transition-colors">
                  <Mail className="h-4 w-4 mr-2" />
                  {resume.email}
                </a>
              )}
              {resume.phone && (
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  {resume.phone}
                </div>
              )}
              {resume.location && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {resume.location}
                </div>
              )}
              {resume.website && (
                <a href={resume.website} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary-medium dark:hover:text-primary-light transition-colors">
                  <Globe className="h-4 w-4 mr-2" />
                  Website
                </a>
              )}
              {resume.linkedin && (
                <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary-medium dark:hover:text-primary-light transition-colors">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </a>
              )}
              {resume.github && (
                <a href={resume.github} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary-medium dark:hover:text-primary-light transition-colors">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
              )}
            </div>
          </header>

          {/* Experience Section */}
          {resume.experiences && Array.isArray(resume.experiences) && resume.experiences.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary-darkest dark:text-primary-lightest mb-4 pb-2 border-b border-primary-light dark:border-primary-mediumDark">Experience</h2>
              <div className="space-y-6">
                {(resume.experiences as any[]).map((exp, index) => (
                  <div key={index} className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-primary-darkest dark:text-primary-lightest">{exp.title}</h3>
                        <p className="text-lg text-primary-medium dark:text-primary-light font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right text-primary-mediumDark dark:text-primary-light">
                        {exp.startDate && (
                          <span>{formatDate(exp.startDate)}</span>
                        )}
                        {exp.startDate && (exp.endDate || exp.current) && <span> - </span>}
                        {exp.current ? (
                          <span className="text-primary-medium dark:text-primary-light font-medium">Present</span>
                        ) : (
                          exp.endDate && <span>{formatDate(exp.endDate)}</span>
                        )}
                      </div>
                    </div>
                    {exp.location && (
                      <p className="text-sm text-primary-mediumDark dark:text-primary-light mb-2">{exp.location}</p>
                    )}
                    {exp.description && (
                      <p className="text-primary-mediumDark dark:text-primary-light leading-relaxed whitespace-pre-line">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education Section */}
          {resume.education && Array.isArray(resume.education) && resume.education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary-darkest dark:text-primary-lightest mb-4 pb-2 border-b border-primary-light dark:border-primary-mediumDark">Education</h2>
              <div className="space-y-6">
                {(resume.education as any[]).map((edu, index) => (
                  <div key={index} className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-primary-darkest dark:text-primary-lightest">{edu.degree}</h3>
                        <p className="text-lg text-primary-medium dark:text-primary-light font-medium">{edu.school}</p>
                      </div>
                      <div className="text-right text-primary-mediumDark dark:text-primary-light">
                        {edu.startDate && (
                          <span>{formatDate(edu.startDate)}</span>
                        )}
                        {edu.startDate && (edu.endDate || edu.current) && <span> - </span>}
                        {edu.current ? (
                          <span className="text-primary-medium dark:text-primary-light font-medium">Present</span>
                        ) : (
                          edu.endDate && <span>{formatDate(edu.endDate)}</span>
                        )}
                      </div>
                    </div>
                    {edu.location && (
                      <p className="text-sm text-primary-mediumDark dark:text-primary-light mb-2">{edu.location}</p>
                    )}
                    {edu.description && (
                      <p className="text-primary-mediumDark dark:text-primary-light leading-relaxed whitespace-pre-line">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills Section */}
          {resume.skills && Array.isArray(resume.skills) && resume.skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary-darkest dark:text-primary-lightest mb-4 pb-2 border-b border-primary-light dark:border-primary-mediumDark">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {(resume.skills as any[]).map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary-lightest dark:bg-primary-mediumDark text-primary-medium dark:text-primary-light rounded-lg font-medium border border-primary-light dark:border-primary-mediumDark"
                  >
                    {skill.name || skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Projects Section */}
          {resume.projects && Array.isArray(resume.projects) && resume.projects.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary-darkest dark:text-primary-lightest mb-4 pb-2 border-b border-primary-light dark:border-primary-mediumDark">Projects</h2>
              <div className="space-y-6">
                {(resume.projects as any[]).map((project, index) => (
                  <div key={index} className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-primary-darkest dark:text-primary-lightest">{project.name || project.title}</h3>
                        {project.technologies && (
                          <p className="text-sm text-primary-mediumDark dark:text-primary-light mt-1">Technologies: {project.technologies}</p>
                        )}
                      </div>
                      {(project.startDate || project.endDate || project.current) && (
                        <div className="text-right text-primary-mediumDark dark:text-primary-light">
                          {project.startDate && (
                            <span>{formatDate(project.startDate)}</span>
                          )}
                          {project.startDate && (project.endDate || project.current) && <span> - </span>}
                          {project.current ? (
                            <span className="text-primary-medium dark:text-primary-light font-medium">Present</span>
                          ) : (
                            project.endDate && <span>{formatDate(project.endDate)}</span>
                          )}
                        </div>
                      )}
                    </div>
                    {project.description && (
                      <p className="text-primary-mediumDark dark:text-primary-light leading-relaxed whitespace-pre-line mb-2">{project.description}</p>
                    )}
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-primary-medium dark:text-primary-light hover:text-primary-mediumDark dark:hover:text-primary-light transition-colors text-sm inline-flex items-center">
                        View Project →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications Section */}
          {resume.certifications && Array.isArray(resume.certifications) && resume.certifications.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary-darkest dark:text-primary-lightest mb-4 pb-2 border-b border-primary-light dark:border-primary-mediumDark">Certifications</h2>
              <div className="space-y-4">
                {(resume.certifications as any[]).map((cert, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-lg font-semibold text-primary-darkest dark:text-primary-lightest">{cert.name || cert.title}</h3>
                    {cert.issuer && <p className="text-primary-medium dark:text-primary-light">{cert.issuer}</p>}
                    {cert.date && <p className="text-sm text-primary-mediumDark dark:text-primary-light">{formatDate(cert.date)}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages Section */}
          {resume.languages && Array.isArray(resume.languages) && resume.languages.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-primary-darkest dark:text-primary-lightest mb-4 pb-2 border-b border-primary-light dark:border-primary-mediumDark">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {(resume.languages as any[]).map((lang, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary-lightest dark:bg-primary-mediumDark text-primary-medium dark:text-primary-light rounded-lg font-medium border border-primary-light dark:border-primary-mediumDark"
                  >
                    {lang.name || lang} {lang.level && `(${lang.level})`}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-primary-light/20 dark:border-primary-mediumDark/50 mt-12 py-8 bg-primary-lightest/30 dark:bg-primary-darkest/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-primary-mediumDark dark:text-primary-light">
          <p>This resume was created with <span className="font-semibold text-primary-medium dark:text-primary-light">Live Resume</span></p>
        </div>
      </footer>
    </div>
  )
}



