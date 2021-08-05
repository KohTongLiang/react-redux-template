import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { checkAuth } from '../../Action/auth';

const mapDispatchToProps = dispatch => {
    return {
      checkAuth: () => dispatch(checkAuth())
    }
}

function Auth(props)
{
    useEffect(() => {
        props.checkAuth()
    }) 

    return(
        <div></div>
    )
}

export default connect(null, mapDispatchToProps)(Auth);