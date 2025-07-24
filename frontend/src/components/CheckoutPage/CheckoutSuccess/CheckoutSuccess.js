import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { SuccessContent, Total } from './style';
import { socketConnection } from "../../../services/socket";
import { useDate } from "../../../hooks/useDate";
import { toast } from "react-toastify";
import { Typography } from '@material-ui/core';

function CheckoutSuccess(props) {

  const { payment } = props; // Agora esperamos um objeto de pagamento do Square
  const history = useHistory();
  const { dateToClient } = useDate();

  useEffect(() => {
    const companyId = localStorage.getItem("companyId");
    const socket = socketConnection({ companyId });
    socket.on(`company-${companyId}-payment`, (data) => {
      if (data.action === "COMPLETED") { // Usar o status COMPLETED do Square
        toast.success(`Sua licença foi renovada até ${dateToClient(data.company.dueDate)}!`);
        setTimeout(() => {
          history.push("/");
        }, 4000);
      }
    });
  }, [history, dateToClient]);

  return (
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center">
        Parabéns!
      </Typography>
      <Total>
        <Typography variant="h6" gutterBottom>
          Pagamento Realizado com Sucesso!
        </Typography>
        {payment && payment.amountMoney && (
          <strong>
            {payment.amountMoney.currency} {Number(payment.amountMoney.amount / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </strong>
        )}
      </Total>
      <SuccessContent>
        <Typography variant="body1">
          Seu pagamento foi processado com sucesso. Agradecemos sua assinatura!
        </Typography>
        {payment && (
          <Typography variant="body2" color="textSecondary">
            ID da Transação: {payment.id}
          </Typography>
        )}
      </SuccessContent>
    </React.Fragment>
  );
}

export default CheckoutSuccess;
