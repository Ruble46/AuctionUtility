export class Bidder {
    constructor() {
        this.hasPaid = false;
    }

    public name: string;
    number: number;
    hasPaid: Boolean;
    auctionYear: number;
}

export class Lot {
    constructor() {
        this.items = new Array<string>();
    }

    lotNumber: number;
    items: Array<string>;
    finalBid: number;
    buyerNumber: number;
    auctionYear: number;
}

export class Donation {
    constructor() {

    }

    id: string;
    amount: number;
    auctionYear: number;
}

export class Preference {
    constructor() {
        this.selectedYear = 0;
    }

    id: number;
    selectedYear: number;
}

export class Checkout {
    constructor() {
        this.lots = new Array<Lot>();
        this.total = 0;
    }

    bidder: Bidder;
    lots: Array<Lot>;
    total: number;
    totalItems: number;
    viewOnly: boolean;
}

export class LotDialogData {
    constructor(mode: DialogMode, data: Lot) {
        this.mode = mode;
        this.data = data;
    }

    mode: DialogMode;
    data: Lot;
}

export class BidderDialogData {
    constructor(mode: DialogMode, data: Bidder) {
        this.mode = mode;
        this.data = data;
    }

    mode: DialogMode;
    data: Bidder;
}

export class DonationsDialogData {
    constructor(mode: DialogMode, data: Donation) {
        this.mode = mode;
        this.data = data;
    }

    mode: DialogMode;
    data: Donation;
}

export class DialogMode {
    public static readonly add: string = "add";
    public static readonly edit: string = "edit";
}

export class User {
    constructor(email: string, password: string ) {
        this.email = email;
        this.password = password;
    }
    
    email: string;
    password: string;
}