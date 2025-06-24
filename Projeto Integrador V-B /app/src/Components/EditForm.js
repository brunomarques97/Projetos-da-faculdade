import React, { useState, useEffect, useCallback } from 'react';
import { Container, Form, Button, Row, Col, Carousel, Modal, Alert, InputGroup } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus, FaSearch } from 'react-icons/fa';

import logo from '../img/logo.png';

const EditForm = () => {
  const { id: urlId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    categories: '',
    description: '',
    languages: '',
    fullAudioLanguages: '',
    developers: '',
    genres: '',
    windows: false,
    linux: false,
    mac: false,
    releaseDate: '',
    headerImage: '',
    movie: '',
    screenshots: [],
    positive: '',
    negative: '',
  });

  const [gameOptions, setGameOptions] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState('');
  const [searchNameInput, setSearchNameInput] = useState('');
  const [searchIdInput, setSearchIdInput] = useState('');

  const [showAddScreenshotModal, setShowAddScreenshotModal] = useState(false);
  const [newScreenshotUrl, setNewScreenshotUrl] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New state for authentication

  useEffect(() => {
    // Check for JWT token in localStorage on component mount
    const token = localStorage.getItem('jwtToken');
    setIsAuthenticated(!!token); // Set isAuthenticated to true if token exists
  }, []);

  const parseStringToArray = useCallback((str) => {
    if (!str || typeof str !== 'string') {
      return [];
    }
    try {
      const parsed = JSON.parse(str);
      if (Array.isArray(parsed)) {
        return parsed.filter(url => typeof url === 'string' && url.trim() !== '');
      } else if (typeof parsed === 'string') {
        return parsed.split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(s => s !== '');
      }
    } catch (e) {
      if (typeof str === 'string') {
        const cleanedString = str.replace(/^\[|\]$/g, '').trim();
        if (cleanedString) {
          return cleanedString.split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(s => s !== '');
        }
      }
    }
    return [];
  }, []);

  const parseMovieString = useCallback((str) => {
    const urls = parseStringToArray(str);
    return urls.length > 0 ? urls[0] : '';
  }, [parseStringToArray]);

  const fetchGameData = useCallback(async (gameId) => {
    if (!gameId) {
      setFormData({
        id: '',
        name: '',
        price: '',
        categories: '',
        description: '',
        languages: '',
        fullAudioLanguages: '',
        developers: '',
        genres: '',
        windows: false,
        linux: false,
        mac: false,
        releaseDate: '',
        headerImage: '',
        movie: '',
        screenshots: [],
        positive: '',
        negative: '',
      });
      setSelectedGameId('');
      setSearchIdInput('');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/jogo/${gameId}`);
      if (response.ok) {
        const gameData = await response.json();

        setFormData({
          id: gameData.id || '',
          name: gameData.name || '',
          price: gameData.price || '',
          categories: gameData.categories || '',
          description: gameData.detailedDescription || '',
          languages: gameData.supportedLanguages || '',
          fullAudioLanguages: gameData.fullAudioLanguages || '',
          developers: gameData.developers || '',
          genres: gameData.genres || '',
          windows: gameData.windows || false,
          linux: gameData.linux || false,
          mac: gameData.mac || false,
          releaseDate: gameData.releaseDate ? new Date(gameData.releaseDate).toISOString().split('T')[0] : '',
          headerImage: gameData.headerImage || '',
          movie: parseMovieString(gameData.movies),
          screenshots: parseStringToArray(gameData.screenshots),
          positive: gameData.positive || '',
          negative: gameData.negative || '',
        });
        setSelectedGameId(gameData.id);
        setSearchIdInput(gameData.id);
        setErrorMessage('');
        setShowErrorAlert(false);
      } else if (response.status === 404) {
        setErrorMessage('Jogo não encontrado com o ID fornecido.');
        setShowErrorAlert(true);
        fetchGameData(null);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Erro ao carregar dados do jogo.');
        setShowErrorAlert(true);
        fetchGameData(null);
      }
    } catch (error) {
      console.error('Erro na requisição de busca:', error);
      setErrorMessage('Erro na conexão. Verifique o servidor ou o ID.');
      setShowErrorAlert(true);
      fetchGameData(null);
    }
  }, [parseMovieString, parseStringToArray]);

  useEffect(() => {
    if (urlId && urlId !== formData.id) {
      fetchGameData(urlId);
    }
  }, [urlId, fetchGameData, formData.id]);

  useEffect(() => {
    if (selectedGameId && selectedGameId !== formData.id) {
      fetchGameData(selectedGameId);
    }
  }, [selectedGameId, fetchGameData, formData.id]);

  const handleSearchByName = async () => {
    if (searchNameInput.trim() === '') {
      setGameOptions([]);
      setErrorMessage('Por favor, digite um nome para buscar.');
      setShowErrorAlert(true);
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/jogo/buscarPorNome?nome=${encodeURIComponent(searchNameInput)}`);
      if (response.ok) {
        const games = await response.json();
        console.log('Dados recebidos do backend (busca por nome):', JSON.stringify(games, null, 2));

        if (games.length === 0) {
          setErrorMessage('Nenhum jogo encontrado com este nome.');
          setShowErrorAlert(true);
          setGameOptions([]);
          setSelectedGameId('');
        } else {
          setGameOptions(games.map(game => ({ id: game.id, name: game.name })));
          setShowErrorAlert(false);
          setErrorMessage('');
          if (games.length === 1) {
            setSelectedGameId(games[0].id);
          } else {
            setSelectedGameId('');
          }
        }
      } else if (response.status === 204) {
        setErrorMessage('Nenhum jogo encontrado com este nome.');
        setShowErrorAlert(true);
        setGameOptions([]);
        setSelectedGameId('');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Erro ao buscar jogos por nome.');
        setShowErrorAlert(true);
        setGameOptions([]);
        setSelectedGameId('');
      }
    } catch (error) {
      console.error('Erro na requisição de busca por nome:', error);
      setErrorMessage('Erro na conexão ao buscar jogos por nome.');
      setShowErrorAlert(true);
      setGameOptions([]);
      setSelectedGameId('');
    }
  };

  const handleSearchById = () => {
    fetchGameData(searchIdInput);
  };

  const handleSelectChange = (e) => {
    const id = e.target.value;
    setSelectedGameId(id);
  };

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    setShowErrorAlert(false);
    setErrorMessage('');

    if (!isAuthenticated) {
        setErrorMessage("Você precisa estar logado para editar um jogo.");
        setShowErrorAlert(true);
        return;
    }

    if (!formData.id) {
      setErrorMessage('Por favor, selecione ou insira um ID de jogo para editar.');
      setShowErrorAlert(true);
      return;
    }

    const dataToSend = {
      id: formData.id,
      name: formData.name,
      price: formData.price,
      categories: (() => {
        try {
          const parsedCategories = JSON.parse(formData.categories);
          return Array.isArray(parsedCategories) ? parsedCategories.join(', ') : formData.categories;
        } catch (error) {
          return formData.categories;
        }
      })(),
      detailedDescription: formData.description,
      supportedLanguages: (() => {
        try {
          const parsedLanguages = JSON.parse(formData.languages);
          return Array.isArray(parsedLanguages) ? parsedLanguages.join(', ') : formData.languages;
        } catch (error) {
          return formData.languages;
        }
      })(),
      fullAudioLanguages: formData.fullAudioLanguages,
      developers: formData.developers,
      genres: formData.genres,
      windows: formData.windows,
      linux: formData.linux,
      mac: formData.mac,
      releaseDate: formData.releaseDate,
      headerImage: formData.headerImage,
      screenshots: formData.screenshots.join(', '),
      movies: formData.movie ? `['${formData.movie}']` : '',
      positive: formData.positive,
      negative: formData.negative,
    };

    Object.keys(dataToSend).forEach(key => {
      if (dataToSend[key] === undefined || dataToSend[key] === null ||
          (typeof dataToSend[key] === 'string' && dataToSend[key].trim() === '' && key !== 'id')) {
        delete dataToSend[key];
      }
    });

    console.log('Dados enviados do frontend para o backend (PUT):', JSON.stringify(dataToSend, null, 2));

    try {
      const token = localStorage.getItem('jwtToken'); // Get token for authorization
      const response = await fetch(`http://localhost:8080/jogo/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include JWT token in Authorization header
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Jogo atualizado com sucesso:', result);
        setShowSuccessModal(true);
      } else {
        const errorData = await response.json();
        console.error('Erro ao atualizar jogo:', response.status, errorData);
        setErrorMessage(errorData.message || 'Erro ao atualizar jogo.');
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setErrorMessage('Erro na requisição de atualização.');
      setShowErrorAlert(true);
    }
  };

  const handleDeleteClick = () => {
    if (!isAuthenticated) {
      setErrorMessage("Você precisa estar logado para deletar um jogo.");
      setShowErrorAlert(true);
      return;
    }
    if (!formData.id) {
      setErrorMessage('Por favor, selecione ou insira um ID de jogo para deletar.');
      setShowErrorAlert(true);
      return;
    }
    setShowConfirmDeleteModal(true);
  };

  const confirmDeleteAction = async () => {
    setShowConfirmDeleteModal(false);
    try {
      const token = localStorage.getItem('jwtToken'); // Get token for authorization
      const response = await fetch(`http://localhost:8080/jogo/${formData.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` // Include JWT token in Authorization header
        }
      });

      if (response.ok) {
        console.log('Jogo deletado com sucesso!');
        alert('Jogo deletado com sucesso!');
        fetchGameData(null);
        navigate('/');
      } else {
        const errorData = await response.json();
        console.error('Erro ao deletar jogo:', response.status, errorData);
        setErrorMessage(errorData.message || 'Erro ao deletar jogo.');
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error('Erro na requisição de exclusão:', error);
      setErrorMessage('Erro na requisição de exclusão.');
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
          {isAuthenticated && ( // Conditionally render "Register" link
            <Link to="/cadastro" className="navbar-brand">
              <span className="fw-bold fs-4">Register</span>
            </Link>
          )}
        </div>
      </header>

      <Container style={{ paddingTop: '80px' }} className="my-5">
        <h2 className="text-center mb-4">Edit Game</h2>
        <Form onSubmit={handleUpdate}>
          {showErrorAlert && (
            <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
              {errorMessage}
            </Alert>
          )}

          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="searchGameByName">
                <Form.Label>Search Game by Name</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    value={searchNameInput}
                    onChange={(e) => setSearchNameInput(e.target.value)}
                    placeholder="Enter game name"
                  />
                  <Button variant="primary" onClick={handleSearchByName}>
                    <FaSearch />
                  </Button>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="selectGameByName">
                <Form.Label>Select Found Game</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedGameId}
                  onChange={handleSelectChange}
                  disabled={gameOptions.length === 0 && !selectedGameId}
                >
                  <option value="">
                    {gameOptions.length === 0 ? '-- No games found --' : '-- Select a game --'}
                  </option>
                  {gameOptions.map((game) => (
                    <option key={game.id} value={game.id}>
                      {game.name} (ID: {game.id})
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={12}>
              <Form.Group controlId="searchById">
                <Form.Label>Or Search Directly by ID</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    value={searchIdInput}
                    onChange={(e) => setSearchIdInput(e.target.value)}
                    placeholder="Enter Game ID"
                  />
                  <Button variant="info" onClick={handleSearchById} className="ms-2">
                    <FaSearch /> Search ID
                  </Button>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

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
                <Form.Label>Languages Ex:("English", "Portuguese")</Form.Label>
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

          <div className="text-center d-flex justify-content-center gap-3">
            <Button type="submit" variant="success">Edit</Button>
            <Button variant="danger" onClick={handleDeleteClick}>Delete</Button>
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
          <p className="text-success">Jogo atualizado com sucesso!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowSuccessModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmDeleteModal} onHide={() => setShowConfirmDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Você tem certeza que deseja deletar o jogo "{formData.name}" (ID: {formData.id})?</p>
          <p className="text-danger">Esta ação não poderá ser desfeita.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteAction}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditForm;