import asyncHandler from "express-async-handler";
import Customer from "../models/customerModel";

//Get customer
const getCustomer = asyncHandler(async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

//get customer by ID
const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (customer) {
    res.json(customer);
  } else {
    res.status(404).json({ message: "Customer not found" });
  }

  // res.json(customer);
});

//create Customer
const createCustomer = asyncHandler(async (req, res) => {
  const {
    accepts_marketing,
    first_name,
    last_name,
    email,
    phone,
    verified_email,
    addresses,
  } = req.body;
  if (
    !accepts_marketing ||
    !first_name ||
    !last_name ||
    !email ||
    !phone ||
    !verified_email
  ) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const customer = new Customer({
      accepts_marketing,
      first_name,
      last_name,
      email,
      phone,
      verified_email,
      addresses,
    });

    const createdCustomer = await customer.save();

    res.status(201).json(createdCustomer);
  }
});

//delete Customer
const DeleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (customer) {
    await customer.remove();
    res.json({ message: "Customer Removed" });
  } else {
    res.status(404);
    throw new Error("Customer not Found");
  }
});

// Update Customer
const UpdateCustomer = asyncHandler(async (req, res) => {
  const {
    accepts_marketing,
    first_name,
    last_name,
    email,
    phone,
    verified_email,
    addresses,
  } = req.body;

  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (customer) {
    customer.accepts_marketing = accepts_marketing;
    customer.first_name = first_name;
    customer.last_name = last_name;
    customer.email = email;
    customer.phone = phone;
    customer.verified_email = verified_email;
    customer.addresses = addresses;

    const updateCustomer = await customer.save();
    res.json(updateCustomer);
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

//Search customer
const SearchCustomer = asyncHandler(async (req, res) => {
  if (isNaN(req.body.search)) {
    //not number
    const regex = new RegExp(req.body.search, "i");
    const customer = await Customer.find({
      $or: [
        {
          first_name: regex,
        },
        {
          last_name: regex,
        },
        {
          addresses: regex,
        },
      ],
      userCreate: req.body.userCreate,
    });
    if (customer === []) {
      res.status(403).send({
        message: "nothing to show",
      });
    } else {
      res.status(200).send(customer);
    }
  } else {
    res.status(403).send({
      message: "you cant not search number",
    });
  }
});
// CUSTOMER ADRESS
//Get Customer Address
const getCustomerAddress = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  const { addresses } = customer;
  if (customer) {
    res.json(addresses);
  } else {
    res.status(404).json({ message: "Customer not found" });
  }
});

//create Customer address
const createCustomerAddress = asyncHandler(async (req, res) => {
  const { addresses1, city, province, zip, country_name } = req.body;
  const customer = await Customer.findById(req.params.id);
  const { addresses } = customer;

  if (!addresses1 || !city || !province || !zip || !country_name) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
  } else {
    addresses.push({
      addresses1: `${addresses1}`,
      city: `${city}`,
      province: `${province}`,
      zip: `${zip}`,
      country_name: `${country_name}`,
    });

    const createdCustomer = await customer.save();

    res.status(201).json(createdCustomer);
  }
});

//Get Customer Address by ID

const getCustomerAddressByID = asyncHandler(async (req, res) => {
  const customer = await Customer.findById({ _id: req.params.id });
  const { addresses } = customer;
  if (customer) {
    for (let i = 0; i < addresses.length; i++) {
      if (addresses[i]._id.toString() == req.params.idAdd) {
        return res.json(addresses);
      }
    }
    res.status(404).json({ message: " Address not found" });
  } else {
    res.status(404).json({ message: "Customer Address not found" });
  }
});

// Update Customer Adress by ID
const updateCustomerAddressByID = asyncHandler(async (req, res) => {
  const { addresses1, city, province, zip, country_name } = req.body;
  const customer = await Customer.findById({ _id: req.params.id });
  const { addresses } = customer;
  if (customer) {
    for (let i = 0; i < addresses.length; i++) {
      if (addresses[i]._id.toString() == req.params.idAdd) {
        addresses[i].addresses1 = addresses1;
        addresses[i].city = city;
        addresses[i].province = province;
        addresses[i].zip = zip;
        addresses[i].country_name = country_name;

        const updateaddCustomer = await customer.save();
        res.json(updateaddCustomer);
      }
    }
  } else {
    res.status(404).json({ message: "Address not update" });
  }
});
//Delete Customer Address
const DeleteCustomerAddress = asyncHandler(async (req, res) => {

  const customer = await Customer.findById({ _id: req.params.id });
  const { addresses } = customer;
  if (customer) {
    for (let i = 0; i < addresses.length; i++) {
      if (addresses[i]._id.toString() == req.params.idAdd) {
        await addresses[i].remove();
        const updateCustomer = await customer.save();
        res.json({ message: "Customer Removed" });
        return;
      }
    }
    res.status(404);
    throw new Error("Customer not Found");
  } else {

    res.status(401);
    throw new Error("You can't perform this action");
  }

});

export {
  getCustomerById,
  getCustomer,
  createCustomer,
  DeleteCustomer,
  UpdateCustomer,
  SearchCustomer,
  getCustomerAddress,
  getCustomerAddressByID,
  updateCustomerAddressByID,
  createCustomerAddress,
  DeleteCustomerAddress
};
