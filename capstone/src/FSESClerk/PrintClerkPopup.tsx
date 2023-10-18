import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

interface PrintProps {
  open: boolean;
  handleClose: () => void;
}

const PrintClerkPopup: React.FC<PrintProps> = ({open, handleClose}) => {

  return (
      <div>
          <Dialog open={open} maxWidth = "xs" fullWidth PaperProps={{ style: { backgroundColor: 'lightgrey' } }} >
              <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <p style={{ fontFamily: 'Oswald', fontWeight: 'bold'}}>Do you want to print application form?</p>
              </DialogContent>
              <DialogActions style={{ justifyContent: 'center' }}>
                  <Button variant='contained'onClick={handleClose} sx={{backgroundColor:'#BEBEBE', fontFamily: 'Oswald', color:'black'}}>Print</Button>
                  <Button variant='contained'onClick={handleClose} sx={{backgroundColor:'#BEBEBE', fontFamily: 'Oswald', color:'black'}}>Cancel</Button>
              </DialogActions>
          </Dialog>

      </div>
  );
};

export default PrintClerkPopup;
