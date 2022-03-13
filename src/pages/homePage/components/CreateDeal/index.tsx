import React, {useState, useContext} from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/material/FormControl';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import DialogActions from '@mui/material/DialogActions';
import { createDeals } from '../../utils/createDeal'
import './index.css'
import {Context} from "../../../../App";

export const CreateDeal = () => {
    const currentdate = new Date();
    const datetime =  currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear() + "   "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    const [openModal, setOpenModal] = React.useState(false);
    const [valueDeal, setValueDeal] = useState('');
    const [date, setDate] = useState( datetime);
    const [context, setContext] = useContext(Context);

    const { setNotify } = context

    const handleChangeValueDeal = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueDeal(event.target.value);
    };

    const handleChangeEmpty = () => null

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const onSaveRow = () => {
        const deal = {
            value: Number(valueDeal),
            // TODO with local time zone
            date: new Date(currentdate.getTime() - currentdate.getTimezoneOffset() * 60000).toISOString()
        };

        createDeals({deal, page: 1, setContext, setNotify })

        setOpenModal(false);
    };

    return (
        <div className="newDeal">
            <Button variant="contained" onClick={handleOpen}>
                <AddIcon /> <span>New deal</span>
            </Button>

            <Dialog className="modalContainer" maxWidth="md" open={openModal} onClose={handleClose}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <span>New Deal</span>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <div className="containerContent">
                        <div className="inputForm">
                            <FormControl sx={{ m: 1, width: 320 }}>
                                <div className="containerTranslate">
                                    <InputLabel shrink htmlFor="select-multiple-native">
                                        <span>date</span>
                                    </InputLabel>
                                </div>
                                <TextField disabled variant="outlined" value={date} onChange={handleChangeEmpty}></TextField>

                            </FormControl>
                        </div>

                        <div className="inputForm">
                            <FormControl sx={{ m: 1, width: 320 }}>
                                <div className="containerTranslate">
                                      <span>value</span>
                                </div>
                                <TextField type="number" variant="outlined" value={valueDeal} onChange={handleChangeValueDeal}></TextField>
                            </FormControl>
                        </div>
                    </div>
                </DialogContent>

                <DialogActions>
                    <div className="buttonContainer">
                        <div className="button">
                            <Button variant="text" onClick={handleClose}>
                                Cancel
                            </Button>
                        </div>

                        <Button variant="contained" onClick={onSaveRow}>
                            Save
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}
