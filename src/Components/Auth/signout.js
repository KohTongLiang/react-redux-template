import React, { useState } from 'react';
import { connect } from 'react-redux';

// import material ui components
import {
    Button
} from '@material-ui/core';

// import redux components
import { signOut } from '../../Action/auth';

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut()),
    }
}

function SignOut(props) {
    return (
        <div>
            <Button onClick={() => props.signOut()}>Sign Out</Button>
        </div>
    );
}

export default connect(null, mapDispatchToProps)(SignOut);