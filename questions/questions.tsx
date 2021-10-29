/* import React, { useEffect, useState } from 'react';
import { Question } from '../types/types';
import { getClient, getAllQuestions } from '../firebase/queries';


function renderQuestions() {
    const getQuestions = () => {
        const [questions, setQuestions] = useState(0)

        useEffect(() => {
            getAllQuestions().then(questions => {
                setQuestions(questions);
            })
        }, []);

        return (
            questions
        );
    }
}

export default renderQuestions;

*/