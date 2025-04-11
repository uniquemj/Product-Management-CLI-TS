import { IHash } from "../types/hash.type";
import { customAlphabet } from "nanoid";
import fs from 'fs/promises'

export class HelperUtils{
    static parseArgs = (argv: any):IHash =>{
        return argv.reduce((hash: IHash, entry:any)=>{
        const [option, value = true] = entry.split("=");
        const key: string = option.startsWith('--') ? option.slice(2): '_';

        if(key == '_'){
            hash.cmd.push(option)
        }else{
            hash[key] = value
        }
            return hash
        }, {cmd: []})
    }

    static readFileHelper = async(filePath:string) =>{
        const products = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(products)
    }

    static writeFileHelper = async(filePath: string, content: unknown) =>{
        await fs.writeFile(filePath, JSON.stringify(content))
    }

    static getRandomId = () =>{
        const alphabet = '0123456789'
        const nanoid = customAlphabet(alphabet, 4)
        return nanoid()
    }

    static capitalizeFirst = (val: string) =>{
        return val.at(0)?.toUpperCase().slice(1)
    }
}