var inquirer = require('inquirer')
var mysql = require('mysql')
var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "bamazon_db"
    })
connection.connect(function (err) {
    if (err) throw
    err;
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
            message: 'how many would you like to buy ? '
        }
    ]).then(function (answer) {
        for (var i = 0; i < res.length; i++) {
            if (res[i].item_id == answer.q1) {
                if (res[i].stock_quanity
                    >= answer.q2) {
                    var newStockQuanity = res[i].stock_quanity - answer.q2
                    var price = res[i].price
                    var car = res[i].name
                    connection.query("UPDATE products SET ? WHERE ? ", [{ stock_quanity: newStockQuanity }, { item_id: answer.q1 }],
                        function (err, res) {
                            if (err) throw
                            err;
                            console.log(`You just purchased ${answer.q2} ${car}.We charged your card ${price * answer.q2}`);
                            connection.end()
                        })
                } else {
                    console.log('there is not enough fullfill the order');
                    connection.end()
                }
            }
        }
    })
});