import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.svg';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  toast.configure({
    autoClose: 3000,
    draggable: false,
    position: 'bottom-right',
  });

  useEffect(() => {
    api
      .get('profile', {
        headers: {
          Authorization: ongId,
        },
      })
      .then((response) => {
        setIncidents(response.data);
      });
  }, [ongId]);

  async function deleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      });

      setIncidents(incidents.filter((incident) => incident.id !== id));

      toast.success('Caso removido');
    } catch (error) {
      toast.error('Erro durante a remoção do caso');
    }
  }

  function logoff() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logo} alt="Be the hero" />
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>

        <button type="button" onClick={logoff}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map((incident) => {
          return (
            <li key={incident.id}>
              <strong>CASO:</strong>
              <p>{incident.title}</p>

              <strong>DESCRIÇÃO:</strong>
              <p>{incident.description}</p>

              <strong>VALOR:</strong>
              <p>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(incident.value)}
              </p>

              <button type="button" onClick={() => deleteIncident(incident.id)}>
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
