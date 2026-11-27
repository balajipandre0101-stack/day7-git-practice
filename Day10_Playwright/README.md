# Playwright Regression Testing Project

## Project Overview
UI and API automation testing using Playwright and TypeScript.

## Technologies
- Playwright
- TypeScript
- Node.js

## Framework Features
- Page Object Model (POM)
- Custom fixtures
- Data-driven testing
- Smoke testing
- Regression testing
- Multi-browser execution
- HTML reporting

## Project Structure
- pages/ - Page Object Model classes
- tests/ - UI and API test cases
- docs/ - Flakiness and execution logs
- playwright.config.ts - Playwright configuration
- package.json - Dependencies and scripts

## Installation
npm install
npx playwright install

## Start Application
python app.py

Application URL: http://127.0.0.1:8000/

## Run Tests
All tests:
npx playwright test

Smoke tests:
npm run test:smoke

Regression tests:
npm run test:regression

Parameterized tests:
npx playwright test tests/parameterized-ticket.spec.ts

Previously failed tests:
npx playwright test --last-failed

## HTML Report
npx playwright show-report

## Regression Coverage
- Ticket creation
- Input validation
- Boundary testing
- Access control
- Ticket status management
- Comments
- Parameterized ticket creation
- REST API testing

## Reliability Results
- Regression runs: 5
- Total executions: 150
- Passed: 150
- Failed: 0
- Observed flaky failures: 0

See docs/flakiness-log.md for execution details.

## Conclusion
This project demonstrates Playwright automation using TypeScript, POM, fixtures, parameterized testing, regression tagging, and HTML reporting.
