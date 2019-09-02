const express = require("express")
const app = express()
const request = require("request")
const path = require("path")
const port = 8080


app.use(express.static(path.join(__dirname, `../dist`)))
app.use(express.static(path.join(__dirname, `../node_modules`)))

app.get("/sanity", function (req, res) {
    console.log("running")
    res.send("hi")
})

app.get("/recipes/:ingredient", function (req, res) {
    let ingredient = req.params.ingredient
    let info = {}
    let specs = []
    request(`https://recipes-goodness.herokuapp.com/recipes/${ingredient}`, function (err, res, data) {
        info = JSON.parse(data)
        info.results.forEach(x => {
            let temp = {
                ingredient: x.ingredients,
                title: x.title,
                thumbnail: x.thumbnail,
                href: x.href
            }
            specs.push(temp)
        })

    })

    res.send(specs)

})
// console.log(title)
debugger

app.listen(port, function () {
    console.log(`listening on port ${port}`)
})