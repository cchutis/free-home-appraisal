import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function PDFButton(props) {
    const classes = useStyles();
    return (
        <div className="download-section">
            <Button 
                onClick={props.savePage}
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}>
                <span role="img" aria-label="save">💾</span> &nbsp; Download PDF
            </Button>
        </div>
    )
}
