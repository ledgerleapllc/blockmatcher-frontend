import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 44,
        height: 20,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 3,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(24px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: '#A50D05',
                borderColor: '#A50D05',
            },
        },
    },
    thumb: {
        width: 14,
        height: 14,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 10,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

export default AntSwitch;