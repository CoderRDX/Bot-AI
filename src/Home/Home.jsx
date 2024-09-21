import React from "react";
import { useState, useEffect, useRef  } from "react";
import styles from './Home.module.css';
import Typography from '@mui/material/Typography';
import Info from "../components/Info/info";
import questionsData from './questions.json';


export default function Home(){

    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [qaData, setQaData] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const messageEndRef = useRef(null);
    
      
      useEffect(() => {
        setQaData(questionsData);
      }, []);

      useEffect(() => {
        const savedConversations = JSON.parse(localStorage.getItem('conversations')) || [];
        setConversations(savedConversations);
        if (savedConversations.length > 0) {
          loadConversation(savedConversations[0].id);
        }
      }, []);

      useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);
    
      const handleInputChange = (e) => {
        setUserInput(e.target.value);
      };
    
      const findAnswer = (question) => {

        const matchedQA = qaData.find((qa) =>
          qa.question.toLowerCase() === question.toLowerCase()
        );
        return matchedQA ? matchedQA.response : "As a AI Language Model, I cannot help you out!";
      };
    
      const sendMessage = () => {
        if (!userInput.trim()) return;
    
        const newMessage = { sender: 'user', text: userInput };

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);

        setTimeout(() => {
          const botResponse = findAnswer(userInput);
          const updatedMessagesWithBot = [...updatedMessages, { sender: 'bot', text: botResponse }];
          setMessages(updatedMessagesWithBot);
    
          saveConversation(updatedMessagesWithBot); 
        }, 500);
    
        setUserInput('');

      };

      const saveConversation = (updatedMessages) => {
        const newConversation = {
          id: activeConversation || Date.now(),
          timestamp: new Date().toLocaleString(),
          messages: updatedMessages,
        };
    
        const updatedConversations = activeConversation
          ? conversations.map((conv) => (conv.id === activeConversation ? newConversation : conv))
          : [...conversations, newConversation];
    
        setConversations(updatedConversations);
        setActiveConversation(newConversation.id);
    
        
        localStorage.setItem('conversations', JSON.stringify(updatedConversations));
      };

      const loadConversation = (conversationId) => {
        const conversation = conversations.find((conv) => conv.id === conversationId);
        if (conversation) {
          setMessages(conversation.messages);
          setActiveConversation(conversationId);
        }
      };

      const handleNewConversation = () => {
        setMessages([]);
        setActiveConversation(null);
      };
    

    return(
        <div className={styles.main}>
            <div className={styles.sidepanel}>
                <div className={styles.sidepanelNav}>
                    <div>
                        <img  className={styles.img1} src={require("../assests/image-29.png")} alt="" height={30} />
                    </div>
        
                    <Typography  variant="h6">
                        New Chat
                    </Typography>

                    <button onClick={handleNewConversation}>
                        <img src={require("../assests/image-31.png")} alt="" />
                    </button>
                </div>

                <button className={styles.btn} onClick={sendMessage}>Past Conversations</button>

                <div>
                  <ul>
                    {conversations.map((conv) => (
                      <li
                        key={conv.id}
                        className={conv.id === activeConversation ? 'active' : ''}
                        onClick={() => loadConversation(conv.id)}
                      >
                        {conv.timestamp}
                      </li>
                    ))}
                  </ul>
                </div>

            </div>
            <div className={styles.chatpanel}>
                <h2 className={styles.h201}>Bot AI</h2>

                    {messages.length === 0 && <Info/>}

                    <div className={styles.messageArea}>
                        {messages.map((message, index) => (
                          <div key={index} className={`${styles.message} ${styles[message.sender]}`}>
                              <div className={styles.messageBox}>
                              <span>{message.sender === 'user' 
                              ? <img  className={styles.img3} src={require("../assests/image-30.png")} alt="" height={69} />
                              : <img  className={styles.img3} src={require("../assests/image-29.png")} alt="" height={69} />}</span>
                              <span className={styles.messageContent}>{message.text}</span>
                              </div>
                     
                          </div>
                        ))}
                    </div>

                    <div className={styles.inputContainer}>
                        <input
                        type="text"
                        value={userInput}
                        onChange={handleInputChange}
                        placeholder="Type your message here..."
                        />
                         <button className={styles.btn} onClick={sendMessage}>Ask</button>
                         <button className={styles.btn}>Save</button>
                    </div>
                   

            </div>
            
        </div>
    );
}
