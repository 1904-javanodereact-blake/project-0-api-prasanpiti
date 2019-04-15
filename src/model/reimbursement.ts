export class Reimbursement {
    reimbursementId: number;
    author: number;
    amount: number;
    dateSubmitted: Date;
    dateResolved: Date;
    description: string;
    resolver: number;
    status: number;
    type: number;
    constructor(reimbursementId = 0, author = 0, amount = 0, dateSubmitted = new Date(1970, 0, 1), dateResolved = null, description = '', resovlver = null, status = 0, type = null){
        this.reimbursementId = reimbursementId;
        this.author = author;
        this.amount = amount;
        this.dateSubmitted = dateSubmitted;
        this.dateResolved = dateResolved;
        this.description = description;
        this.resolver = resovlver;
        this.status = status;
        this.type = type;
    }
}