const bcrypt = require("bcryptjs")
const Manager = require("../models/managerModel");
const Assistant = require('../models/sellerModel')
const Customer = require('../models/userModel')
const path = require("path")

exports.create_get = async (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render(path.resolve('./views/managerPage/create.ejs'), {err: error});
};

exports.create_post = async (req, res) => {
    const {firstName, lastName, email, password} = req.body

    if (!firstName && !lastName && !email && !password) {
        req.session.error = "Content empty!";
        return res.redirect('/manager');
    }

    let assistant = await Assistant.findOne({email})
    let customer = await Customer.findOne({email})
    let manager = await Manager.findOne({email})
    if (assistant || customer || manager) {
        req.session.error = "Email taken!";
        return res.redirect('/manager');
    }

    const hashPsw = await bcrypt.hash(req.body.password, 12);

    assistant = new Assistant({
        firstName,
        lastName,
        email,
        password: hashPsw
    });

    await assistant.save()
    res.redirect('/manager/read')
};

exports.read_get = async (req, res) => {
    const assistant = await Assistant.find();
    const customer = await Customer.find();
    const manager = await Manager.find();
    res.render(path.resolve('./views/managerPage/read.ejs'), {
        assistantData: assistant,
        customerData: customer,
        managerData: manager,
    })
};

exports.find_get = async (req, res) => {
    res.render(path.resolve('./views/managerPage/find.ejs'), {data: null, type: null});
};

exports.find_post = async (req, res) => {
    const {email} = req.body
    const p = path.resolve('./views/managerPage/find.ejs')

    let assistant = await Assistant.findOne({email})
    let customer = await Customer.findOne({email})
    let manager = await Manager.findOne({email})

    if (assistant) {
        res.render(p, {data: Assistant, type: 'Assistant'})
    } else if (customer) {
        res.render(p, {data: customer, type: 'Customer'})
    } else if (manager) {
        res.render(p, {data: manager, type: 'Manager'})
    } else {
        res.render(p, {data: null, type: 'orange'})
    }
};

exports.update_get = async (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render(path.resolve('./views/managerPage/update.ejs'), {err: error, oldSeller: null, newSeller: null});
};

exports.update_patch = async (req, res) => {
    const {currEmail, firstName, lastName, email, password} = req.body

    if (!currEmail && !firstName && !lastName && !email && !password) {
        req.session.error = "Content empty!";
        return res.redirect('/manager/update');
    }

    const hashPsw = await bcrypt.hash(password, 11);

    let assistant = new Assistant({
        firstName,
        lastName,
        email,
        password: hashPsw,
    });
    await Assistant.findOneAndUpdate({email: currEmail}, {
        firstName,
        lastName,
        email,
        password: hashPsw,
    }).then(data => {
        if (!data) {
            req.session.error = "Assistant to update does not exist!";
            return res.redirect('/manager/update');
        } else {
            res.render(path.resolve('./views/managerPage/update.ejs'), {err: null, oldSeller: currEmail, newSeller: assistant});
        }
    })
};

exports.delete_get = async (req, res) => {
    res.render(path.resolve('./views/managerPage/delete.ejs'), {email: null, type: null});
};

exports.delete_post = async (req, res) => {
    const {email} = req.body
    const p = path.resolve('./views/managerPage/delete.ejs')

    let assistant = await Assistant.findOne({email})
    let customer = await Customer.findOne({email})

    if (assistant) {
        await Assistant.deleteOne(assistant)
        res.render(p, {email: assistant.email, type: 'Assistant'})
    } else if (customer) {
        await Customer.deleteOne(customer)
        res.render(p, {email: customer.email, type: 'Customer'})
    } else {
        res.render(p, {email: null, type: 'None'})
    }
};