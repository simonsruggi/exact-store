// Writes dist/vercel.json: every client route in dist/routes.json is served shell.html, as `exact serve` does.
const dist = new URL('../dist/', import.meta.url);
const { routes } = await Bun.file(new URL('routes.json', dist)).json() as { routes: { pattern: string; notfound: boolean }[] };

const rewrites = routes
  .filter((r) => !r.notfound && r.pattern && r.pattern !== '/')
  .map((r) => ({ source: r.pattern, destination: '/shell.html' }));

const config = {
  $schema: 'https://openapi.vercel.sh/vercel.json',
  cleanUrls: false,
  trailingSlash: false,
  rewrites,
  headers: [
    { source: '/(.*)\\.(js|mjs|css|wasm|plan)', headers: [{ key: 'Cache-Control', value: 'public, max-age=3600' }] },
    { source: '/(.*)', headers: [{ key: 'X-Content-Type-Options', value: 'nosniff' }] },
  ],
};

await Bun.write(new URL('vercel.json', dist), JSON.stringify(config, null, 2) + '\n');
console.log(`dist/vercel.json: ${rewrites.length} rewrites to shell.html`);
