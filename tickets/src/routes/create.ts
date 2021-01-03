import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@mtickets/common';
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
  validateRequest
];

router.post('/api/tickets', ...middlewares, async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save();

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
