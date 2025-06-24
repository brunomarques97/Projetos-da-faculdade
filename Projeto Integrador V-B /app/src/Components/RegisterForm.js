import React, { useState, useEffect } from 'react'; // Import useEffect
import { Container, Form, Button, Row, Col, Carousel, Modal, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus } from 'react-icons/fa';

import logo from '../img/logo.png';

const CadastroScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    categories: '',
    description: '',
    languages: '',
    windows: false,
    linux: false,
    mac: false,
    releaseDate: '',
    requiredAge: '',
    headerImage: '',
    movie: '',
    screenshots: [],
  });

  const [showAddScreenshotModal, setShowAddScreenshotModal] = useState(false);
  const [newScreenshotUrl, setNewScreenshotUrl] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New state for authentication

  useEffect(() => {
    // Check for JWT token in localStorage on component mount
    const token = localStorage.getItem('jwtToken');
    setIsAuthenticated(!!token); // Set isAuthenticated to true if token exists
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRemoveImage = (fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: '',
    }));
  };

  const handleRemoveScreenshot = (indexToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      screenshots: prevData.screenshots.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleAddScreenshot = () => {
    if (newScreenshotUrl.trim() !== '') {
      setFormData((prevData) => ({
        ...prevData,
        screenshots: [...prevData.screenshots, newScreenshotUrl.trim()],
      }));
      setNewScreenshotUrl('');
      setShowAddScreenshotModal(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrorAlert(false);
    setErrorMessage('');

    if (!isAuthenticated) {
        setErrorMessage("Você precisa estar logado para cadastrar um jogo.");
        setShowErrorAlert(true);
        return;
    }

    const dataToSend = {
      ...formData,
      detailedDescription: formData.description,
      description: undefined,
      categories: (() => {
        try {
          const parsedCategories = JSON.parse(formData.categories);
          return Array.isArray(parsedCategories) ? parsedCategories.join(', ') : formData.categories;
        } catch (error) {
          return formData.categories;
        }
      })(),
      supportedLanguages: (() => {
        try {
          const parsedLanguages = JSON.parse(formData.languages);
          return Array.isArray(parsedLanguages) ? parsedLanguages.join(', ') : formData.languages;
        } catch (error) {
          return formData.languages;
        }
      })(),
      languages: undefined,
      screenshots: formData.screenshots.join(', '),
      movies: formData.movie ? `['${formData.movie}']` : '',
      movie: undefined,
    };

    Object.keys(dataToSend).forEach(key => {
      if (dataToSend[key] === undefined || dataToSend[key] === null) {
        delete dataToSend[key];
      }
    });

    console.log('Dados a serem enviados (JSON):', JSON.stringify(dataToSend, null, 2));

    try {
      const token = localStorage.getItem('jwtToken'); // Get token for authorization
      const response = await fetch('http://localhost:8080/jogo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include JWT token in Authorization header
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Jogo cadastrado com sucesso:', result);
        setShowSuccessModal(true);
        setFormData({
          name: '',
          price: '',
          categories: '',
          description: '',
          languages: '',
          windows: false,
          linux: false,
          mac: false,
          releaseDate: '',
          requiredAge: '',
          headerImage: '',
          movie: '',
          screenshots: [],
        });
      } else {
        const errorData = await response.json();
        console.error('Erro ao cadastrar jogo:', response.status, errorData);
        setErrorMessage(errorData.message || 'Erro ao cadastrar jogo. Por favor, tente novamente.');
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setErrorMessage('Erro na requisição. Verifique a conexão ou o servidor.');
      setShowErrorAlert(true);
    }
  };

  return (
    <>
      <header className="navbar navbar-light bg-light border-bottom fixed-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Sua Logo" style={{ height: '50px' }} />
          </Link>
          {isAuthenticated && ( // Conditionally render "Edit" link
            <Link to="/editar" className="navbar-brand">
              <span className="fw-bold fs-4">Edit</span>
            </Link>
          )}
        </div>
      </header>

      <Container style={{ paddingTop: '80px' }} className="my-5">
        <h2 className="text-center mb-4">Game Registration</h2>
        <Form onSubmit={handleSubmit}>
          {showErrorAlert && (
            <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
              {errorMessage}
            </Alert>
          )}

          <Row className="mb-5">
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="price" step="0.01" value={formData.price} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col md={6}>
              <Form.Group controlId="categories">
                <Form.Label>Categories Ex:("Action", "RPG")</Form.Label>
                <Form.Control as="textarea" rows={2} name="categories" value={formData.categories} onChange={handleChange} placeholder='e.g., ["Action", "RPG"]' />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={2} name="description" value={formData.description} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col md={6}>
              <Form.Group controlId="languages">
                <Form.Label>Languages </Form.Label>
                <Form.Control type="text" name="languages" value={formData.languages} onChange={handleChange} placeholder='e.g., ["English", "Portuguese"]' />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Label>Platforms</Form.Label>
              <div>
                <Form.Check inline label="Windows" type="checkbox" name="windows" checked={formData.windows} onChange={handleChange} />
                <Form.Check inline label="Linux" type="checkbox" name="linux" checked={formData.linux} onChange={handleChange} />
                <Form.Check inline label="Mac" type="checkbox" name="mac" checked={formData.mac} onChange={handleChange} />
              </div>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col md={6}>
              <Form.Group controlId="releaseDate">
                <Form.Label>Release Date</Form.Label>
                <Form.Control type="date" name="releaseDate" value={formData.releaseDate} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="requiredAge">
                <Form.Label>Required Age</Form.Label>
                <Form.Control type="number" name="requiredAge" value={formData.requiredAge} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col md={6}>
              <Form.Group controlId="headerImage">
                <Form.Label>Header Image URL</Form.Label>
                <Form.Control type="text" name="headerImage" value={formData.headerImage} onChange={handleChange} placeholder="Enter image URL" />
                {formData.headerImage && (
                  <div className="mt-2 d-flex align-items-center">
                    <img src={formData.headerImage} alt="Header Preview" style={{ maxWidth: '200px', maxHeight: '200px', marginRight: '10px', border: '1px solid #ddd', objectFit: 'contain' }} />
                    <Button variant="danger" size="sm" onClick={() => handleRemoveImage('headerImage')}>
                      <FaTrash />
                    </Button>
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="movie">
                <Form.Label>Movie URL</Form.Label>
                <Form.Control type="text" name="movie" value={formData.movie} onChange={handleChange} placeholder="Enter video URL" />
                {formData.movie && (
                  <div className="mt-2 d-flex align-items-center">
                    <video controls src={formData.movie} style={{ maxWidth: '200px', maxHeight: '200px', marginRight: '10px', border: '1px solid #ddd', objectFit: 'contain' }} />
                    <Button variant="danger" size="sm" onClick={() => handleRemoveImage('movie')}>
                      <FaTrash />
                    </Button>
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4" controlId="screenshots">
            <Form.Label>Screenshots</Form.Label>
            <Form.Control type="hidden" name="screenshots" value={formData.screenshots.join(', ')} onChange={handleChange} />

            {formData.screenshots.length === 0 ? (
              <div
                className="d-flex justify-content-center align-items-center border rounded p-5"
                style={{ height: '200px', cursor: 'pointer', backgroundColor: '#f8f9fa' }}
                onClick={() => setShowAddScreenshotModal(true)}
              >
                <FaPlus size={40} className="text-muted" />
                <span className="ms-3 text-muted">Add Screenshot</span>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-3">
                <Carousel className="mb-4 flex-grow-1">
                  {formData.screenshots.map((src, index) => (
                    src && (
                      <Carousel.Item key={index}>
                        <div className="position-relative d-flex justify-content-center align-items-center" style={{ minHeight: '300px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
                          <img className="d-block w-100" src={src} alt={`Screenshot ${index + 1}`} style={{ maxHeight: '400px', objectFit: 'contain' }} />
                          <Button
                            variant="danger"
                            size="sm"
                            className="position-absolute top-0 end-0 m-2"
                            onClick={() => handleRemoveScreenshot(index)}
                            style={{ zIndex: 10 }}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </Carousel.Item>
                    )
                  ))}
                </Carousel>
                <div
                  className="d-flex justify-content-center align-items-center border rounded p-3"
                  style={{ width: '100px', height: '100px', cursor: 'pointer', backgroundColor: '#e9ecef', flexShrink: 0 }}
                  onClick={() => setShowAddScreenshotModal(true)}
                >
                  <FaPlus size={30} className="text-muted" />
                </div>
              </div>
            )}
          </Form.Group>

          <div className="text-center">
            <Button type="submit" variant="success">Register</Button>
          </div>
        </Form>
      </Container>

      <Modal show={showAddScreenshotModal} onHide={() => setShowAddScreenshotModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Screenshot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="newScreenshotUrl">
            <Form.Control
              type="text"
              value={newScreenshotUrl}
              onChange={(e) => setNewScreenshotUrl(e.target.value)}
              placeholder="Enter screenshot URL"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddScreenshotModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddScreenshot}>
            Add Screenshot
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sucesso!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-success">Jogo cadastrado com sucesso!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowSuccessModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CadastroScreen;