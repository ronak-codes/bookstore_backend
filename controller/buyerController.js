const{pool}= require("../database/connection")


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
        const books = await pool.query("SELECT * FROM Books");
        return res.status(200).json({Books:books.rows});

    }catch(error){
        console.log("Error ocuured",error);
        return res.status(500).json({msg:"Error While Getting all books"});
    }
}

module.exports= {
    getBook,
    getAllBooks
}