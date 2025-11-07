namespace INJ;

context T {
    @cds.persistence.exists
    @cds.persistence.calcview
    entity TEST {
        key ORDID : Integer64   @title: 'ORDID: Primary key - unique incident identifier';
            CUSID : String(10)  @title: 'CUSID: Foreign key of the CUSTOMERS table';
            PROID : String(10)  @title: 'PROID: Foreign key of the PRODUCTS table';
            QANTY : Integer     @title: 'QANTY: Quantity ordered';
            ODATE : Date        @title: 'ODATE: Date of the order';
            CNAME : String(100) @title: 'CNAME: CNAME';
            CNTRY : String(50)  @title: 'CNTRY: CNTRY';
            CUSTP : String(20)  @title: 'CUSTP: CUSTP';
    }
}
