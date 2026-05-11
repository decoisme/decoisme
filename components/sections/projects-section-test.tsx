'use client';

// SIMPLE TEST VERSION - No animations, no complex logic
export function ProjectsSectionTest() {
  return (
    <section id="projects" className="py-32 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-amber-600 uppercase mb-4">
            Portfolio
          </p>
          <h2 className="text-5xl font-bold mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Test version - If you see this, component is working!
          </p>
        </div>

        {/* Simple Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-950 rounded-3xl p-6 border border-gray-200 dark:border-gray-800"
            >
              {/* Colored Box Instead of Image */}
              <div className="h-48 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-600 mb-4 flex items-center justify-center">
                <span className="text-white text-6xl font-bold">{i}</span>
              </div>
              
              {/* Text */}
              <h3 className="text-2xl font-bold mb-2">
                Project {i}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                This is a test project card. If you see this, the component is rendering correctly!
              </p>
            </div>
          ))}
        </div>

        {/* Debug Info */}
        <div className="mt-12 p-6 bg-amber-100 dark:bg-amber-900/20 rounded-2xl">
          <p className="text-sm font-mono">
            ✅ ProjectsSectionTest is rendering successfully!
            <br />
            ✅ If you see this, React component is working
            <br />
            ✅ Next step: Check why main ProjectsSection doesn't work
          </p>
        </div>
      </div>
    </section>
  );
}
