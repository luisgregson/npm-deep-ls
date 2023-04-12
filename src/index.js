const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const ignore = require('ignore');

function findPackageJsonFiles(dir, fileList, ig) {
  const files = fs.readdirSync(dir);
  fileList = fileList || [];

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const relativePath = path.relative('.', fullPath);
    if (!ig.ignores(relativePath)) {
      if (fs.statSync(fullPath).isDirectory()) {
        fileList = findPackageJsonFiles(fullPath, fileList, ig);
      } else if (file === 'package.json') {
        fileList.push(fullPath);
      }
    }
  });

  return fileList;
}

function deepLS (packageName) {
  // Read and parse the .gitignore file
  const gitignorePath = path.join('.', '.gitignore');
  const gitignoreContent = fs.existsSync(gitignorePath) ? fs.readFileSync(gitignorePath).toString() : '';
  const ig = ignore().add(gitignoreContent);
  
  const packageJsonFiles = findPackageJsonFiles('.', undefined, ig);
  
  packageJsonFiles.forEach((packageJsonPath) => {
    try {
      const result = spawnSync(
        'npm',
        ['ls', packageName, '--all'],
        { cwd: path.dirname(packageJsonPath), encoding: 'utf-8' }
      );

      if (result.error) {
        throw result.error;
      }
  
      console.log(`\n${packageJsonPath}:`);
      console.log(result.status === 0 && result.stdout ? result.stdout : `No instances of ${packageName} found`);
    } catch (error) {
      console.error(`Error running 'npm ls' for ${packageJsonPath}:`, error.message);
    }
  });
}

module.exports = deepLS;
