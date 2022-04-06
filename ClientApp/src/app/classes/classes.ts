export class Bidder {
    constructor() {
        this.hasPaid = false;
    }

    public name: string;
    number: number;
    hasPaid: Boolean;  
}

export class Lot {
    constructor() {
    }

    lotNumber: number;
    items: Array<string>;
    itemsCount: number;
    finalBid: number;
    buyerNumber: number;  
}

export class Checkout {
    constructor() {
        this.lots = new Array<Lot>();
        this.total = 0;
        this.totalItems = 0;
    }

    bidder: Bidder;
    lots: Array<Lot>;
    total: number;
    totalItems: number;
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

export class DialogMode {
    public static readonly add: string = "add";
    public static readonly edit: string = "edit";
    public static readonly view: string = "view"
}

export class User {
    constructor(email: string, password: string ) {
        this.email = email;
        this.password = password;
    }
    
    email: string;
    password: string;
}