// lib/emailTemplate.ts

export const emailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #333;
      color: #f0f0f0;
      font-family: Arial, sans-serif;
    }
    .container {
      width: 80%;
      margin: 0 auto;
      background-color: #444;
      border-radius: 8px;
      overflow: hidden;
    }
    .header, .footer {
      background-color: #222;
      color: #f0f0f0;
      text-align: center;
      padding: 20px;
    }
    .content {
      padding: 20px;
    }
    .footer {
      font-size: 0.8em;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Protool</h1>
    </div>
    <div class="content">
      {{content}}
    </div>
    <div class="footer">
      <p>Powered by Suhaib</p>
    </div>
  </div>
</body>
</html>
`;
