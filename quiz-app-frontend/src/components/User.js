import React, { useState } from 'react';
import axios from 'axios';

const User = () => {
    const [quizId, setQuizId] = useState('');
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState([]);

    const handleQuizFetch = async () => {
        try {
            const response = await axios.get(`/quiz/get/${quizId}`);
            setQuestions(response.data);
        } catch (error) {
            console.error('There was an error fetching the quiz!', error);
        }
    };

    const handleResponseChange = (index, value) => {
        const newResponses = [...responses];
        newResponses[index] = value;
        setResponses(newResponses);
    };

    const handleQuizSubmit = async () => {
        try {
            const response = await axios.post(`/quiz/submit/${quizId}`, responses.map((response, index) => ({
                id: questions[index].id,
                response
            })));
            alert(`Your score is ${response.data}`);
        } catch (error) {
            console.error('There was an error submitting the quiz!', error);
        }
    };

    return (
        <div>
            <h2>Take Quiz</h2>
            <input type="text" placeholder="Quiz ID" value={quizId} onChange={(e) => setQuizId(e.target.value)} />
            <button onClick={handleQuizFetch}>Fetch Quiz</button>

            {questions.map((question, index) => (
                <div key={question.id}>
                    <h3>{question.questionTitle}</h3>
                    <input type="radio" name={`question-${index}`} value={question.option1} onChange={(e) => handleResponseChange(index, e.target.value)} /> {question.option1}
                    <input type="radio" name={`question-${index}`} value={question.option2} onChange={(e) => handleResponseChange(index, e.target.value)} /> {question.option2}
                    <input type="radio" name={`question-${index}`} value={question.option3} onChange={(e) => handleResponseChange(index, e.target.value)} /> {question.option3}
                    <input type="radio" name={`question-${index}`} value={question.option4} onChange={(e) => handleResponseChange(index, e.target.value)} /> {question.option4}
                </div>
            ))}

            <button onClick={handleQuizSubmit}>Submit Quiz</button>
        </div>
    );
};

export default User;
