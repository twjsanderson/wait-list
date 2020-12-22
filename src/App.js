import { createContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import ModalButton from './ModalButton';
import { useLocalStore } from 'mobx-react'; 
import './App.css';

// routes
import routes from './routes';

const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    showWaitForm: false,
    waitList: [],
    seatedList: [],
    allowed: 3,
    error: null,
    handleClose: () => store.showWaitForm = false,
    handleShow: () => store.showWaitForm = true,
    handleDeleteWait: (phone) => {
      store.waitList = store.waitList.filter(guest => {
        return guest.phone !== phone
      })
    },
    handleDeleteSeated: (phone) => {
      store.seatedList = store.seatedList.filter(guest => {
        return guest.phone !== phone
      })
    },
    handleError: (email, phone) => {
      for (let guest of store.waitList) {
        if (guest.email.includes(email)) {
            return 'email error'      
        }
        if (guest.phone.includes(phone)) {
            return 'phone error'      
        }
      }
    },
    addToWaitList: (name, email, phone) => {
      const errorMessage = store.handleError(email, phone);
      const dateTimeStamp = new Date();
        if (!errorMessage) {
            store.waitList = [...store.waitList, { name, email, phone, dateTimeStamp }];
            store.handleClose();
        }
        store.error = errorMessage;
    },
    addToSeatedList: (name, email, phone) => {
      const dateTimeStamp = new Date();
      if (store.seatedList.length === store.allowed) {
        alert('Facility at capacity')
      } else {
        store.seatedList = [...store.seatedList, { name, email, phone, dateTimeStamp }];
        store.handleDeleteWait(phone, store.waitList);
      }
    }
  }))

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
};

export const StoreContext = createContext();

const App = () => {

  return (
    <StoreProvider>
      <>
      <Router>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand className='link-text'>Wait List App</Navbar.Brand>
          <Nav className="mr-auto">
            <Link className='m-2 link-text' to='/'>Home</Link>
            <Link className='m-2 link-text' to='/analytics'>Analytics</Link>
            {/* <Link className='link-text'>Settings</Link> */}
          </Nav>
          <ModalButton />
        </Navbar>
        {routes}
      </Router>
      </>
    </StoreProvider>
  );
}

export default App;
