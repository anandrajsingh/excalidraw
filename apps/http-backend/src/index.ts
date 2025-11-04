import Express from "express";
import jwt from "jsonwebtoken"

const app = Express()

app.post('/signup', (req, res) => {

})

app.post("/signin", (req, res) => {
    
})

app.listen(3000, () => console.log("App listening on port 3000"))