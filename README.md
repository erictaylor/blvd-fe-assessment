# Blvd FE Assessment

This is a take-home assessment for Boulevard's frontend engineer role. The original provided instructions for this assessment can be found in [INSTRUCTIONS.md](INSTRUCTIONS.md).

I chose not to use the provided CRA based starter, and instead setup a project with tools I enjoy using (Vite, Vitest, Tailwind, Playwright, React Testing Library) and some new tools I wanted to experiment with and evaluate for potential use in future production projects (ie Biome).

> **NOTE**
> See the [Biome note](#biome) below for an explanation of its usage.

I'm not certain of the exact amount of time I spent on this assessment. I worked on it in my free time in between other things over the course of a couple days. I'd guess I spent around 4-6 hours on it.

## Getting Started

To get started, clone this repo and run the following commands:

```
$ pnpm install
$ pnpm run dev
```

> **NOTE**
> I use PNPM, but obviously you can use NPM or Yarn if you prefer. Obviously, the lock files for those package managers are not included and you _could_ run into potential issues when the dependencies are resolved on first install (though not likely).

## Formatting

To run the formatter, run the following command:

```
$ pnpm run format
```

## Linting

To run the linter, run the following command:

```
$ pnpm run lint
```

## Testing

To run the tests, run the following command:

```
$ pnpm run test
```

This will run a check of formatting, linting, and unit tests. It will also run the e2e tests in headless mode.

Additionally, you can run the following command to run unit tests alone:

```
$ pnpm run test:vitest
```

And you can run the following command to run e2e tests in headed mode:

```
$ pnpm run test:playwright
```

> **NOTE**
> Playwright is setup to run against our "preview" environment. So you must first "build" the project before running the e2e tests (ie `pnpm run build`).

A GitHub action is included that will run tests and verify everything is green on PRs.

## Notes

<div id="biome" />

### Biome vs Prettier/ESLint

In production projections I still am a solid user of Prettier and ESLint. That said, I've followed the [Biome](https://biomejs.dev) (formally [Rome](https://github.com/rome/tools)) project for awhile now and have been evaluating it as a replacement to Prettier/ESLint.

I've been very impressed with Biome from a speed and error reporting standpoint. The formatter is great and prescribes to Prettier's rules. In fact, using Biome or Prettier should render exactly the same results with similar configs. So I'm a big fan of the formatter.

The linter is a bit of a different story. I enjoy the speed and the error reporting, but the overall stability (LSP/VS Code) of the linter leaves room for improvement. Also, Biome only has a subset of linting rules and has no way to extend or add custom rules. So ESLint is still the clear winner here. That said, I'm excited to see where Biome goes in the future and will continue to evaluate it for future projects.

### Commit Linting and Checks

I chose not to setup Husky or other git hooks to run tasks like linting, formatting, testing, etc on git commit/push. This was simply a choice on keeping to the prescribed amount of time to spend on the assessment and put time in other areas.

Normally I would set these sorts of tools up as I find them very helpful in keeping a codebase clean and consistent.