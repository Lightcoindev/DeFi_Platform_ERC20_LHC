
import React from 'react';
import { Box } from "@material-ui/core";

import PeriodRow from './PeriodRow';
import { useStore } from "../store";

// import '../styles/index.scss';

function LockingPeriod(props) {

    const { lockPeriod, buy } = useStore();

    return  <Box>
                <PeriodRow unlimited={true} amountValue={props.amountValue} periodValue={lockPeriod} value="Buy unlocked LHC" lockValue={0}/>
                <PeriodRow amountValue={props.amountValue * 1.01} periodValue={lockPeriod} value="Lockup 1 month" lockValue={1} />
                <PeriodRow amountValue={props.amountValue * 1.05} periodValue={lockPeriod} value="Lockup 3 month" lockValue={2} />
                <PeriodRow amountValue={props.amountValue * 1.12} periodValue={lockPeriod} value="Lockup 6 month" lockValue={3} />
                <PeriodRow amountValue={props.amountValue * 1.3} periodValue={lockPeriod} value="Lockup 12 month" lockValue={4} />
                <Box className='text-center' mt={1}>
                    <button className='submit-btn font1' onClick={buy}>
                        BUY
                    </button>
                </Box>
            </Box>
    ;
}

export default LockingPeriod;