import {ProductController} from "../controller/product.controllers"
import { IHash } from "../types/hash.type.js"


const productController = ProductController.initController()

const ProductRoute = async (cmd_arguments:IHash) =>{
    switch(cmd_arguments.cmd[1]){
        case 'list':
            await productController.getAllProducts()
            break
        case 'add':
            await productController.createProduct(cmd_arguments)
            break
        case 'update':
            await productController.updateProduct(cmd_arguments)
            break
        case 'delete':
            await productController.removeProduct(cmd_arguments.cmd[2])
            break
        case 'remove-category':
            await productController.removeProductCategory(cmd_arguments)
            break
        default:
            console.log(`Command doesn't exist for: ${cmd_arguments.cmd[0]} ${cmd_arguments.cmd[1]}`)
    }
}

export default ProductRoute 