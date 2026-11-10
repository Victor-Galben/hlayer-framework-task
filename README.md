# Cypress Practice

Cypress end-to-end testing project for:

- The public [Restful-Booker API](https://restful-booker.herokuapp.com).
- The [Sauce Demo](https://www.saucedemo.com) web application.

## Setup and run

### Requirements

- Node.js with npm.
- Network access to the Restful-Booker API and Sauce Demo.

### First-time setup

Clone the repository, enter the project directory, and create the local environment file:

```bash
git clone https://github.com/Victor-Galben/hlayer-framework-task.git
cd hlayer-framework-task
cp .env.example .env
```

Set the Restful-Booker credentials to credentials accepted by that API. The Sauce Demo usernames and password are its public demo accounts. The Sauce Demo URL is not a secret, so it is set in `cypress.config.js` under `expose` instead of `.env`.

The `.env` file is git-ignored; do not commit secrets. In CI, provide these values through the CI platform's environment variables or secrets instead of committing an `.env` file.

| Variable                 | Used for                                          |
| ------------------------ | ------------------------------------------------- |
| `BOOKER_USERNAME`        | Restful-Booker authentication                     |
| `BOOKER_PASSWORD`        | Restful-Booker authentication                     |
| `UI_STANDARD_USERNAME`   | Sauce Demo checkout and checkout-validation tests |
| `UI_LOCKED_OUT_USERNAME` | Sauce Demo locked-out-user test                   |
| `UI_PASSWORD`            | Sauce Demo test-user password                     |

### Install and run everything

On a clean machine with Node.js/npm installed, install the dependencies and run all specs:

```bash
npm ci && npm run cy:run
```

`npm ci` installs the project dependencies, including Cypress. The Cypress install step normally downloads its matching test runner binary. The `.env` file must be configured before running tests that require environment values.

### Other run commands

```bash
npm run cy:run:api   # Run API specs only
npm run cy:run:ui    # Run UI specs only
npm run cy:open      # Open Cypress interactively
npm run cy:run       # Run all specs headlessly
```

For CI, run `npm ci` followed by `npm run cy:run`, or run the API and UI commands as separate pipeline steps. The Cypress run commands return a non-zero exit status if a selected test fails.

### Linting and formatting

The project uses [ESLint](https://eslint.org) (with `eslint-plugin-cypress`) for code quality and [Prettier](https://prettier.io) for formatting.

```bash
npm run lint          # Check code with ESLint
npm run lint:fix      # Auto-fix ESLint issues where possible
npm run format        # Format all files with Prettier
npm run format:check  # Report files that are not formatted
```

A [husky](https://typicode.github.io/husky/) pre-commit hook runs [lint-staged](https://github.com/lint-staged/lint-staged) on every `git commit`: staged files are formatted with Prettier and checked with `eslint --fix`. The commit is blocked if an ESLint error cannot be fixed automatically. The hook is installed automatically by `npm install` / `npm ci` through the `prepare` script. Use `git commit --no-verify` to skip it in exceptional cases.

VS Code users can install the recommended Prettier and ESLint extensions (see `.vscode/extensions.json`) to format and fix files on save.

## Test approach

### API scenarios

The current Restful-Booker spec covers:

- **Partial update (`PATCH`)** — checks that updating a selected field returns the updated booking while preserving the other fields.
- **Full update (`PUT`)** — checks that replacing the booking with a complete payload returns the updated booking.
- **Unauthenticated deletion** — checks that a protected delete is rejected with `403 Forbidden`.
- **Per-test booking setup and cleanup** — gives each test a booking to operate on and deletes it afterward.

These scenarios cover the two update semantics and an authorization boundary. They provide focused API coverage without depending on existing bookings or testing a broad set of unrelated endpoints.

### UI scenarios

The current Sauce Demo spec covers:

- **Successful checkout journey** — exercises UI login, adding products, cart contents, checkout details, the price summary, and order confirmation.
- **Locked-out login** — verifies a known authentication edge case and its visible error feedback.
- **Missing checkout information** — verifies required-field validation and that the flow remains on the information step.

These cases were chosen to cover a representative happy path and two distinct negative paths: authentication rejection and form validation.

### What is not automated

- **All possible field/input combinations** are not included; this suite focuses on representative core behavior rather than a full validation matrix.
- **Load, stress, and broad performance testing** are not Cypress end-to-end checks; use a performance-testing tool and a controlled environment for those goals.
- **Penetration testing and a full security audit** are out of scope for these functional tests.
- **The Sauce Demo authentication flow is not tested through an API.** The app handles login client-side and does not expose a server login API in this test setup, so login and the locked-out case use the UI. The checkout-validation test establishes the app's client-side session cookie to focus on checkout validation.

## Design decisions

- **Cypress** was selected because this project uses JavaScript, and Cypress supports browser-based UI flows as well as direct HTTP API checks with `cy.request()`. A trade-off is that UI specs run in a browser and can be affected by external site availability.
- **Separate API and UI spec folders** (`cypress/e2e/api/` and `cypress/e2e/ui/`) make it easy to run suites independently in local development and CI. The trade-off is that a full run still depends on both external demo services being available.
- **Custom commands** in `cypress/support/` hold reusable API requests and shared browser setup. **Page objects** hold Sauce Demo page actions and assertions so the UI spec describes scenarios at a higher level. This adds a layer of indirection, so simple one-off actions remain in the spec when they do not justify another abstraction.
- **JSON fixtures** separate request/test data and stable UI `data-test` IDs from test flow. Locators are stored as bare test IDs and resolved with the shared `cy.getByTestId()` command. This keeps selectors consistent, but fixture updates are needed if the application's test IDs change.
- **Environment variables** keep credentials and environment-specific URLs out of the test code. Local values belong in the ignored `.env`; CI values should be configured as CI secrets/variables. Cypress 16's `cy.env()` reads the sensitive credentials when needed.

## Assumptions

- The configured Restful-Booker account is authorized to create, update, and delete test bookings.
- Sauce Demo's published demo accounts and test selectors remain available and behave as observed by the tests.
- Tests may create and delete temporary booking records on the public demo API.
- Expected API status codes reflect the current demo API behavior; they may differ from generic HTTP conventions.
- The checkout test data and displayed prices used by assertions remain stable for the selected Sauce Demo products.

## Project structure

```text
.
├── cypress/
│   ├── e2e/
│   │   ├── api/                   # Restful-Booker API specs
│   │   └── ui/                    # Sauce Demo browser specs
│   ├── fixtures/
│   │   ├── api/                   # Restful-Booker request/response data
│   │   └── ui/                    # Sauce Demo test data and data-test IDs
│   └── support/
│       ├── pages/                 # Sauce Demo page objects
│       ├── bookerCommands.js      # Restful-Booker custom commands
│       ├── sauceDemoCommands.js   # Sauce Demo custom Cypress commands
│       └── e2e.js                 # Loads shared support commands
├── docs/                          # Test plans, bug notes, and AI usage notes
├── .husky/pre-commit              # Pre-commit hook (runs lint-staged)
├── .vscode/                       # Recommended editor settings and extensions
├── cypress.config.js              # Cypress configuration
├── eslint.config.mjs              # ESLint configuration
├── .prettierrc.json               # Prettier configuration
├── .lintstagedrc.json             # lint-staged configuration
└── .env.example                   # Template for local environment variables
```

Additional project references:

- [cypress.config.js](./cypress.config.js) configures Cypress and the Restful-Booker `baseUrl`.
- [.env.example](./.env.example) lists the environment variables expected locally.
- [docs/bookerTestPlan.md](./docs/bookerTestPlan.md) contains the Restful-Booker API test plan.
- [docs/sauceDemoTestPlan.md](./docs/sauceDemoTestPlan.md) contains the Sauce Demo UI test plan.
- [docs/BUGS.md](./docs/BUGS.md) records observed API/documentation concerns.
- [docs/AI_USAGE.md](./docs/AI_USAGE.md) describes how AI tools were used in this project.

## Adding tests

- Place API specs in `cypress/e2e/api/` and UI specs in `cypress/e2e/ui/`.
- Reuse custom commands or page objects under `cypress/support/` when behavior is shared.
- Keep UI `data-test` IDs in `cypress/fixtures/ui/sauceDemoSelectors.json` and scenario data in `cypress/fixtures/ui/sauceDemoData.json`. API request data lives in `cypress/fixtures/api/`.
- Run `npm run lint` and `npm run format:check` before pushing (the pre-commit hook covers staged files automatically).
- Prefer independent tests with explicit setup and cleanup.

## Next steps

- Add API tests for booking creation/retrieval, invalid payloads, nonexistent booking IDs, and missing/invalid authentication.
- Add UI tests for additional checkout and cart edge cases, and verify application state after navigation or reload where applicable.
- Add schema/type validation for API response bodies to catch shape and type regressions more explicitly.
- Consider adding a dedicated performance/security test stage with tools designed for those kinds of checks.
