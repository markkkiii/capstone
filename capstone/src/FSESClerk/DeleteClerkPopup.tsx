import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import axios from 'axios';
import { deleteAbatementNewBusiness, deleteAbatementRenewalBusiness, deleteClosureNewBusiness, deleteClosureRenewalBusiness, deleteDisapprovedOccupancyPermit, deleteNTCNewBusiness, deleteNTCRenewalBusiness, deleteNTCVNewBusiness, deleteNTCVRenewalBusiness, deleteOccupancyPermit } from '../lib/controller';

interface DeleteProps {
    value: string;
    open: boolean;
    remarks: string;
    form: string;
    sortby: string;
    handleClose: () => void;
}

const DeleteClerkPopup: React.FC<DeleteProps> = ({ sortby, form, remarks, value, open, handleClose }) => {

    /*let records =''
    if(form === 'New'){
        if(remarks === 'Pending'){
            records = 'occupancyPendingclerk' 
        }
        else if (remarks === 'Disapproved'){
            records = 'occupancyDisapprovedClerk'
        }
    }
    else if(form === "NewBP"){
        if (remarks ==='Pending'){
            records = 'BPPending'
        }
        else if ((sortby === 'NTC Records' && remarks === 'Issued NTCV') || (sortby === 'NTC Records' && remarks === 'For Issuance NTCV') || (sortby === 'NTC Records' && remarks === 'Complied')){
            records = 'newbpnoticetocomply'
        }
        else if ((sortby === 'NTCV  Records' && remarks === 'Issued Abatement') || (sortby === 'NTCV  Records' &&  remarks === 'For Issuance Abatement') || (sortby === 'NTCV  Records' && remarks === 'Complied')){
            records = 'newbpnoticecorrectviolation'
        }
        else if ((sortby === 'Abatement Records' && remarks === 'Issued Closure') || (sortby === 'Abatement Records' && remarks === 'For Issuance Closure') || (sortby === 'Abatement Records' && remarks === 'Complied')){
            records = 'newbpabatementorder'
        }
        else if ((sortby === 'Closure Records' && remarks === 'Issued Closure') || (sortby === 'Closure Records' && remarks === 'Complied')){
            records = 'newbpclosureorder'
        }
    }
    else if(form === "NewBR"){
        if (remarks ==='Pending'){
            records = 'Renewal'
        }
        else if ((sortby === 'NTC Records' && remarks === 'Issued NTCV') || (sortby === 'NTC Records' && remarks === 'For Issuance NTCV') || (sortby === 'NTC Records' && remarks === 'Complied')){
            records = 'renewalbpnoticetocomply'
        }
        else if ((sortby === 'NTCV  Records' && remarks === 'Issued Abatement') || (sortby === 'NTCV  Records' &&  remarks === 'For Issuance Abatement') || (sortby === 'NTCV  Records' && remarks === 'Complied')){
            records = 'renewalbpnoticetocorrectviolation'
        }
        else if ((sortby === 'Abatement Records' && remarks === 'Issued Closure') || (sortby === 'Abatement Records' && remarks === 'For Issuance Closure') || (sortby === 'Abatement Records' && remarks === 'Complied')) {
                records = 'renewalbpabatementorder';
            }
        else if ((sortby === 'Closure Records' && remarks === 'Issued Closure') || (sortby === 'Closure Records' && remarks === 'Complied')) {
                records = 'renewalbpclosureorder';
            }
        } */

    const deletefunc = (value: string) => {
        console.log(remarks);
        console.log(sortby);
        console.log(form);
        //function here
        //Add additional if statements here for other permits
      if(form === 'Occupancy'){
            if(remarks === "Pending"){
                deleteOccupancyPermit(value);
                alert("Deleted Successfully");
            }
            else if(remarks === "Disapproved"){
                deleteDisapprovedOccupancyPermit(value);
                alert("Deleted Successfully");
            }
      }
      else if(form === 'New Business'){
        console.log(value);
            if((sortby === 'NTC Records' && remarks === 'Issued NTCV') || (sortby === 'NTC Records' && remarks === 'For Issuance NTCV') || (sortby === 'NTC Records' && remarks === 'Complied')){
                deleteNTCNewBusiness(value);
                alert("Deleted NTC Permit Successfully");
            }
            else if((sortby === 'NTCV Records' && remarks === 'Issued Abatement') || (sortby === 'NTCV Records' &&  remarks === 'For Issuance Abatement') || (sortby === 'NTCV Records' && remarks === 'Complied')){
              
                deleteNTCVNewBusiness(value);
                alert("Deleted NTCV Permit Successfully");
            }
            else if((sortby === 'Abatement Records' && remarks === 'Issued Closure') || (sortby === 'Abatement Records' && remarks === 'For Issuance Closure') || (sortby === 'Abatement Records' && remarks === 'Complied')){
                deleteAbatementNewBusiness(value);
                alert("Deleted Abatement Permit Successfully");
            }
            else if((sortby === 'Closure Records' && remarks === 'Issued Closure') || (sortby === 'Closure Records' && remarks === 'Complied')){
                deleteClosureNewBusiness(value);
                alert("Deleted Closure Permit Successfully");
            }
        }
        else if(form === "Renewal Business"){
            console.log(value);
                if((sortby === 'NTC Records' && remarks === 'Issued NTCV') || (sortby === 'NTC Records' && remarks === 'For Issuance NTCV') || (sortby === 'NTC Records' && remarks === 'Complied')){
                    deleteNTCRenewalBusiness(value);
                    alert("Deleted NTC Permit Successfully");
                }
                else if((sortby === 'NTCV Records' && remarks === 'Issued Abatement') || (sortby === 'NTCV Records' &&  remarks === 'For Issuance Abatement') || (sortby === 'NTCV Records' && remarks === 'Complied')){
                  
                    deleteNTCVRenewalBusiness(value);
                    alert("Deleted NTCV Permit Successfully");
                }
                else if((sortby === 'Abatement Records' && remarks === 'Issued Closure') || (sortby === 'Abatement Records' && remarks === 'For Issuance Closure') || (sortby === 'Abatement Records' && remarks === 'Complied')){
                    deleteAbatementRenewalBusiness(value);
                    alert("Deleted Abatement Permit Successfully");
                }
                else if((sortby === 'Closure Records' && remarks === 'Issued Closure') || (sortby === 'Closure Records' && remarks === 'Complied')){
                    deleteClosureRenewalBusiness(value);
                    alert("Deleted Closure Permit Successfully");
                }
            }
        handleClose();
    }

    return (
        <div>
            <Dialog open={open} maxWidth="xs" fullWidth PaperProps={{ style: { backgroundColor: 'lightgrey' } }} >
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p style={{ fontFamily: 'Oswald', fontWeight: 'bold' }}>Do you want to delete this form?</p>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button variant='contained' onClick={() => deletefunc(value)} sx={{ backgroundColor: '#BEBEBE', fontFamily: 'Oswald', color: 'black' }}>Delete</Button>
                    <Button variant='contained' onClick={handleClose} sx={{ backgroundColor: '#BEBEBE', fontFamily: 'Oswald', color: 'black' }}>Cancel</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default DeleteClerkPopup;
