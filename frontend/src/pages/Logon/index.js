import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import api from '../../services/api';

import { FiLogIn } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
  const [id, setId] = useState('');

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post('sessions', { id });
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('/profile');
    } catch (error) {
      alert('Falha no login, tente novamente');
    }
  }

  return (
    <main className="container logon-container">
      <section className="column-medium">
        <img src={logoImg} alt="Be The Hero" />
        <form onSubmit={handleLogin} className="main-form">
          <h1 className="title">Faça seu logon</h1>
          <input
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="Sua ID" />
          <button className="button">Entrar</button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </main>
  )
}