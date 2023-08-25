const { ObjectId } = require("mongodb")
const jwt = require('jsonwebtoken')
const { JWT_SIGN } = require('../config/jwt.js')

const date = new Date();
const current_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
const current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
const date_time = current_date + " " + current_time;

const getAllTransfer = async (req, res) => {
    try {
        const transferList = await req.db.collection('transfers').find().toArray()

        res.status(200).json({
            message: "Transfer successfully retrieved",
            data: transferList
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const createTransfer = async (req, res) => {
    const { amount, currency, sourceAccount, destinationAccount } = req.body

    try {
        const newTransfer = await req.db.collection('transfers').insertOne({
            amount, currency, sourceAccount, destinationAccount,
            status: 'pending', createdAt: date_time, updateAt: date_time
        })

        res.status(200).json({
            message: "Transfer successfully created",
            data: newTransfer
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateTransfer = async (req, res) => {
    const { id } = req.params
    const { status } = req.body

    const authHeader = req.headers.authorization

    try {
        const token = authHeader.split(' ')[1]
        const decodedToken = jwt.verify(token, JWT_SIGN)
        if (decodedToken.role !== 'approver') {
            res.status(403).json({ message: 'Only approvers can approve transfers.' })
        } else {
            const updatedTransfer = await req.db.collection('transfers').updateOne({ _id: new ObjectId(id) }, {
                $set: { status, updateAt: date_time }
            })

            res.status(200).json({
                message: "Transfer successfully updated",
                data: updatedTransfer
            })
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllTransfer,
    createTransfer,
    updateTransfer
}
