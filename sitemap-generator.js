const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs');
const axios = require('axios');

// Function to fetch device data with ID and name
async function fetchDeviceData() {
    try {
        // Replace with your API endpoint to get device data
        const response = await axios.get('https://climatenet.am/device_inner/list');
        return response.data.map(device => ({
            id: device.generated_id,
            name: encodeURIComponent(device.name_en)  // URL encode the name for query parameter
        }));
    } catch (error) {
        console.error('Error fetching device data:', error);
        return [];
    }
}

async function generateSitemap() {
    const links = [
        { url: '', changefreq: 'daily', priority: 1.0 },
        { url: '/en/', changefreq: 'daily', priority: 1.0 },
        { url: '/en/about', changefreq: 'monthly', priority: 0.7 },
        { url: '/en/api', changefreq: 'monthly', priority: 0.7 },
        { url: '/en/diy', changefreq: 'weekly', priority: 0.8 },
    ];

    // Fetch device data with ID and name dynamically
    const devices = await fetchDeviceData();

    // Add dynamic device routes with ID and name as query parameter
    devices.forEach(({ id, name }) => {
        links.push(
            { url: `/en/device/${id}/?${name}`, changefreq: 'weekly', priority: 0.9 },
        );
    });

    const sitemap = new SitemapStream({ hostname: 'https://climatenet.am' });
    const writeStream = fs.createWriteStream('./public/sitemap.xml');
    sitemap.pipe(writeStream);

    links.forEach(link => sitemap.write(link));
    sitemap.end();

    await streamToPromise(sitemap);
    console.log('Sitemap generated successfully.');
}

generateSitemap();
