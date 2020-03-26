import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import api from '../../services/api';

import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      value
    };
    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      });
      history.push('/profile');
    } catch (error) {
      alert('Erro ao cadastrar caso. Tente novamente');
    }
  }

  return (
    <main className="container new-incident-container">
      <div className="content-shadowed">
        <section className="column-narrow">
          <img src={logoImg} alt="Be The Hero" />
          <h1 className="title">Cadastrar novo caso</h1>
          <p className="subtitle">
            Descreva o caso detalhadamente para
            encontrar um herói para resolver isso.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident} className="column-wide main-form">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Título do caso" />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descrição" />
          <input
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Valor em reais" />
          <button className="button">Cadastrar</button>
        </form>
      </div>
    </main>
  );
}