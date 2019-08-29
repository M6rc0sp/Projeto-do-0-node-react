import axios from 'axios';
import Cookies from 'universal-cookie';
import jwt from'jsonwebtoken';
import React, { Component } from "react";
//import config from './service/config';
import { login } from "../../services/auth";
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import './login.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      password: '',
      erro: '',
      loading: false,
    };

    this.textoUsuario = this.textoUsuario.bind(this)
    this.textoPassword = this.textoPassword.bind(this)
    this.loginSubmit = this.loginSubmit.bind(this)
    //this.Criar = this.Criar.bind(this)
  }
 
  /*Criar(event) {
    const data = {
      user: this.state.user,
      password: this.state.password,
      admin:true
    }
    console.log(data)
    axios.post('http://localhost:3001/auth', data)
      .then((response) => {
        console.log(response.data);



      }).catch((error) => {
        console.log(error)//LOG DE ERRO
        // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
        // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT

      })
  }*/
  textoUsuario(event) {
    this.setState({ user: event.target.value })
  }

  textoPassword(event) {
    this.setState({ password: event.target.value })
  }
  sair=()=>{
    this.props.history.push("/admin"); //lembrar q é assim q se redireciona com react
}
  loginSubmit(event) {
    
    if (this.state.user.length > 0 && this.state.password.length > 0) {
     
      axios.get(`http://localhost:3001/auth?user=${this.state.user}&password=${this.state.password}`)
      .then((response) => {

        console.log(response.data['token'])
        this.setState({ loading: true });
        const cookies = new Cookies();
        cookies.set('TOKEN_KEY', (response.data['token']), { path: '/' });
        login(response.data['token'])
        
        const dados = jwt.verify(response.data['token'],"@m6rc0sp");
        console.log(dados)
        this.sair()
       
      }).catch((error) => {
        console.log(error)
        //LOG DE ERRO
        // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
        // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
        this.setState({ erro: "* Senho ou login Inválido!" })
      })
    }
    else {
      this.setState({ erro: "* Por favor, preencha os campos acima" })
    }
  }


  render() {
    return (
      <Card className="col-sm-3">
        <Card.Body>
          <Card.Title>Login</Card.Title>
              <ListGroup className="list-group-flush">
              <form>
                <ListGroupItem>
                  <input placeholder="Usuário" autoFocus type="text" value={this.state.user} onChange={this.textoUsuario} />
                </ListGroupItem>
                <ListGroupItem>
                  <input placeholder="Senha" type="password" value={this.state.password} onChange={this.textoPassword} />
                </ListGroupItem>
                </form>
              </ListGroup>
              <Button type="button" onClick={this.loginSubmit} >Login</Button>   
              <span id="menErro"> {this.state.erro} </span>
        </Card.Body>
      </Card>
    );
  }
}

export default App;