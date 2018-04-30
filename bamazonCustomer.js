var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt([
            {
                name: "product",
                type: "input",
                message: "What is the ID of the product you would like to buy?"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units would you like to buy?"
            }
        ])
        .then(function (answer) {
            // based on their answer, 
            if (answer.product === "POST") {
                postAuction();
            }
            else {
                bidAuction();
            }
        });
}