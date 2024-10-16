class VirtualFileSystem {
  constructor() {
    this.fileSystem = {
      root: {
        type: 'directory',
        contents: {
          home: {
            type: 'directory',
            contents: {
              projects: {
                type: 'directory',
                contents: {
                  'project1.txt': { type: 'file', content: 'This is project 1' },
                  'project2.txt': { type: 'file', content: 'This is project 2' },
                },
              },
              'about.txt': { type: 'file', content: 'I am a passionate developer...' },
              'skills.txt': { type: 'file', content: 'JavaScript, React, Node.js, Python...' },
            },
          },
          sys: {
            type: 'directory',
            contents: {
              'config.txt': { type: 'file', content: 'System configuration' },
            },
          },
        },
      },
    };
    this.currentPath = ['root'];
  }

  getCurrentDirectory() {
    return this.currentPath.reduce((acc, curr) => acc.contents[curr], this.fileSystem);
  }

  cd(path) {
    if (path === '..') {
      if (this.currentPath.length > 1) {
        this.currentPath.pop();
        return `Changed directory to /${this.currentPath.join('/')}`;
      } else {
        return 'Already at root directory';
      }
    }

    const currentDir = this.getCurrentDirectory();
    if (currentDir.contents[path] && currentDir.contents[path].type === 'directory') {
      this.currentPath.push(path);
      return `Changed directory to /${this.currentPath.join('/')}`;
    } else {
      return `Directory not found: ${path}`;
    }
  }

  ls() {
    const currentDir = this.getCurrentDirectory();
    return Object.entries(currentDir.contents)
      .map(([name, item]) => {
        return `${item.type === 'directory' ? 'd' : '-'} ${name}`;
      })
      .join('\n');
  }

  cat(filename) {
    const currentDir = this.getCurrentDirectory();
    if (currentDir.contents[filename] && currentDir.contents[filename].type === 'file') {
      return currentDir.contents[filename].content;
    } else {
      return `File not found: ${filename}`;
    }
  }

  pwd() {
    return '/' + this.currentPath.join('/');
  }
}

export default VirtualFileSystem;
