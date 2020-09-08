import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

import './styles.css';

export default function Incidents() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  toast.configure({
    autoClose: 3000,
    draggable: false,
    position: 'bottom-right',
  });

  async function addNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        },
      });

      toast.success('Aee! Caso cadastrado com sucesso!');

      setTimeout(() => {
        history.push('/profile');
      }, 3000);
    } catch (error) {
      toast.error('Ooops! Algo deu errado durante o cadastro');
    }
  }

  return (
    <div className="new-incidents-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be the hero" />

          <h1>Cadastrar novo caso</h1>

          <p>
            Descreva o caso detalhadamente para encontrar um herói para
            resolve-lo.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={addNewIncident}>
          <input
            type="text"
            placeholder="Titulo do caso"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="number"
            min="0.00"
            max="10000.00"
            step="0.01"
            placeholder="Valor em reais"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
