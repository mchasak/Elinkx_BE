import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 5000;

let customers = [
  {id: 1, name: 'John Doe', email: 'john@gmail.com'},
  {id: 2, name: 'Jane Smith', email: 'jane@gmail.com'}
]

app.use(bodyParser.json());
app.use(cors());

app.get('/customers', (req, res) => {
  res.json(customers)
})

app.post('/customers', (req, res) => {
  const { name, email } = req.body;
  const id = customers.length + 1;
  const newCustomer = { id, name, email };
  customers.push(newCustomer);
  res.status(201).json(newCustomer);
})

app.put('/customers/:id', (req, res) => {
  const id = parseInt(req.params.id);
    const { name, email } = req.body;
    customers = customers.map(customer => {
        if (customer.id === id) {
            customer.name = name;
            customer.email = email;
        }
        return customer;
    });
    res.json(customers.find(customer => customer.id === id));
})

app.delete('/customers/:id', (req, res ) => {
  const id = parseInt(req.params.id);
  customers = customers.filter(customer => customer.id !== id)
  res.sendStatus(204);
})

app.listen(PORT, () => {
  console.log(`Server is runnign on port ${PORT}`);
})