import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    if (!username || !password) {
      setError('Por favor, preencha todos os campos.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming your backend returns a token in 'accessToken'
        localStorage.setItem('jwtToken', data.accessToken);
        setSuccess('Login realizado com sucesso! Redirecionando...');
        setUsername('');
        setPassword('');
        navigate('/cadastro'); // Redirect to the registration page after login
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Nome de usuário ou senha inválidos.');
      }
    } catch (err) {
      setError('Ocorreu um erro ao tentar logar. Verifique a conexão com o servidor.');
      console.error('Erro na operação de login:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Nome de Usuário</Form.Label>
        <Form.Control
          type="text"
          placeholder="Digite seu nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Senha</Form.Label>
        <Form.Control
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        className="w-100"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Entrando...' : 'Entrar'}
      </Button>
    </Form>
  );
};

export default LoginForm;