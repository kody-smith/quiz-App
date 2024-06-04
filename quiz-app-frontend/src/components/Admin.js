import React, { useEffect, useState } from 'react';
import axios from '../axios';

const Admin = () => {
    // Data required to send back for new quizes
    const [category, setCategory] = useState('');
    const [noOfQuestions, setNoOfQuestions] = useState('');
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const [showQuestions, setShowQuestions] = useState(false);
    const [showCategoryQuestions, setShowCategoryQuestions] = useState(true);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [categoryQuestions, setCategoryQuestions] = useState([]);
    const [userCategory, setUserCategory] = useState('');
    const [newQuestion, setNewQuestion] = useState({
        questionTitle: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        rightAnswer: '',
        difficulty: '',
        category: ''
    });

    // useEffect hook for getting questions from db
    useEffect(() => {
        getQuestions();
    },[]);

    const getQuestions = async () => {
        try {
            const response = await axios.get('/question/allQuestions');
            setQuestions(response.data);
        } catch (error) {
            console.error("There was an error getting questions", error);
        }
    }

    const getQuestionsByCategory = async () => {
        try {
            const response = await axios.get(`/question/category/${userCategory}`);
            setCategoryQuestions(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("There was an error getting questions", error);
        }
    };

    // Function to create a new quiz
    const handleQuizCreate = async () => {
        try {
            // Use the post method to create a new quiz using the quiz/create URL via the axios connection
            const response = await axios.post('/quiz/create', null, {
                // Pass in the necessary URLS
                params: {
                    category,
                    noOfQuestions,
                    title
                }
            });
            alert('Quiz created successfully');
        } catch (error) {
            console.error('There was an error creating the quiz!', error);
        }
    };

    // Function for adding questions
    const handleQuestionAdd = async () => {
        try {
            // Use the post method to connect to the database via axios and the question/add url
            const response = await axios.post('/question/add', newQuestion);
            // Set the question variable to response.data. The backend work wil add to db
            setQuestions([...questions, response.data]);
            alert('Question added successfully');
        } catch (error) {
            console.error('There was an error adding the question!', error);
        }
    };

    const handleQuestionDelete = async (question) => {
        try {
            const response = await axios.delete('/question/delete', { data: question });
            console.log('Question deleted successfully');
        } catch (error) {
            console.error('There was an error deleting the question!', error);
        }
    };
    

    // Event handler
    const handleChange = (e) => {
        // name is the field that user has selected, value is the data the user has input
        const { name, value } = e.target;
        // Update the new question object with a copy of the previously existing state with the field the user has updated replaced
        setNewQuestion((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCategoryChange = (e) => {
        setUserCategory(e.target.value);
    }

    const toggleQuestions = () => {
        // Set bool val of setShowQuestions to be the opposite of whatever it was previously
        setShowQuestions((prev) => !prev);
    };

    const toggleCategoryQuestions = () => {
        setShowCategoryQuestions((prev) => !prev);
    };

    return (
        <div>
            <h2>Create Quiz</h2>
            <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <input type="number" placeholder="Number of Questions" value={noOfQuestions} onChange={(e) => setNoOfQuestions(e.target.value)} />
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <button onClick={handleQuizCreate}>Create Quiz</button>

            <h2>Add Question</h2>
            <input type="text" name="questionTitle" placeholder="Question" value={newQuestion.questionTitle} onChange={handleChange} />
            <input type="text" name="option1" placeholder="Option 1" value={newQuestion.option1} onChange={handleChange} />
            <input type="text" name="option2" placeholder="Option 2" value={newQuestion.option2} onChange={handleChange} />
            <input type="text" name="option3" placeholder="Option 3" value={newQuestion.option3} onChange={handleChange} />
            <input type="text" name="option4" placeholder="Option 4" value={newQuestion.option4} onChange={handleChange} />
            <input type="text" name="rightAnswer" placeholder="Right Answer" value={newQuestion.rightAnswer} onChange={handleChange} />
            <input type="text" name="difficulty" placeholder="Difficulty" value={newQuestion.difficulty} onChange={handleChange} />
            <input type="text" name="category" placeholder="Category" value={newQuestion.category} onChange={handleChange} />
            <button onClick={handleQuestionAdd}>Add Question</button>

            
            <button onClick={toggleQuestions}>
                {showQuestions ? 'Hide Questions' : 'Show All Questions'}
            </button>

            {showQuestions && (
                <div>
                    <h2>Existing Questions</h2>
                    <ul>
                        {questions.map((question) => (
                            <li key={question.id}>
                                <strong>{question.questionTitle}</strong>
                                <ul>
                                    <li>Option 1: {question.option1}</li>
                                    <li>Option 2: {question.option2}</li>
                                    <li>Option 3: {question.option3}</li>
                                    <li>Option 4: {question.option4}</li>
                                    <li>Correct Answer: {question.rightAnswer}</li>
                                    <li>Difficulty: {question.difficulty}</li>
                                    <li>Category: {question.category}</li>
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div>
                <input 
                    type="text" 
                    placeholder="Enter category" 
                    value={userCategory} 
                    onChange={handleCategoryChange} 
                />
                <button onClick={getQuestionsByCategory}>Search Questions by Category</button>
                <button onClick={toggleCategoryQuestions}>
                    {showCategoryQuestions ? 'Hide' : 'Show'}
                </button>
                
            </div>

            {showCategoryQuestions && categoryQuestions.length > 0 && (
                <div>
                    <h2>Questions for Category: {userCategory}</h2>
                    <ul>
                        {categoryQuestions.map((question) => (
                            <li key={question.id}>
                                <strong>{question.questionTitle}</strong>
                                <ul>
                                    <li>Option 1: {question.option1}</li>
                                    <li>Option 2: {question.option2}</li>
                                    <li>Option 3: {question.option3}</li>
                                    <li>Option 4: {question.option4}</li>
                                    <li>Correct Answer: {question.rightAnswer}</li>
                                    <li>Difficulty: {question.difficulty}</li>
                                    <li>Category: {question.category}</li>
                                </ul>
                                {/* <button onClick={() => handleEditQuestion(question)}>Edit</button> */}
                                <button onClick={() => handleQuestionDelete(question.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
        </div>
    );
};

export default Admin;
