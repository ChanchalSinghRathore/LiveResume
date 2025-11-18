import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'

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

    // Generate HTML for PDF
    const formatDate = (dateString: string) => {
      if (!dateString) return ''
      try {
        const date = new Date(dateString + '-01')
        return format(date, 'MMM yyyy')
      } catch {
        return dateString
      }
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
          }
          header {
            border-bottom: 3px solid #0284c7;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          h1 {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #111;
          }
          h2 {
            font-size: 20px;
            font-weight: bold;
            margin-top: 30px;
            margin-bottom: 15px;
            padding-bottom: 5px;
            border-bottom: 1px solid #ddd;
            color: #111;
          }
          h3 {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
            color: #111;
          }
          .contact-info {
            margin-top: 15px;
            font-size: 12px;
            color: #666;
          }
          .contact-info a {
            color: #666;
            text-decoration: none;
            margin-right: 15px;
          }
          .section {
            margin-bottom: 25px;
          }
          .item {
            margin-bottom: 20px;
          }
          .item-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
          }
          .item-title {
            font-weight: bold;
            color: #0284c7;
          }
          .item-date {
            color: #666;
            font-size: 14px;
          }
          .item-location {
            color: #666;
            font-size: 12px;
            margin-bottom: 8px;
          }
          .item-description {
            color: #555;
            line-height: 1.6;
            white-space: pre-line;
          }
          .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          .skill-tag {
            background-color: #e0f2fe;
            color: #0369a1;
            padding: 5px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
          }
          .summary {
            margin-top: 15px;
            color: #555;
            line-height: 1.8;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>${resume.fullName}</h1>
          <div class="contact-info">
            ${resume.email ? `<a href="mailto:${resume.email}">${resume.email}</a>` : ''}
            ${resume.phone ? `<span>${resume.phone}</span>` : ''}
            ${resume.location ? `<span>${resume.location}</span>` : ''}
            ${resume.website ? `<a href="${resume.website}">Website</a>` : ''}
            ${resume.linkedin ? `<a href="${resume.linkedin}">LinkedIn</a>` : ''}
            ${resume.github ? `<a href="${resume.github}">GitHub</a>` : ''}
          </div>
          ${resume.summary ? `<div class="summary">${resume.summary}</div>` : ''}
        </header>

        ${resume.experiences && Array.isArray(resume.experiences) && resume.experiences.length > 0 ? `
          <div class="section">
            <h2>Experience</h2>
            ${(resume.experiences as any[]).map((exp: any) => `
              <div class="item">
                <div class="item-header">
                  <div>
                    <h3>${exp.title || ''}</h3>
                    <div class="item-title">${exp.company || ''}</div>
                  </div>
                  <div class="item-date">
                    ${exp.startDate ? formatDate(exp.startDate) : ''}
                    ${exp.startDate && (exp.endDate || exp.current) ? ' - ' : ''}
                    ${exp.current ? 'Present' : (exp.endDate ? formatDate(exp.endDate) : '')}
                  </div>
                </div>
                ${exp.location ? `<div class="item-location">${exp.location}</div>` : ''}
                ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${resume.education && Array.isArray(resume.education) && resume.education.length > 0 ? `
          <div class="section">
            <h2>Education</h2>
            ${(resume.education as any[]).map((edu: any) => `
              <div class="item">
                <div class="item-header">
                  <div>
                    <h3>${edu.degree || ''}</h3>
                    <div class="item-title">${edu.school || ''}</div>
                  </div>
                  <div class="item-date">
                    ${edu.startDate ? formatDate(edu.startDate) : ''}
                    ${edu.startDate && (edu.endDate || edu.current) ? ' - ' : ''}
                    ${edu.current ? 'Present' : (edu.endDate ? formatDate(edu.endDate) : '')}
                  </div>
                </div>
                ${edu.location ? `<div class="item-location">${edu.location}</div>` : ''}
                ${edu.description ? `<div class="item-description">${edu.description}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${resume.skills && Array.isArray(resume.skills) && resume.skills.length > 0 ? `
          <div class="section">
            <h2>Skills</h2>
            <div class="skills">
              ${(resume.skills as any[]).map((skill: any) => `
                <span class="skill-tag">${skill.name || skill}</span>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${resume.projects && Array.isArray(resume.projects) && resume.projects.length > 0 ? `
          <div class="section">
            <h2>Projects</h2>
            ${(resume.projects as any[]).map((project: any) => `
              <div class="item">
                <div class="item-header">
                  <div>
                    <h3>${project.name || project.title || ''}</h3>
                    ${project.technologies ? `<div class="item-location">Technologies: ${project.technologies}</div>` : ''}
                  </div>
                  ${(project.startDate || project.endDate || project.current) ? `
                    <div class="item-date">
                      ${project.startDate ? formatDate(project.startDate) : ''}
                      ${project.startDate && (project.endDate || project.current) ? ' - ' : ''}
                      ${project.current ? 'Present' : (project.endDate ? formatDate(project.endDate) : '')}
                    </div>
                  ` : ''}
                </div>
                ${project.description ? `<div class="item-description">${project.description}</div>` : ''}
                ${project.url ? `<a href="${project.url}">View Project</a>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${resume.certifications && Array.isArray(resume.certifications) && resume.certifications.length > 0 ? `
          <div class="section">
            <h2>Certifications</h2>
            ${(resume.certifications as any[]).map((cert: any) => `
              <div class="item">
                <h3>${cert.name || cert.title || ''}</h3>
                ${cert.issuer ? `<div class="item-title">${cert.issuer}</div>` : ''}
                ${cert.date ? `<div class="item-date">${formatDate(cert.date)}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${resume.languages && Array.isArray(resume.languages) && resume.languages.length > 0 ? `
          <div class="section">
            <h2>Languages</h2>
            <div class="skills">
              ${(resume.languages as any[]).map((lang: any) => `
                <span class="skill-tag">${lang.name || lang} ${lang.level ? `(${lang.level})` : ''}</span>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </body>
      </html>
    `

    // Return HTML that can be converted to PDF by the browser
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `inline; filename="${params.username}-resume.html"`,
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



