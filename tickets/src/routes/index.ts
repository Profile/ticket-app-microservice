import { Router, Request, Response } from 'express';
import { Ticket } from '../models/ticket';

const router = Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});

  res.send(tickets);
});

export { router as indexTicketRouter };
