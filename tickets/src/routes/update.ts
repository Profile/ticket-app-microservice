import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from '@mtickets/common';
import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

const router = Router();

const validationSchema = [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
];

const middlewares = [
  requireAuth,
  validationSchema,
  validateRequest,
];

router.put('/api/tickets/:id', ...middlewares, async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    await ticket.save();

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
