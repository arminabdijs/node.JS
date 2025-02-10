const http = require('http')
const fs = require('fs')
const url = require('url')
const db = require("./db.json")

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === '/api/books') {
        fs.readFile('db.json', (err, db) => {
            if (err) {
                throw err
            }

            const data = JSON.parse(db)

            res.writeHead(200, {"content-type": "application/json"})
            res.write(JSON.stringify(data.books))
            res.end()
        })
    }
    else if (req.method === "GET" && req.url === '/api/users') {
        fs.readFile('db.json', (err, db) => {
            if (err) {
                throw err
            }

            const data = JSON.parse(db)

            res.writeHead(200, {"content-type": "application/json"})
            res.write(JSON.stringify(data.users))
            res.end()
        })
    }
    else if (req.method === "DELETE" && req.url.startsWith("/api/books")) {

        const parseUrl = url.parse(req.url, true)
        const bookID = parseUrl.query.id

        const newBook = db.books.filter(book => book.id !== bookID)

        const bookExists = db.books.find(book => book.id === bookID)

        if (!bookExists) {
            console.log('Book not found');
            res.writeHead(404, {"content-type": "application/json"});
            res.write(JSON.stringify({message: "Book not found"}))
            res.end();
        } else {
            fs.writeFile("db.json", JSON.stringify({...db, books: newBook}), (err) => {
                if (err) throw err;
                console.log('Book deleted successfully');
                res.writeHead(200, {"content-type": "application/json"});
                res.write(JSON.stringify({message: "Book deleted successfully"}))
                res.end();
            })
        }

    }
    else if (req.method === "POST", req.url === "/api/books") {
        let book = ""

        req.on("data", (data) => {
            book = book + data.toString()

        })

        req.on("end", () => {

            const newBook = {
                id: crypto.randomUUID(), ...JSON.parse(book), free: 1
            }
            db.books.push(newBook)


            fs.writeFile("db.json", JSON.stringify(db), (err) => {
                if (err) throw err;
                console.log('The book has been added to the database!')
                res.writeHead(201, {"content-type": "application/json"});
                res.write(JSON.stringify({message: "Book added successfully"}))
                res.end();
            })
        })
    }
    else if (req.method === "PUT", req.url.startsWith("/api/books")) {
        const urlParser = url.parse(req.url, true)
        const bookID = urlParser.query.id
        let book = ""
        req.on("data", (data) => {
            book = book + data.toString()
        })
        req.on("end", () => {
            const updatedBook = {id: bookID, ...JSON.parse(book)}
            const bookIndex = db.books.findIndex(book => book.id === bookID)

            if (bookIndex === -1) {
                console.log('Book not found');
                res.writeHead(404, {"content-type": "application/json"});
                res.write(JSON.stringify({message: "Book not found"}))
                res.end();
            } else {
                db.books[bookIndex] = updatedBook
                fs.writeFile("db.json", JSON.stringify(db), (err) => {
                    if (err) throw err;
                    console.log('Book updated successfully');
                    res.writeHead(200, {"content-type": "application/json"});
                    res.write(JSON.stringify({message: "Book updated successfully"}))
                    res.end();
                })
            }

        })
    }


})


server.listen(8080, (err) => {
    if (err) throw err ; else console.log('Server is running on port 8080')
})