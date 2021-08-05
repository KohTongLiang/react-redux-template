import React from 'react';

// import material ui components
import { Typography, Grid } from '@material-ui/core';
// import { AccountCircle, Menu as MenuIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

// import constants
import { LANDING_PAGE_DESCRIPTION, LANDING_PAGE_TITLE } from '../../Constants/values';
import { STYLE } from '../../Constants/styles';

const useStyles = makeStyles((theme) => (STYLE));

function Home (props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '80vh' }}>
                <Grid item xs={10} md={8}>
                    <Typography variant='h2'>
                        { LANDING_PAGE_TITLE }
                    </Typography>
                    <Typography variant='body1'>
                        { LANDING_PAGE_DESCRIPTION }
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home;