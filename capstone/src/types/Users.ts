export interface NewBusinessListPending {
    applicantName?: string,
    buildingNo?: string,
    controlNo?: number,
    dateReceived?: string,
    projectName?: string,
    remarks?: string,
    status?: string,
    address?: string,
    receivedby?: string,
    typeofoccupancy?: string,
    contactno?: string,
    evaluator?: string,
    nostorey?: number,
    constructrenovate?: string,
    structureconstructed?: boolean,
    defects?: string[],
    id?: string,
}

export interface addBuildingPermit {
    applicantName: string,
    buildingNo: string,
    controlNo?: number,
    dateReceived: string,
    projectName: string,
    remarks: string,
    status: string,
    address: string,
    receivedby: string,
    typeofoccupancy: string,
    contactno: string,
    evaluator: string,
    nostorey: number,
    constructrenovate: string,
    structureconstructed: boolean,
    defects: string[],
}

export interface businessPermit {
    address?: string,
    amount?: number,
    business_name?: string,
    bspermit_no?: string,
    contact_no?: string,
    date?: string,
    dateinspection?: string,
    date_received?: string,
    email?: string,
    fireinspectors?: string[],
    fsicdate?: string,
    fsicno?: number,
    inspection_no?: number,
    nature_business?: string,
    orno?: number,
    permittee?: string,
    recommendation?: string[],
    remarks?: string,
    teamleader?: string,
    type_occupancy?: string,
    id: string,
}

export interface addbusinessPermit {
    address: string,
    amount: number,
    business_name: string,
    bspermit_no: string,
    contact_no: string,
    date: string,
    dateinspection: string,
    date_received: string,
    email: string,
    fireinspectors: string[],
    fsicdate: string,
    fsicno: number,
    inspection_no: number,
    nature_business: string,
    orno: number,
    permittee: string,
    recommendation: string[],
    remarks: string,
    teamleader: string,
    type_occupancy: string,
}

export interface OccupancyPermit {
    additionalamount?: number,
    controlno?: number,
    amountpaid?: number,
    applicantname?: string,
    assessorname?: string,
    bldgpermitno?: string,
    contactno?: string,
    dateinspection?: string,
    datereceived?: string,
    fireinspector?: string[],
    fsicno?: number,
    fsicdate?: string,
    inspectionno?: number,
    location?: string,
    opsdate?: string,
    opsno?: number,
    orno?: number,
    ornoadditional?: string,
    paymentdate?: string,
    paymentdateadditional?: string,
    projectname?: string,
    receivedby?: string,
    receiveddocu?: string,
    recommendation?: string[],
    remarks?: string,
    teamleader?: string,
    totalamount?: number,
    nodno?: number,
    noddate?: string,
    deficiencies?: string[],
    receivednod?: string,
    receivednoddate?: string,
    id: string
}

export interface addOccupancyPermit {
    assessorname: string,
    additionalamount: number,
    controlno: number,
    amountpaid: number,
    applicantname: string,
    bldgpermitno: string,
    contactno: string,
    dateinspection: string,
    datereceived: string,
    fireinspector: string[],
    fsicno: number,
    fsicdate: string,
    inspectionno: number,
    location: string,
    opsdate: string,
    opsno: number,
    orno: number,
    ornoadditional: string,
    paymentdate: string,
    paymentdateadditional: string,
    projectname: string,
    receivedby: string,
    receiveddocu: string,
    recommendation: string[],
    remarks: string,
    teamleader: string,
    totalamount: number,

}

export interface addDisapprovedOccupancyPermit {
    controlno: number,
    applicantname: string,
    bldgpermitno: string,
    contactno: string,
    datereceived: string,
    location: string,
    projectname: string,
    remarks: string,
    nodno: number,
    noddate: string,
    deficiencies: string[],
    receivednod: string,
    receivednoddate: string,
}


export interface disapprovedNewBusinessPermit {
    address?: string,
    administrative_fine?: string,
    business_name?: string,
    bspermit_no?: string,
    contact_no?: string,
    date?: string,
    date_inspected?: string,
    date_received?: string,
    defects?: {
        defects: string;
        date: string;
    }[],
    email?: string,
    fire_inspectors?: string[],
    inspection_no?: number,
    name?: string,
    nature_business?: string,
    ntc_no?: number,
    ntc_date?: string,
    ntcv_no?: number,
    ntcv_date?: string,
    abatement_no?: number,
    abatement_date?: string,
    closure_no?: number,
    closure_date?: string,
    permittee?: string,
    remarks?: string,
    team_leader?: string,
    type_occupancy?: string,
    id: string,
    
}

export interface Payment {
    amountpaid?: number,
    assessorname?: string,
    businesspermitno?: string,
    fsc?: string,
    location?: string,
    name?: string,
    opsdate?: string,
    opsno?: string,
    orno?: string,
    payment?: {
        natureOfCollection: string;
        accountCode: string;
        amount: string;
    }[];
    paymentdate?: string,
    projectname?: string,
    totalamount?: number,
    id: string
}

export interface addPayment {
    amountpaid: number,
    assessorname: string,
    businesspermitno?: string,
    fsc: string,
    location: string,
    name: string,
    opsdate: string,
    opsno: string,
    orno: string,
    payment: {
        natureOfCollection: string;
        accountCode: string;
        amount: string;
    }[];
    paymentdate: string,
    projectname: string,
    totalamount: number,
}

export interface disapprovedOccupancyPermit {
    bldgpermitno?: string,
    applicantname?: string,
    projectname?: string,
    location?: string,
    contactno?: string,
    datereceived?: string,
    teamleader?: string,
    fireinspector?: string[],
    inspectionno?: number,
    dateinspection?: string,
    receivedby?: string,
    receiveddocu?: string,
    nodno?: number,
    noddate?: string,
    deficiencies?: string[],
    receivednod?: string,
    receivednoddate?: string,
    id: string,
}

export interface adddisapprovedOccupancyPermit {
    bldgpermitno: string,
    applicantname: string,
    projectname: string,
    location: string,
    contactno: string,
    datereceived: string,
    teamleader: string,
    fireinspector: string[],
    inspectionno: number,
    dateinspection: string,
    receivedby: string,
    receiveddocu: string,
    nodno: number,
    noddate: string,
    deficiencies: string[],
    receivednod: string,
    receivednoddate: string
}

export interface NTCNewBusiness {
    address: string,
    business_name: string,
    bspermit_no: string,
    contact_no: string,
    date: string,
    date_inspected: string,
    date_received: string,
    defects: {
        defects: string;
        date: string;
    }[],
    email: string,
    fire_inspectors: string[],
    inspection_no: number,
    name: string,
    nature_business: string,
    ntc_no: number,
    ntc_date: string,
    permittee: string,
    remarks: string,
    team_leader: string,
    type_occupancy: string,
}

export interface NTCVNewBusiness {
    address: string,
    business_name: string,
    bspermit_no: string,
    contact_no: string,
    date: string,
    date_inspected: string,
    date_received: string,
    defects: {
        defects: string;
        date: string;
    }[],
    email: string,
    fire_inspectors: string[],
    inspection_no: number,
    name: string,
    nature_business: string,
    ntc_no: number,
    ntc_date: string,
    ntcv_no: number,
    ntcv_date: string,
    permittee: string,
    remarks: string,
    team_leader: string,
    type_occupancy: string,
}

export interface AbatementNewBusiness {
    address: string,
    business_name: string,
    bspermit_no: string,
    contact_no: string,
    date: string,
    date_inspected: string,
    date_received: string,
    defects: {
        defects: string;
        date: string;
    }[],
    email: string,
    fire_inspectors: string[],
    inspection_no: number,
    name: string,
    nature_business: string,
    ntc_no: number,
    ntc_date: string,
    ntcv_no: number,
    ntcv_date: string,
    abatement_no: number,
    abatement_date: string,
    permittee: string,
    remarks: string,
    team_leader: string,
    type_occupancy: string,
}

export interface ClosureNewBusiness {
    address: string,
    business_name: string,
    bspermit_no: string,
    contact_no: string,
    date: string,
    date_inspected: string,
    date_received: string,
    defects: {
        defects: string;
        date: string;
    }[],
    email: string,
    fire_inspectors: string[],
    inspection_no: number,
    name: string,
    nature_business: string,
    ntc_no: number,
    ntc_date: string,
    ntcv_no: number,
    ntcv_date: string,
    abatement_no: number,
    abatement_date: string,
    closure_no: number,
    closure_date: string,
    permittee: string,
    remarks: string,
    team_leader: string,
    type_occupancy: string,
}

export interface NTCBusinessRenewal {
    address: string,
    administrative_fine: string,
    business_name: string,
    bspermit_no: string,
    contact_no: string,
    date: string,
    date_inspected: string,
    date_received: string,
    defects: {
        defects: string;
        date: string;
    }[],
    email: string,
    fire_inspectors: string[],
    inspection_no: number,
    name: string,
    nature_business: string,
    ntc_no: number,
    ntc_date: string,
    permittee: string,
    remarks: string,
    team_leader: string,
    type_occupancy: string,
}

export interface NTCVBusinessRenewal {
    address: string,
    administrative_fine: string,
    business_name: string,
    bspermit_no: string,
    contact_no: string,
    date: string,
    date_inspected: string,
    date_received: string,
    defects: {
        defects: string;
        date: string;
    }[],
    email: string,
    fire_inspectors: string[],
    inspection_no: number,
    name: string,
    nature_business: string,
    ntc_no: number,
    ntc_date: string,
    ntcv_no: number,
    ntcv_date: string,
    permittee: string,
    remarks: string,
    team_leader: string,
    type_occupancy: string,
}

export interface AbatementBusinessRenewal {
    address: string,
    administrative_fine: string,
    business_name: string,
    bspermit_no: string,
    contact_no: string,
    date: string,
    date_inspected: string,
    date_received: string,
    defects: {
        defects: string;
        date: string;
    }[],
    email: string,
    fire_inspectors: string[],
    inspection_no: number,
    name: string,
    nature_business: string,
    ntc_no: number,
    ntc_date: string,
    ntcv_no: number,
    ntcv_date: string,
    abatement_no: number,
    abatement_date: string,
    permittee: string,
    remarks: string,
    team_leader: string,
    type_occupancy: string,
}

export interface ClosureBusinessRenewal {
    address: string,
    administrative_fine: string,
    business_name: string,
    bspermit_no: string,
    contact_no: string,
    date: string,
    date_inspected: string,
    date_received: string,
    defects: {
        defects: string;
        date: string;
    }[],
    email: string,
    fire_inspectors: string[],
    inspection_no: number,
    name: string,
    nature_business: string,
    ntc_no: number,
    ntc_date: string,
    ntcv_no: number,
    ntcv_date: string,
    abatement_no: number,
    abatement_date: string,
    closure_no: number,
    closure_date: string,
    permittee: string,
    remarks: string,
    team_leader: string,
    type_occupancy: string,
}

