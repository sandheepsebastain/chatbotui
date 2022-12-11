import React, { Component,useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import Chat from '../components/Chat';
import SendButton from '../components/SendButton';
import axios from 'axios';

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.innerRef = React.createRef();
  }
  componentDidMount() {
    // Add a timeout here

      this.innerRef.current.focus();

  }

  state = { user: null, inputText:null }
  
  handleKeyUp = evt => {
    if (evt.keyCode === 13) {
      const user =  evt.target.value;
      this.setState({user: user });
    }
  }

  handleOnChange = evt => {
      const inputText =  evt.target.value;
      this.setState({inputText: inputText });

  }

  clickHandler = () => {
    const user =  this.state.inputText;
      this.setState({user: user });
  }
  
  render() {
    const user = this.state.user;
    
    const nameInputStyles = {
      background: 'transparent',
      color: '#999',
      border: 0,
      borderBottom: '1px solid #666',
      borderRadius: 0,
      fontSize: '4vw',
      fontWeight: 500,
      boxShadow: 'none !important'
    };

    
    return (
      <Layout pageTitle="AI Conversation">
      
        <main className="container-fluid position-absolute h-100 bg-dark">
        
          <div className="row position-absolute w-100 h-100">
          
            <section className="col-md-8 d-flex flex-row flex-wrap align-items-center align-content-center px-5">
              <div>
              
                <span className="w-100 h1 text-light" style={{marginTop: -50,fontSize:"4vw"}}>
                  {
                    user
                      ? (<span>
                          <span style={{color: '#999'}}>Hello!</span> {user}
                        </span>)
                      : `What is your name?`
                  }
                </span>
                
                { !user && <span className="d-flex  mt-3 px-3 py-2"><input  ref={this.innerRef} type="text" className="form-control" onKeyUp={this.handleKeyUp} autoComplete="off" style={nameInputStyles} onChange={this.handleOnChange}/>
                          <span className="px-2 py-2"><SendButton bgColor={nameInputStyles.background} Color={nameInputStyles.color} hoverColor={"white"} fontSize={nameInputStyles.fontSize} onClick={this.clickHandler}/></span>
                          </span> }
                
              </div>
            </section>
            
            {user && <section className="col-md-4 position-relative d-flex flex-wrap h-100 align-items-start align-content-between bg-white px-0">
            { user && <Chat activeUser={user} /> }
            </section>}
            
          </div>
          
        </main>
        
      </Layout>
    );
  }
  
}

export default IndexPage