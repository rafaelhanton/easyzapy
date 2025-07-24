import React, { useContext, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Formik, Form } from "formik";

import AddressForm from "./Forms/AddressForm";
import Pricing from "./Forms/Pricing";
import PaymentForm from "./Forms/PaymentForm";
import ReviewOrder from "./ReviewOrder";
import CheckoutSuccess from "./CheckoutSuccess";

import api from "../../services/api";
import toastError from "../../errors/toastError";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/Auth/AuthContext";


import validationSchema from "./FormModel/validationSchema";
import checkoutFormModel from "./FormModel/checkoutFormModel";
import formInitialValues from "./FormModel/formInitialValues";

import useStyles from "./styles";
import Invoices from "../../pages/Financeiro";


export default function CheckoutPage(props) {
  const steps = ["Plano", "Pagamento", "Revisar"];
  const { formId, formField } = checkoutFormModel;
  
  
  
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [datePayment, setDatePayment] = useState(null);
  const [invoiceId, setinvoiceId] = useState(props.Invoice?.id ?? null);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const { user } = useContext(AuthContext);

function _renderStepContent(step, setFieldValue, setActiveStep, values ) {

  switch (step) {
    case 0:
      return <Pricing 
        formField={formField} 
        setFieldValue={setFieldValue} 
        setActiveStep={setActiveStep} 
        activeStep={step} 
        values={values}
      />;
    case 1:
      return <PaymentForm 
        formField={formField} 
        setFieldValue={setFieldValue} 
      />;
    case 2:
      return <ReviewOrder />;
    default:
      return <div>Not Found</div>;
  }
}


  async function _submitForm(values, actions) {
    try {
      const plan = JSON.parse(values.plan);
      const newValues = {
        ...values,
        plan: values.plan,
        price: plan.price,
        users: plan.users,
        connections: plan.connections,
        invoiceId: invoiceId,
        sourceId: values.sourceId,
      }

      const { data } = await api.post("/subscription", newValues);
      setDatePayment(data)
      setActiveStep(activeStep + 1);
      actions.setSubmitting(false);
      toast.success("Assinatura realizada com sucesso!, aguardando a realização do pagamento");
    } catch (err) {
      toastError(err);
    }
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      if (!values.sourceId) {
        toastError({ message: "Por favor, preencha os dados do cartão e aguarde a verificação." });
        actions.setSubmitting(false);
        return;
      }
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <React.Fragment>
      
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {activeStep === steps.length ? (
          <CheckoutSuccess payment={datePayment} />
        ) : (
          <Formik
            initialValues={{
              ...user, 
              ...formInitialValues
            }}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form id={formId}>
                {_renderStepContent(activeStep, setFieldValue, setActiveStep, values)}

                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={_handleBack} className={classes.button}>
                      VOLTAR
                    </Button>
                  )}
                  <div className={classes.wrapper}>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      {isLastStep ? "PAGAR" : "PRÓXIMO"}
                    </Button>
                    {isSubmitting && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </React.Fragment>
    </React.Fragment>
  );
}
