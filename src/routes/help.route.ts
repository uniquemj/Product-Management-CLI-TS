const HelpRoute = () =>{
    console.log(`
     --------- Welcome to Product Management CLI ----------\n
     Use following commands to perform tasks:\n
     1. Products:\n
     \t- List all Products:
     \t\tnpm run list-product\n   
     \t- Add a new Product:
     \t\tnode index.js product add --name="value" --price="value"\n   
     \t- Update a Product:
     \t\tnode index.js product update <productId> --name="val" --price="val"\n   
     \t- Delete a Product:
     \t\tnode index.js product delete <productId>\n 
     \t- Remove Category form Product:
     \t\t node index.js product remove-category <productId> --categoryId=<categoryId>
     ----------------------------------------------
     2. Cart:\n
     \t- Add product to cart:
     \t\tnode index.js cart add <productId> --quantity=<quantity> --userId=<userId>\n
     \t- Remove product from cart:
     \t\tnode index.js cart remove <productId> --userId=<userId>\n
     \t- View cart:
     \t\tnode index.js cart view --userId=<userId>\n
     \t- Calculate cart total:
     \t\tnode index.js cart total --userId=<userId>\n
     ------------------------------------------------
     3. Orders:\n
     \t- Create an order:
     \t\tnode index.js order create --userId=<userId>\n
     \t- List orders for a user:
     \t\tnode index.js order list --userId=<userId>\n
     \t- Change Status of Order:
     \t\tnode index.js order status <order_id> --status=<status> --userId=<userId>\n
     ------------------------------------------------
     4. Category:\n
     \t- Add Category:
     \t\tnode index.js category add --category=<categoryname>\n
     \t- Get all Category:
     \t\t node index.js category list\n
    \t- Remove Category:
    \t\t node index.js category remove <categoryId>\n
    `)
}

export default HelpRoute