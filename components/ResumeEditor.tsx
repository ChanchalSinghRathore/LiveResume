'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Save } from 'lucide-react'

interface Resume {
  id?: string
  fullName: string
  email: string
  phone?: string | null
  location?: string | null
  website?: string | null
  linkedin?: string | null
  github?: string | null
  summary?: string | null
  experiences?: any[]
  education?: any[]
  skills?: any[]
  projects?: any[]
  certifications?: any[]
  languages?: any[]
}

interface ResumeEditorProps {
  initialResume: Resume | null
}

export default function ResumeEditor({ initialResume }: ResumeEditorProps) {
  const [resume, setResume] = useState<Resume>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
    experiences: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (initialResume) {
      // Helper function to safely parse JSON or return array
      const parseArray = (value: any): any[] => {
        if (Array.isArray(value)) return value
        if (typeof value === 'string') {
          try {
            return JSON.parse(value)
          } catch {
            return []
          }
        }
        return []
      }

      setResume({
        fullName: initialResume.fullName || '',
        email: initialResume.email || '',
        phone: initialResume.phone || '',
        location: initialResume.location || '',
        website: initialResume.website || '',
        linkedin: initialResume.linkedin || '',
        github: initialResume.github || '',
        summary: initialResume.summary || '',
        experiences: parseArray(initialResume.experiences),
        education: parseArray(initialResume.education),
        skills: parseArray(initialResume.skills),
        projects: parseArray(initialResume.projects),
        certifications: parseArray(initialResume.certifications),
        languages: parseArray(initialResume.languages),
      })
    }
  }, [initialResume])

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)

    try {
      const response = await fetch('/api/resume', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resume),
      })

      if (!response.ok) {
        throw new Error('Failed to save resume')
      }

      const savedResume = await response.json()
      
      // Helper function to safely parse JSON or return array
      const parseArray = (value: any): any[] => {
        if (Array.isArray(value)) return value
        if (typeof value === 'string') {
          try {
            return JSON.parse(value)
          } catch {
            return []
          }
        }
        return []
      }
      
      // Update local state with saved data (parsed from server)
      setResume({
        ...savedResume,
        experiences: parseArray(savedResume.experiences),
        education: parseArray(savedResume.education),
        skills: parseArray(savedResume.skills),
        projects: parseArray(savedResume.projects),
        certifications: parseArray(savedResume.certifications),
        languages: parseArray(savedResume.languages),
      })

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      alert('Failed to save resume. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const addExperience = () => {
    setResume({
      ...resume,
      experiences: [
        ...(resume.experiences || []),
        {
          title: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        },
      ],
    })
  }

  const removeExperience = (index: number) => {
    setResume({
      ...resume,
      experiences: resume.experiences?.filter((_, i) => i !== index) || [],
    })
  }

  const updateExperience = (index: number, field: string, value: any) => {
    const updated = [...(resume.experiences || [])]
    updated[index] = { ...updated[index], [field]: value }
    setResume({ ...resume, experiences: updated })
  }

  const addEducation = () => {
    setResume({
      ...resume,
      education: [
        ...(resume.education || []),
        {
          degree: '',
          school: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        },
      ],
    })
  }

  const removeEducation = (index: number) => {
    setResume({
      ...resume,
      education: resume.education?.filter((_, i) => i !== index) || [],
    })
  }

  const updateEducation = (index: number, field: string, value: any) => {
    const updated = [...(resume.education || [])]
    updated[index] = { ...updated[index], [field]: value }
    setResume({ ...resume, education: updated })
  }

  const addSkill = () => {
    setResume({
      ...resume,
      skills: [...(resume.skills || []), { name: '', level: '' }],
    })
  }

  const removeSkill = (index: number) => {
    setResume({
      ...resume,
      skills: resume.skills?.filter((_, i) => i !== index) || [],
    })
  }

  const updateSkill = (index: number, field: string, value: string) => {
    const updated = [...(resume.skills || [])]
    updated[index] = { ...updated[index], [field]: value }
    setResume({ ...resume, skills: updated })
  }

  const addCertification = () => {
    setResume({
      ...resume,
      certifications: [
        ...(resume.certifications || []),
        {
          name: '',
          issuer: '',
          date: '',
          url: '',
        },
      ],
    })
  }

  const removeCertification = (index: number) => {
    setResume({
      ...resume,
      certifications: resume.certifications?.filter((_, i) => i !== index) || [],
    })
  }

  const updateCertification = (index: number, field: string, value: string) => {
    const updated = [...(resume.certifications || [])]
    updated[index] = { ...updated[index], [field]: value }
    setResume({ ...resume, certifications: updated })
  }

  const addProject = () => {
    setResume({
      ...resume,
      projects: [
        ...(resume.projects || []),
        {
          name: '',
          description: '',
          url: '',
          technologies: '',
          startDate: '',
          endDate: '',
          current: false,
        },
      ],
    })
  }

  const removeProject = (index: number) => {
    setResume({
      ...resume,
      projects: resume.projects?.filter((_, i) => i !== index) || [],
    })
  }

  const updateProject = (index: number, field: string, value: any) => {
    const updated = [...(resume.projects || [])]
    updated[index] = { ...updated[index], [field]: value }
    setResume({ ...resume, projects: updated })
  }

  return (
    <div className="space-y-8">
      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center px-4 py-2 bg-primary-medium dark:bg-primary-mediumDark text-white dark:text-primary-lightest rounded-lg font-medium hover:bg-primary-mediumDark dark:hover:bg-primary-medium disabled:opacity-50 transition-colors shadow-md hover:shadow-lg"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Personal Information */}
      <section>
        <h3 className="text-lg font-semibold text-primary-darkest dark:text-primary-lightest mb-4">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">Full Name *</label>
            <input
              type="text"
              value={resume.fullName}
              onChange={(e) => setResume({ ...resume, fullName: e.target.value })}
              className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">Email *</label>
            <input
              type="email"
              value={resume.email}
              onChange={(e) => setResume({ ...resume, email: e.target.value })}
              className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">Phone</label>
            <input
              type="tel"
              value={resume.phone || ''}
              onChange={(e) => setResume({ ...resume, phone: e.target.value })}
              className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">Location</label>
            <input
              type="text"
              value={resume.location || ''}
              onChange={(e) => setResume({ ...resume, location: e.target.value })}
              className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
              placeholder="City, Country"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">Website</label>
            <input
              type="url"
              value={resume.website || ''}
              onChange={(e) => setResume({ ...resume, website: e.target.value })}
              className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
              placeholder="https://yourwebsite.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">LinkedIn</label>
            <input
              type="url"
              value={resume.linkedin || ''}
              onChange={(e) => setResume({ ...resume, linkedin: e.target.value })}
              className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">GitHub</label>
            <input
              type="url"
              value={resume.github || ''}
              onChange={(e) => setResume({ ...resume, github: e.target.value })}
              className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
              placeholder="https://github.com/yourusername"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
          <textarea
            value={resume.summary || ''}
            onChange={(e) => setResume({ ...resume, summary: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
            placeholder="A brief summary of your professional background..."
          />
        </div>
      </section>

      {/* Experience */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary-darkest dark:text-primary-lightest">Experience</h3>
          <button
            onClick={addExperience}
            className="inline-flex items-center px-3 py-1.5 text-sm bg-primary-lightest dark:bg-primary-mediumDark text-primary-medium dark:text-primary-light rounded-lg hover:bg-primary-light dark:hover:bg-primary-mediumDark/80 transition-colors"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Experience
          </button>
        </div>
        <div className="space-y-4">
          {resume.experiences?.map((exp, index) => (
            <div key={index} className="border border-primary-light dark:border-primary-mediumDark rounded-lg p-4 bg-white dark:bg-primary-darkest">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-primary-darkest dark:text-primary-lightest">Experience #{index + 1}</h4>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">Job Title *</label>
                  <input
                    type="text"
                    value={exp.title || ''}
                    onChange={(e) => updateExperience(index, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">Company *</label>
                  <input
                    type="text"
                    value={exp.company || ''}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">Location</label>
                  <input
                    type="text"
                    value={exp.location || ''}
                    onChange={(e) => updateExperience(index, 'location', e.target.value)}
                    className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">Start Date</label>
                  <input
                    type="month"
                    value={exp.startDate || ''}
                    onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                    className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">End Date</label>
                  <input
                    type="month"
                    value={exp.endDate || ''}
                    onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                    disabled={exp.current}
                    className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest disabled:bg-primary-lightest dark:disabled:bg-primary-mediumDark disabled:opacity-50"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={exp.current || false}
                      onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-primary-darkest dark:text-primary-lightest">Current Position</span>
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">Description</label>
                  <textarea
                    value={exp.description || ''}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                    placeholder="Describe your responsibilities and achievements..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary-darkest dark:text-primary-lightest">Education</h3>
          <button
            onClick={addEducation}
            className="inline-flex items-center px-3 py-1.5 text-sm bg-primary-lightest dark:bg-primary-mediumDark text-primary-medium dark:text-primary-light rounded-lg hover:bg-primary-light dark:hover:bg-primary-mediumDark/80 transition-colors"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Education
          </button>
        </div>
        <div className="space-y-4">
          {resume.education?.map((edu, index) => (
            <div key={index} className="border border-primary-light dark:border-primary-mediumDark rounded-lg p-4 bg-white dark:bg-primary-darkest">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-primary-darkest dark:text-primary-lightest">Education #{index + 1}</h4>
                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">Degree *</label>
                  <input
                    type="text"
                    value={edu.degree || ''}
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">School *</label>
                  <input
                    type="text"
                    value={edu.school || ''}
                    onChange={(e) => updateEducation(index, 'school', e.target.value)}
                    className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">Location</label>
                  <input
                    type="text"
                    value={edu.location || ''}
                    onChange={(e) => updateEducation(index, 'location', e.target.value)}
                    className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">Start Date</label>
                  <input
                    type="month"
                    value={edu.startDate || ''}
                    onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                    className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">End Date</label>
                  <input
                    type="month"
                    value={edu.endDate || ''}
                    onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                    disabled={edu.current}
                    className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest disabled:bg-primary-lightest dark:disabled:bg-primary-mediumDark disabled:opacity-50"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={edu.current || false}
                      onChange={(e) => updateEducation(index, 'current', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-primary-darkest dark:text-primary-lightest">Currently Studying</span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary-darkest dark:text-primary-lightest">Skills</h3>
          <button
            onClick={addSkill}
            className="inline-flex items-center px-3 py-1.5 text-sm bg-primary-lightest dark:bg-primary-mediumDark text-primary-medium dark:text-primary-light rounded-lg hover:bg-primary-light dark:hover:bg-primary-mediumDark/80 transition-colors"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Skill
          </button>
        </div>
        <div className="space-y-3">
          {resume.skills?.map((skill, index) => (
            <div key={index} className="flex items-center space-x-3">
              <input
                type="text"
                value={typeof skill === 'string' ? skill : (skill.name || skill)}
                onChange={(e) => updateSkill(index, 'name', e.target.value)}
                placeholder="Skill name"
                className="flex-1 px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
              />
              <button
                onClick={() => removeSkill(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary-darkest dark:text-primary-lightest">Projects</h3>
          <button
            onClick={addProject}
            className="inline-flex items-center px-3 py-1.5 text-sm bg-primary-lightest dark:bg-primary-mediumDark text-primary-medium dark:text-primary-light rounded-lg hover:bg-primary-light dark:hover:bg-primary-mediumDark/80 transition-colors"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Project
          </button>
        </div>
        <div className="space-y-4">
          {resume.projects?.map((project, index) => (
            <div key={index} className="border border-primary-light dark:border-primary-mediumDark rounded-lg p-4 bg-white dark:bg-primary-darkest">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-primary-darkest dark:text-primary-lightest">Project #{index + 1}</h4>
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">Project Name *</label>
                  <input
                    type="text"
                    value={project.name || project.title || ''}
                    onChange={(e) => updateProject(index, 'name', e.target.value)}
                    className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                    placeholder="e.g., E-Commerce Platform"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">Project URL</label>
                  <input
                    type="url"
                    value={project.url || ''}
                    onChange={(e) => updateProject(index, 'url', e.target.value)}
                    className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                    placeholder="https://project-url.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">Technologies Used</label>
                  <input
                    type="text"
                    value={project.technologies || ''}
                    onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                    className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                    placeholder="e.g., React, Node.js, MongoDB"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">Start Date</label>
                  <input
                    type="month"
                    value={project.startDate || ''}
                    onChange={(e) => updateProject(index, 'startDate', e.target.value)}
                    className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">End Date</label>
                  <input
                    type="month"
                    value={project.endDate || ''}
                    onChange={(e) => updateProject(index, 'endDate', e.target.value)}
                    disabled={project.current}
                    className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest disabled:bg-primary-lightest dark:disabled:bg-primary-mediumDark disabled:opacity-50"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={project.current || false}
                      onChange={(e) => updateProject(index, 'current', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-primary-darkest dark:text-primary-lightest">Ongoing Project</span>
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">Description</label>
                  <textarea
                    value={project.description || ''}
                    onChange={(e) => updateProject(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                    placeholder="Describe the project, your role, key features, and achievements..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary-darkest dark:text-primary-lightest">Certifications</h3>
          <button
            onClick={addCertification}
            className="inline-flex items-center px-3 py-1.5 text-sm bg-primary-lightest dark:bg-primary-mediumDark text-primary-medium dark:text-primary-light rounded-lg hover:bg-primary-light dark:hover:bg-primary-mediumDark/80 transition-colors"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Certification
          </button>
        </div>
        <div className="space-y-4">
          {resume.certifications?.map((cert, index) => (
            <div key={index} className="border border-primary-light dark:border-primary-mediumDark rounded-lg p-4 bg-white dark:bg-primary-darkest">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-primary-darkest dark:text-primary-lightest">Certification #{index + 1}</h4>
                <button
                  onClick={() => removeCertification(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">Certification Name *</label>
                  <input
                    type="text"
                    value={cert.name || cert.title || ''}
                    onChange={(e) => updateCertification(index, 'name', e.target.value)}
                    className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                    placeholder="e.g., AWS Certified Solutions Architect"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">Issuing Organization</label>
                  <input
                    type="text"
                    value={cert.issuer || ''}
                    onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                    className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                    placeholder="e.g., Amazon Web Services"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">Issue Date</label>
                  <input
                    type="month"
                    value={cert.date || ''}
                    onChange={(e) => updateCertification(index, 'date', e.target.value)}
                    className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-darkest dark:text-primary-lightest mb-2">Credential URL (Optional)</label>
                  <input
                    type="url"
                    value={cert.url || ''}
                    onChange={(e) => updateCertification(index, 'url', e.target.value)}
                    className="w-full px-4 py-2 border border-primary-medium dark:border-primary-light rounded-lg focus:ring-2 focus:ring-primary-medium dark:focus:ring-primary-light bg-white dark:bg-primary-darkest text-primary-darkest dark:text-primary-lightest"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}



