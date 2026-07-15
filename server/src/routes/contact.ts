import { Router, type Request, type Response } from 'express';
import { ContactMessage } from '../models/ContactMessage.js';
import { contactLimiter } from '../middleware/rateLimit.js';

const router = Router();

// POST /api/contact — submit a contact message (public, rate-limited)
router.post('/', contactLimiter, async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      res.status(400).json({ error: 'Name, email, and message are required' });
      return;
    }
    const contactMessage = new ContactMessage({ name, email, message });
    await contactMessage.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      res.status(400).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Failed to submit message' });
  }
});

// GET /api/contact — list all messages (protected — wire authMiddleware when admin is ready)
router.get('/', async (_req: Request, res: Response) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// DELETE /api/contact/:id — delete a message (protected)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) {
      res.status(404).json({ error: 'Message not found' });
      return;
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

export default router;
