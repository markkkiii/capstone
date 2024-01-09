import {addDoc, collection, deleteDoc, doc, getFirestore, setDoc} from 'firebase/firestore'
import { app } from './firebase'
import { AbatementNewBusiness, ClosureNewBusiness, NTCNewBusiness, NTCVNewBusiness, addBuildingPermit, addDisapprovedOccupancyPermit, addOccupancyPermit, addPayment, addbusinessPermit, adddisapprovedOccupancyPermit } from '../types/Users';

export const firestore = getFirestore(app);

//Building Evaluator Collection
export const buildingEvalCollection = collection (firestore, "buildingEvaluator");

//Business Permit Collection
export const businessPermCollection = collection(firestore, "NewApprovedBusinessPermit");

//Business Permit Collection
export const renewalbusinessPermCollection = collection(firestore, "ApprovedRenewalBusinessPermit");

//Occupancy Permit Collection
export const occupancyPermCollection = collection(firestore, "ApprovedOccupancyPermit" );

//Building Payment Collection
export const buildingPaymentCollection = collection(firestore, "BuildingPermitPayment");

//Disapproved New Business Collection
export const disapprovedNewBusinessCollection = collection(firestore, "DisapprovedNewBusiness");

//Notice To Comply New Business Collection
export const NTCNewBusinessCollection = collection(firestore, "NTCNewBusiness");

//Notice To Correct Violation New Business Collection
export const NTCVNewBusinessCollection = collection(firestore, "NTCVNewBusiness");

//Abatement New Business Collection
export const abatementNewBusinessCollection = collection(firestore, "AbatementNewBusiness");

//Closure New Business Collection
export const closureNewBusinessCollection = collection(firestore, "ClosureNewBusiness");

//Disapproved New Business Collection
export const disapprovedRenewalBusinessCollection = collection(firestore, "DisapprovedBusinessRenewal");

//Notice To Comply Business Renewal Collection
export const NTCBusinessRenewalCollection = collection(firestore, "NTCBusinessRenewal");

//Notice To Correct Violation Business Renewal Collection
export const NTCVBusinessRenewalCollection = collection(firestore, "NTCVBusinessRenewal");

//Abatement Business Renewal Collection
export const abatementBusinessRenewalCollection = collection(firestore, "AbatementBusinessRenewal");

//Closure Business Renewal Collection
export const closureBusinessRenewalCollection = collection(firestore, "ClosureBusinessRenewal");

//Building Payment Collection
export const newBusinessPaymentCollection = collection(firestore, "NewBusinessPermitPayment");

//Building Payment Collection
export const RenewalBusinessPaymentCollection = collection(firestore, "RenewalBusinessPermitPayment");

//Building Payment Collection
export const OccupancyPaymentCollection = collection(firestore, "OccupancyPermitPayment");

//Disapproved Occupancy Permit
export const DisapprovedOccupancyCollection = collection(firestore, "DisapprovedOccupancyPermit");


//Add Building Permit
export const addBuildingPermits = async (permitData: addBuildingPermit) =>{
    const newPermit =await addDoc(buildingEvalCollection, {
        ...permitData
    });
    console.log("Permit Added Successfully")
}

//Delete Building Permit
export const deleteBuildingPermit = async(id: string) =>{
    const document = doc(firestore,`buildingEvaluator/${id}`);
    await deleteDoc(document);
    console.log("Permit successfully deleted")
}

//Update Building Permit
export const updateBuildingPermit = async (id: string, permitData: addBuildingPermit) => {
    const getPermit = doc(firestore,`buildingEvaluator/${id}`);
    await setDoc(getPermit,permitData,{merge:true});
    console.log("Permit Updated Successfully");
}

//Add Business Permit
export const addBusinessPermits = async (permitData: addbusinessPermit) =>{
    const newPermit =await addDoc(businessPermCollection, {
        ...permitData
    });
    console.log("Permit Added Successfully")
}

//Update Businesss Permit
export const updateBusinessPermit = async (id: string, permitData: any) => {
    const getPermit = doc(firestore,`NewApprovedBusinessPermit/${id}`);
    await setDoc(getPermit,permitData,{merge:true});
    console.log("Permit Updated Successfully");
}

//Delete Business Permit
export const deleteBusinessPermit = async(id: string) =>{
    const document = doc(firestore,`NewApprovedBusinessPermit/${id}`);
    await deleteDoc(document);
    console.log("Permit successfully deleted")
}

//Add RenewalBusiness Permit
export const addrenewalBusinessPermits = async (permitData: addbusinessPermit) =>{
    const newPermit =await addDoc(renewalbusinessPermCollection, {
        ...permitData
    });
    console.log("Permit Added Successfully")
}

//Update RenewalBusinesss Permit
export const updaterenewalBusinessPermit = async (id: string, permitData: any) => {
    const getPermit = doc(firestore,`ApprovedRenewalBusinessPermit/${id}`);
    await setDoc(getPermit,permitData,{merge:true});
    console.log("Permit Updated Successfully");
}

//Delete RenewalBusiness Permit
export const deleterenewalBusinessPermit = async(id: string) =>{
    const document = doc(firestore,`ApprovedRenewalBusinessPermit/${id}`);
    await deleteDoc(document);
    console.log("Permit successfully deleted")
}

//Add Occupancy Permit
export const addOccupancyPermits = async (permitData: addOccupancyPermit) =>{
    const newPermit =await addDoc(occupancyPermCollection, {
        ...permitData
    });
    console.log("Permit Added Successfully")
}

//Add DisapprovedOccupancy Permit
export const addDisapprovedOccupancyPermits = async (permitData: addDisapprovedOccupancyPermit) =>{
    const newPermit =await addDoc(DisapprovedOccupancyCollection, {
        ...permitData
    });
    console.log("Permit Added Successfully")
}

//Update Occupancy Permit
export const updateoccupancyPermit = async (id: string, permitData: any) => {
    const getPermit = doc(firestore,`ApprovedOccupancyPermit/${id}`);
    await setDoc(getPermit,permitData,{merge:true});
    console.log("Permit Updated Successfully");
}

//Update Disapproved Occupancy Permit
export const updateDisapprovedoccupancyPermit = async (id: string, permitData: any) => {
    const getPermit = doc(firestore,`DisapprovedOccupancyPermit/${id}`);
    await setDoc(getPermit,permitData,{merge:true});
    console.log("Permit Updated Successfully");
}


//Delete Occupancy Permit
export const deleteOccupancyPermit = async(id: string) =>{
    const document = doc(firestore,`ApprovedOccupancyPermit/${id}`);
    await deleteDoc(document);
    console.log("Permit successfully deleted")
}

//Delete Dissapproved Occupancy Permit
export const deleteDisapprovedOccupancyPermit = async(id: string) =>{
    const document = doc(firestore,`DisapprovedOccupancyPermit/${id}`);
    await deleteDoc(document);
    console.log("Permit successfully deleted")
}

//Add Building Payment
export const addBuildingPayment = async (permitData: addPayment) =>{
    const newPermit =await addDoc(buildingPaymentCollection, {
        ...permitData
    });
    console.log("Permit Added Successfully")
}

//Update Building Payment
export const updateBuildingPayment = async (id: string, permitData: any) => {
    const getPermit = doc(firestore,`BuildingPermitPayment/${id}`);
    await setDoc(getPermit,permitData,{merge:true});
    console.log("Permit Updated Successfully");
}

//Delete Building Payment
export const deleteBuildingPayment = async(id: string) =>{
    const document = doc(firestore,`BuildingPermitPayment/${id}`);
    await deleteDoc(document);
    console.log("Permit successfully deleted")
}

//Add NewBusiness Payment
export const addNewBusinessPayment = async (permitData: addPayment) =>{
    const newPermit =await addDoc(newBusinessPaymentCollection, {
        ...permitData
    });
    console.log("Permit Added Successfully")
}

//Update NewBusiness Payment
export const updateNewBusinessPayment = async (id: string, permitData: any) => {
    const getPermit = doc(firestore,`NewBusinessPermitPayment/${id}`);
    await setDoc(getPermit,permitData,{merge:true});
    console.log("Permit Updated Successfully");
}

//Delete NewBusiness Payment
export const deleteNewBusinessPayment = async(id: string) =>{
    const document = doc(firestore,`NewBusinessPermitPayment/${id}`);
    await deleteDoc(document);
    console.log("Permit successfully deleted")
}

//Add RenewalBusiness Payment
export const addRenewalBusinessPayment = async (permitData: addPayment) =>{
    const newPermit =await addDoc(RenewalBusinessPaymentCollection, {
        ...permitData
    });
    console.log("Permit Added Successfully")
}

//Update RenewalBusiness Payment
export const updateRenewalBusinessPayment = async (id: string, permitData: any) => {
    const getPermit = doc(firestore,`RenewalBusinessPermitPayment/${id}`);
    await setDoc(getPermit,permitData,{merge:true});
    console.log("Permit Updated Successfully");
}

//Delete RenewalBusiness Payment
export const deleteRenewalBusinessPayment = async(id: string) =>{
    const document = doc(firestore,`RenewalBusinessPermitPayment/${id}`);
    await deleteDoc(document);
    console.log("Permit successfully deleted")
}

//Add Occupancy Payment
export const addOccupancyPayment = async (permitData: addPayment) =>{
    const newPermit =await addDoc(OccupancyPaymentCollection, {
        ...permitData
    });
    console.log("Permit Added Successfully")
}

//Update Occupancy Payment
export const updateOccupancyPayment = async (id: string, permitData: any) => {
    const getPermit = doc(firestore,`OccupancyPermitPayment/${id}`);
    await setDoc(getPermit,permitData,{merge:true});
    console.log("Permit Updated Successfully");
}

//Delete Occupancy Payment
export const deleteOccupancyPayment = async(id: string) =>{
    const document = doc(firestore,`OccupancyPermitPayment/${id}`);
    await deleteDoc(document);
    console.log("Permit successfully deleted")
}

//Add NTCNewBusiness Permit
export const addNTCNewBusiness = async (permitData: NTCNewBusiness) =>{
    const newPermit =await addDoc(NTCNewBusinessCollection, {
        ...permitData
    });
    console.log("Permit Added Successfully")
}

//Update NTCNewBusiness Permit
export const updateNTCNewBusiness = async (id: string, permitData: any) => {
    const getPermit = doc(firestore,`NTCNewBusiness/${id}`);
    await setDoc(getPermit,permitData,{merge:true});
    console.log("Permit Updated Successfully");
}

//Delete NTCNewBusiness Permit
export const deleteNTCNewBusiness = async(id: string) =>{
    const document = doc(firestore,`NTCNewBusiness/${id}`);
    await deleteDoc(document);
    console.log("Permit successfully deleted")
}

//Add NTCVNewBusiness Permit
export const addNTCVNewBusiness = async (permitData: NTCVNewBusiness) =>{
    const newPermit =await addDoc(NTCVNewBusinessCollection, {
        ...permitData
    });
    console.log("Permit Added Successfully")
}

//Update NTCVNewBusiness Permit
export const updateNTCVNewBusiness = async (id: string, permitData: any) => {
    const getPermit = doc(firestore,`NTCVNewBusiness/${id}`);
    await setDoc(getPermit,permitData,{merge:true});
    console.log("Permit Updated Successfully");
}

//Delete NTCVNewBusiness Permit
export const deleteNTCVNewBusiness = async(id: string) =>{
    const document = doc(firestore,`NTCVNewBusiness/${id}`);
    await deleteDoc(document);
    console.log("Permit successfully deleted")
}

//Add AbatementNewBusiness Permit
export const addAbatementNewBusiness = async (permitData: AbatementNewBusiness) =>{
    const newPermit =await addDoc(abatementNewBusinessCollection, {
        ...permitData
    });
    console.log("Permit Added Successfully")
}

//Update AbatementNewBusiness Permit
export const updateAbatementNewBusiness = async (id: string, permitData: any) => {
    const getPermit = doc(firestore,`AbatementNewBusiness/${id}`);
    await setDoc(getPermit,permitData,{merge:true});
    console.log("Permit Updated Successfully");
}

//Delete AbatementNewBusiness Permit
export const deleteAbatementNewBusiness = async(id: string) =>{
    const document = doc(firestore,`AbatementNewBusiness/${id}`);
    await deleteDoc(document);
    console.log("Permit successfully deleted")
}

//Add ClosureNewBusiness Permit
export const addClosureNewBusiness = async (permitData: ClosureNewBusiness) =>{
    const newPermit =await addDoc(closureNewBusinessCollection, {
        ...permitData
    });
    console.log("Permit Added Successfully")
}

//Update ClosureNewBusiness Permit
export const updateClosureNewBusiness = async (id: string, permitData: any) => {
    const getPermit = doc(firestore,`ClosureNewBusiness/${id}`);
    await setDoc(getPermit,permitData,{merge:true});
    console.log("Permit Updated Successfully");
}

//Delete ClosureNewBusiness Permit
export const deleteClosureNewBusiness = async(id: string) =>{
    const document = doc(firestore,`ClosureNewBusiness/${id}`);
    await deleteDoc(document);
    console.log("Permit successfully deleted")
}


//Add NTCNewBusiness Permit
export const addNTCRenewalBusiness = async (permitData: NTCNewBusiness) =>{
    const newPermit =await addDoc(NTCBusinessRenewalCollection, {
        ...permitData
    });
    console.log("Permit Added Successfully")
}

//Update NTCRenewalBusiness Permit
export const updateNTCRenewalBusiness = async (id: string, permitData: any) => {
    const getPermit = doc(firestore,`NTCBusinessRenewal/${id}`);
    await setDoc(getPermit,permitData,{merge:true});
    console.log("Permit Updated Successfully");
}

//Delete NTCRenewalBusiness Permit
export const deleteNTCRenewalBusiness = async(id: string) =>{
    const document = doc(firestore,`NTCBusinessRenewal/${id}`);
    await deleteDoc(document);
    console.log("Permit successfully deleted")
}

//Add NTCVNewBusiness Permit
export const addNTCVRenewalBusiness = async (permitData: NTCVNewBusiness) =>{
    const newPermit =await addDoc(NTCVBusinessRenewalCollection, {
        ...permitData
    });
    console.log("Permit Added Successfully")
}

//Update NTCVNewBusiness Permit
export const updateNTCVRenewalBusiness = async (id: string, permitData: any) => {
    const getPermit = doc(firestore,`NTCVBusinessRenewal/${id}`);
    await setDoc(getPermit,permitData,{merge:true});
    console.log("Permit Updated Successfully");
}

//Delete NTCVNewBusiness Permit
export const deleteNTCVRenewalBusiness = async(id: string) =>{
    const document = doc(firestore,`NTCVBusinessRenewal/${id}`);
    await deleteDoc(document);
    console.log("Permit successfully deleted")
}

//Add AbatementNewBusiness Permit
export const addAbatementRenewalBusiness = async (permitData: AbatementNewBusiness) =>{
    const newPermit =await addDoc(abatementBusinessRenewalCollection, {
        ...permitData
    });
    console.log("Permit Added Successfully")
}

//Update AbatementNewBusiness Permit
export const updateAbatementRenewalBusiness = async (id: string, permitData: any) => {
    const getPermit = doc(firestore,`AbatementBusinessRenewal/${id}`);
    await setDoc(getPermit,permitData,{merge:true});
    console.log("Permit Updated Successfully");
}

//Delete AbatementNewBusiness Permit
export const deleteAbatementRenewalBusiness = async(id: string) =>{
    const document = doc(firestore,`AbatementBusinessRenewal/${id}`);
    await deleteDoc(document);
    console.log("Permit successfully deleted")
}

//Add ClosureRenewalBusiness Permit
export const addClosureRenewalBusiness = async (permitData: ClosureNewBusiness) =>{
    const newPermit =await addDoc(closureNewBusinessCollection, {
        ...permitData
    });
    console.log("Permit Added Successfully")
}

//Update AbatementRenewalBusiness Permit
export const updateClosureRenewalBusiness = async (id: string, permitData: any) => {
    const getPermit = doc(firestore,`ClosureBusinessRenewal/${id}`);
    await setDoc(getPermit,permitData,{merge:true});
    console.log("Permit Updated Successfully");
}

//Delete AbatementRenewalBusiness Permit
export const deleteClosureRenewalBusiness = async(id: string) =>{
    const document = doc(firestore,`ClosureBusinessRenewal/${id}`);
    await deleteDoc(document);
    console.log("Permit successfully deleted")
}


