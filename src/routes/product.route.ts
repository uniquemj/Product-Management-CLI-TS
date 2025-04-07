import ProductController from "../controller/product.controllers"
import { IHash } from "../types/hash.type.js"

const ProductRoute = async (cmd_arguments:IHash) =>{
    switch(cmd_arguments.cmd[1]){
        case 'list':
            await ProductController.getAllProducts()
            break
        case 'add':
            await ProductController.createProduct(cmd_arguments)
            break
        case 'update':
            await ProductController.updateProduct(cmd_arguments)
            break
        case 'delete':
            await ProductController.removeProduct(cmd_arguments.cmd[2])
            break
        default:
            console.log(`Command doesn't exist for: ${cmd_arguments.cmd[0]} ${cmd_arguments.cmd[1]}`)
    }
}

export default ProductRoute 