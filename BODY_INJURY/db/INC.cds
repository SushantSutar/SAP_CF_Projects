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
    }

    
   
}
