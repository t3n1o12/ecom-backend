import asyncHandler from "express-async-handler";
import Order from '../models/orderModel';
import moment from "moment";


const getReveunuByDay = asyncHandler(async (req, res) => {
    const today = moment().startOf('day').toDate()
    const yesterday = moment(today).endOf('day').toDate()
    Order.aggregate([
        {
            $match: {
                createdAt:
                {
                    $gte: today,
                    $lte: yesterday
                }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                totalValue: { $sum: "$totalAmount" }
            }
        }
    ],
        function (err, result) {
            if (err) {
                return res.status(400).json({ err })
            }
            if (result) {
                return res.json({ result })
            }
        });
})
const getReveunuByWeek = asyncHandler(async (req, res) => {
    const today = new Date()
    const weekAgo = moment(today).day(-7).toDate()
    Order.aggregate([
        {
            $match: {
                createdAt:
                {
                    $gte: weekAgo,
                    $lte: today
                },
                paymentStatus:"refund"
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                totalValue: { $sum: "$totalAmount" }
            }
        }
    ],
        function (err, result) {
            if (err) {
                return res.status(400).json({ err })
            }
            if (result) {
                return res.json({ result })
            }
        });
})
const getReveunuByMonth = asyncHandler(async (req, res) => {
    const today = new Date()
    const monthAgo = moment(today).day(-30).toDate()
    Order.aggregate([
        {
            $match: {
                createdAt:
                {
                    $gte: monthAgo,
                    $lte: today
                }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                totalValue: { $sum: "$totalAmount" }
            }
        }
    ],
        function (err, result) {
            if (err) {
                return res.status(400).json({ err })
            }
            if (result) {
                return res.json({ result })
            }
        });
})

export {
    getReveunuByDay,
    getReveunuByWeek,
    getReveunuByMonth
}