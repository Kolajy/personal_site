import { useState, useEffect } from 'react';

// Markdown parsing for PaperMod post details
function RenderMarkdown({ content }) {
  const lines = content.split('\n');
  let insideCodeBlock = false;
  let codeContent = [];

  return (
    <div className="space-y-4 font-serif leading-relaxed text-[17px] text-[var(--text-primary)]">
      {lines.map((line, idx) => {
        // Code block checks
        if (line.trim().startsWith('```')) {
          if (insideCodeBlock) {
            insideCodeBlock = false;
            const codeText = codeContent.join('\n');
            codeContent = [];
            return (
              <pre key={idx} className="bg-[var(--code-bg)] p-4 rounded-md overflow-x-auto font-mono text-sm border border-[var(--border-color)] my-4">
                <code>{codeText}</code>
              </pre>
            );
          } else {
            insideCodeBlock = true;
            return null;
          }
        }

        if (insideCodeBlock) {
          codeContent.push(line);
          return null;
        }

        const trimmed = line.trim();

        // Headings
        if (trimmed.startsWith('### ')) {
          return <h3 key={idx} className="text-lg font-bold font-sans text-[var(--text-primary)] pt-3 pb-1">{trimmed.slice(4)}</h3>;
        }
        if (trimmed.startsWith('## ')) {
          return <h2 key={idx} className="text-xl font-bold font-sans text-[var(--text-primary)] pt-5 pb-1 border-b border-[var(--border-color)]">{trimmed.slice(3)}</h2>;
        }
        if (trimmed.startsWith('# ')) {
          return <h1 key={idx} className="text-2xl font-bold font-sans text-[var(--text-primary)] pt-6 pb-2">{trimmed.slice(2)}</h1>;
        }

        // Bullet points
        if (trimmed.startsWith('- ')) {
          return (
            <ul key={idx} className="list-disc pl-6 space-y-1.5 font-sans my-2 text-sm text-[var(--text-secondary)]">
              <li>{trimmed.slice(2)}</li>
            </ul>
          );
        }

        // Space out empty lines
        if (!trimmed) {
          return <div key={idx} className="h-2"></div>;
        }

        // Paragraphs with inline style mapping
        return (
          <p key={idx} className="font-serif">
            {trimmed.split('`').map((part, i) => {
              if (i % 2 === 1) {
                return <code key={i} className="bg-[var(--code-bg)] px-1.5 py-0.5 rounded font-mono text-sm text-[var(--text-primary)]">{part}</code>;
              }
              return part.split('**').map((subpart, j) => {
                if (j % 2 === 1) {
                  return <strong key={j} className="font-semibold text-[var(--text-primary)]">{subpart}</strong>;
                }
                return subpart;
              });
            })}
          </p>
        );
      })}
    </div>
  );
}

export default function App({ posts = [], projects = [] }) {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'projects', 'blog'
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedBlogTag, setSelectedBlogTag] = useState(null);
  const [isDark, setIsDark] = useState(true);

  // Sync state with HTML class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, selectedPost]);

  const allTags = Array.from(new Set(projects.flatMap(p => p.tags)));
  const filteredProjects = selectedTag
    ? projects.filter(p => p.tags.includes(selectedTag))
    : projects;

  const allBlogTags = Array.from(new Set(posts.flatMap(p => p.tags || [])));
  const filteredPosts = selectedBlogTag
    ? posts.filter(p => (p.tags || []).includes(selectedBlogTag))
    : posts;

  return (
    <div className="min-h-screen flex flex-col max-w-3xl mx-auto px-6 py-6 font-sans">
      {/* PaperMod Style Navigation Header */}
      <header className="flex justify-between items-center py-4 mb-12 border-b border-[var(--border-color)]">
        <button 
          onClick={() => { setActiveTab('home'); setSelectedPost(null); }}
          className="text-xl font-bold tracking-wide hover:opacity-85 text-[var(--text-primary)] cursor-pointer"
        >
          Jay's space
        </button>
        
        <div className="flex items-center space-x-6">
          <nav className="flex space-x-4 text-[15px]">
            <button 
              onClick={() => { setActiveTab('blog'); setSelectedPost(null); }}
              className={`hover:underline cursor-pointer ${activeTab === 'blog' && !selectedPost ? 'underline text-[var(--text-primary)] font-medium' : 'text-[var(--text-secondary)]'}`}
            >
              Blog
            </button>
            <button 
              onClick={() => { setActiveTab('projects'); setSelectedPost(null); }}
              className={`hover:underline cursor-pointer ${activeTab === 'projects' && !selectedPost ? 'underline text-[var(--text-primary)] font-medium' : 'text-[var(--text-secondary)]'}`}
            >
              Projects
            </button>
            <button 
              onClick={() => { setActiveTab('photos'); setSelectedPost(null); }}
              className={`hover:underline cursor-pointer ${activeTab === 'photos' && !selectedPost ? 'underline text-[var(--text-primary)] font-medium' : 'text-[var(--text-secondary)]'}`}
            >
              Photos
            </button>
            <button 
              onClick={() => { setActiveTab('about'); setSelectedPost(null); }}
              className={`hover:underline cursor-pointer ${activeTab === 'about' && !selectedPost ? 'underline text-[var(--text-primary)] font-medium' : 'text-[var(--text-secondary)]'}`}
            >
              About
            </button>
          </nav>
          
          {/* Light/Dark Toggle Button */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-1 rounded hover:bg-[var(--code-bg)] text-[var(--text-primary)] cursor-pointer"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              // Sun Icon
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5"></circle>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
              </svg>
            ) : (
              // Moon Icon
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-grow">
        {selectedPost ? (
          /* BLOG READ DETAIL VIEW */
          <article className="space-y-6">
            <button 
              onClick={() => setSelectedPost(null)}
              className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline mb-4 inline-block cursor-pointer"
            >
              &larr; Back to list
            </button>
            <header className="space-y-2">
              <h1 className="text-3xl font-extrabold text-[var(--text-primary)] font-sans">{selectedPost.title}</h1>
              <div className="text-xs text-[var(--text-secondary)] space-x-3 flex flex-wrap items-center gap-y-1">
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
                {selectedPost.tags && selectedPost.tags.map(t => (
                  <span key={t} className="text-[10px] bg-[var(--code-bg)] border border-[var(--border-color)] px-1.5 py-0.5 rounded text-[var(--text-secondary)] ml-1">
                    {t}
                  </span>
                ))}
              </div>
            </header>
            <div className="border-t border-[var(--border-color)] pt-6">
              <RenderMarkdown content={selectedPost.content} />
            </div>
          </article>
        ) : activeTab === 'home' ? (
          /* PAPERMOD PROFILE MODE (HOME) */
          <div className="space-y-12">
            {/* Featured Posts list in Home */}
            <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-semibold mb-4">Recent Posts</h2>
              <div className="space-y-6">
                {posts.map(post => (
                  <article key={post.id} className="space-y-2">
                    <header>
                      <h3 
                        onClick={() => setSelectedPost(post)}
                        className="text-xl font-bold hover:underline cursor-pointer text-[var(--text-primary)]"
                      >
                        {post.title}
                      </h3>
                      <div className="text-xs text-[var(--text-secondary)] space-x-2 mt-1">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </header>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        ) : activeTab === 'projects' ? (
          /* MINIMAL PROJECTS LIST VIEW */
          <div className="space-y-8">
            <header className="space-y-1">
              <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">Projects</h1>
              <p className="text-xs text-[var(--text-secondary)]">A collection of open-source tooling, libraries, and visual projects.</p>
            </header>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-1.5 border-b border-[var(--border-color)] pb-4">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-2.5 py-1 rounded text-xs border cursor-pointer transition ${
                  !selectedTag 
                    ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent' 
                    : 'bg-transparent border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-2.5 py-1 rounded text-xs border cursor-pointer transition ${
                    selectedTag === tag 
                      ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent' 
                      : 'bg-transparent border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Projects List */}
            <div className="space-y-6">
              {filteredProjects.map(project => (
                <article key={project.id} className="post-entry">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">{project.title}</h3>
                    <div className="flex space-x-3 text-xs text-[var(--text-secondary)]">
                      {project.links.github && (
                        <a href={project.links.github} target="_blank" rel="noreferrer" className="hover:text-[var(--text-primary)] hover:underline">GitHub</a>
                      )}
                      {project.links.live && (
                        <a href={project.links.live} target="_blank" rel="noreferrer" className="hover:text-[var(--text-primary)] hover:underline">Live</a>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tags.map(t => (
                      <span key={t} className="text-[10px] bg-[var(--code-bg)] border border-[var(--border-color)] px-1.5 py-0.5 rounded text-[var(--text-secondary)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : activeTab === 'photos' ? (
          /* PHOTOS GALLERY VIEW */
          <div className="space-y-8">
            <header className="space-y-1">
              <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">Photos</h1>
              <p className="text-xs text-[var(--text-secondary)]">Moments captured during hikes, travels, and outdoor climbs.</p>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {[
                {
                  src: "/images/yosemite-valley.jpg"
                },
                {
                  src: "/images/lake-town.jpg"
                },
                {
                  src: "/images/guangzhou-night.jpg"
                },
                {
                  src: "/images/rocky-beach.png"
                },
                {
                  src: "/images/city-overlook-night.jpg"
                },
                {
                  src: "/images/light-deer.png"
                },
                {
                  src: "/images/banyan-steps.png"
                },
                {
                  src: "/images/misty-canyon.png"
                },
                {
                  src: "/images/swiss-alps-chalet.png",
                  isPanorama: true
                },
                {
                  src: "/images/forest-mountains.png",
                  isPanorama: true
                },
                {
                  src: "/images/yosemite-cliff.jpg",
                  isPanorama: true
                },
                {
                  src: "/images/mountain-panorama.png",
                  isPanorama: true
                }
              ].map((photo, index) => (
                <div 
                  key={index}
                  className={`group relative overflow-hidden bg-[var(--code-bg)] border border-[var(--border-color)] transition-all duration-300 hover:border-[var(--text-secondary)] ${
                    photo.isPanorama 
                      ? 'col-span-2 md:col-span-3 aspect-[21/9]' 
                      : 'aspect-square'
                  }`}
                >
                  <img 
                    src={photo.src} 
                    alt="Gallery photo"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'about' ? (
          /* ABOUT ME VIEW */
          <div className="space-y-6">
            <header className="flex justify-between items-center border-b border-[var(--border-color)] pb-3 mb-6">
              <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">Who Am I</h1>
              <div className="flex space-x-4">
                <a href="https://github.com/kolajy" target="_blank" rel="noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150" aria-label="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/jaylok" target="_blank" rel="noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </header>
            <div className="prose text-[15px] text-[var(--text-secondary)] leading-relaxed max-w-xl space-y-4">
              <p>
                I'm an engineer who's worked across the stack — mostly backend, data infrastructure, and systems, with a recent focus on building products and services powered by AI.
              </p>
              <p>
                I love building from 0 to 1, and I've got a real passion for breaking complex things down into something simple.
              </p>
              <p>
                Outside of work, I'm usually bouldering, hiking, or biking. Lately I've also been spending a lot of time on the business side of things — digging into 10-Ks, studying fundamentals, and trying to understand what actually separates the businesses that win from the ones that don't.
              </p>
            </div>
          </div>
        ) : (
          /* MINIMAL BLOG LIST VIEW */
          <div className="space-y-8">
            <header className="space-y-1">
              <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">Archive</h1>
              <p className="text-xs text-[var(--text-secondary)]">A chronological list of posts and publications.</p>
            </header>

            {/* Blog Tag Filters */}
            {allBlogTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 border-b border-[var(--border-color)] pb-4 mb-6">
                <button
                  onClick={() => setSelectedBlogTag(null)}
                  className={`px-2.5 py-1 rounded text-xs border cursor-pointer transition ${
                    !selectedBlogTag 
                      ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent' 
                      : 'bg-transparent border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  All
                </button>
                {allBlogTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedBlogTag(tag)}
                    className={`px-2.5 py-1 rounded text-xs border cursor-pointer transition ${
                      selectedBlogTag === tag 
                        ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent' 
                        : 'bg-transparent border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-6">
              {filteredPosts.map(post => (
                <article key={post.id} className="space-y-1">
                  <header>
                    <h2 
                      onClick={() => setSelectedPost(post)}
                      className="text-lg font-bold hover:underline cursor-pointer text-[var(--text-primary)]"
                    >
                      {post.title}
                    </h2>
                    <div className="text-xs text-[var(--text-secondary)] space-x-2 mt-0.5 flex flex-wrap items-center gap-y-1">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                      {post.tags && post.tags.map(t => (
                        <span 
                          key={t} 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBlogTag(t);
                          }}
                          className="text-[10px] bg-[var(--code-bg)] border border-[var(--border-color)] px-1.5 py-0.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] transition-colors duration-150 cursor-pointer ml-1"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </header>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2 pt-1">
                    {post.excerpt}
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* PaperMod Footer */}
      <footer className="mt-20 py-6 border-t border-[var(--border-color)] text-center text-xs text-[var(--text-secondary)]">
        <p>© 2026 Jay's space.</p>
      </footer>
    </div>
  );
}
