namespace INC;

context M {
    @cds.persistence.exists
    @cds.persistence.calcview
    entity INJ {
        key EMPID : String(40)  @title: 'EMPID: Employee ID - references employee master record';
            EMPNM : String(100) @title: 'EMPNM: Employee Name - full name of the employee';
            SUPVR : String(100) @title: 'SUPVR: Supervisor Name - direct supervisor of the employee';
            TPHNE : String(20)  @title: 'TPHNE: Phone Number - contact number of the employee';
            CLSSF : String(100) @title: 'CLSSF: Incident Classification - category or type of incident';
            LDWRK : Date        @title: 'LDWRK: Last Day Worked - last day employee worked before incident/absence';
            FDABS : Date        @title: 'FDABS: First Day of Absence - first day employee missed work due to incident';
            OCCIL : String(1)   @title: 'OCCIL: Occupational Illness (Y/N) - indicates if incident is a work-related illness';
            RTWRK : String(1)   @title: 'RTWRK: Return to Work (Y/N) - indicates if employee has returned to work';
            RGTIM : Timestamp   @title: 'RGTIM: Regular Work Time - usual work time of employee';
            NAINC : String(255) @title: 'NAINC: Nature of Incident - description of what happened';
            CAUSE : String(255) @title: 'CAUSE: Causes - contributing factors or causes of the incident';
            AAAAAA : Association to many BDY on AAAAAA.EMPID = EMPID;
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity BDY {
        key BDPID : Integer64   @title: 'BDPID: Primary key - unique incident identifier';
            EMPID : String(40)  @title: 'EMPID: Foreign key of the SLS_T_INJEM table';
            BDYPT : String(100) @title: 'BDYPT: Body Parts';
            NOINJ : String(255) @title: 'NOINJ: Nature of injury';
            SIDE_ : String(10)  @title: 'SIDE_: side';
            BPDES : String(500) @title: 'BPDES: Body Parts Description';
    }

    @cds.persistence.exists
    @cds.persistence.calcview
    entity INJBDY {
        key EMPID : String(40)  @title: 'EMPID: Employee ID - references employee master record';
        key EMPNM : String(100) @title: 'EMPNM: Employee Name - full name of the employee';
        key SUPVR : String(100) @title: 'SUPVR: Supervisor Name - direct supervisor of the employee';
        key TPHNE : String(20)  @title: 'TPHNE: Phone Number - contact number of the employee';
        key CLSSF : String(100) @title: 'CLSSF: Incident Classification - category or type of incident';
        key LDWRK : Date        @title: 'LDWRK: Last Day Worked - last day employee worked before incident/absence';
        key FDABS : Date        @title: 'FDABS: First Day of Absence - first day employee missed work due to incident';
        key OCCIL : String(1)   @title: 'OCCIL: Occupational Illness (Y/N) - indicates if incident is a work-related illness';
        key RTWRK : String(1)   @title: 'RTWRK: Return to Work (Y/N) - indicates if employee has returned to work';
        key NAINC : String(255) @title: 'NAINC: Nature of Incident - description of what happened';
        key CAUSE : String(255) @title: 'CAUSE: Causes - contributing factors or causes of the incident';
            BDPID : Integer64   @title: 'BDPID: Primary key - unique incident identifier';
        key BDYPT : String(100) @title: 'BDYPT: Body Parts';
        key NOINJ : String(255) @title: 'NOINJ: Nature of injury';
        key SIDE_ : String(10)  @title: 'SIDE_: side';
        key BPDES : String(500) @title: 'BPDES: Body Parts Description';
    }

}
