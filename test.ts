import { chromium } from '@playwright/test';

(async () => {
    let browser;

    try {
        console.log('Starting Playwright...');

        // Launch Playwright's Chromium browser
        browser = await chromium.launch({
            headless: false
        });

        console.log('Browser launched!');

        const page = await browser.newPage();

        // Open YouTube
        await page.goto('https://www.youtube.com');

        console.log('YouTube opened successfully!');

        // Find the YouTube search box
        const searchBox = page.getByRole('combobox', {
            name: /search/i
        });

        // Search for "playwright"
        await searchBox.fill('playwright');
        await searchBox.press('Enter');

        console.log('Search completed!');

        // Find all video search results
        const videos = page.locator('ytd-video-renderer');

        // Select the first video
        const firstVideo = videos.first();

        // Get the video title
        const title = await firstVideo
            .locator('#video-title')
            .getAttribute('title');

        console.log('First Video Title:', title);

        // Get the video duration
        const durationText = await firstVideo
            .locator('ytd-thumbnail-overlay-time-status-renderer')
            .innerText();

        const duration = durationText
            .split('\n')
            .map(text => text.trim())
            .filter(text => text.length > 0)[0];

        console.log('Duration:', duration);

        // Get the channel name
        const channelName = await firstVideo
            .locator('ytd-channel-name a')
            .first()
            .innerText();

        console.log('Channel Name:', channelName);

        // Get the video URL
        const videoUrl = await firstVideo
            .locator('#video-title')
            .getAttribute('href');

        console.log('Video URL:', videoUrl);

        // Open the first video
        await page.goto(`https://www.youtube.com${videoUrl}`);

        console.log('First video opened!');

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

        console.log('Published Date:', publishedDate);

        // Expand the full description if the "more" button is available
        const moreButton = page.locator(
            '#description-inline-expander #expand'
        );

        if (await moreButton.isVisible()) {
            await moreButton.click();
        }

        console.log('Description expanded!');

        // Get the complete video description
        const description = await page
            .locator('#description-inline-expander #expanded')
            .innerText();

        console.log('Description:', description);

    } catch (error) {
        console.error('An error occurred:', error);

    } finally {
        // Always close the browser
        if (browser) {
            await browser.close();
            console.log('Browser closed!');
        }
    }
})();