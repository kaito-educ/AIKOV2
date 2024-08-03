const axios = require('axios');

module.exports = {
  config: {
    name: "admin",
      description: "get appstate from bot",
      usage: "/appstate email && pass",
      author: "Kaito",
    },
  
  run: async function ({ box, event, text, reply, react }) {
    // Check if both email and password are provided
    if (text.length !== 2) {
      return box.reply("Please provide both email and password.\n\nExample: appstate [email] [password]");
    }

    const [email, password] = text.map(arg => arg.trim());

    box.react("⏳");

    try {
      const response = await axios.get(`https://my-api-v1.onrender.com/api/appstate?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      const userData = response.data;

      box.react("✅");
      reply(JSON.stringify(userData, null, 4));
    } catch (error) {
      console.error("Error fetching appstate:", error);
      box.react("❌");
      box.reply("An error occurred while fetching appstate. Please change your password and try again.");
    }
  }
};