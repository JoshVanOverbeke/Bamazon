var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "Your Host",
 
    //port name
    port: //your port # ,
 
    //username:
    user: "your-user",
 
    //Your password:
    password: "your-password",
    database: "bamazon_db"
 
});

 
connection.connect(function(err) {
    if (err) throw (err)
    connection.query("SELECT * FROM products", function (err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log("Bamazon Product List");
      for (var i = 0; i<res.length; i++){
        console.log("\nID: "+res[i].item_id+", Product Name: "+res[i].product_name+", Price: $"+res[i].price)
      }
      console.log("\n");
    });
    start(); 
});


function start() {
  connection.query("SELECT * FROM products", function (err, res) {
    inquirer
      .prompt([
      {
        name: "inputID",
        type: "input",
        message: "Please type in the ID number of the product you wish to purchase and then hit the [ENTER] key"
      },
      {
        name: "amount",
        type: "input",
        message: "Please input the amount you wish to buy and hit [ENTER]"
      }
    
    ])
      .then(function (answer) {
        // based on their answer, either call the bid or the post functions
        var chosenProduct = false;
        for (var i = 0; i<res.length; i++){
          if (parseInt(answer.inputID) === parseInt(res[i].item_id)) {
            chosenProduct = res[i];
          }
        }
        if(!chosenProduct){
          console.log("That ID is not a valid ID...");
          start();
        }
        else{
          if(parseFloat(chosenProduct.stock_quantity) >= parseFloat(answer.amount)){
          checkout(answer.amount, chosenProduct)   
          }
          else{
            console.log("Insufficient quantity! Please try a lower amount.")
            start();
          }

        };

    });
  });
};

function checkout(quantity, product){
  payment = parseInt(quantity) * parseFloat(product.price);
  newQuantity = parseInt(product.stock_quantity) - parseInt(quantity)
  inquirer.
    prompt({
      name: "confirmPay",
      type: "confirm",
      message: "Your total is: $"+payment+"\nDo you confirm this payment?"
    })
    .then(function(answer) {
      if(answer.confirmPay){
        console.log("Thank you for your purchase!")
        connection.query(
          "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newQuantity
          },
          {
            item_id: product.item_id
          }
        ],
        );
        connection.end();  
      }
      else{
        console.log("Too bad, maybe next time?")
        connection.end();
      }

  });
}
