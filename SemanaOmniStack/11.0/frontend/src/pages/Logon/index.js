import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

import api from '../../services/api';
import validations from '../../services/validations';

import logo from '../../assets/logo.svg';
import heroesImage from '../../assets/heroes.png';

export default function Logon() {
  const history = useHistory();
  const [id, setId] = useState('');

  toast.configure({
    autoClose: 3000,
    draggable: false,
    position: 'bottom-right',
  });

  useEffect(() => {
    const ongIdAccess = localStorage.getItem('ongIdAccess');

    if (ongIdAccess) {
      setId(ongIdAccess);
    }
  }, []);

  async function logon(e) {
    e.preventDefault();

    try {
      if (!validations('Id', id)) return;

      const response = await api.post('sessions', { id });

      localStorage.setItem('ongId', response.data.id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch (error) {
      toast.error('Oops! Algo deu errado durante o login');

      setId('');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Be The Hero" />

        <form onSubmit={logon}>
          <h1>Faça seu logon</h1>

          <input
            type="text"
            placeholder="Sua ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button type="submit" className="button">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImage} alt="heroes" />
    </div>
  );
}
