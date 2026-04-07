import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/* ──────────────────────────────────────────────────
   PROJECT TYPE
────────────────────────────────────────────────── */
export interface Project {
  slug:        string
  title:       string
  year:        number
  description: string
  tags:        string[]
  url:         string
  github:      string
  featured:    boolean
  span:        'normal' | 'wide'
  color:       string  // CSS token name: 'accent' | 'violet' | 'emerald' | 'orange' | 'rose' | 'amber'
  category:    string  // Human-readable: 'Developer Tools', 'Infrastructure', etc.
  content:     string
}

const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects')

/* ──────────────────────────────────────────────────
   Parse a single MDX file into a Project object
────────────────────────────────────────────────── */
function parseProject(filename: string): Project {
  const slug     = filename.replace(/\.mdx?$/, '')
  const fullPath = path.join(PROJECTS_DIR, filename)
  const raw      = fs.readFileSync(fullPath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title:       data.title       ?? 'Untitled Project',
    year:        data.year        ?? new Date().getFullYear(),
    description: data.description ?? '',
    tags:        data.tags        ?? [],
    url:         data.url         ?? '',
    github:      data.github      ?? '',
    featured:    data.featured    ?? false,
    span:        data.span        ?? 'normal',
    color:       data.color       ?? 'accent',
    category:    data.category    ?? 'Project',
    content,
  }
}

/* ──────────────────────────────────────────────────
   getAllProjects
   Returns all projects sorted by year desc
────────────────────────────────────────────────── */
export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return []

  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter(f => /\.mdx?$/.test(f))

  return files
    .map(parseProject)
    .sort((a, b) => b.year - a.year)
}

/* ──────────────────────────────────────────────────
   getFeaturedProjects
────────────────────────────────────────────────── */
export function getFeaturedProjects(limit = 4): Project[] {
  const all = getAllProjects()
  return all.filter(p => p.featured).slice(0, limit)
}
