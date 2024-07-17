import fs from 'fs';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const distPath = path.resolve(__dirname, '../dist');
const packageJsonPath = path.resolve(__dirname, '../package-template.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const libraryName = packageJson.name;

async function moveDist() {
    const targetPath = path.resolve(__dirname, `../${libraryName}/dist`);
    try {
        if (fs.existsSync(path.dirname(targetPath))) {
          fs.rmSync(path.dirname(targetPath), { recursive: true, force: true });
        }
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });

        fs.renameSync(distPath, targetPath);
        console.log(`Moved dist directory to ${targetPath}`);
      } catch (err) {
        console.error('Error moving dist directory:', err);
    }
}

async function writePackageJSON() {
    const outputPath = path.resolve(__dirname, `../${libraryName}/package.json`);
    fs.writeFileSync(outputPath, JSON.stringify(packageJson, null, 2));
    console.log('Generated package.json in dist directory.');
}

async function copyAdditionnalFiles() {
  const targetPath = path.resolve(__dirname, `../${libraryName}/`);
  const readmePath = path.resolve(__dirname, '../README.md');
  fs.copyFileSync(readmePath, path.resolve(targetPath, 'README.md'));
  console.log('Copied README.md to target directory');
  const licensePath = path.resolve(__dirname, '../LICENCE');
  fs.copyFileSync(licensePath, path.resolve(targetPath, 'LICENCE'));
  console.log('Copied LICENSE to target directory');
}

moveDist();
writePackageJSON();
copyAdditionnalFiles();
