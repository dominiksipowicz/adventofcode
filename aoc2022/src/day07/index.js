import run from "aocrunner";

const parseInput = (rawInput) => {
  const lines = rawInput
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => line.trim());

  class SpaceItem {
    constructor() {
      this.type = "dir";
      this.items = {};
      this.size = 0;
    }

    child(name) {
      return this.items[name];
    }
    addFolder(name) {
      this.items[name] = new SpaceItem();
    }
    addFile(name, size) {
      this.items[name] = {
        type: "file",
        size: parseInt(size),
      };
    }
  }

  // space object with tree structure
  const space = new SpaceItem();

  // current folder
  const pwd = [];

  lines.forEach((line) => {
    // early return for root folder
    if (line.trim() === "$ cd /") {
      return;
    }

    // change directory up
    if (line === "$ cd ..") {
      pwd.pop();
      return;
    }

    // change directory
    if (line.startsWith("$ cd ")) {
      const dir = line.substring(5);

      // check if dir exist in current pwd directory using space object
      let temp = space; // we start from the root
      pwd.forEach((name) => {
        if (!temp.child(name)) {
          temp.createChild(name);
        }
        temp = temp.child(name);
      });

      pwd.push(dir);

      return;
    }
    // list files in current directory
    if (line === "$ ls") {
      return;
    }

    // rest are files or directories
    const [size, name] = line.split(" ");

    let temp = space; // we start from the root
    pwd.forEach((name) => {
      temp = temp.child(name);
    });

    if (size === "dir") {
      temp.addFolder(name);
    } else {
      temp.addFile(name, size);
    }
  });

  return space;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let sum = 0;
  const max = 100_000;
  const traverse = (root) => {
    if (root.type === "file") {
      return root.size;
    }

    Object.keys(root.items).forEach((key) => {
      root.size += traverse(root.items[key]);
    });

    if (root.size <= max) {
      sum += root.size;
    }

    return root.size;
  };

  traverse(input);

  return sum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const totalDiskSpace = 70_000_000;
  const updateRunSpace = 30_000_000;

  const dirSizes = [];

  const traverse = (root) => {
    if (root.type === "file") {
      return root.size;
    }

    Object.keys(root.items).forEach((key) => {
      root.size += traverse(root.items[key]);
    });

    dirSizes.push(root.size);

    return root.size;
  };

  traverse(input);

  // last dir size is the root dir and the sum of all dir sizes
  const sum = dirSizes[dirSizes.length - 1];

  const sortedDirSizes = dirSizes.sort((a, b) => b - a).reverse();
  const freeSpace = totalDiskSpace - sum;
  const needSpace = updateRunSpace - freeSpace;

  // console.log(sortedDirSizes, sum, freeSpace, needSpace);

  // return the first dir size that is bigger than the needed space
  return sortedDirSizes.find((size) => size >= needSpace);
};

run({
  part1: {
    tests: [
      {
        input: `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 24933642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
