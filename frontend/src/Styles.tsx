//#region Wrappers and backgrounds
export const wrapperStyle = {
    height: 'vh',
    width: 'vw'
}
export const flexWrapperStyle = {
    height: '100vh',
    display:'flex',
    flexDirection: 'column'
} as const;
////
export const flex1ItemStyle = {
    flex: 1,
    height: '100%',
    padding: '5vmin'
}
////
export const backgroundStyle = {
    bgcolor: 'primary.light'
}
////
export const rearPaperStyle = {
    bgcolor: 'primary.light'
}
////
export const frontPaperStyle = {
    bgcolor: 'primary.main',
    m: '2vh'
}
//#endregion
//#region Text
export const titleStyle = {
    color: 'text.primary'
}
////
export const subTextStyle = {
    color: 'text.secondary'
}
////
export const primaryIconTextStyle = {
    color: 'text.primary',
    mr: '15px'
}
///
export const centeredTextStyle = {
    position: 'relative',
    left: '0',
    right: '0',
    textAlign: 'center'
}as const;
//#endregion
//#region Misc
export const switchStyle = {
        width: '28px',
        height: '16px',
        padding: '0px',
        display: 'flex',
        '&:active': {
        '& .MuiSwitch-thumb': {
            width: '15',
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },

    '& .MuiSwitch-switchBase': {
        padding: 2,
            '&.Mui-checked': {
            transform: 'translateX(12px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                opacity: 1,
                    bgcolor: 'secondary.main',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: '12px',
            height: '12px',
            borderRadius: '6px',
            transition(theme:any) {
                return theme.transitions.create(['width'], {
                    duration: 700,
                });
        },
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
            opacity: 1,
            bgcolor: (theme: any) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
            boxSizing: 'border-box',
    }
}
//#endregion