import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

import { Title, Logo, Form, Repositories, Error } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }

    return [];
  });

  const [newRepo, setNewRepo] = useState('');
  const [newError, setNewError] = useState('');

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setNewError('Informe usuario/repositório');

      setTimeout(() => {
        setNewError('');
      }, 3500);

      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
    } catch (err) {
      setNewError(`O repositório "${newRepo}" não foi encontrado`);

      setTimeout(() => {
        setNewError('');
      }, 3500);
    }
  }

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  return (
    <>
      <Logo src={logo} alt="gitHub Explorer" />
      <Title>Explore repositórios no github</Title>

      <Form hasError={!!newError} onSubmit={handleAddRepository}>
        <input
          type="text"
          placeholder="Digite o nome do repositório"
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {newError && <Error>{newError}</Error>}

      <Repositories>
        {repositories.map((repository) => {
          return (
            <Link
              key={repository.full_name}
              to={`/repository/${repository.full_name}`}
            >
              <img src={repository.owner.avatar_url} alt="Almeida" />

              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>

              <FiChevronRight size={20} />
            </Link>
          );
        })}
      </Repositories>
    </>
  );
};

export default Dashboard;
