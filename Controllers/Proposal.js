import proposalModel from '../Models/Proposal.js';

export const insert = async (req, res, next) => {
    try {
        const { title, subTitle, href, mode } = req.body
        const { filename: img = '' } = req.file;
        const proposal = await proposalModel.create({ title, subTitle, img, href, mode });
        if (proposal) {
            res.status(201).json(proposal);
        }
    } catch (error) {
        next(error)
    }
}

export const get = async (req, res, next) => {
    try {
        let proposals = await proposalModel.find({}).lean();
        let copyProposal = [...proposals];
        if (proposals) {
            const finalResult = [];
            while (copyProposal.length > 0) {
                finalResult.push(copyProposal.slice(0, 2));
                copyProposal = copyProposal.slice(2);
            }
            res.status(200).json(finalResult);
        }
    } catch (error) {
        next(error)
    }
}

