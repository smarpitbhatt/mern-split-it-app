const Transaction = require('../models/transaction.model');
const User = require('../models/user.model');
const router = require('express').Router();

/**
 * GET: Debt Transactions
 */
router.get('/debtTransactions/:id', (req, res)=>{

    Transaction.find({reciever: req.params.id})
    .then(transactions =>{
        res.send({
            transactions: transactions
        });
    })
    .catch(err=> console.log(err));

});

/**
 * GET: Lent Transactions
 */
router.get('/lentTransactions/:id', (req, res)=>{

    Transaction.find({sender: req.params.id})
    .then(transactions => {
        res.send({
            transactions: transactions
        })
    })
    .catch(err =>res.status(400).send({message: err}));

});

/**
 * POST: Add Sent Transaction
 */
router.post('/send/:id', (req, res)=>{
    /**
        * body: contact, description, amount
        * params: loggedin userid    
    */    
    User.findOne({contact: req.body.contact})
    .then(user=>{
        
        if(!user){
            res.send({error:false, success: false, message: 'Contact provided is incorrect'});
        }        
        var tempTransaction = new Transaction({sender: req.params.id, reciever: user._id, description:req.body.description, amount: req.body.amount});        
        return tempTransaction.save();

    })
    .then(transaction=>{ 
        console.log(transaction);
        res.send({transaction: transaction, success: true });
    })
    .catch(err=> res.send({success: false, error: true, message: err}));

});

/**
 * POST: Add Recieve Transaction
 */
router.post('/recieve/:id', (req, res)=>{
    /**
        * body: contact, description, amount
        * params: loggedin userid    
    */        
    User.findOne({contact: req.body.contact})
    .then(user=>{
        
        if(!user){
            return res.send({error:false, success: false, message: 'Contact provided is incorrect'});
        }        
        var tempTransaction = new Transaction({sender: user._id, reciever: req.params.id, description:req.body.description, amount: req.body.amount});
        return tempTransaction.save();
        
    })
    .then(transaction=>{ 
        console.log(transaction);  
        res.send({success: true, transaction: transaction});
    })
    .catch(err=>res.send({error: true, success: false, message: err}));

});

/**
 * DELETE Transaction
 */

router.delete('/:id', (req, res)=>{
    
    Transaction.findByIdAndDelete(req.params.id)
    .then(()=> res.send({message: 'Exercise Deleted', success: true}))
    .catch(err=> res.status(400).send({message: err, success: false}));

});

module.exports = router;
