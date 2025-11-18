# Live Resume

A revolutionary SaaS platform that allows users to create a single, dynamic resume that can be updated in real-time. Instead of manually updating your resume on multiple job portals or sending new PDFs to employers, Live Resume lets you edit your resume once on our platform, and every public link or embedded PDF always reflects the latest version.

## Features

- 🚀 **Dynamic Updates**: Edit once, update everywhere
- 🔗 **Unique URLs**: Each user gets a shareable URL (like `/u/username/resume`)
- 📄 **PDF Export**: Generate ATS-friendly PDFs on demand
- ✏️ **Structured Editor**: Easy-to-use interface for managing resume sections
- 🔐 **User Authentication**: Secure sign up and login
- 📱 **Responsive Design**: Works beautifully on all devices

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

3. Create a `.env` file in the root directory:
```bash
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
```

   To generate a secure `NEXTAUTH_SECRET`, you can run:
   ```bash
   openssl rand -base64 32
   ```
   Or use any random string generator.

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Prisma** - Database ORM (SQLite for development)
- **NextAuth.js** - Authentication
- **Tailwind CSS** - Styling
- **date-fns** - Date formatting
- **lucide-react** - Icons

## Project Structure

```
├── app/              # Next.js app directory
│   ├── api/         # API routes
│   ├── (auth)/      # Authentication pages
│   ├── dashboard/   # User dashboard
│   └── u/           # Public resume pages
├── components/       # React components
├── lib/             # Utilities and helpers
└── prisma/          # Database schema
```

## Usage

1. **Sign Up**: Create a new account with your email, username, and password
2. **Edit Resume**: Go to your dashboard and fill in your resume information
3. **Share**: Use your unique URL (`/u/yourusername/resume`) to share your resume
4. **Update**: Any changes you make are instantly reflected on your public resume

## Features in Detail

### Resume Sections
- Personal Information (name, email, phone, location, links)
- Professional Summary
- Work Experience (with dates, descriptions, current position flag)
- Education (with dates, descriptions, current study flag)
- Skills
- Projects
- Certifications
- Languages

### PDF Export
The platform generates HTML-based resumes that can be easily printed to PDF using your browser's print functionality. The PDF route (`/api/resume/[username]/pdf`) returns a print-optimized HTML page.

## Development

### Database Management
- View database: `npm run db:studio`
- Push schema changes: `npm run db:push`
- Generate Prisma Client: `npm run db:generate`

## Production Deployment

For production, you'll want to:
1. Use a production database (PostgreSQL, MySQL, etc.) instead of SQLite
2. Update `DATABASE_URL` in your environment variables
3. Set a secure `NEXTAUTH_SECRET`
4. Update `NEXTAUTH_URL` to your production domain
5. Run `npm run build` to create an optimized production build

## License

MIT

