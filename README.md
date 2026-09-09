# YouTube Playwright Automation Assignment

This project uses **TypeScript** and **Playwright Test** to automate YouTube and extract details from the first video returned for the search term **"playwright"**.

The project also generates a **Playwright HTML test report** containing the test execution steps and extracted output.

## Assignment Objective

The automation performs the following steps:

1. Open YouTube.
2. Search for **"playwright"**.
3. Select the first video from the search results.
4. Extract the following information:
   - Video title
   - Video duration
   - Channel/author name
   - Video description
5. Extract additional information:
   - Published date
   - Video URL
6. Generate a Playwright HTML report containing the test execution details and output.

## Extracted Information

The automation extracts:

- **Video Title**
- **Video Duration**
- **Channel Name**
- **Published Date**
- **Video URL**
- **Complete Video Description**

## Technologies Used

- TypeScript
- Playwright Test
- Node.js
- npm

## Prerequisites

Make sure the following are installed:

- Node.js
- npm

Playwright uses its own Chromium browser, so Google Chrome does not need to be installed separately.

## Installation

Clone the repository and navigate to the project directory.

Install the project dependencies:

```bash
npm install
```

Install Playwright's Chromium browser:

```bash
npm run setup
```

The `setup` script downloads the Chromium browser required by Playwright.

## Run the Automation

Run the Playwright test using:

```bash
npm start
```

The automation will:

- Launch Chromium
- Open YouTube
- Search for "playwright"
- Select the first video
- Extract the required information
- Print the extracted information to the console
- Generate a Playwright HTML report

## View the HTML Report

After the test execution is completed, open the Playwright HTML report using:

```bash
npx playwright show-report
```

The report provides:

- Test execution status
- Test steps
- Execution time
- Console output
- Extracted YouTube video information

## Sample Extracted Output

```text
First Video Title: Learn JS Playwright Automation In 7 Hours | Complete Playwright Tutorial For Beginners

Duration: 6:21:08

Channel Name: alexusadays

Published Date: Sep 12, 2024

Video URL: /watch?v=hN1Zn6kLntk

Description:
Learn Playwright Automation In 7 Hours | JS Playwright Testing Full Vourse
...
```

The actual output may change because YouTube search results can change over time.

## Project Structure

```text
Playwright_Automation_Assignment/
│
├── test.spec.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

## Playwright Configuration

The project uses `playwright.config.ts` to configure the Playwright HTML reporter and browser behavior.

The HTML report is configured not to open automatically after every test run. It can be opened manually using:

```bash
npx playwright show-report
```

## Package Scripts

The project provides the following npm scripts:

```bash
npm start
```

Runs the Playwright test.

```bash
npm run setup
```

Installs Playwright's Chromium browser.

## Notes

- Run `npm install` after cloning the repository on a new system.
- Run `npm run setup` to install the required Playwright browser.
- Playwright's browser binaries do not need to be committed to the repository.
- The extracted YouTube result may change depending on the current YouTube search results.

## Author

Harisankar S