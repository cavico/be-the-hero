import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import api from '../../services/api';

import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUF] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };
    try {
      const response = await api.post('ongs', data);
      alert(`Seu ID de acesso ${response.data.id}`);
      history.push('/');
    } catch (error) {
      alert('Erro no cadastro! Tente novamente')
    }
  }

  return (
    <main className="container">
      <div className="content-shadowed">
        <section className="column-narrow">
          <img src={logoImg} alt="Be The Hero" />
          <h1 className="title">Cadastro</h1>
          <p className="subtitle">
            Faça seu cadastro, entre na plataforma e ajude
            pessoas a encontrarem os casos da sua ONG
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Já tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister} className="column-wide main-form">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nome da ONG" />
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
          />
          <input
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
            placeholder="WhatsApp"
          />
          <div className="input-group">
            <input
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Cidade"
            />
            <input
              value={uf}
              onChange={e => setUF(e.target.value)}
              placeholder="UF" style={{ width: 80 }}
            />
          </div>
          <button className="button">Cadastrar</button>
        </form>
      </div>
    </main>
  );
}