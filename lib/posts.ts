import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

/* ──────────────────────────────────────────────────
   POST TYPE
────────────────────────────────────────────────── */
export interface Post {
  slug:      string
  title:     string
  date:      string
  excerpt:   string
  tags:      string[]
  readTime:  string
  featured:  boolean
  published: boolean
  content:   string
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

/* ──────────────────────────────────────────────────
   Parse a single MDX file into a Post object
────────────────────────────────────────────────── */
function parsePost(filename: string): Post {
  const slug     = filename.replace(/\.mdx?$/, '')
  const fullPath = path.join(POSTS_DIR, filename)
  const raw      = fs.readFileSync(fullPath, 'utf-8')
  const { data, content } = matter(raw)

  const stats = readingTime(content)

  return {
    slug,
    title:     data.title     ?? 'Untitled',
    date:      data.date      ?? new Date().toISOString().split('T')[0],
    excerpt:   data.excerpt   ?? '',
    tags:      data.tags      ?? [],
    readTime:  data.readTime  ?? stats.text,
    featured:  data.featured  ?? false,
    published: data.published ?? true,
    content,
  }
}

/* ──────────────────────────────────────────────────
   getAllPosts
   Returns all PUBLISHED posts, sorted by date desc
────────────────────────────────────────────────── */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return []

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter(f => /\.mdx?$/.test(f))

  const posts = files
    .map(parsePost)
    .filter(p => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

/* ──────────────────────────────────────────────────
   getPostBySlug
   Returns a single post by its slug (filename minus extension)
   Throws if not found or unpublished
────────────────────────────────────────────────── */
export function getPostBySlug(slug: string): Post {
  const filename = `${slug}.mdx`
  const fullPath = path.join(POSTS_DIR, filename)

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`)
  }

  const post = parsePost(filename)

  if (!post.published) {
    throw new Error(`Post is unpublished: ${slug}`)
  }

  return post
}

/* ──────────────────────────────────────────────────
   getFeaturedPosts
   Returns published posts with featured: true, newest first
────────────────────────────────────────────────── */
export function getFeaturedPosts(limit = 3): Post[] {
  const all = getAllPosts()
  return all.filter(p => p.featured).slice(0, limit)
}

/* ──────────────────────────────────────────────────
   getAllSlugs
   Used by generateStaticParams() in dynamic routes
────────────────────────────────────────────────── */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []

  return fs
    .readdirSync(POSTS_DIR)
    .filter(f => /\.mdx?$/.test(f))
    .map(f => f.replace(/\.mdx?$/, ''))
}
