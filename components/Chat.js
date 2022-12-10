import React, { Component, Fragment } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage';
import SendButton from '../components/SendButton';


class Chat extends Component {

  state = { chats: [{user:'Friday', message: 'Welcome! I am Friday. Really Nice to meet you', timestamp: +new Date}],
            inputText:null
          }
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }

  postMessage=(value)=>{
    const { activeUser: user } = this.props;
      const chat = { user, message: value, timestamp: +new Date };
      
      const chats= this.state.chats;
      chat && chats.push(chat);
      this.setState({ chats:chats });
      const config = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        }
      }
      axios
        .post('https://www.curvedanalysis.com/api/chatbotai', {'message':value}, config)
        .then(res => {
          const currentUser='Friday'
          const respChat={user:currentUser, message:res.data,timestamp: +new Date}
          chats.push(respChat)
          this.setState({ chats:chats });
        })
        .catch(err => {
          console.log('error in request', err);
        });


  }

  handleKeyUp = evt => {
    const value = evt.target.value;
    if (evt.keyCode === 13 && !evt.shiftKey) {
      
      this.postMessage(value);
      this.setState({inputText: null });
      evt.target.value='';
      
    }
  }

  handleOnChange = evt => {
    const inputText =  evt.target.value;
    this.setState({inputText: inputText });
}

clickHandler = () => {
  const value =  this.state.inputText;
  this.postMessage(value);
    this.setState({inputText: '' });
}

  render() {
    return (this.props.activeUser && <Fragment>
      <div className="border-bottom border-gray w-100 d-flex align-items-center bg-white" style={{ height: 90 }}>
        <h2 className="text-dark mb-0 mx-4 px-2">{this.props.activeUser}</h2>
      </div>
      <div className="px-4 pb-4 w-100 d-flex flex-row flex-wrap align-items-start align-content-start position-relative" style={{ height: 'calc(100% - 180px)', overflowY: 'scroll'}} >
        {this.state.chats.map((chat, index) => {
          const previous = Math.max(0, index - 1);
          const previousChat = this.state.chats[previous];
          const position = chat.user === this.props.activeUser ? "right" : "left";

          const isFirst = previous === index;
          const inSequence = chat.user === previousChat.user;
          const hasDelay = Math.ceil((chat.timestamp - previousChat.timestamp) / (1000 * 60)) > 1;

          return (
            
            <Fragment key={index}>
              { (isFirst || !inSequence || hasDelay) && (
                <div className={`d-block w-100 font-weight-bold text-dark mt-4 pb-1 px-1 text-${position}`} style={{ fontSize: '0.9rem' }} ref={el => { this.el = el; }}>
                  <span>{chat.user || 'Anonymous'}</span>
                </div>
              ) }

              <ChatMessage message={chat.message} position={position} />

            </Fragment>

          );
        })}
      </div>
      <div className="border-top border-gray w-100 px-4 d-flex align-items-center bg-light" style={{ minHeight: 90 }}>
        <textarea className="form-control px-3 py-2" value = {this.state.inputText} onKeyUp={this.handleKeyUp} onChange={this.handleOnChange} placeholder="Enter a chat message" style={{ resize: 'none' }}></textarea>
        <span className="px-2 py-2">
          <SendButton bgColor={"transparent"} Color={"grey"} hoverColor={"black"} fontSize={"2vw"} onClick={this.clickHandler}/>
        </span>
      </div>
    </Fragment> )
  }

};

export default Chat;