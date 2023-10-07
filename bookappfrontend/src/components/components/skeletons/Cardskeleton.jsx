import React from 'react'
// components
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton';

const Cardskeleton = ({ className }) => {
    return (
        <Stack spacing={1} sx={{
            padding: "10px"
        }} className={className}>
            <Skeleton variant="rounded" animation={"wave"} width={"100%"} height={170} />
            <Skeleton variant="rounded" animation={"wave"} width={"100%"} height={170} />
        </Stack>
    )
}

export default Cardskeleton