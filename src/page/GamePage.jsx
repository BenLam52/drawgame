import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const GamePage = () => {
    const navigate = useNavigate();

    const [buttons, setButtons] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [gameChance, setGameChance] = useState(parseInt(localStorage.getItem('gameChance')));

    const data = [
        "answer 1", "answer 2", "answer 3", "answer 4", "answer 5",
        "answer 6", "answer 7", "answer 8", "answer 9", "answer 10"
    ];

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        console.log(localStorage.getItem('gameChance'))
        const shuffled = shuffleArray([...data]);
        setButtons(shuffled);
    }, []);

    const handleAnswerClick = (answer) => {
        if (selectedAnswers.length < 5) {
            setSelectedAnswers([...selectedAnswers, answer]);
            setButtons(buttons.filter((button) => button !== answer));
        }
    };

    const handleMoveBack = (answer) => {
        setSelectedAnswers(selectedAnswers.filter((selected) => selected !== answer));
        setButtons([...buttons, answer]);
    };

    const handleSubmit = () => {
        const correctAnswers = data.slice(0, 5);
        const isCorrect = selectedAnswers.length === 5 && selectedAnswers.every(answer => correctAnswers.includes(answer));
        setIsSuccess(isCorrect);
        setSubmitted(true);
        setGameChance(gameChance - 1);
        console.log(gameChance - 1)
        localStorage.setItem('gameChance', (gameChance - 1).toString());
    };

    const handleRetry = () => {
        setButtons([...buttons, ...selectedAnswers]);
        setSelectedAnswers([]);
        setIsSuccess(false);
        setSubmitted(false);
    };

    return (
        <>
            <Container className='mt-2 d-flex justify-content-center' style={{ maxWidth: '100%' }}>
                <div>
                    <p>Please choose all correct answers.</p>
                </div>
            </Container>
            <Container className='d-flex justify-content-center' style={{ maxWidth: '100%' }}>
                <div style={{ width: '100%', height: 120, border: "2px solid" }}>
                    <Row className='justify-content-start' style={{ padding: "5px" }}>
                        {selectedAnswers.map((answer, index) => (
                            <Col xs="auto" key={index} className='mb-2'>
                                <button
                                    style={{ fontSize: '16px', width: '100px' }}
                                    onClick={() => handleMoveBack(answer)}
                                    disabled={submitted || gameChance === 0}
                                >
                                    {answer}
                                </button>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
            <Container className='mt-2'>
                <Row className='justify-content-start'>
                    {buttons.map((item, index) => (
                        <Col xs="auto" key={index} className='mb-2'>
                            <button
                                style={{ fontSize: '16px', width: '100px' }}
                                onClick={() => handleAnswerClick(item)}
                                disabled={submitted || gameChance === 0}
                            >
                                {item}
                            </button>
                        </Col>
                    ))}
                </Row>
            </Container>
            {selectedAnswers.length === 5 && !submitted && (
                <Container className='mt-2 d-flex justify-content-start'>
                    <Row>
                        <Col xs={12}>
                            <button className='normal-button' onClick={handleSubmit}>Submit</button>
                        </Col>
                    </Row>

                </Container>
            )}
            <Container>
                {submitted && isSuccess && (
                    <>
                        <p className="text-start">Success! All answers are correct. Please Click "Next" to draw lucky prize.</p>
                        <Row className='d-flex justify-content-end'>
                            <Col xs='auto'>
                                <button className='normal-button' onClick={() => { navigate('/draw') }}>Next</button>
                            </Col>
                        </Row>
                    </>
                )}
                {submitted && !isSuccess && (
                    gameChance > 0 ?
                        <>
                            <p className="text-start">Failure! Not all answers are correct. You have one more chance to try agian. You also can click "Back" to watch tutorial video again.</p>
                            <Row className='d-flex justify-content-end'>
                                <Col xs='auto'>
                                    <button className='normal-button' onClick={handleRetry}>Retry</button>
                                </Col>
                                <Col xs='auto'>
                                    <button className='normal-button' onClick={() => { navigate('/video') }}>Back</button>
                                </Col>
                            </Row>
                        </> : <>
                            <p className="text-start">Failure! Not all answers are correct. You have no more chance, thank you.</p>
                        </>
                )}
            </Container>

        </>
    );
};

export default GamePage;