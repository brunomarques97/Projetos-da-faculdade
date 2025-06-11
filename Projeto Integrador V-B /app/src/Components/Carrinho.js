import React from 'react';
import { useCart } from '../context/CartContext';
import { Button, Card, ListGroup, Offcanvas } from 'react-bootstrap';

const Carrinho = ({ show, handleClose }) => {
    const { cartItems, removeFromCart, clearCart, cartTotal } = useCart();

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Seu Carrinho de Compras</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cartItems.length === 0 ? (
                    <p>O carrinho está vazio.</p>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>{item.name}</h5> {/* Usar item.name agora */}
                                    <p className="mb-0">Quantidade: {item.quantity}</p>
                                    <p className="mb-0">Preço: R$ {item.price?.toFixed(2) || 'N/A'}</p>
                                </div>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remover
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}

                <Card className="mt-3">
                    <Card.Body className="d-flex justify-content-between align-items-center">
                        <Card.Title className="mb-0">Total:</Card.Title>
                        <Card.Text className="mb-0 fs-4">
                            R$ {cartTotal.toFixed(2)}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <div className="d-grid gap-2 mt-3">
                    <Button variant="success" disabled={cartItems.length === 0}>
                        Finalizar Compra
                    </Button>
                    <Button variant="outline-secondary" onClick={clearCart} disabled={cartItems.length === 0}>
                        Limpar Carrinho
                    </Button>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Carrinho;