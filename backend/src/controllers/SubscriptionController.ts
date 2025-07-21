import { Request, Response } from "express";
import express from "express";
import * as Yup from "yup";
import { SquareClient } from "square";
import { v4 as uuidv4 } from "uuid";
// import Gerencianet from "gn-api-sdk-typescript";
import AppError from "../errors/AppError";

// import squareConfig from "../config/square";
// import options from "../config/Gn";
import Company from "../models/Company";
import Invoices from "../models/Invoices";
import Subscriptions from "../models/Subscriptions";
import { getIO } from "../libs/socket";
import UpdateUserService from "../services/UserServices/UpdateUserService";

const app = express();

import squareConfig from "../config/square";

const client = new SquareClient({
  token: squareConfig.accessToken,
  environment: squareConfig.environment as 'sandbox' | 'production',
});

export const index = async (req: Request, res: Response): Promise<Response> => {
  // const gerencianet = Gerencianet(options);
  // return res.json(gerencianet.getSubscriptions());
  return res.json({ message: "Not implemented" });
};

export const createSubscription = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { companyId } = req.user;
  const { sourceId, price, invoiceId, plan } = req.body;

  try {
    const response = await client.payments.create({
      idempotencyKey: uuidv4(),
      sourceId: sourceId,
      amountMoney: {
        amount: BigInt(Math.trunc(price * 100)),
        currency: "BRL",
      },
      orderId: invoiceId,
    });

    return res.json(response.payment);
  } catch (error) {
    console.log(error);
    throw new AppError("Payment fails", 400);
  }
};



export const webhook = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { body } = req;

  if (body.type === "payment.updated") {
    const payment = body.data.object.payment;

    if (payment.status === "COMPLETED") {
      const invoiceID = payment.order_id;
      const invoices = await Invoices.findByPk(invoiceID);
      const companyId = invoices.companyId;
      const company = await Company.findByPk(companyId);

      const expiresAt = new Date(company.dueDate);
      expiresAt.setDate(expiresAt.getDate() + 30);
      const date = expiresAt.toISOString().split("T")[0];

      if (company) {
        await company.update({
          dueDate: date,
        });
        await invoices.update({
          id: invoiceID,
          status: "paid",
        });
        await company.reload();
        const io = getIO();
        const companyUpdate = await Company.findOne({
          where: {
            id: companyId,
          },
        });

        io.emit(`company-${companyId}-payment`, {
          action: payment.status,
          company: companyUpdate,
        });
      }
    }
  }

  return res.json({ ok: true });
};
