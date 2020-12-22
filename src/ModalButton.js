import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useObserver } from 'mobx-react';

// context 
import { StoreContext } from './App';

const ModalButton = () => {
    const store = useContext(StoreContext);

    return useObserver(() => (
        <Button onClick={() => store.handleShow()}>Add to wait List</Button>
    ));
}

export default ModalButton;