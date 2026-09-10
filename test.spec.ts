import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Extract details from the first YouTube Playwright video', async ({ page }) => {

    try {
        console.log('Starting Playwright...');

        // Open YouTube
        await test.step('Open YouTube', async () => {
            await page.goto('https://www.youtube.com');

            await expect(page).toHaveURL(/youtube\.com/);

            console.log('YouTube opened successfully!');
        });

        // Find the YouTube search box
        const searchBox = page.getByRole('combobox', {
            name: /search/i
        });

        // Search for "playwright"
        await test.step('Search for Playwright', async () => {
            await expect(searchBox).toBeVisible();

            await searchBox.fill('playwright');
            await searchBox.press('Enter');

            console.log('Search completed!');
        });

        // Find all video search results
        const videos = page.locator('ytd-video-renderer');

        // Select the first video
        const firstVideo = videos.first();

        await test.step('Verify search results', async () => {
            await expect(firstVideo).toBeVisible();

            console.log('Search results found!');
        });

        // Get the video title
        const title = await firstVideo
            .locator('#video-title')
            .getAttribute('title');

        await test.step('Extract video title', async () => {
            expect(title).toBeTruthy();

            console.log('First Video Title:', title);
        });

        // Get the video duration
        const durationText = await firstVideo
            .locator('ytd-thumbnail-overlay-time-status-renderer')
            .innerText();

        const duration = durationText
            .split('\n')
            .map(text => text.trim())
            .filter(text => text.length > 0)[0];

        await test.step('Extract video duration', async () => {
            expect(duration).toBeTruthy();

            console.log('Duration:', duration);
        });

        // Get the channel name
        const channelName = await firstVideo
            .locator('ytd-channel-name a')
            .first()
            .innerText();

        await test.step('Extract channel name', async () => {
            expect(channelName).toBeTruthy();

            console.log('Channel Name:', channelName);
        });

        // Get the video URL
        const videoUrl = await firstVideo
            .locator('#video-title')
            .getAttribute('href');

        await test.step('Verify video URL', async () => {
            expect(videoUrl).toBeTruthy();
            expect(videoUrl).toMatch(/\/watch\?v=/);

            console.log('Video URL:', videoUrl);
        });

        // Create the complete video URL
        const fullVideoUrl = new URL(
            videoUrl!,
            'https://www.youtube.com'
        ).toString();

        // Open the first video
        await test.step('Open the first video', async () => {
            await page.goto(fullVideoUrl);

            await expect(page).toHaveURL(/youtube\.com\/watch/);

            console.log('First video opened!');
        });

        // Wait until the published date element is attached to the page
        await page
            .locator('#info-strings yt-formatted-string')
            .first()
            .waitFor({
                state: 'attached'
            });

        // Get the published date
        const publishedDate = await page
            .locator('#info-strings yt-formatted-string')
            .first()
            .innerText();

        await test.step('Extract published date', async () => {
            expect(publishedDate).toBeTruthy();

            console.log('Published Date:', publishedDate);
        });

        // Expand the full description if the "more" button is available
        const moreButton = page.locator(
            '#description-inline-expander #expand'
        );

        await test.step('Expand video description', async () => {
            if (await moreButton.isVisible()) {
                await moreButton.click();
            }

            console.log('Description expanded!');
        });

        // Get the complete video description
        const description = await page
            .locator('#description-inline-expander #expanded')
            .innerText();

        await test.step('Extract video description', async () => {
            expect(description).toBeTruthy();

            console.log('Description:', description);
        });

        // Prepare the extracted information
        const videoDetails = `
YouTube Playwright Automation - Video Details
==============================================

Video Title:
${title}

Duration:
${duration}

Channel Name:
${channelName}

Published Date:
${publishedDate}

Video URL:
${fullVideoUrl}

Description:
${description}
`;

        // Create log directory
        const logsDirectory = path.join(
            process.cwd(),
            'logs'
        );

        fs.mkdirSync(logsDirectory, {
            recursive: true
        });

        // Save extracted information to log file
        const logFilePath = path.join(
            logsDirectory,
            'youtube-video-details.log'
        );

        fs.writeFileSync(
            logFilePath,
            videoDetails,
            'utf8'
        );

        console.log('Log file created successfully!');

        // Attach extracted information to HTML report
        await test.info().attach(
            'YouTube Video Details',
            {
                body: videoDetails,
                contentType: 'text/plain'
            }
        );

        console.log('Video details attached to HTML report!');

    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
});