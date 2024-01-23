import { productService } from '../services/products.service.js';
import { cartService } from '../services/cart.services.js';
import loguer from '../winston.js';

const getAll = async(req,res) =>{
    try {
        const carts = await cartService.findAll();
        if(!carts.length){
            return res.status(400).send({message: "Carts not found"})
        }
        return res.status(200).json({ message: "Carts", carts})
    } catch (error) {
        res.status(500).json({error})
    }
}

const getById = async(req,res) =>{
    const {cid} = req.params;
    try {
        const cart = await cartService.findOne(cid);
        if (!cart) {
            return res.status(404).send({ message: "Cart not found" });
        }
        return res.status(200).json({ message: "Cart", cart });
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving cart", error: error.message });
    }
}

const create = async(req,res) =>{
    try {
        const newCart = await cartService.createOne(req.body)
        return res.status(200).send({ message: "New cart created", newCart });
    } catch (error) {
        res.status(500).json({error})
    }
}

const updateById = async(req,res) =>{
    const cid = req.params.cid;
    const {products} = req.body;
    try {
        const updatedCart = await cartService.updateOne(cid, products);
        return res.status(200).json({ message: "Cart updated successfully", cart: updatedCart });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteById = async(req,res) =>{
    const {cid} = req.params;
    try {
        const response = await cartService.deleteOne(cid)
        if(!response){
            return  res.status(404).send({message: "Cart not found"});
        }
        return res.status(200).json({ message: "Cart deleted successfully", response})
    } catch (error) {
        res.status(500).json({error})
    }
}

const addProdToCart = async(req,res) =>{
    const {cid, pid} = req.params;
    if(!cid || !pid){
        return res.status(400).send("Missing parameters");
    }
    try {
        const emailUser = res.locals.user.email;
        const product = await productService.findById(pid)
        if(product.owner === emailUser){
            return res.status(403).send("You can't buy your own product")
        }
        const response = await cartService.addProduct(cid, pid);
        return res.status(200).json({message: "Product added successfully", response})
    } catch (error) {
        return error
    }
}

// Actualiza cantidad de un producto dentro de un carrito
const updProdToCart = async(req,res) =>{
    const {cid, pid} = req.params;
    const {quantity} = req.body;
    try {
        const updatedCart = await cartService.updateQuantity(cid, pid, quantity);
        return res.status(200).json({ message: "Product quantity updated successfully", cart: updatedCart });
    } catch (error) {
        return  res.status(500),send({error})
    }
}

const delProdToCart = async(req,res) =>{
    const {cid, pid} = req.params;
    try {
        const response = await cartService.delProduct(cid, pid)
        return res.status(200).send({ message: "Product deleted successfully"})
    } catch (error) {
        return  res.status(500),send({error})
    }
}

const purchase = async (req, res) => {
    const { cid } = req.params;
    try {
        const result = await cartService.purchaseCart(cid, res.locals.user.email);
        if (result.success) {
            return res.status(200).redirect(`/purchase-detail/${result.ticket._id}`);
        } else {
            return res.status(result.statusCode).json({ message: result.message, product: result.product });
        }
    } catch (error) {
        loguer.error("An error occurred:", error);
        return res.status(500).json({ message: "An error occurred while processing the purchase" });
    }
}
export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
    addProdToCart,
    updProdToCart,
    delProdToCart,
    purchase,
}