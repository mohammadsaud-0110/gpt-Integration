const readline = require('readline');
const axios = require('axios');

// OpenAI API configuration
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY'; // Replace with your actual OpenAI API key
const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// Function to get OpenAI response
async function getOpenAIResponse(prompt) {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        prompt,
        max_tokens: 150,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error calling OpenAI API:', error.message);
    return 'Error generating response. Please try again later.';
  }
}

// Function to start the conversation
async function startConversation() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('Type your message or "exit" to end the conversation.');

  while (true) {
    const userMessage = readline.question('You: ');
    if (userMessage.toLowerCase() === 'exit') {
      break;
    }

    const response = await getOpenAIResponse(userMessage);
    console.log('AI:', response);
  }

  rl.close();
}

// Start the conversation
startConversation();
