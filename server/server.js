// Servidor HTTPS personalizado para Next.js
const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem'),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error en la petición:', err);
      res.statusCode = 500;
      res.end('Error interno del servidor');
    }
  })
    .listen(3000, '0.0.0.0', (err) => {
      if (err) {
        console.error('Error al iniciar el servidor:', err);
        process.exit(1);
      }
      console.log('✅ Servidor HTTPS de Next.js corriendo en https://localhost:3000 y en tu IP local (por ejemplo https://192.168.1.132:3000)');
      console.log('Si ves este mensaje, el servidor está listo.');
    });
}).catch((err) => {
  console.error('Error al preparar la app de Next.js:', err);
});
