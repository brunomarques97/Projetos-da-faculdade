import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logo from '../img/logo.png';

const EditForm = () => {
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
    headerImage: null,
    movie: null,
    screenshots: [],
  });

  const [previewScreenshots, setPreviewScreenshots] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === 'screenshots') {
      const filesArray = Array.from(files);
      setFormData((prevData) => ({
        ...prevData,
        screenshots: filesArray,
      }));

      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setPreviewScreenshots(previews);

    } else if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados cadastrados:', formData);
    alert('Cadastro realizado! Veja os dados no console.');
  };

  return (
    <>
      <header className="navbar navbar-light bg-light border-bottom fixed-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Sua Logo" style={{ height: '50px' }} />
          </Link>
          <Link to="/cadastro" className="navbar-brand">
            <span className="fw-bold fs-4">Register</span>
          </Link>
        </div>
      </header>

      <Container style={{ paddingTop: '80px' }} className="my-5">
        <h2 className="text-center mb-4">Edit Game</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
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

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="categories">
                <Form.Label>Categories</Form.Label>
                <Form.Control as="textarea" rows={2} name="categories" value={formData.categories} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={2} name="description" value={formData.description} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="languages">
                <Form.Label>Languages</Form.Label>
                <Form.Control type="text" name="languages" value={formData.languages} onChange={handleChange} />
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

          <Row className="mb-3">
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

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="headerImage">
                <Form.Label>Header Image</Form.Label>
                <Form.Control type="file" name="headerImage" accept="image/*" onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="movie">
                <Form.Label>Movie</Form.Label>
                <Form.Control type="file" name="movie" accept="video/*" onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4" controlId="screenshots">
            <Form.Label>Screenshots</Form.Label>
            <Form.Control type="file" name="screenshots" accept="image/*" multiple onChange={handleChange} />
          </Form.Group>

          {previewScreenshots.length > 0 && (
            <Carousel className="mb-4">
              {previewScreenshots.map((src, index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100" src={src} alt={`Screenshot ${index + 1}`} style={{ maxHeight: '400px', objectFit: 'contain' }} />
                </Carousel.Item>
              ))}
            </Carousel>
          )}

          <div className="text-center">
            <Button type="submit" variant="success">Edit</Button>
            <Button type="submit" variant="success">Delete</Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default EditForm;