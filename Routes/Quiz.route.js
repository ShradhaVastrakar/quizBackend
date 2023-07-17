const express = require("express");
const { Quiz } = require("../Models/Quiz.model")

const quizRouter = express.Router();

// GET all quizzes
quizRouter.get('/quizzes', async (req, res) => {
    try {
      const quizzes = await Quiz.find();
      res.json({ quizzes });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
  });

  // POST a new quiz
  quizRouter.post('/quizzes', async (req, res) => {
    try {
      const { creator, title, description, questions } = req.body;
  
      const newQuiz = new Quiz({
        creator,
        title,
        description,
        questions
      });
  
      const savedQuiz = await newQuiz.save();
      res.status(201).json({ quizzes: savedQuiz });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create a new quiz' });
    }
  });

  // Express route for getting questions by quiz ID
  quizRouter.get('/quizzes/:quizId/questions', async (req, res) => {
    const { quizId } = req.params;
  
    // Retrieve the quiz based on the provided quizId from the database or any other data source
    const quizzes = await Quiz.findById(quizId);
  
    if (!quizzes) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
  
    const questions = quizzes.questions;
    res.json({ questions });
  });

  // POST route to add a new question to a quiz
  quizRouter.post('/quizzes/:quizId/questions', async (req, res) => {
    const { quizId } = req.params;
    const { title, answerOptions, correctOptions } = req.body;
  
    try {
      const quizzes = await Quiz.findById(quizId);
      if (!quizzes) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
  
      const newQuestion = {
        title,
        answerOptions,
        correctOptions
      };
  
      quizzes.questions.push(newQuestion);
      const updatedQuiz = await quizzes.save();
  
      res.status(201).json({ quizzes: updatedQuiz });
    } catch (error) {
      console.error('Error adding question:', error);
      res.status(500).json({ error: 'Failed to add question' });
    }
  });

  // DELETE route to delete a quiz
quizRouter.delete('/quizzes/:quizId', async (req, res) => {
    const { quizId } = req.params;
  
    try {
      const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
      if (!deletedQuiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
  
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting quiz:', error);
      res.status(500).json({ error: 'Failed to delete quiz' });
    }
  });


module.exports={
    quizRouter
}