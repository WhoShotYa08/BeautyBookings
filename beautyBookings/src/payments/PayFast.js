import React, { useState } from "react"
import { Button } from "react-native"
import Payfast from 'react-native-payfast-plugin';

export default function Payment({ route }) {

    const {placeholder, cvv, expire} = route.params;
    console.log(placeholder, cvv, expire);
    return (
        <Payfast
            data={{
                merchantDetails: {
                    merchant_id: "10031584",
                    merchant_key: "5n52c1qu5501c",
                    notify_url: "https://webhook.site/f30e4b32-15b5-44e6-ae0b-c75486b8797d",
                },
                customerDetails: {
                    name_first: "First Name",
                    name_last: "Last Name",
                    email_address: "firstname@gmail.com",
                    cell_number: "0885123456",
                },
                transactionDetails: {
                    m_payment_id: "1234",
                    amount: "10.00",
                    item_name: "Item Name",
                    item_description: "Item Description",
                },
                transactionOptions: {
                    email_confirmation: 0,
                    confirmation_address: "firstname@gmail.com",
                },
            }}

            sandbox={true}
            passphrase="thisisatestforthe"

            onCancel={(data) => {
                console.log("Payment cancelled: ", data.transaction_id);
            }}

            onMessage={(message) => {
                console.log(message);
            }}

            onSuccess={({ data, transaction_id }) => {
                console.log(transaction_id);
            }}

            onClose={() => {
                console.log("Payment closed");
            }}
        />
    )
}