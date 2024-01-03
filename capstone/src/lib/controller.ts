import {addDoc, collection, deleteDoc, doc, getFirestore, setDoc} from 'firebase/firestore'
import { app } from './firebase'
import { addBuildingPermit, addbusinessPermit } from '../types/Users';

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

//Update Occupancy Permit
export const updateoccupancyPermit = async (id: string, permitData: any) => {
    const getPermit = doc(firestore,`ApprovedOccupancyPermit/${id}`);
    await setDoc(getPermit,permitData,{merge:true});
    console.log("Permit Updated Successfully");
}

//Delete Occupancy Permit
export const deleteOccupancyPermit = async(id: string) =>{
    const document = doc(firestore,`ApprovedOccupancyPermit/${id}`);
    await deleteDoc(document);
    console.log("Permit successfully deleted")
}