import { copyFile, mkdir, readdir } from 'node:fs/promises'
import { join } from 'node:path'

const root = process.cwd()
const entries = await readdir(root, { withFileTypes: true })
const dogSlugs = entries
  .filter(entry => entry.isDirectory() && entry.name.startsWith('dog-'))
  .map(entry => entry.name.slice('dog-'.length))
  .sort()

await Promise.all(dogSlugs.map(async slug => {
  const profileDirectory = join(root, 'dist', 'dogs', slug)
  await mkdir(profileDirectory, { recursive: true })
  await copyFile(join(root, 'dist', 'index.html'), join(profileDirectory, 'index.html'))
}))

console.log(`Created static entry pages for ${dogSlugs.length} dog profiles.`)
