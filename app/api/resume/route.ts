import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const resumeSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  github: z.string().url().optional().or(z.literal('')),
  summary: z.string().optional(),
  experiences: z.array(z.any()).optional(),
  education: z.array(z.any()).optional(),
  skills: z.array(z.any()).optional(),
  projects: z.array(z.any()).optional(),
  certifications: z.array(z.any()).optional(),
  languages: z.array(z.any()).optional(),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const resume = await prisma.resume.findUnique({
      where: { userId: session.user.id },
    })

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    // Parse JSON strings to objects
    return NextResponse.json({
      ...resume,
      experiences: JSON.parse(resume.experiences || '[]'),
      education: JSON.parse(resume.education || '[]'),
      skills: JSON.parse(resume.skills || '[]'),
      projects: JSON.parse(resume.projects || '[]'),
      certifications: JSON.parse(resume.certifications || '[]'),
      languages: JSON.parse(resume.languages || '[]'),
    })
  } catch (error) {
    console.error('Error fetching resume:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = resumeSchema.parse(body)

    const resume = await prisma.resume.upsert({
      where: { userId: session.user.id },
      update: {
        fullName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone || null,
        location: validatedData.location || null,
        website: validatedData.website || null,
        linkedin: validatedData.linkedin || null,
        github: validatedData.github || null,
        summary: validatedData.summary || null,
        experiences: JSON.stringify(validatedData.experiences || []),
        education: JSON.stringify(validatedData.education || []),
        skills: JSON.stringify(validatedData.skills || []),
        projects: JSON.stringify(validatedData.projects || []),
        certifications: JSON.stringify(validatedData.certifications || []),
        languages: JSON.stringify(validatedData.languages || []),
      },
      create: {
        userId: session.user.id,
        fullName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone || null,
        location: validatedData.location || null,
        website: validatedData.website || null,
        linkedin: validatedData.linkedin || null,
        github: validatedData.github || null,
        summary: validatedData.summary || null,
        experiences: JSON.stringify(validatedData.experiences || []),
        education: JSON.stringify(validatedData.education || []),
        skills: JSON.stringify(validatedData.skills || []),
        projects: JSON.stringify(validatedData.projects || []),
        certifications: JSON.stringify(validatedData.certifications || []),
        languages: JSON.stringify(validatedData.languages || []),
      },
    })

    // Parse JSON strings to objects for response
    return NextResponse.json({
      ...resume,
      experiences: JSON.parse(resume.experiences || '[]'),
      education: JSON.parse(resume.education || '[]'),
      skills: JSON.parse(resume.skills || '[]'),
      projects: JSON.parse(resume.projects || '[]'),
      certifications: JSON.parse(resume.certifications || '[]'),
      languages: JSON.parse(resume.languages || '[]'),
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating resume:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



