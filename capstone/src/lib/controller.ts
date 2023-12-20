import {collection, getFirestore} from 'firebase/firestore'
import { app } from './firebase'

export const firestore = getFirestore(app);

//Building Evaluator Collection
export const buildingEvalCollection = collection (firestore, "buildingEvaluator");