// Configuration
const CONFIG = {
    // The API key is loaded from config.js
    API_KEY: OPENAI_API_KEY,
    API_URL: 'https://api.openai.com/v1/chat/completions',
    MODEL: 'gpt-3.5-turbo',
    MAX_TOKENS: 150,
    TEMPERATURE: 0.7
};

// DOM Elements
const chatArea = document.getElementById('chatArea');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Chat history for context
let chatHistory = [
    {
        role: 'system',
        content: 'You are a helpful AI assistant. Keep your responses conversational and friendly.'
    }
];

// Initialize the chatbot
function init() {
    setupEventListeners();
    messageInput.focus();
}

// Setup event listeners
function setupEventListeners() {
    // Auto-resize textarea
    messageInput.addEventListener('input', autoResizeTextarea);
    
    // Send message on Enter (Shift+Enter for new line)
    messageInput.addEventListener('keydown', handleKeyDown);
    
    // Send button click
    sendButton.addEventListener('click', sendMessage);
}

// Auto-resize textarea based on content
function autoResizeTextarea() {
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 100) + 'px';
}

// Handle keyboard shortcuts
function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

// Add message to chat
function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    const avatar = document.createElement('div');
    avatar.className = `avatar ${isUser ? 'user' : 'bot'}`;
    avatar.textContent = isUser ? 'You' : 'AI';
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = content;
    
    if (isUser) {
        messageDiv.appendChild(bubble);
        messageDiv.appendChild(avatar);
    } else {
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(bubble);
    }
    
    chatArea.appendChild(messageDiv);
    scrollToBottom();
}

// Scroll chat to bottom
function scrollToBottom() {
    chatArea.scrollTop = chatArea.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typing-indicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'avatar bot';
    avatar.textContent = 'AI';
    
    const typingBubble = document.createElement('div');
    typingBubble.className = 'typing-indicator';
    typingBubble.style.display = 'block';
    typingBubble.innerHTML = `
        <div class="typing-dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    `;
    
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(typingBubble);
    chatArea.appendChild(typingDiv);
    scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingDiv = document.getElementById('typing-indicator');
    if (typingDiv) {
        typingDiv.remove();
    }
}

// Send message to AI
async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessage(message, true);
    
    // Add to chat history
    chatHistory.push({
        role: 'user',
        content: message
    });
    
    // Clear input and reset height
    messageInput.value = '';
    messageInput.style.height = 'auto';
    
    // Disable send button
    toggleSendButton(false);
    
    // Show typing indicator
    showTypingIndicator();

    try {
        // Call OpenAI API
        const response = await fetch(CONFIG.API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CONFIG.API_KEY}`
            },
            body: JSON.stringify({
                model: CONFIG.MODEL,
                messages: chatHistory,
                max_tokens: CONFIG.MAX_TOKENS,
                temperature: CONFIG.TEMPERATURE
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            const aiResponse = data.choices[0].message.content.trim();
            
            // Add AI response to chat history
            chatHistory.push({
                role: 'assistant',
                content: aiResponse
            });
            
            // Hide typing indicator and show response
            hideTypingIndicator();
            addMessage(aiResponse, false);
            
        } else {
            throw new Error('Invalid response format from API');
        }
        
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        hideTypingIndicator();
        
        // Show error message to user
        let errorMessage = 'Sorry, I encountered an error. Please try again.';
        
        if (error.message.includes('401')) {
            errorMessage = 'API key error. Please check your OpenAI API key.';
        } else if (error.message.includes('429')) {
            errorMessage = 'Rate limit exceeded. Please wait a moment before trying again.';
        } else if (error.message.includes('insufficient_quota')) {
            errorMessage = 'API quota exceeded. Please check your OpenAI account.';
        }
        
        addMessage(errorMessage, false);
    } finally {
        // Re-enable send button and focus input
        toggleSendButton(true);
        messageInput.focus();
    }
}

// Toggle send button state
function toggleSendButton(enabled) {
    sendButton.disabled = !enabled;
}

// Limit chat history to prevent token limit issues
function limitChatHistory() {
    const maxMessages = 20; // Keep last 20 messages (plus system message)
    if (chatHistory.length > maxMessages) {
        // Keep system message and last 19 messages
        chatHistory = [chatHistory[0], ...chatHistory.slice(-(maxMessages - 1))];
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);