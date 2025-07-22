import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { CreditCard, PaymentForm as SquarePaymentForm } from 'react-square-web-payments-sdk';

const PaymentForm = ({ setFieldValue }) => {
  const appId = process.env.REACT_APP_SQUARE_APP_ID;
  const locationId = process.env.REACT_APP_SQUARE_LOCATION_ID;

  if (!appId || !locationId) {
    return (
      <Typography color="error">
        O formulário de pagamento não pôde ser carregado. Por favor, verifique as configurações do ambiente.
      </Typography>
    );
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Pagamento com Cartão de Crédito
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SquarePaymentForm
            applicationId={appId}
            locationId={locationId}
            cardTokenizeResponseReceived={(token, verifiedBuyer) => {
              setFieldValue('sourceId', token.token);
            }}
          >
            <CreditCard />
          </SquarePaymentForm>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PaymentForm;
