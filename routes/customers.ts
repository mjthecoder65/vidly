import { Customer, validateCustomer } from "../models/customer";
import express, {Router, Request, Response} from 'express';
const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const customers = await Customer.find().sort({ name: 1 });
    res.send(customers)
});

router.post("/", async (req: Request, res: Response) => {
    console.log(req.body);
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    })
    const createdGenre = await customer.save();
    res.send(createdGenre)
});


router.put("/:id", async (req: Request, res: Response) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {name: req.body.name}, { new: true });
    if (!customer) return res.status(404).send("Customer with given ID was not found")

    res.send(customer);

});

router.delete("/:id", async (req: Request, res: Response) => { 
    const customer = await Customer.findByIdAndRemove(req.params.id)
    if (!customer) return res.status(404).send("Customer with given ID was not found")
    res.send(customer);
})

router.get("/:id", async (req: Request, res: Response) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send("Customer with given ID was not found!")
    res.send(customer)
});


export default router;