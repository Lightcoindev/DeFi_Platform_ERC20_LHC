
import { Box,Radio } from "@material-ui/core";
import React, { useEffect } from 'react';
import { useStore } from "../store";

// import '../styles/index.scss';

function Transaction(props) {
    const [paymentValue, setPaymentValue] = React.useState('ETH');
    const [cryptoAmountValue, setCryptoAmount] = React.useState('0');
    const { paymentMethod, setPaymentMethod, setTokenAmount, lhcAmount, cryptoAmount } = useStore();

    useEffect(() => {
        setPaymentMethod(paymentValue)
    }, [])

    const handleChangePaymentMethod = async (event) => {
        setPaymentMethod(event.target.value);
        setTokenAmount(cryptoAmount, event.target.value);
    };
    const handleChangeAmount = (event) => {
        setTokenAmount(event.target.value, paymentMethod);
    };

    return  <Box className='card-content'>
                <Box className='grey-border1' mt={2} pb={1.3}>
                    <Box className='font4' component='span'>Amount in LHC:</Box>
                    <input className='card-input font4 text-right' defaultValue='0' onChange={handleChangeAmount}/>
                </Box>
                <Box className='grey-border1' mt={2} pb={1.3}>
                    <Box className='font4' component='span'>Payment method:</Box>
                    <Box className='float-right radio-group font4'>
                        <Radio
                            checked={paymentMethod === 'ETH'}
                            onChange={handleChangePaymentMethod}
                            value="ETH"
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'A' }}
                        />
                        <Box component='span'>ETH</Box>
                        <Radio
                            checked={paymentMethod === 'USDT'}
                            onChange={handleChangePaymentMethod}
                            value="USDT"
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'B' }}
                        />
                        <Box component='span'>USDT</Box>
                    </Box>
                </Box>
                <Box className='grey-border1' mt={2} pb={1.3}>
                    <Box className='font4' component='span'>Amount in crypto:</Box>
                    <Box className='float-right' component='span'>
                        <Box component='span'>{cryptoAmount}</Box>{'\u00a0'}
                        <Box className='eth-string' component='span'>{paymentMethod}</Box>
                    </Box>
                </Box>
            </Box>
    ;
}

export default Transaction;