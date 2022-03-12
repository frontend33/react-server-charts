import React, { memo, FC } from 'react';
import './index.css';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import {getDeatls} from '../../utils/getDeal'

const style = {
  position: 'absolute' as any,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

export const DeleteConfirm: FC<any> = memo(({onDeleteRow}) => {
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const onSaveRow = () => {
    onDeleteRow()
    setOpenModal(false);
  };

  return (
    <div>
      <Button size="small" variant="contained" onClick={handleOpen}>
        <DeleteIcon />
      </Button>

      <Modal open={openModal} onClose={handleClose}>
        <Box sx={style}>
          <div>
            Delete
          </div>

          <span>Are you definitely want to delete the field ?</span>

          <div className="buttonContainer">
            <div className="button">
              <Button variant="text" onClick={handleClose}>
                Cancel
              </Button>
            </div>

            <Button variant="contained" onClick={onSaveRow}>
                Yes
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
});
