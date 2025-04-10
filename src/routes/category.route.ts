import { CategoryController } from "../controller/category.controllers.js"
import { IHash } from "../types/hash.type.js"


const categoryController = CategoryController.initController()

const CategoryRoute = (cmd_args: IHash) =>{
    switch(cmd_args.cmd[1]){
        case "add":
            categoryController.addCategory(cmd_args)
            break
        case "list":
            categoryController.getCategoryList()
            break
        case "remove":
            categoryController.removeCategory(cmd_args)
            break
        default:
            console.log(`Command doesn't exist for: ${cmd_args.cmd[0]} ${cmd_args.cmd[1]}`)
    }
}

export default CategoryRoute