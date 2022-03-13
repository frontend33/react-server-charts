import * as React from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect} from "react";
import Collapse from '@mui/material/Collapse';

export const TransitionAlerts = ({notify, setNotify}: { notify: boolean, setNotify: (value: boolean) => void }) => {
    useEffect(() => {
        setTimeout(() => setNotify(false),5000)
    },[notify])

    return (
        <Collapse in={notify}>
                <Alert
                    variant="filled" severity="success"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setNotify(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    Your deal was submit succesfully
                </Alert>
        </Collapse>

    );
}
