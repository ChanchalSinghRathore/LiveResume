import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: params.username },
      include: { resume: true },
    })

    if (!user || !user.resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
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

    return NextResponse.json({
      resume,
      user: {
        username: user.username,
        name: user.name,
      },
    })
  } catch (error) {
    console.error('Error fetching public resume:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



