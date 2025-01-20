import { promises as fs } from 'node:fs';
import { readdirSync } from 'node:fs';
import path, { join } from 'node:path';

const cwd = process.cwd();
const packagesPath = join(cwd, 'packages');
const packagesDir = readdirSync(packagesPath, { withFileTypes: true });
const internalPackages = ['tailwind-config', 'shadcn-ui', 'typescript-config'];

const packages = packagesDir
  .filter((dir) => dir.isDirectory() && !internalPackages.includes(dir.name))
  .map((dir) => dir.name);

const PUBLIC_FOLDER_BASE_PATH = 'apps/docs/public/registry';

const writeFileRecursive = async (filePath: string, data: string) => {
  const dir = path.dirname(filePath);

  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(filePath, data, 'utf-8');
};

const buildRegistry = async (pkg: string) => {
  const cwd = process.cwd();

  const packagePath = join(cwd, 'packages', pkg, 'package.json');
  const packageJson = await import(packagePath);

  const dependencies = Object.keys(packageJson.dependencies).filter(
    (dep) => !['react', 'react-dom', '@repo/shadcn-ui'].includes(dep)
  );

  const devDependencies = Object.keys(packageJson.devDependencies).filter(
    (dep) =>
      ![
        '@repo/typescript-config',
        '@types/react',
        '@types/react-dom',
        'typescript',
      ].includes(dep)
  );

  const contentPath = join(cwd, 'packages', pkg, 'index.tsx');
  const content = await fs.readFile(contentPath, 'utf-8');

  const registryDependencies = (
    content.match(/@\/components\/ui\/([a-z-]+)/g) || []
  )
    .map((path) => path.split('/').pop())
    .filter((name): name is string => !!name);

  const json = JSON.stringify(
    {
      $schema: 'https://ui.shadcn.com/schema/registry.json',
      homepage: `https://www.kibo-ui.com/${pkg}`,
      name: pkg,
      type: 'registry:ui',
      author: 'Hayden Bleasel <hello@haydenbleasel.com>',
      registryDependencies,
      dependencies,
      devDependencies,
      files: [
        {
          type: 'registry:ui',
          path: 'index.tsx',
          content,
          target: `kibo-ui/${pkg}.tsx`,
        },
      ],
    },
    null,
    2
  );
  const jsonPath = `${PUBLIC_FOLDER_BASE_PATH}/${pkg}.json`;
  await writeFileRecursive(jsonPath, json);
};

const main = async () => {
  for (const pkg of packages) {
    await buildRegistry(pkg);
  }
};

main()
  .then(() => {
    console.log('done');
  })
  .catch((err) => {
    console.error(err);
  });
