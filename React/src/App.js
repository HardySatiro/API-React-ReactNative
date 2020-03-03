
import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';

import './App.css';
import './Sidebar.css';
import './Main.css';
// OS CONCEITOS PRINCIPAIS DO REACT
// COMPONENTE
// PROPRIEDADE
// ESTADO

//asdasdasdas

//COMPONENTE: É ALGUMA FUNÇÃO QUE RETORNA ALGUM HTML, CSS OU JS
//PROPRIEDADE: SÃO AS INFORMAÇÕES PASSADAS DO COMPONENETE PAI AO COMPONENTE FILHO


// usestate: ELA É MANTIDA, LIDA E ATUALIZADA APENAS PELO COMPONENTE

function App() {
  const [devs, setDevs] = useState([]);
  const [github_username, setGithub_username] = useState('');
  const [techs, setTechs] = useState('');

  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude} = position.coords;

        setlatitude(latitude);
        setlongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);
  
  useEffect(() => {
    async function loadDevs(){
      
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    
    loadDevs();
  },[]);
  async function handleAddDev(e){
    e.preventDefault();

    const response = await api.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude,
    })
    
    setTechs('');
    setGithub_username('');
    // para adicionar algo a um array:
    // remoção .feater
    setDevs([...devs, response.data]);
  }
  return (
    <div id= "app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}> 
          <div className="input-block">
            <label htmlFor= "github_username">Usuário do Github</label>
            <input 
              name= "github_username" 
              id="username_github" 
              required
              value = {github_username}
              onChange = {e => setGithub_username(e.target.value)}
            ></input>
          </div>
          
          <div className="input-block">
            <label htmlFor= "techs">Tecnologias</label>
            <input 
              name= "techs" 
              id="techs" 
              required
              value = {techs}
              onChange = {e => setTechs(e.target.value)}
            ></input>
          </div>
          

          <div className="input-group">
            <div className="input-block">
              <label htmlFor= "latitude">Latitude</label>
              <input 
                type= "number"
                name= "latitude" 
                id="latitude" 
                required 
                value= {latitude}
                onChange={e => setlatitude(e.target.value)}
              ></input>
            </div>

            <div className="input-block">
              <label htmlFor= "longitude">Longitude</label>
              <input
                type= "number"
                name= "longitude" 
                id="longitude" 
                required 
                value= {longitude}
                onChange={e => setlongitude(e.target.value)}
              ></input>
            </div>
          </div>
          
          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          {devs.map(dev =>(
            <li key= {dev.id} className="dev-item">
            <header>
              <img src={dev.avatar_url}></img>
              <div className={dev.name}>
                <strong>{dev.name}</strong>                
                <span>{dev.techs.join(', ')}</span>           
              </div>
            </header>
              <p>{dev.bio}</p>
              <a href={`https://github.com/${dev.github_username}`}>Acessar perfil do Github</a>
            </li>
          ))}
          
        </ul>
      </main>
    </div> 
  )
}

export default App;
