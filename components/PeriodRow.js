
import React from 'react';

import { Box, Grid, Radio } from "@material-ui/core";
import { useStore } from "../store";
// import '../styles/index.scss';

function PeriodRow(props) {

    const { setLockPeriod } = useStore();

    const handleChangePeriod = (event) => {
        setLockPeriod(event.target.value);
    };

    return  <Grid className='grey-border2' container spacing={3}>
                <Grid item md={6}>
                    <Radio
                        checked={props.periodValue == props.lockValue}
                        onChange={handleChangePeriod}
                        value={props.lockValue}
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                    <Box className='font4' component='span' pl={2.4}>{props.value}</Box>
                </Grid>
                <Grid className='text-right' item xs={12} sm={12} md={6}>
                    <Box className='font4' component='span' >You will receive {(props.unlimited) ? props.amountValue:parseFloat(props.amountValue).toFixed(2)} LHC</Box>
                </Grid>
            </Grid>
    ;
}

export default PeriodRow;