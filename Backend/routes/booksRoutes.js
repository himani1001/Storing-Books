import express from "express";
import { Book } from "../models/bookModels.js"; //using bookModels

const router = express.Router();

//Route for save a new book
router.post('/', async (request, response) => {
    try{
        if(                                         //validation for our input which comes from request.body
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {                                        //if required fields are not in requested body return a response with status of 300
            return response.status(400).send({     //and send a message for client
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const books  = await Book.create(newBook);   //saving result to a book variable

        return response.status(201).send(books);     //return status and send a book to the client

    } catch (error) {                               
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route to get all book from database
router.get('/', async (request, response) => {
    try{
        const books  = await Book.find({});   //passed Book.find an empty object to get list of all the books from database and save it in book variable

        return response.status(200).json({
            count: books.length,
            data: books
        });     
    } catch (error) {                               
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route to get all book from database by id
router.get('/:id', async(request, response) => {
    try{
        const { id } = request.params;

        const books  = await Book.findById(id);   

        return response.status(200).json(books); //return the book to client
    } catch (error) {                               
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for update a book
router.put('/:id', async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
        });
      }
  
      const { id } = request.params;
  
      const result = await Book.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'Book not found' });
      }
  
      return response.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
 
//Route for delete a book
router.delete('/:id', async(request, response) => {
    try{
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Book not found'});
        }

        return response.status(200).send({message: 'Book deleted successfully'});
    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;