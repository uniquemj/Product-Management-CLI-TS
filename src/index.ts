import ProductRoute from './routes/product.route'
import CartRoute from './routes/cart.route'
import OrderRoute from './routes/order.route'
import HelpRoute from './routes/help.route'
import CategoryRoute from './routes/category.route'
import { parseArgs } from './helper/utils'

const Command_Arguments = parseArgs(process.argv.slice(2))

switch(Command_Arguments.cmd[0]){
    case 'help':
        HelpRoute()
        break
    case 'product':
        ProductRoute(Command_Arguments)
        break
    case 'cart':
        CartRoute(Command_Arguments)
        break
    case 'order':
        OrderRoute(Command_Arguments)
        break
    case 'category':
        CategoryRoute(Command_Arguments)
        break
    default:
        console.log(`${Command_Arguments.cmd[0]} command doesn't exist.`)
}