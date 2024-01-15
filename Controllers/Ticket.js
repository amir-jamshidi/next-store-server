import ticketModel from '../Models/Ticket.js'
import ticketSectionModel from '../Models/TicketSection.js'
import converToPersian from '../Utils/PersianDate.js';

export const insert = async (req, res, next) => {
    try {
        const { title, body, orderID, ticketSectionID } = req.body;
        const code = 'TKT' + Date.now();
        const ticket = await ticketModel.create({ title, body, orderID, ticketSectionID, userID: req.user._id, code })
        if (ticket) {
            res.status(201).json(ticket);
        }
    } catch (error) {
        next(error);
    }
}

export const get = async (req, res, next) => {
    try {
        const tickets = await ticketModel.find({ userID: req.user._id }).populate('ticketSectionID').populate('orderID').lean();
        tickets.forEach(ticket => {
            ticket.createdAt = converToPersian(ticket.createdAt);
        })
        if (tickets) {
            res.status(200).json(tickets);
        }
    } catch (error) {
        next(error);
    }
}

export const getOne = async (req, res, next) => {
    try {
        const { ticketID } = req.params;
        const ticket = await ticketModel.findOne({ _id: ticketID, userID: req.user._id }).populate('orderID').populate('ticketSectionID').lean();
        ticket.createdAt = converToPersian(ticket.createdAt);
        if (ticket) {
            res.status(200).json(ticket);
        }
    } catch (error) {
        next(error);
    }

}

export const getTicketSections = async (req, res, next) => {
    try {
        const sections = await ticketSectionModel.find({}).lean();
        res.status(200).json(sections);
    } catch (error) {
        next(error);
    }


}