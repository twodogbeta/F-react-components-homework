import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';
import autoResponse from './AutoResponse';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
    this.handleMessage = this.handleMessage.bind(this);
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  handleMessage(message) {
    const customMessage = message;
    const robotMessage = autoResponse(message);
    const { messages } = this.state;

    messages.push(customMessage);
    if (robotMessage !== null) {
      messages.push(robotMessage);
    }

    this.setState({ messages });
  }

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput onSendMessage={this.handleMessage} />
      </main>
    );
  }
}

export default Chat;
