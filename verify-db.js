const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Connecting to database...')
    await prisma.$connect()
    console.log('Connected successfully.')

    const user = await prisma.user.findUnique({
      where: { username: 'one' },
      include: { resume: true }
    })

    if (user) {
      console.log('User "one" found:', user.username)
      if (user.resume) {
        console.log('Resume found for user "one".')
      } else {
        console.log('No resume found for user "one".')
      }
    } else {
      console.log('User "one" not found.')
    }

  } catch (e) {
    console.error('Database error:', e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
