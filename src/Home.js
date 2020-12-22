import { useState, useContext } from 'react';
import { useObserver } from 'mobx-react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import uuid from 'react-uuid';
import './index.css';

// components
import AddToListForm from './addToListForm';

// context 
import { StoreContext } from './App';

const Home = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const store = useContext(StoreContext);

    return useObserver(() => (
        <>
            <Modal show={store.showWaitForm} onHide={store.handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Add Guest to Wait List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddToListForm 
                    error={store.error}
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    phone={phone}
                    setPhone={setPhone}
                />
            </Modal.Body>
            { 
                store.error !== null ?
                <Modal.Footer>
                    <p>{ store.error }</p>
                </Modal.Footer> :
                    null
            }
            <Button
                onClick={() => store.addToWaitList(name, email, phone)}
            >
                Submit
            </Button>
            </Modal>


            <Row className="text-center m-4">
            <Col>
                <h1>Number of guests allowed in store: {store.allowed}</h1>
                <h1>Number of guests currently in store: {store.seatedList.length}</h1>
                <h1>Number of guests on wait list: {store.waitList.length}</h1>
            </Col>
            </Row>
            <Row className="text-center m-2">
            <Col>
                <h1>Wait List</h1>
                { 
                store.waitList.length > 0 ?
                    store.waitList.map(guest => {
                        const { name, email, phone } = guest;
                        return (
                            <Row key={uuid()}>
                            <Col>
                                <h4>{name} | {email} | {phone}</h4>
                            </Col>
                            <Col>
                                <Button onClick={() => store.addToSeatedList(name, email, phone)}>Seat Customer</Button> 
                            </Col>
                            <Col>
                                <Button onClick={() => store.handleDeleteWait(phone)}>Delete</Button> 
                            </Col>
                            </Row>
                        )
                    }) :
                        null
                }
            </Col>
            <Col>
                <h1>Guests Seated</h1>
                { 
                store.seatedList.length > 0 ?
                    store.seatedList.map(guest => {
                        const { name, email, phone } = guest;
                        return (
                            <Row key={uuid()}>
                            <Col>
                                <h4>{name} | {email} | {phone}</h4>
                            </Col>
                            <Col>
                                <Button onClick={() => store.handleDeleteSeated(phone)}>Delete</Button> 
                            </Col>
                            </Row>
                        )
                    }) :
                        null
                }
            </Col>
            </Row>
        </>
    ));
}

export default Home;