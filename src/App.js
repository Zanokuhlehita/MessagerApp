

import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [messageText, setMessageText] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const accessToken = 'EAAKZCuUXWj0gBO46otbYANTCbZAxVZCKQzM2SuoX1pHq4T4wPicfghbsD6UVcpCykAi4a9VLjoj7BRQf9eq4ioAmi2Bxb2ItZCEuAZAnfSjwXWjKreTIYN6iqZAKQd22UN2ju1NBnRS0fMQYLPJDgjZCN3dIsmJzrcgHCm0xZBnry8yLfKd2jK7JmataZCZAC6bUGSSGr1SMYENyEUtxzqOtwZD';
  const phoneNumberId = '114916794929554';
  const apiUrl = `https://graph.facebook.com/v19.0/114916794929554/messages `;

  const recipients = [
    '0788858084',
    '0657074003'
    // 'recipient_phone_number_2',

  ];

  const sendTextMessage = async (recipient, messageText) => {
    const data = {
      messaging_product: 'whatsapp',
      to: recipient,
      type: 'text',
      text: { body: messageText },
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`https://graph.facebook.com/v19.0/27788858084/media`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const result = await response.json();
    return result.id;
  };

  const sendImageMessage = async (recipient, mediaId, caption = '') => {
    const data = {
      messaging_product: 'whatsapp',
      to: recipient,
      type: 'image',
      image: { id: mediaId, caption },
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
  };

  const handleSendMessages = async () => {
    for (const recipient of recipients) {
      await sendTextMessage(recipient, messageText);

      if (imageFile) {
        const mediaId = await uploadImage(imageFile);
        await sendImageMessage(recipient, mediaId, "Here is an image for you.");
      }
    }
  };
  console.log('mmm', handleSendMessages)
  return (
    <div>
      <h1>Send WhatsApp Messages</h1>
      <textarea
        id="messageText"
        name="messageText"
        placeholder="Enter your message"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <input
        id="imageFile"
        name="imageFile"
        type="file"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      <button onClick={handleSendMessages}>Send Messages</button>
    </div>
  );
};

export default App;
