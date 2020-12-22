import { Form } from 'react-bootstrap';

const AddToListForm = ({ email, setEmail, name, setName, phone, setPhone }) => {

    const handleChange = (e, setter) => {
        setter(e.target.value);
    }
    return (
        <>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => handleChange(e, setEmail)} 
                        required
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter guest name"
                        value={name}
                        onChange={(e) => handleChange(e, setName)} 
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control 
                        type="phone" 
                        placeholder="xxx-xxx-xxxx"
                        value={phone}
                        onChange={(e) => handleChange(e, setPhone)} 
                        required 
                    />
                </Form.Group>
            </Form>
        </>
    );
};

export default AddToListForm;