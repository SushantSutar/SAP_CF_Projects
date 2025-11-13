namespace INC;

context M {
    @cds.persistence.exists
    @cds.persistence.calcview
    entity EMP {
        key E__ID : Integer64   @title: 'E__ID: Primary key - unique employee identifier';
            EMPID : String(20)  @title: 'EMPID: case identifier all cases';
            FNAME : String(100) @title: 'FNAME: First name';
            LNAME : String(100) @title: 'LNAME: Last name';
            PHON1 : String(50)  @title: 'PHON1: Primary phone';
            PHON2 : String(50)  @title: 'PHON2: Alternate phone';
            EMAIL : String(100) @title: 'EMAIL: Primary email address';
            AEMAL : String(100) @title: 'AEMAL: Alternate email address';
            GNDR  : String(1)   @title: 'GNDR: Gender (M/F/O)';
            DOB   : Date        @title: 'DOB: Date of birth';
            AGE   : Integer     @title: 'AGE: Employee age';
            SAPAD : String(255) @title: 'SAPAD: SAP address';
            ACTAD : String(255) @title: 'ACTAD: Actual address';
            PROV  : String(100) @title: 'PROV: Province';
            CITY  : String(100) @title: 'CITY: City';
            POSTC : String(20)  @title: 'POSTC: Postal code';
            SIN   : String(50)  @title: 'SIN: Social Insurance Number';
            SAMES : String(1)   @title: 'SAMES: Same as SAP address flag (Y/N)';
            ASSOCIATIONEMP : Association to many CASES on ASSOCIATIONEMP.EMPID = EMPID;
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity CASES {
            C__ID : Integer64   @title: 'C__ID: Primary key - unique case identifier';
        key CASEI : String(100) @title: 'CASEI: case identifier all cases';
        key EMPID : String(20)  @title: 'EMPID: Foreign key - references EMPLOYEE_INFO(EMPID)';
        key ASEHS : String(100) @title: 'ASEHS: Assigned to EHS representative';
        key BTYPE : String(50)  @title: 'BTYPE: Benefit type';
        key CDSTS : String(50)  @title: 'CDSTS: Claim decision status';
        key FRTWD : Date        @title: 'FRTWD: Forecasted return to work date';
        key APDTD : Date        @title: 'APDTD: Approved to date';
        key DISDT : Date        @title: 'DISDT: Date of disability';
        key LSTWK : Date        @title: 'LSTWK: Last date worked';
        key WKSTS : String(50)  @title: 'WKSTS: Work status';
        key CSTS  : String(50)  @title: 'CSTS: Case status';
        key BCSRT : Date        @title: 'BCSRT: Benefit claim start date';
        key BCEND : Date        @title: 'BCEND: Benefit claim end date';
        key LOSRV : String(50)  @title: 'LOSRV: Length of service';
        key LNKFL : String(255) @title: 'LNKFL: Link to file or document';
        ASSOCIATIONCASE : Association to many ATTACH on ASSOCIATIONCASE.CASEI = CASEI;
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity MEDI {
            RECID : Integer64   @title: 'RECID: Primary key - unique medical record ID';
        key EMPID : String(20)  @title: 'EMPID: Foreign key - references EMPLOYEE_INFO(EMPID)';
        key MRTYP : String(100) @title: 'MRTYP: Medical record type';
        key FLNAM : String(255) @title: 'FLNAM: File name';
        key MRDAT : Date        @title: 'MRDAT: Medical record date';
        key RCVDT : Date        @title: 'RCVDT: Date received';
        key NOTES : LargeString @title: 'NOTES: Assigner or reviewer notes';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity ATTACH {
            ATTID : Integer64   @title: 'ATTID: Primary key - unique attachment ID';
        key EMPID : String(20)  @title: 'EMPID: Foreign key - references EMPLOYEE_INFO(EMPID)';
        key CASEI : String(20)  @title: 'CASEI: Optional foreign key - references CASE_MANAGEMENT(CASEI)';
        key FLNAM : String(255) @title: 'FLNAM: File name of attachment';
        key FLTYP : String(50)  @title: 'FLTYP: File type (PDF, DOC, etc.)';
        key UPDDT : Date        @title: 'UPDDT: Upload date';
        key FLPTH : String(255) @title: 'FLPTH: File storage path';
    }    
}

