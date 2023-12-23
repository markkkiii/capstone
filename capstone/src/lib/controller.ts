import {addDoc, collection, deleteDoc, doc, getFirestore, setDoc} from 'firebase/firestore'
import { app } from './firebase'
import { addBusinessPermit } from '../types/buildingEvaluator';

export const firestore = getFirestore(app);

//Building Evaluator Collection
export const buildingEvalCollection = collection (firestore, "buildingEvaluator");


//Add Building Permit
export const addBuildingPermit = async (permitData: addBusinessPermit) =>{
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

export const updateBuildingPermit = async (id: string, permitData: addBusinessPermit) => {
    const getPermit = doc(firestore,`buildingEvaluator/${id}`);
    await setDoc(getPermit,permitData,{merge:true});
    console.log("Permit Updated Successfully");
}