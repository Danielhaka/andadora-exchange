import axios from 'axios';
import { FLUTTERWAVE_SECRET_KEY } from '@env';

const baseURL = 'https://api.flutterwave.com/v3';

export const validateAccountNumber = async (account_number, bank_code) => {
  const res = await axios.get(`${baseURL}/accounts/resolve`, {
    params: { account_number, bank_code },
    headers: { Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}` },
  });
  return res.data;
};

export const initiateWithdrawal = async ({ amount, accountNumber, bankCode, accountName }) => {
  const res = await axios.post(
    `${baseURL}/transfers`,
    {
      account_bank: bankCode,
      account_number: accountNumber,
      amount,
      narration: 'Andadora Exchange Withdrawal',
      currency: 'NGN',
      beneficiary_name: accountName,
    },
    {
      headers: { Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}` },
    }
  );
  return res.data;
};
