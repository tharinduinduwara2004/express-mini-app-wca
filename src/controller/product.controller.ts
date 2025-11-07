import { ProductService } from "../service/product.service";
import { ICreateProduct } from "../dto/product/createProduct.dto";
import { Request, Response } from "express";
import { IUpdateProduct } from "../dto/product/updateProduct.dto";
import { ProductType } from "../model/product.model";

export class ProductController{
    private productService: ProductService;
    constructor(){
        this.productService = ProductService.getInstance();
    }

    createProduct = async (req: Request, res: Response) => {
        const product = req.body as ICreateProduct;
        if(!product.name || !product.description || !product.price || !product.type){
            res.status(400).json({message: 'Name, description, price and type are required'});
            return;
        }
        try{
            const createProduct = await this.productService.createProduct(product);
            res.status(201).json(createProduct);
        }catch(error:any){
            res.status(500).json({message: 'Internal server error'})
        }
    }

    updateProduct = async (req: Request, res: Response) => {
        const product = req.body as IUpdateProduct;
        try{
            const updateProduct = await this.productService.updateProduct(req.params.id, product);
            res.status(200).json(updateProduct);
        }catch(error:any){
            res.status(500).json({message: 'Internal server error'});
        }
    }

    deleteProduct = async (req: Request, res: Response) => {
        try{
            const deleteProduct = await this.productService.deleteProduct(req.params.id);
            res.status(200).json(deleteProduct);
        }catch(error:any){
            res.status(500).json({message: 'Internal server error'})
        }
    }

    getProductById = async (req: Request, res: Response) => {
        try{
            const product = await this.productService.getProductById(req.params.id);
            res.status(200).json(product);
        }catch(error:any){
            res.status(500).json({message: 'Internal server error'});
        }
    }

    getProducts = async (req: Request, res: Response) => {
        try{
            const name = req.query.name as string;
            const type = req.query.type as ProductType;
            const price = parseFloat(req.query.price as string);
            const start = parseInt(req?.query?.start as string) || 0;
            const limit = parseInt(req?.query?.limit as string) || 10;
            const products = await this.productService.getProducts({name, type, price, start, limit});
            res.status(200).json(products);
        }catch(error:any){
            res.status(500).json({message: 'Internal server error'});
        }
    }
}