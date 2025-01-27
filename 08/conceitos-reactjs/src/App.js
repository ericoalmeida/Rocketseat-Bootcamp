import React, {useState, useEffect} from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);
   
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });   
  }, [])  

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Semana omnistack 11",
      url: "https://github.com/ericoalmeida/semana-omnistack-11-mobile",
      techs: ["Node.js", "React.js", "React-Native"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => {
      return repository.id !== id;
    }));
  }

  return (
    <div>
      <ul data-testid="repository-list">
       {
         repositories.map(repository => {
           return (
            <li key={repository.id}>
            {repository.title}
  
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
           )
         })
       }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
