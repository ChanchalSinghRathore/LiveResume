import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('password123', 10)

  const user = await prisma.user.upsert({
    where: { username: 'one' },
    update: {},
    create: {
      email: 'one@example.com',
      username: 'one',
      password,
      name: 'One User',
      resume: {
        create: {
          fullName: 'One User',
          email: 'one@example.com',
          summary: 'Experienced developer with a passion for building scalable applications.',
          experiences: JSON.stringify([
            {
              title: 'Senior Developer',
              company: 'Tech Corp',
              startDate: '2020-01',
              current: true,
              description: 'Leading the frontend team.'
            }
          ]),
          education: JSON.stringify([
            {
              degree: 'BS Computer Science',
              school: 'University of Tech',
              startDate: '2016-09',
              endDate: '2020-05'
            }
          ]),
          skills: JSON.stringify(['React', 'Next.js', 'TypeScript', 'Node.js']),
          projects: JSON.stringify([
            {
              name: 'Live Resume',
              description: 'A real-time resume builder.',
              technologies: 'Next.js, Prisma'
            }
          ]),
          certifications: JSON.stringify([]),
          languages: JSON.stringify(['English'])
        }
      }
    },
  })

  console.log({ user })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
