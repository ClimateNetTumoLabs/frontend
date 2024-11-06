const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs');

// List of device IDs
const deviceIds = [14, 15, 16, 17, 18];  // You can get this list from your database or API

async function generateSitemap() {
    const links = [
        { url: '/en/', changefreq: 'daily', priority: 1.0 },
        { url: '/hy/', changefreq: 'daily', priority: 1.0 },
        { url: '/en/about', changefreq: 'monthly', priority: 0.7 },
        { url: '/hy/about', changefreq: 'monthly', priority: 0.7 },
        { url: '/en/diy', changefreq: 'weekly', priority: 0.8 },
        { url: '/hy/diy', changefreq: 'weekly', priority: 0.8 },
    ];

    // Add dynamic device routes
    deviceIds.forEach(id => {
        links.push(
            { url: `/en/device/${id}`, changefreq: 'weekly', priority: 0.9 },
            { url: `/hy/device/${id}`, changefreq: 'weekly', priority: 0.9 }
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
