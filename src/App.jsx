import { useState, useEffect } from 'react'
import ThemeToggle from './components/ThemeToggle'
import ProgressiveImage from './components/ProgressiveImage'
import ProfileSection from './components/ProfileSection'
import HamburgerMenu from './components/HamburgerMenu' // Import the new component

// Sample work experience data - you can modify this array to add your own experiences
const workExperience = [
  {
    title: "Senior Cybersecurity Engineer",
    company: "Southwest",
    period: "Aug 2018 - Present",
    descriptions: [
      "Building a modern Identity solution for Southwest.com customers.",
      "Previously migrated legacy Identity solution for the Enterprise to a new Identity solution"
    ],
    logos: {
      jxl: "/images/LUV.jxl",
      webp: "/images/LUV.webp",
      png: "/images/LUV.png"
    }
  },
  {
    title: "Mac+ Technical Advisor",
    company: "Apple",
    period: "Jul 2016 - May 2018",
    descriptions: [
      "Provided technical support for all mobile and desktop Apple devices and related web and cloud services"
    ],
    logos: {
      jxl: "/images/apple-light.jxl",
      webp: "/images/apple-light.webp",
      png: "/images/apple-light.png"
    },
    darkLogos: {
      jxl: "/images/apple-dark.jxl",
      webp: "/images/apple-dark.webp",
      png: "/images/apple-dark.png"
    }
  }
];

const education = [
  {
    school: "University of Georgia",
    degree: "Bachelor of Computer Systems Engineering",
    period: "2014 - 2018",
    descriptions: [
      "Zell Miller Scholarship",
      "Presidential Scholar",
      "Certificate in Emerging Engineering Leaders Development Program"
    ],
    logos: {
      jxl: "/images/uni.jxl",
      webp: "/images/uni.webp",
      png: "/images/uni.png"
    }
  }
];

function App() {
  // Initialize dark mode with a sophisticated preference system
  const [darkMode, setDarkMode] = useState(() => {
    // First check if there's a saved preference in localStorage
    const savedPreference = localStorage.getItem('darkMode');
    if (savedPreference !== null) {
      return JSON.parse(savedPreference);
    }

    // If no saved preference, check system preference
    if (window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // Default to light mode if no preferences are found
    return false;
  });

  // Save dark mode preference whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Only update if there's no saved preference
    const handleChange = (e) => {
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply dark mode class to HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Hamburger Menu - Fixed position in the top left */}
      <div className="fixed top-4 left-4">
        <HamburgerMenu />
      </div>

      {/* Theme Toggle Button - Fixed position in the top right */}
      <div className="fixed top-4 right-4">
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>

      <main className="max-w-4xl mx-auto">
        <ProfileSection />

        {/* Work Experience Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Work Experience</h2>
          <div className="space-y-6">
            {workExperience.map((experience, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-6
                         hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
              >
                <div className="flex items-center gap-4 mb-4">
                  <ProgressiveImage
                    logos={experience.logos}
                    darkLogos={experience.darkLogos}
                    alt={`${experience.company} logo`}
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{experience.title}</h3>
                    <p className="text-primary-600 dark:text-primary-400">
                      {experience.company}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {experience.period}
                </p>
                <div className="text-gray-600 dark:text-gray-300 space-y-2">
                  {experience.descriptions && experience.descriptions.map((desc, descIndex) => (
                    <p key={descIndex}>{desc}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Education</h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-6
                         hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
              >
                <div className="flex items-center gap-4 mb-4">
                  <ProgressiveImage
                    logos={edu.logos}
                    alt={`${edu.school} logo`}
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{edu.school}</h3>
                    <p className="text-primary-600 dark:text-primary-400">
                      {edu.degree}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {edu.period}
                </p>
                <div className="text-gray-600 dark:text-gray-300 space-y-2">
                  {edu.descriptions && edu.descriptions.map((desc, descIndex) => (
                    <p key={descIndex}>{desc}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      {/* More subtle footer with GitHub icon */}
      <footer className="text-center mt-6 py-2 text-gray-500 dark:text-gray-400">
        <a href="https://github.com/r-cz/ryancruz.com/" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity inline-flex items-center">
          <svg width="18" height="18" viewBox="0 0 98 96" fill="currentColor" className="fill-current mr-1">
            <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"></path>
          </svg>
          <span className="sr-only">View Source on GitHub</span>
        </a>
      </footer>
    </div>
  )
}

export default App