# PerfBudget

A CLI tool that tests files in a folder against a common filesize limit. Useful for enforcing a performance budget across your bundled production files.

## Install it
In your `package.json`, or globally with `npm install -g perfbudget`.

## Run it
Assuming the binary in `bin/perfbudget` is in your `$PATH`:

```bash
perfbudget --target=/my/bundle/folder --limit=150000

> File overlimit.js, weighing in at 2097152, is over the limit!
```

## Run the tests
`npm test`.
