const express = require('express');
const os = require('os');
const app = express();

let visitorCount = 0;

app.get('/', (req, res) => {
  visitorCount++;
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>My K8s App</title>
      <style>
        body { font-family: Arial; background: #1a1a2e; color: #eee; 
               display: flex; justify-content: center; align-items: center; 
               height: 100vh; margin: 0; }
        .card { background: #16213e; padding: 40px; border-radius: 12px; 
                text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.5); }
        h1 { color: white; background: #e94560; padding: 10px 20px; 
             border-radius: 8px; }
        p { font-size: 18px; margin: 10px 0; }
        span { color: #e94560; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Hello from Kubernetes! - CI/CD Works!</h1>
        <p>Timestamp: <span>${new Date().toISOString()}</span></p>
        <p>Container ID: <span>${os.hostname()}</span></p>
        <p>Visitor Count: <span>${visitorCount}</span></p>
      </div>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});