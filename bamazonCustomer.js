var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // log connection threadiD
    console.log("connected as id " + connection.threadId);
});

connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log(res);
    // first question
    inquirer.prompt([
        {
            type: 'input',
            name: 'q1',
            message: 'what is the id of what you want to buy?'
        },
        {
            type: 'input',
            name: 'q2',
            message: 'how many would you like to buy? '
        }
    ]).then(function (answer) {
        for (var i = 0; i < res.length; i++) {
            if (res[i].item_id == answer.q1) {
                if (res[i].stock_quantity >= answer.q2) {
                    var product = res[i].product_name;
                    var newStockQuantity = res[i].stock_quantity - answer.q2
                    var price = res[i].price
                    connection.query("UPDATE products SET ? WHERE ? ", [{ stock_quantity: newStockQuantity }, { item_id: answer.q1 }],
                        function (err, res) {
                            if (err) throw err;
                            console.log(`You just purchased ${answer.q2} ${product}.We charged your card $${price * answer.q2}`);
                            connection.end()
                        });
                } else {
                    console.log('there is not enough fullfill the order');
                    connection.end()
                }
            }
        }
    })
});