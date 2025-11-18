import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  ArrowRight,
  FileText,
  Link as LinkIcon,
  Edit,
  Share2,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-lightest dark:from-primary-darkest to-white dark:to-primary-dark">
      {/* Navigation */}
      <nav className="border-b border-primary-light/20 dark:border-primary-mediumDark/50 bg-white/80 dark:bg-primary-darkest/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <FileText className="h-8 w-8 text-primary-medium dark:text-primary-light" />
              <span className="ml-2 text-xl font-bold text-primary-darkest dark:text-primary-lightest">
                Live Resume
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-primary-darkest dark:text-primary-lightest hover:text-primary-medium dark:hover:text-primary-light px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href={`/u/${session.user.username}/resume`}
                    className="text-primary-darkest dark:text-primary-lightest hover:text-primary-medium dark:hover:text-primary-light px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    My Resume
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-primary-darkest dark:text-primary-lightest hover:text-primary-medium dark:hover:text-primary-light px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="bg-primary-medium dark:bg-primary-mediumDark text-white dark:text-primary-lightest px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-mediumDark dark:hover:bg-primary-medium transition-colors shadow-md hover:shadow-lg"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-darkest dark:text-primary-lightest mb-6">
            Your Resume,
            <span className="text-primary-medium dark:text-primary-light">
              {" "}
              Live & Dynamic
            </span>
          </h1>
          <p className="text-xl text-primary-mediumDark dark:text-primary-light mb-8 max-w-3xl mx-auto">
            Create a single, dynamic resume that updates in real-time. Edit
            once, and every public link or PDF always reflects the latest
            version. No more manual updates across multiple platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!session && (
              <>
                <Link
                  href="/register"
                  className="bg-primary-medium dark:bg-primary-mediumDark text-white dark:text-primary-lightest px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-mediumDark dark:hover:bg-primary-medium transition-all inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/login"
                  className="bg-white dark:bg-primary-dark text-primary-medium dark:text-primary-light border-2 border-primary-medium dark:border-primary-light px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-lightest dark:hover:bg-primary-mediumDark transition-all inline-flex items-center justify-center"
                >
                  Sign In
                </Link>
              </>
            )}
            {session && (
              <Link
                href="/dashboard"
                className="bg-primary-medium dark:bg-primary-mediumDark text-white dark:text-primary-lightest px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-mediumDark dark:hover:bg-primary-medium transition-all inline-flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-primary-dark p-8 rounded-xl shadow-lg dark:shadow-primary-darkest/50 border border-primary-lightest dark:border-primary-mediumDark">
            <div className="bg-primary-lightest dark:bg-primary-mediumDark w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Edit className="h-6 w-6 text-primary-medium dark:text-primary-light" />
            </div>
            <h3 className="text-xl font-semibold text-primary-darkest dark:text-primary-lightest mb-2">
              Edit Once, Update Everywhere
            </h3>
            <p className="text-primary-mediumDark dark:text-primary-light">
              Make changes to your resume in one place, and all your shared
              links and PDFs automatically reflect the latest version.
            </p>
          </div>

          <div className="bg-white dark:bg-primary-dark p-8 rounded-xl shadow-lg dark:shadow-primary-darkest/50 border border-primary-lightest dark:border-primary-mediumDark">
            <div className="bg-primary-lightest dark:bg-primary-mediumDark w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <LinkIcon className="h-6 w-6 text-primary-medium dark:text-primary-light" />
            </div>
            <h3 className="text-xl font-semibold text-primary-darkest dark:text-primary-lightest mb-2">
              Unique Shareable URL
            </h3>
            <p className="text-primary-mediumDark dark:text-primary-light">
              Get your own personalized URL like{" "}
              <code className="text-primary-medium dark:text-primary-light bg-primary-lightest dark:bg-primary-mediumDark px-2 py-1 rounded">
                /u/yourname/resume
              </code>
              that you can share with employers and recruiters.
            </p>
          </div>

          <div className="bg-white dark:bg-primary-dark p-8 rounded-xl shadow-lg dark:shadow-primary-darkest/50 border border-primary-lightest dark:border-primary-mediumDark">
            <div className="bg-primary-lightest dark:bg-primary-mediumDark w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-primary-medium dark:text-primary-light" />
            </div>
            <h3 className="text-xl font-semibold text-primary-darkest dark:text-primary-lightest mb-2">
              ATS-Friendly PDFs
            </h3>
            <p className="text-primary-mediumDark dark:text-primary-light">
              Generate clean, professional PDFs with selectable text that work
              perfectly with Applicant Tracking Systems.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold text-center text-primary-darkest dark:text-primary-lightest mb-12">
            How It Works
          </h2>

          <div className="relative grid md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="relative text-center">
              <div className="bg-primary-medium dark:bg-primary-mediumDark text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg">
                1
              </div>
              <h3 className="font-semibold mb-2 text-primary-darkest dark:text-primary-lightest">
                Sign Up
              </h3>
              <p className="text-sm text-primary-mediumDark dark:text-primary-light">
                Create your free account in seconds
              </p>

              {/* Arrow to next */}
              <div className="hiw-connector hidden md:block">
                <svg
                  width="300"
                  height="60"
                  viewBox="0 0 200 50"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                >
                  <defs>
                    <marker
                      id="arrow-end"
                      viewBox="0 0 10 10"
                      refX="5"
                      refY="5"
                      orient="auto"
                      markerUnits="strokeWidth"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="Gold" />
                    </marker>
                  </defs>

                  <path
                    d="M 0 25 Q 80 0, 160 25 T 200"
                    fill="none"
                    stroke="Gold"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    marker-end="url(#arrow-end)"
                  />
                </svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative text-center">
              <div className="bg-primary-medium dark:bg-primary-mediumDark text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg">
                2
              </div>
              <h3 className="font-semibold mb-2 text-primary-darkest dark:text-primary-lightest">
                Build Your Resume
              </h3>
              <p className="text-sm text-primary-mediumDark dark:text-primary-light">
                Use our intuitive editor to add your experience
              </p>

              <div className="hiw-connector hidden md:block">
              <svg
                  width="300"
                  height="60"
                  viewBox="0 0 200 50"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                >
                  <defs>
                    <marker
                      id="arrow-end"
                      viewBox="0 0 10 10"
                      refX="5"
                      refY="5"
                      orient="auto"
                      markerUnits="strokeWidth"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="Gold" />
                    </marker>
                  </defs>

                  <path
                    d="M 0 25 Q 80 0, 160 25 T 200"
                    fill="none"
                    stroke="Gold"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    marker-end="url(#arrow-end)"
                  />
                </svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative text-center">
              <div className="bg-primary-medium dark:bg-primary-mediumDark text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg">
                3
              </div>
              <h3 className="font-semibold mb-2 text-primary-darkest dark:text-primary-lightest">
                Share Your Link
              </h3>
              <p className="text-sm text-primary-mediumDark dark:text-primary-light">
                Get your unique URL and share it anywhere
              </p>

              <div className="hiw-connector hidden md:block">
                <svg
                  width="300"
                  height="60"
                  viewBox="0 0 200 50"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                >
                  <defs>
                    <marker
                      id="arrow-end"
                      viewBox="0 0 10 10"
                      refX="5"
                      refY="5"
                      orient="auto"
                      markerUnits="strokeWidth"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="Gold" />
                    </marker>
                  </defs>

                  <path
                    d="M 0 25 Q 80 0, 160 25 T 200"
                    fill="none"
                    stroke="Gold"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    marker-end="url(#arrow-end)"
                  />
                </svg>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative text-center">
              <div className="bg-primary-medium dark:bg-primary-mediumDark text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg">
                4
              </div>
              <h3 className="font-semibold mb-2 text-primary-darkest dark:text-primary-lightest">
                Update Anytime
              </h3>
              <p className="text-sm text-primary-mediumDark dark:text-primary-light">
                Edit your resume and changes go live instantly
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary-light/20 dark:border-primary-mediumDark/50 mt-20 bg-white/50 dark:bg-primary-darkest/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-primary-mediumDark dark:text-primary-light">
            <p>&copy; 2024 Live Resume. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
