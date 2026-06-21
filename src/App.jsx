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
              <div className="text-xs text-[var(--text-secondary)] space-x-3">
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
              </div>
            </header>
            <div className="border-t border-[var(--border-color)] pt-6">
              <RenderMarkdown content={selectedPost.content} />
            </div>
          </article>
        ) : activeTab === 'home' ? (
          /* PAPERMOD PROFILE MODE (HOME) */
          <div className="space-y-12">
            <section className="flex flex-col items-center text-center space-y-6 py-12">
              {/* Minimal Avatar Circle */}
              <div className="w-24 h-24 rounded-full bg-[var(--code-bg)] border border-[var(--border-color)] flex items-center justify-center text-2xl font-bold text-[var(--text-primary)] shadow-sm">
                JL
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">Jay Lok</h1>
              </div>
              
              {/* Minimal social links */}
              <div className="flex space-x-4 pt-2">
                <a href="https://github.com/kolajy" target="_blank" rel="noreferrer" className="social-link text-sm hover:underline">GitHub</a>
                <span className="text-[var(--border-color)]">/</span>
                <a href="https://linkedin.com/in/jaylok" target="_blank" rel="noreferrer" className="social-link text-sm hover:underline">LinkedIn</a>
              </div>
            </section>

            {/* Featured Posts list in Home */}
            <section className="space-y-6 border-t border-[var(--border-color)] pt-8">
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
        ) : activeTab === 'about' ? (
          /* ABOUT ME VIEW */
          <div className="space-y-8">
            <header className="space-y-1">
              <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">About Me</h1>
            </header>
            <div className="prose text-[15px] text-[var(--text-secondary)] leading-relaxed max-w-xl">
              <p>
                Passionate explorer who loves building 0 to 1 and loves learning and understanding the world around us.
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

            <div className="space-y-6 border-t border-[var(--border-color)] pt-6">
              {posts.map(post => (
                <article key={post.id} className="space-y-1">
                  <header>
                    <h2 
                      onClick={() => setSelectedPost(post)}
                      className="text-lg font-bold hover:underline cursor-pointer text-[var(--text-primary)]"
                    >
                      {post.title}
                    </h2>
                    <div className="text-xs text-[var(--text-secondary)] space-x-2 mt-0.5">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
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
        <p>© 2026 Jay's space. Powered by React & PaperMod aesthetic.</p>
      </footer>
    </div>
  );
}
