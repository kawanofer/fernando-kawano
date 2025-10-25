// Polyfills for Jest testing environment

// TextEncoder/TextDecoder
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Fetch API polyfill for Node.js environment
global.fetch = require('node-fetch');

// URL polyfill
const { URL, URLSearchParams } = require('url');
global.URL = URL;
global.URLSearchParams = URLSearchParams;