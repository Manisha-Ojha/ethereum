const express = require("express");
const router = express.Router();
const Web3 = require("web3");

const Transaction = require('../Modules/model');
const web3 = new Web3("https://ropsten.infura.io/v3/39e306ff83574b6e968eed96b9dba615");


router.get("/userTransaction", (req, res) => {
    Transaction.find().exec((err, result) => {
        if (err) {
            res.json(err);
        }
        res.json(result);
    });
});

router.get("/userTransaction/:transactionId", (req, res) => {
    Transaction.findById(req.params.transactionId).exec((err, transaction) => {
        if (err) {
            res.json(err);
        }
        if (transaction != null) {
            res.json(transaction);
        }
    });
});

router.post("/userTransaction", (req, res) => {
    web3.eth.getTransaction("0x1eb26359abd9001b2a02fe84559c7e35c758e7251c0fd2ff96eb20e01ba87f68")
        .then(transaction => {
            const newTransaction = new Transaction({
                
                transactionId : req.body.transactionId,
                sendAddress : req.body.sendAddress,
                receiveAddress : req.body.receiveAddress,
                amount : req.body.amount
            });

            newTransaction.save();

            res.json(newTransaction);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get("/userTransaction/:userId/receiveAddressBalance", (req, res) => {
    Transaction.findById(req.params.userId).exec((err, transaction) => {
        if (err) {
            res.json(err);
        }
        if (transaction != null) {
            web3.eth.getBalance(transaction.receiveAddress)
                .then(result => {
                    res.json(result);
                })
                .catch(err => {
                    res.json(err);
                });
        }
    });
});

router.get("/userTransaction/:userId/sendAddressBalance", (req, res) => {
    Transaction.findById(req.params.userId).exec((err, transaction) => {
        if (err) {
            res.json(err);
        }
        if (transaction != null) {
            web3.eth.getBalance(transaction.sendAddress)
                .then(result => {
                    res.json(result);
                })
                .catch(err => {
                    res.json(err);
                });
        }
    });
});

module.exports = router;