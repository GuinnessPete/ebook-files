const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = 8080;
const ROOT = __dirname;
const UPLOAD_DIR = path.join(ROOT, 'uploads');
const PUBLIC_DIR = path.join(ROOT, 'public');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.md': 'text/markdown',
  '.txt': 'text/plain',
  '.json': 'application/json',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.pdf': 'application/pdf',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.css': 'text/css',
  '.js': 'application/javascript',
};

// CORS headers for external access
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain', ...CORS_HEADERS });
      res.end('404 Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType, ...CORS_HEADERS });
    res.end(data);
  });
}

function listDirectory(res, dirPath, urlPath) {
  fs.readdir(dirPath, { withFileTypes: true }, (err, entries) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain', ...CORS_HEADERS });
      res.end('500 Internal Server Error');
      return;
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ebook Team — ${urlPath}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f0f0f; color: #e0e0e0; line-height: 1.6; padding: 2rem; max-width: 900px; margin: 0 auto; }
    h1 { font-size: 1.5rem; margin-bottom: 0.5rem; color: #fff; }
    .breadcrumb { color: #888; font-size: 0.85rem; margin-bottom: 2rem; }
    .breadcrumb a { color: #6cb4ff; text-decoration: none; }
    .breadcrumb a:hover { text-decoration: underline; }
    .back-link { display: inline-block; margin-bottom: 1rem; color: #6cb4ff; text-decoration: none; }
    .back-link:hover { text-decoration: underline; }
    .file-list { list-style: none; }
    .file-item { padding: 0.6rem 0; border-bottom: 1px solid #222; }
    .file-item:last-child { border-bottom: none; }
    .file-item a { color: #6cb4ff; text-decoration: none; display: flex; align-items: center; gap: 0.5rem; }
    .file-item a:hover { text-decoration: underline; }
    .file-item .icon { font-size: 1.1rem; }
    .file-item .name { flex: 1; }
    .file-item .size { color: #666; font-size: 0.8rem; }
    .file-item .copy-btn { background: none; border: none; color: #6cb4ff; cursor: pointer; font-size: 0.8rem; padding: 0.2rem 0.5rem; }
    .file-item .copy-btn:hover { color: #93c9ff; }
    .folder { color: #ffd54f; }
    .empty { color: #555; font-style: italic; padding: 1rem 0; }
    header { margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #222; }
    .home-link { color: #6cb4ff; text-decoration: none; font-size: 0.9rem; }
    .home-link:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <header>
    <a href="/" class="home-link">← Back to File Drop</a>
    <h1>📚 ${urlPath === '/' ? 'Ebook Team Files' : urlPath}</h1>
    <div class="breadcrumb">
      <a href="/">root</a>
      ${urlPath !== '/' ? ' / ' + urlPath.split('/').filter(Boolean).map((part, i, arr) => {
        const partial = '/' + arr.slice(0, i + 1).join('/');
        return `<a href="${partial}">${part}</a>`;
      }).join(' / ') : ''}
    </div>
  </header>
  <ul class="file-list">
    ${entries.length === 0 ? '<li class="empty">Empty directory</li>' : entries
      .sort((a, b) => {
        if (a.isDirectory() && !b.isDirectory()) return -1;
        if (!a.isDirectory() && b.isDirectory()) return 1;
        return a.name.localeCompare(b.name);
      })
      .map(entry => {
        const fullPath = path.join(dirPath, entry.name);
        const relPath = path.join(urlPath, entry.name).replace(/\\/g, '/');
        const stat = fs.statSync(fullPath);
        const isFolder = entry.isDirectory();
        const icon = isFolder ? '📁' : getFileIcon(entry.name);
        const size = isFolder ? '' : formatSize(stat.size);
        const fileUrl = isFolder ? `${relPath}/` : relPath;
        return `<li class="file-item ${isFolder ? 'folder' : ''}">
          <a href="${fileUrl}">
            <span class="icon">${icon}</span>
            <span class="name">${entry.name}</span>
            ${size ? `<span class="size">${size}</span>` : ''}
          </a>
          ${!isFolder ? `<button class="copy-btn" onclick="copyUrl('${relPath}')">📋</button>` : ''}
        </li>`;
      }).join('')}
  </ul>
  <script>
    function copyUrl(urlPath) {
      const fullUrl = window.location.origin + '/' + urlPath;
      navigator.clipboard.writeText(fullUrl).then(() => {
        alert('URL copied: ' + fullUrl);
      });
    }
  </script>
</body>
</html>`;

    res.writeHead(200, { 'Content-Type': 'text/html', ...CORS_HEADERS });
    res.end(html);
  });
}

function getFileIcon(filename) {
  const ext = path.extname(filename).toLowerCase();
  const icons = {
    '.md': '📝', '.txt': '📄', '.json': '📋',
    '.docx': '📘', '.pdf': '📕', '.html': '🌐',
    '.jpg': '🖼️', '.jpeg': '🖼️', '.png': '🖼️',
    '.gif': '🖼️', '.svg': '🖼️', '.webp': '🖼️',
    '.js': '⚡', '.css': '🎨'
  };
  return icons[ext] || '📄';
}

function formatSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// Parse multipart form data (simple implementation)
function parseMultipart(body, boundary) {
  const boundaryBuffer = Buffer.from('--' + boundary);
  const parts = [];
  let start = 0;

  while (start < body.length) {
    const boundaryIndex = body.indexOf(boundaryBuffer, start);
    if (boundaryIndex === -1) break;

    const partStart = boundaryIndex + boundaryBuffer.length + 2; // +2 for \r\n
    const partEnd = body.indexOf(boundaryBuffer, partStart);
    if (partEnd === -1) break;

    const part = body.slice(partStart, partEnd - 2);
    const headerEnd = part.indexOf('\r\n\r\n');
    if (headerEnd === -1) {
      start = partEnd + boundaryBuffer.length;
      continue;
    }

    const headers = part.slice(0, headerEnd).toString();
    const data = part.slice(headerEnd + 4);

    // Extract filename from Content-Disposition
    const filenameMatch = headers.match(/filename="([^"]+)"/);
    const nameMatch = headers.match(/name="([^"]+)"/);

    if (filenameMatch) {
      parts.push({
        name: nameMatch ? nameMatch[1] : 'file',
        filename: filenameMatch[1],
        data: data
      });
    }

    start = partEnd + boundaryBuffer.length;
  }

  return parts;
}

// Collect all recent files from all directories
function getAllFiles() {
  const files = [];
  const dirs = [
    { name: 'covers', path: path.join(ROOT, 'covers') },
    { name: 'kdp-listings', path: path.join(ROOT, 'kdp-listings') },
    { name: 'templates', path: path.join(ROOT, 'templates') },
    { name: 'uploads', path: UPLOAD_DIR }
  ];

  dirs.forEach(dir => {
    if (fs.existsSync(dir.path)) {
      try {
        const entries = fs.readdirSync(dir.path, { withFileTypes: true });
        entries.forEach(entry => {
          if (!entry.isDirectory()) {
            const stat = fs.statSync(path.join(dir.path, entry.name));
            files.push({
              name: entry.name,
              size: stat.size,
              url: `/${dir.name}/${entry.name}`,
              folder: dir.name,
              modified: stat.mtime
            });
          }
        });
      } catch (err) {
        // Ignore errors
      }
    }
  });

  // Sort by modification time (newest first)
  files.sort((a, b) => b.modified - a.modified);
  return files.slice(0, 20); // Return last 20 files
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let urlPath = decodeURIComponent(parsedUrl.pathname);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS_HEADERS);
    res.end();
    return;
  }

  // API: Get all files
  if (urlPath === '/api/files' && req.method === 'GET') {
    const files = getAllFiles();
    res.writeHead(200, { 'Content-Type': 'application/json', ...CORS_HEADERS });
    res.end(JSON.stringify({ files }));
    return;
  }

  // Upload endpoint
  if (urlPath === '/upload' && req.method === 'POST') {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('multipart/form-data')) {
      res.writeHead(400, { 'Content-Type': 'application/json', ...CORS_HEADERS });
      res.end(JSON.stringify({ success: false, error: 'Invalid content type' }));
      return;
    }

    const boundary = contentType.split('boundary=')[1];
    let body = Buffer.alloc(0);

    req.on('data', chunk => {
      body = Buffer.concat([body, chunk]);
    });

    req.on('end', () => {
      try {
        const parts = parseMultipart(body, boundary);
        const uploaded = [];

        parts.forEach(part => {
          if (part.filename) {
            const safeName = part.filename.replace(/[^a-zA-Z0-9._-]/g, '_');
            const filePath = path.join(UPLOAD_DIR, safeName);
            fs.writeFileSync(filePath, part.data);
            uploaded.push(safeName);
          }
        });

        res.writeHead(200, { 'Content-Type': 'application/json', ...CORS_HEADERS });
        res.end(JSON.stringify({
          success: true,
          uploaded: uploaded,
          urls: uploaded.map(name => `/uploads/${name}`)
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json', ...CORS_HEADERS });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // Normalize path
  if (urlPath.endsWith('/') && urlPath !== '/') {
    urlPath = urlPath.slice(0, -1);
  }

  // Serve index.html for root
  if (urlPath === '' || urlPath === '/') {
    const indexPath = path.join(PUBLIC_DIR, 'index.html');
    if (fs.existsSync(indexPath)) {
      serveFile(res, indexPath, 'text/html');
      return;
    }
  }

  const fullPath = path.join(ROOT, urlPath);

  // Security: prevent directory traversal
  if (!fullPath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain', ...CORS_HEADERS });
    res.end('403 Forbidden');
    return;
  }

  // Check if path exists
  fs.stat(fullPath, (err, stat) => {
    if (err) {
      // Try serving from public directory
      const publicPath = path.join(PUBLIC_DIR, urlPath);
      if (fs.existsSync(publicPath) && fs.statSync(publicPath).isFile()) {
        const ext = path.extname(publicPath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        serveFile(res, publicPath, contentType);
        return;
      }

      res.writeHead(404, { 'Content-Type': 'text/plain', ...CORS_HEADERS });
      res.end('404 Not Found');
      return;
    }

    if (stat.isDirectory()) {
      // If URL doesn't end with /, redirect to add it
      if (!req.url.endsWith('/') && req.url !== '/') {
        res.writeHead(302, { 'Location': req.url + '/', ...CORS_HEADERS });
        res.end();
        return;
      }
      listDirectory(res, fullPath, urlPath || '/');
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      serveFile(res, fullPath, contentType);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`📁 Pete's File Drop running at:`);
  console.log(`   Local:  http://localhost:${PORT}/`);
  console.log(`   Net:    http://0.0.0.0:${PORT}/`);
  console.log(``);
  console.log(`Once port 8080 is open on your VPS firewall:`);
  console.log(`   http://187.77.177.201:8080/`);
  console.log(``);
  console.log(`Features:`);
  console.log(`   • Drag & drop file upload`);
  console.log(`   • Browse all ebook folders`);
  console.log(`   • Copy URLs with one click`);
  console.log(`   • Recent files list`);
});
