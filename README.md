# 🤖 AI Messenger Chatbot

A beautiful, responsive AI chatbot with a modern messenger-style interface powered by OpenAI's GPT API.

## 🌟 Live Demo

**[Try it live here!](https://moranr123.github.io/AIChatbot/)**

## ✨ Features

- 💬 **Messenger-style interface** - Clean, modern chat UI similar to popular messaging apps
- 🎨 **Beautiful gradients** - Eye-catching design with smooth color transitions
- 📱 **Fully responsive** - Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Real-time responses** - Instant AI replies with typing indicators
- 🔄 **Context awareness** - Maintains conversation history for natural dialogue
- 🎯 **Smart input** - Auto-resizing textarea with keyboard shortcuts
- 🌈 **Smooth animations** - Polished UI with hover effects and transitions
- 🔒 **Error handling** - Graceful handling of API errors and rate limits

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/moranr123/AIChatbot.git
cd AIChatbot
```

### 2. Get your OpenAI API Key
- Visit [OpenAI API Keys](https://platform.openai.com/api-keys)
- Create a new API key
- Copy the key for the next step

### 3. Configure your API key
Open `script.js` and replace the API key:
```javascript
const CONFIG = {
    API_KEY: 'your-openai-api-key-here',
    // ... other settings
};
```

### 4. Launch the chatbot
Simply open `index.html` in your web browser, or serve it with a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

## 📁 Project Structure

```
AIChatbot/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # JavaScript functionality
└── README.md          # Project documentation
```

## ⚙️ Configuration

Customize your chatbot by modifying the `CONFIG` object in `script.js`:

```javascript
const CONFIG = {
    API_KEY: 'your-api-key',
    MODEL: 'gpt-3.5-turbo',    // or 'gpt-4' for better responses
    MAX_TOKENS: 150,           // Response length limit
    TEMPERATURE: 0.7           // Creativity level (0-1)
};
```

## 🎨 UI Components

### Chat Interface
- **User messages**: Blue bubbles on the right with "You" avatar
- **AI responses**: Gray bubbles on the left with "AI" avatar
- **Typing indicator**: Animated dots showing AI is thinking
- **Online status**: Green indicator in the header

### Input Area
- **Auto-resize textarea**: Expands with content up to 100px
- **Send button**: Beautiful gradient button with hover effects
- **Keyboard shortcuts**: 
  - `Enter` - Send message
  - `Shift + Enter` - New line

## 🛠️ Advanced Usage

### Adding Custom System Prompts
Modify the initial system message in `script.js`:
```javascript
let chatHistory = [
    {
        role: 'system',
        content: 'You are a helpful assistant specializing in [your topic].'
    }
];
```

### Customizing the Appearance
Edit `styles.css` to change:
- Color schemes and gradients
- Font styles and sizes
- Animation speeds and effects
- Layout dimensions

## 🔐 Security Considerations

⚠️ **Important**: This implementation includes the API key in the frontend code, which is visible to users. This is suitable for:
- Personal projects
- Local development
- Educational purposes
- Prototyping

For production applications, consider:
- Moving API calls to a backend server
- Implementing user authentication
- Using environment variables for secrets
- Adding rate limiting and usage monitoring

## 📱 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ IE11+ (limited support)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 API Usage & Costs

This chatbot uses OpenAI's API which has usage-based pricing:
- **GPT-3.5-turbo**: ~$0.002 per 1K tokens
- **GPT-4**: ~$0.03 per 1K tokens

Monitor your usage at [OpenAI Usage Dashboard](https://platform.openai.com/usage)

## 🐛 Troubleshooting

### Common Issues

**"API key error"**
- Verify your API key is correct
- Check that billing is set up in your OpenAI account

**"Rate limit exceeded"**
- You're sending requests too quickly
- Wait a moment before trying again

**"Quota exceeded"**
- You've reached your API usage limit
- Check your OpenAI account billing and limits

**Messages not sending**
- Check browser console for errors
- Verify internet connection
- Ensure API key has proper permissions

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- OpenAI for the GPT API
- Modern CSS gradients and animations
- Messenger UI inspiration
- The open-source community

---

**Made with ❤️ by [moranr123](https://github.com/moranr123)**

⭐ **Star this repository if you found it helpful!**