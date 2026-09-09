# YouTube Playwright Automation Assignment

This project uses TypeScript and Playwright to automate YouTube and extract details from the first video returned for the search term "playwright".

## Extracted Information

The automation extracts:

- Video title
- Video duration
- Channel name
- Published date
- Video URL
- Complete video description

## Technologies Used

- TypeScript
- Playwright
- Node.js

## Prerequisites

- Node.js
- npm

## Installation

Clone the repository and navigate to the project folder.

Install the project dependencies:

```bash
npm install
```

Download Playwright's own Chromium browser. This does not require Google Chrome to be installed:

```bash
npm run setup
```

Run the automation:

```bash
npm start
```

Repeat `npm install` and `npm run setup` on every new system. Playwright downloads the correct browser build for that operating system; the browser files should not be committed to the repository.