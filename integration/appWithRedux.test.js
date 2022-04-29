

describe('AppWithRedux', () => {
    it('Component AppWithRedux visually must looks correct', async () => {
        // APIs from jest-puppeteer
        // eslint-disable-next-line no-undef
        await page.goto('http://localhost:9009/iframe.html?id=todolist-appwithredux--app-with-redux-story&viewMode=story');
        // eslint-disable-next-line no-undef
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});
