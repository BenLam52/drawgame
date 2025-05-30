import React, { useState } from 'react';
import { Alert, Col, Container, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function FormPage() {
    const navigate = useNavigate();

    const titleOptions = ["Mr", "Mrs", "Miss", "Ms", "Dr", "Prof", "Mx", "Others"];

    const hospitalList = [
        "Hospital 1",
        "Hospital 2",
        "Hospital 3",
        "Hospital 4",
        "Hospital 5",
        "Hospital 6",
        "Hospital 7",
        "Hospital 8",
        "Hospital 9",
        "Hospital 10"
    ];

    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [hospital, setHospital] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    const [isTitleEmpty, setIsTitleEmpty] = useState(false);
    const [isNameEmpty, setIsNameEmpty] = useState(false);
    const [isPositionEmpty, setIsPositionEmpty] = useState(false);
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [isHospitalEmpty, setIsHospitalEmpty] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [emptyFieldExist, setEmptyFieldExist] = useState(false);

    const handleConfirm = async () => {
        try {
            // const response = await WardCodeApi.addWard(hospital, jobTitle, name)
            // if (getAlert(response)) {
            //     setShowConfirmModal(false);
            //     return
            // }
            localStorage.setItem('gameChance', '2');
            navigate('/video')
        } catch (e) {
            console.log(e)
            throw e
        }
        setShowConfirmModal(false);
    };

    const handleShowConfirmModal = (event) => {
        event.preventDefault()
        setEmptyFieldExist(false)
        if (checkIsEmpty()) {
            setEmptyFieldExist(true)
            return
        }
        setShowConfirmModal(true);
    };

    const handleSelectTitleChange = (option) => {
        setIsTitleEmpty(false)
        setTitle(option);
    };

    const handleIsPrivate = (event) => {
        const { checked } = event.target;
        setIsPrivate(checked);
    };

    function checkIsEmpty() {
        if (title.trim() === '') {
            setIsTitleEmpty(true);
        }
        if (name.trim() === '') {
            setIsNameEmpty(true);
        }
        if (position.trim() === '') {
            setIsPositionEmpty(true);
        }
        if (email.trim() === '') {
            setIsEmailEmpty(true);
        }
        if (hospital.trim() === '') {
            setIsHospitalEmpty(true);
        }
        return title.trim() === '' || name.trim() === '' || position.trim() === '' || email.trim() === '' || hospital.trim() === ''
    }

    const filteredOptions = hospitalList.filter(option =>
        option.toLowerCase().includes(hospital.toLowerCase())
    );

    const onChange = (selectedOption) => {
        console.log(`Selected option: ${selectedOption}`);
        // Perform any additional actions upon option selection
    };

    return (
        <>
            <Container className='d-flex justify-content-start mt-2'>
                <div>
                    <p>Clinical Genie is a healthcare management app. ...</p>
                    <p>If you are interested and would like to receive more information, please fill out the form to leave your contact details.</p>
                </div>
            </Container>
            <Container className='d-flex justify-content-center mt-2'>
                <Form
                    className='normal-form'
                    onSubmit={handleShowConfirmModal}
                    style={{ width: '100%' }}
                >
                    <Row >
                        <Form.Group xs={12} as={Col} className="mb-3" >
                            <Row>
                                <Form.Label column xs={4}>
                                    Title
                                </Form.Label>
                                <Col>
                                    <Dropdown className='w-100'>
                                        <Dropdown.Toggle
                                            variant='light'
                                            className='w-100 hospital-dropdown-toggle'
                                        >
                                            <span className={title ? 'hospital-dropdown-toggle-selected-text' : 'hospital-dropdown-toggle-placeholder-text'}>
                                                {title || 'Select a title'}
                                            </span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu
                                            className='w-100 hospital-dropdown-menu'
                                            style={{ maxHeight: '200px', overflowY: 'auto' }}
                                        >

                                            {titleOptions.map((option, index) => (
                                                <Dropdown.Item
                                                    key={index}
                                                    onClick={() => {
                                                        handleSelectTitleChange(option);
                                                    }}
                                                    className="hospital-dropdown-item"
                                                >
                                                    {option}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {isTitleEmpty && <div type="invalid" className='warn-text mt-1'>{"Please select title"}</div>}
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group xs={12} as={Col} className="mb-3" >
                            <Row>
                                <Form.Label column xs={4}>
                                    Name
                                </Form.Label>
                                <Col>
                                    <Form.Control
                                        className={isNameEmpty && 'is-invalid'}
                                        placeholder={'Name'}
                                        onChange={(event) => { setName(event.target.value); setIsNameEmpty(false) }} />
                                    {isNameEmpty && <Form.Control.Feedback type="invalid">{"Please input this field"}</Form.Control.Feedback>}
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group xs={12} as={Col} className="mb-3" >
                            <Row>
                                <Form.Label column xs={4}>
                                    Position
                                </Form.Label>
                                <Col>
                                    <Form.Control
                                        className={isPositionEmpty && 'is-invalid'}
                                        placeholder={'Position'}
                                        onChange={(event) => { setPosition(event.target.value); setIsPositionEmpty(false) }} />
                                    {isPositionEmpty && <Form.Control.Feedback type="invalid">{"Please input this field"}</Form.Control.Feedback>}
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group xs={12} as={Col} className="mb-3" >
                            <Row>
                                <Form.Label column xs={4}>
                                    Email
                                </Form.Label>
                                <Col>
                                    <Form.Control
                                        type='email'
                                        className={isEmailEmpty && 'is-invalid'}
                                        placeholder={'Email'}
                                        onChange={(event) => { setEmail(event.target.value); setIsEmailEmpty(false) }} />
                                    {isEmailEmpty && <Form.Control.Feedback type="invalid">{"Please input this field"}</Form.Control.Feedback>}
                                    <div>* please input your work email in hospital</div>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group xs={12} as={Col} className="mb-3" >
                            <Row>
                                <Form.Label column xs={4}>
                                    Phone
                                </Form.Label>
                                <Col>
                                    <Form.Control
                                        placeholder={'Phone'}
                                        onChange={(event) => { setPhone(event.target.value) }} />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group xs={12} as={Col} className="mb-3" >
                            <Row>
                                <Form.Label column xs={4}>
                                    Hospital
                                </Form.Label>
                                <Col>
                                    <Dropdown show={menuOpen} onToggle={(isOpen) => setMenuOpen(isOpen)}>
                                        <Form.Control
                                            type="text"
                                            value={hospital}
                                            placeholder="Hospital"
                                            onChange={(e) => {
                                                setIsHospitalEmpty(false)
                                                setHospital(e.target.value);
                                                setMenuOpen(true);
                                            }}
                                            className={isHospitalEmpty && 'is-invalid'}
                                            onFocus={(e) => {
                                                e.stopPropagation();
                                                setMenuOpen(true);
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setMenuOpen(true);
                                            }}
                                        />
                                        {isHospitalEmpty && <Form.Control.Feedback type="invalid">{"Please input this field"}</Form.Control.Feedback>}
                                        <Dropdown.Menu
                                            className='w-100 hospital-dropdown-menu'
                                            style={{ maxHeight: '200px', overflowY: 'auto' }}
                                        >
                                            {filteredOptions.map((option, index) => (
                                                <Dropdown.Item
                                                    key={index}
                                                    onClick={() => {
                                                        onChange(option);
                                                        setIsHospitalEmpty(false)                                                        
                                                        setHospital(option);
                                                        setMenuOpen(false);
                                                    }}
                                                    className="hospital-dropdown-item"
                                                >
                                                    {option}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Row>
                                <Col xs={4}></Col>
                                <Col>
                                    <Form.Check
                                        label="Private"
                                        type="checkbox"
                                        onChange={handleIsPrivate}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                    </Row>
                    <Row className='mt-2'>
                        <Col xs='auto'>
                            <button
                                type="submit"
                                className='normal-button'
                            >
                                Submit
                            </button>
                        </Col>
                    </Row>

                    <Container className='mt-2'>
                        {emptyFieldExist && (
                            <Alert variant="danger" onClose={() => setEmptyFieldExist(false)} dismissible>
                                {"Some fields can't be empty."}
                            </Alert>
                        )}
                    </Container>
                </Form>

                <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{'Your input information'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col xs={4} className='bold-text'>
                                {'Title'}
                            </Col>
                            <Col>
                                {title}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} className='bold-text'>
                                {'Name'}
                            </Col>
                            <Col>
                                {name}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} className='bold-text'>
                                {'Position'}
                            </Col>
                            <Col>
                                {position}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} className='bold-text'>
                                {'Email'}
                            </Col>
                            <Col>
                                {email}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} className='bold-text'>
                                {'Phone'}
                            </Col>
                            <Col>
                                {phone}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} className='bold-text'>
                                {'Hospital'}
                            </Col>
                            <Col>
                                {hospital}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} className='bold-text'>
                                {'Private'}
                            </Col>
                            <Col>
                                {isPrivate ? 'Yes' : 'No'}
                            </Col>
                        </Row>
                        <Row> &nbsp; </Row>
                        <p>{'Are you sure you want to submit?'}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Row>
                            <Col>
                                <button className="cancel-button" onClick={() => setShowConfirmModal(false)}>
                                    {'Cancel'}
                                </button>
                            </Col>
                            <Col>
                                <button className="normal-button" onClick={handleConfirm}>
                                    {'Confirm'}
                                </button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>

            </Container>
        </>
    );
}

export default FormPage;