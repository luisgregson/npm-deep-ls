# npm-deep-ls

`npm-deep-ls` is a command-line tool that allows you to search for a specified package across all package.json files in a directory and its subdirectories, displaying the dependency tree for each matching package.json.

## Usage

There are two ways to use `npm-deep-ls`:

### 1. Installing globally and running from a directory

Install the package globally:

```sh
npm install -g npm-deep-ls
```

Then, run the command from any directory:

```sh
npm-deep-ls <package-name>
```

### 2. Running with npx

Without installing the package, run the following command from any directory:

```sh
npx npm-deep-ls <package-name>
```

Replace `<package-name>` with the name of the package you want to search for.

## Example

If you want to find all instances of the `lodash` package in a directory and its subdirectories, run:

```sh
npx npm-deep-ls lodash
```

```sh
/path/to/your/project/package.json:
my-project@1.0.0 /path/to/your/project
└── lodash@4.17.21

/path/to/your/project/subdir1/package.json:
No instances of lodash found.

/path/to/your/project/subdir2/package.json:
my-subproject@1.0.0 /path/to/your/project/subdir2
└─┬ some-dependency@1.2.3
└── lodash@4.17.21
```

The output shows the path of each package.json containing `lodash` and the associated dependency tree.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

