namespace PRA;

context T {
    @cds.persistence.exists
    @cds.persistence.calcview
    entity CSJ {
        key CUSID : String(10)  @title: 'CUSID: Customer ID';
            CNAME : String(100) @title: 'CNAME: Customer Name - full name of the Customer';
            CNTRY : String(50)  @title: 'CNTRY: COUNTRY Name';
            CUSTP : String(20)  @title: 'CUSTP: B2B / B2C';
            ORDID : Integer64   @title: 'ORDID: Primary key - unique incident identifier';
            PROID : String(10)  @title: 'PROID: Foreign key of the PRODUCTS table';
            QANTY : Integer     @title: 'QANTY: Quantity ordered';
            ODATE : Date        @title: 'ODATE: Date of the order';
    }
    
}
