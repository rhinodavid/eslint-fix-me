# eslint-fix-me

`eslint-fix-me` runs [`eslint`](https://eslint.org/) on your files and creates
comments to disable ESLint warnings or errors it encounters.

## `// $eslint-fix-me github.com/rhinodavid/eslint-fix-me`

Do you see this line in your code? That means someone has used this tool
to suppress ESLint errors and warnings, most likely after the codebase
has been migrated from no linter on another linter, or when changing
ESLint rules.

### What should you do?

Delete the comment and the related `eslint-disable`
[disabling rule](https://eslint.org/docs/latest/user-guide/configuring/rules#disabling-rules).

Run ESLint or an ESLint plugin to diagnose the problem and _fix it_.

## Usage

With [`npx`](https://www.npmjs.com/package/npx):
```sh
npx eslint-fix-me .
```

With [`pnpm`](https://pnpm.io/cli/dlx):
```sh
pnpm dlx eslint-fix-me .
```

With [`yarn`](https://yarnpkg.com/cli/dlx):
```sh
yarn dlx eslint-fix-me .
```

## Why would I want this?

If you're migrating a codebase to ESLint from a legacy linter like [TSLint](https://palantir.github.io/tslint/),
migrating from no linter, or changing ESLint rules, your code is unlikely to pass the linter as-is.

One option is to add ESLint and fix all the issues in one commit. This is risky because you might
introduce errors as you change the logic to pass ESLint.

A safer way is to run `eslint-fix-me` on the code. In one PR you can migrate to ESLint with warnings
and errors suppressed. Then, in subsequent PRs, you can take you time to address each
`$eslint-fix-me` comment carefully, all while maintaining ESLint coverage on any new code being
committed.

## Alternatives

[**eslint-fix-later**](https://github.com/salimkayabasi/eslint-fix-later): More mature, but disables ESLint
for the entire file that contains the warning or error
