const { pool } = require("../database/connection");
const csvParser = require('csv-parser');
const fs = require("fs");


const addBook = async(req,res) =>{
    try{

        const userrole=req.userrole;
        if(userrole=="seller"){

            const {title,author,publishedDate,price,seller_id}=req.body;
            const book = await pool.query("INSERT INTO Books(title,author,publishedDate,price,seller_id) VALUES ($1,$2,$3,$4,$5) RETURNING *",[title,author,publishedDate,price,seller_id]);
            return res.status(500).json({msg:"Book Added",data:book.rows[0]});
        }
        return res.status(400).json({msg:"Only sellers can add book"});

    }catch(error){
        console.log("Error occured at addBook",error);
        return res.status(500).json({msg:"Error While adding book"});
    }
}

const addMultipleBook = async(req,res)=>{

    try {
        const useremail=req.user;
        const filePath = req.file.path;
        const books = [];
        let skipHeader = true;

        const stream = fs.createReadStream(filePath);

        const parser = csvParser({ headers: true });
        stream.pipe(parser); 

        parser.on('data', row => {
            if (!skipHeader) { 

                const book = {};
                for (const key in row) {
                  book[key.slice(1)] = row[key];
                }

                books.push({
                    title:book['0'],
                    author:book['1'],
                    publishedDate:book['2'],
                    price:parseFloat(book['3'])
                })
            }
            skipHeader = false; 
        });
        

        parser.on('end', async () => {
            try{
                  for (const book of books) {
                    const values = [book.title, book.author, book.publishedDate, book.price, useremail];
                    await pool.query("INSERT INTO Books (title, author, publishedDate, price, seller_id) VALUES ($1, $2, $3, $4,$5)", values);
                  }
                  res.json({ message: 'Books uploaded successfully!' });
            }catch(error){
                console.log("Error is ",error);
            }
            
        });

        parser.on('error', err => {
            console.error(err);
            res.status(500).json({ message: 'Error uploading books' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error uploading books' });
    }

}

const updateBook = async(req,res) =>{
    try{
        const { title,author,publishedDate,price,seller_id }=req.body;
        const userrole=req.userrole;
        const useremail=req.user;
        console.log("useremail",useremail);
        if(userrole=="seller"){

            const book = await pool.query("SELECT * FROM Books WHERE seller_id=$1",[useremail]);
            if(book.rows.length==0){
                return res.status(400).json({msg:"You dont have any book with given details"});
            }

            const updatedBook = await pool.query("UPDATE Books SET title=$1, author=$2, publishedDate=$3, price=$4 WHERE seller_id=$5 RETURNING *",
                [
                    title ?? book?.rows[0]?.title,
                    author ?? book?.rows[0]?.author,
                    publishedDate ?? book?.rows[0]?.publishedDate,
                    price ?? book?.rows[0]?.price,
                    useremail
                ]);

            return res.status(200).json({msg:"Book Updated",data:updatedBook.rows[0]});
        }
        return res.status(400).json({msg:"Only seller can update book"});

    }catch(error){
        console.log("Error while editing book",error);
        return res.status(500).json({msg:"Error while editing book"});
    }
}

const deleteBook = async(req,res) =>{
    try{
        const userrole=req.userrole;
        const useremail=req.user;
        const {title}=req.query;

        if(userrole=="seller"){
            
            if(title){

                const deletedBook = await pool.query("DELETE FROM Books WHERE seller_id=$1 AND title=$2",[useremail,title]);
                return res.status(200).json({msg:"Book deleted",data:deletedBook.rows[0]});
            }
            return res.status(400).json({msg:"Please provide title for deleting book"});
        }
        return res.status(401).json({msg:"Only sellers can delete their own books"});

    }catch(error){
        console.log("error while deleting book",error)
        return res.status(500).json({msg:"Error occured while deleting book"});
    }
}

const getBook = async(req,res) =>{
    try{
        const {title}=req.params;
        const book = await pool.query("SELECT * FROM Books WHERE title=$1",[title]);
        if(book.rows.length==0){
            return res.status(400).json({msg:"Cannot find book with given title"});
        }
        return res.status(200).json({msg:"Book fetched",Book:book.rows[0]});

    }catch(error){
        console.log("Error while reading book",error);
    }
}

const getAllBooks = async(req,res)=>{
    try{
        const useremail=req.user;
        const allBooks = await pool.query("SELECT * FROM Books WHERE seller_id=$1",[useremail]);
        return res.status(200).json({Books:allBooks.rows});

    }catch(error){
        console.log("Error is ",error);
        res.status(500).json({msg:"Error while getting all books"});
    }
}


module.exports ={
    addBook,
    addMultipleBook,
    updateBook,
    deleteBook,
    getBook,
    getAllBooks
}