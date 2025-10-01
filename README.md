# Coffee Shop AI Agent

This project is a backend application for a coffee shop, integrating an AI agent with WhatsApp support. The system enables automated customer interactions, order management, and user engagement through WhatsApp, powered by advanced AI services.

## Features
- **AI-Powered Chatbot:** Handles customer queries, order placement, and general support.
- **WhatsApp Integration:** Seamless communication with customers via WhatsApp.
- **Order Management:** Manage coffee orders, user profiles, and message history.
- **Modular Architecture:** Organized into controllers, services, DAOs, DTOs, and models for maintainability.

## Project Structure
```
src/
  app.ts                # Application entry point
  config/                # Configuration files
  controller/            # Route controllers (message, user, webhook)
  dao/                   # Data access objects
  dto/                   # Data transfer objects
  model/                 # Database models
  routes/                # API route definitions
  service/               # Business logic and AI/WhatsApp integration
```

## Getting Started
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Configure environment:**
   - Update configuration files in `src/config/` as needed.
3. **Run the application:**
   ```sh
   npm start
   ```

## Technologies Used
- Node.js
- TypeScript
- Express.js
- WhatsApp Business API
- Gemini AI (or similar AI service)

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)
