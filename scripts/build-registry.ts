import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { registryItemFileSchema } from 'shadcn-ui/apps/www/registry/schema';
import type { z } from 'zod';
import { ui } from '../registry';

const REGISTRY_BASE_PATH = 'registry';
const PUBLIC_FOLDER_BASE_PATH = 'public/registry';
const COMPONENT_FOLDER_PATH = 'components';

type File = z.infer<typeof registryItemFileSchema>;

async function writeFileRecursive(filePath: string, data: string) {
  const dir = path.dirname(filePath); // Extract the directory path

  try {
    // Ensure the directory exists, recursively creating directories as needed
    await fs.mkdir(dir, { recursive: true });

    // Write the file
    await fs.writeFile(filePath, data, 'utf-8');
    console.log(`File written to ${filePath}`);
  } catch (error) {
    console.error(`Error writing file`);
    console.error(error);
  }
}

const getComponentFiles = async (files: File[]) => {
  const filesArrayPromises = files.map(async (file) => {
    const filePath = path.join(REGISTRY_BASE_PATH, file.path);
    const fileContent = await fs.readFile(filePath, 'utf-8');

    return {
      type: file.type,
      path: file.path,
      content: fileContent,
      target: `${COMPONENT_FOLDER_PATH}/${file}`,
    };
  });

  const filesArray = await Promise.all(filesArrayPromises);

  return filesArray;
};

const main = async () => {
  // make a json file and put it in public folder
  for (const component of ui) {
    const { files } = component;

    if (!files) {
      throw new Error('No files found for component');
    }

    const filesArray = await getComponentFiles(files);

    const json = JSON.stringify(
      {
        ...component,
        files: filesArray,
      },
      null,
      2
    );
    const jsonPath = `${PUBLIC_FOLDER_BASE_PATH}/${component.name}.json`;
    await writeFileRecursive(jsonPath, json);
    console.log(json);
  }
};

main()
  .then(() => {
    console.log('done');
  })
  .catch((err) => {
    console.error(err);
  });
