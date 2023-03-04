import './App.css';
import React, { Component } from 'react'
import io from 'socket.io-client'
import {nanoid} from 'nanoid'


const socket = io("http://localhost:5000")

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      message:"",
      chat:[],
      userName :nanoid(4)
    }
    this.setMessage = this.setMessage.bind(this)
    this.sendChat = this.sendChat.bind(this)
  }

  setMessage(value){
    this.setState({
      message:value
    })
  }

  sendChat = (e) =>{
    e.preventDefault()
    socket.emit("chat",{message:this.state.message,userName:this.state.userName})
    this.setState({
      message:""
    })
  }

  componentDidMount(){
    socket.on("chat",(payload)=>{
      this.setState({
        chat:[...this.state.chat,payload]
      })
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hello World</h1>
          {this.state.chat.map((payload,index)=>{
            return(
              <p key={index}>
                {payload.message} : <span>id:{payload.userName}</span>
              </p>
            )
          })}
          <form onSubmit={this.sendChat}>
            <input type="text" name="chat" placeholder='send text' value={this.state.message}
            onChange={(e)=>{this.setMessage(e.target.value)}}
            />
            <button type="submit">Send</button>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
