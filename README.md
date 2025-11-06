# Coffee Shop AI Agent

This project is a modern coffee shop management system integrated with an AI agent, featuring WhatsApp support for customer interaction and automation. It is built with Node.js and TypeScript, following a modular architecture for scalability and maintainability.

## Features

- **AI Agent Integration**: Automate customer service, order management, and FAQs using advanced AI models.
- **WhatsApp Support**: Seamless communication with customers via WhatsApp, including order placement, status updates, and notifications.
- **User Authentication**: Secure login and user management.
- **Order & Message Management**: Handle orders, messages, and user interactions efficiently.
- **Webhook Verification**: Secure webhook endpoints for external integrations.
- **Extensible Architecture**: Easily add new features and integrations.

## Project Structure

```
src/
  app.ts                # Entry point
  config/                # App configuration
  constants/             # Error and other constants
  controller/            # Route controllers
  dao/                   # Data access objects
  dto/                   # Data transfer objects
  middleware/            # Express middlewares
  model/                 # Data models
  routes/                # API routes
  service/               # Business logic and integrations
```

## Getting Started

1. **Install dependencies**
   ```powershell
   npm install
   ```
2. **Configure environment**
   - Update configuration files in `src/config/` as needed.
3. **Run the application**
   ```powershell
   npm start
   ```

## API Endpoints

- `/auth` - User authentication
- `/message` - Message handling
- `/user` - User management
- `/webhook` - Webhook verification and events

## WhatsApp Integration

- Send and receive messages
- Order notifications
- AI-powered responses

## AI Agent

- Handles customer queries
- Provides recommendations
- Automates routine tasks

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
