import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';
import validations from '../../services/validations';

import './styles.css';

import logo from '../../assets/logo.svg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  toast.configure({
    autoClose: 3000,
    draggable: false,
    position: 'bottom-right',
  });

  async function registerNewOng(e) {
    e.preventDefault();

    if (!validations('Nome', name)) return;
    if (!validations('Email', email)) return;
    if (!validations('whatsapp', whatsapp)) return;
    if (!validations('Cidade', city)) return;
    if (!validations('UF', uf)) return;

    const data = { name, email, whatsapp, city, uf };

    try {
      const response = await api.post('ongs', data);

      toast.info(`Seu ID de acesso: ${response.data.id}`);

      localStorage.setItem('ongIdAccess', response.data.id);

      history.push('/');
    } catch (error) {
      toast.error('Oops, algo deu errado, tente novamente');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be the hero" />

          <h1>Cadastro</h1>

          <p>
            Faça seu cadastro, entre na plataforma e ajude a pessoas a
            encontrarem casos da sua ONG
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Ja possuo cadastro
          </Link>
        </section>

        <form onSubmit={registerNewOng}>
          <input
            type="text"
            placeholder="Nome da ONG"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              type="text"
              placeholder="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <input
              type="text"
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={(e) => setUf(e.target.value)}
            />
          </div>

          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
