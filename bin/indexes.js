const chokidar = await import('chokidar').then((module) => module.default)
const fs = await import('fs').then((module) => module.default)
const colors = await import('colors').then((module) => module.default)

let dirsToWatch = []

try {
  dirsToWatch = JSON.parse(fs.readFileSync('./indexes.json', 'utf8'))
} catch (err) {
  console.log(`${colors.green('indexes')} - indexes.json file not found`)
}

const watcher = chokidar.watch(dirsToWatch, {
  ignored: /[a-zA-Z].old.ts/,
})

const isThereIndex = (dir) => {
  return fs.existsSync(`${dir}/index.ts`)
}

const createIndex = (dir) => {
  fs.writeFileSync(`${dir}/index.ts`, '')
}

const fillIndex = (dir) => {
  const scanDir = fs.readdirSync(dir).filter((file) => {
    return file !== 'index.ts'
  })
  const lines = scanDir.map((file) => {
    return `export * from './${file.replace('.ts', '')}'`
  })
  fs.writeFileSync(`${dir}/index.ts`, lines.join('\n'))
}

const getDirFromPath = (path) => {
  return `./${path.split('/').slice(0, 1)}`
}

const generateIndex = (path) => {
  if (!isThereIndex(path)) {
    createIndex(path)
  }
  fillIndex(path)
}

watcher.on('add', (path) => {
  console.log(`${colors.green('indexes')} - Added ${path} file`)
  const dir = getDirFromPath(path)
  generateIndex(dir)
}).on('unlink', (path) => {
  console.log(`${colors.green('indexes')} - Removed ${path} file`)
  const dir = getDirFromPath(path)
  generateIndex(dir)
})
