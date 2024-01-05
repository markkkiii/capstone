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
    businessname?: string,
    businessno?: string,
    contactno?: string,
    date?: string,
    dateinspection?: string,
    datereceived?: string,
    email?: string,
    fireinspectors?: string[],
    fsicdate?: string,
    fsicno?: number,
    inspection_no?: number,
    naturebusiness?: string,
    orno?: number,
    permittee?: string,
    recommendation?: string[],
    remarks?: string,
    teamleader?: string,
    typeoccupancy?: string,
    id: string,
}

export interface addbusinessPermit {
    address: string,
    amount: number,
    businessname: string,
    businessno: string,
    contactno: string,
    date: string,
    dateinspection: string,
    datereceived: string,
    email: string,
    fireinspectors: string[],
    fsicdate: string,
    fsicno: number,
    inspection_no: number,
    naturebusiness: string,
    orno: number,
    permittee: string,
    recommendation: string[],
    remarks: string,
    teamleader: string,
    typeoccupancy: string,
}

export interface OccupancyPermit{
    additionalamount?:number,
    amountpaid?:number,
    applicantname?:string,
    assessorname?:string,
    bldgpermitno?:string,
    contactno?:string,
    dateinspection?:string,
    datereceived?:string,
    fireinspector?:string[],
    fsicno?:number,
    fsicdate?:string,
    inspectionno?:number,
    location?:string,
    opsdate?:string,
    opsno?:number,
    orno?:number,
    ornoadditional?:string,
    paymentdate?:string,
    paymentdateadditional?:string,
    projectname?:string,
    receivedby?:string,
    receiveddocu?:string,
    recommendation?:string[],
    remarks?:string,
    teamleader?:string,
    totalamount?:number,
    id:string
}

export interface Payment{
    amountpaid?:number,
    assessorname?:string,
    businesspermitno?:string,
    fsc?:string,
    location?:string,
    name?:string,
    opsdate?:string,
    opsno?:string,
    orno?:string,
    payment?: {
        natureOfCollection: string;
        accountCode: string;
        amount: string;
      }[];
    paymentdate?:string,
    projectname?:string,
    totalamount?:number,
    id:string
}
export interface addPayment{
    amountpaid:number,
    assessorname:string,
    businesspermitno?:string,
    fsc:string,
    location:string,
    name:string,
    opsdate:string,
    opsno:string,
    orno:string,
    payment: {
        natureOfCollection: string;
        accountCode: string;
        amount: string;
      }[];
    paymentdate:string,
    projectname:string,
    totalamount:number,
}
        