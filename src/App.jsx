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
    description: "Building a modern Identity solution for Southwest.com customers. Previously migrated legacy Identity solution for the Enterprise to a new Identity solution",
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
    description: "Provided technical support for all mobile and desktop Apple devices and related web and cloud services",
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
]

const education = [
  {
    school: "University of Georgia",
    degree: "Bachelor of Computer Systems Engineering",
    period: "2014 - 2018",
    description: "Zell Miller Scholarship \n Presidential Scholar \n Certificate in Emerging Engineering Leaders Development Program",
    logos: {
      jxl: "/images/uni.jxl",
      webp: "/images/uni.webp",
      png: "/images/uni.png"
    }
  }
]

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

        {/* Work Experience Section - Maps through the experience array */}
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
                <p className="text-gray-600 dark:text-gray-300">
                  {experience.description}
                </p>
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
                <p className="text-gray-600 dark:text-gray-300">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App