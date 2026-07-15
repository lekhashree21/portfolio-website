import { Router, type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
}

// Placeholder for future admin authentication.
// To enable: send `Authorization: Bearer <token>` where the token
// is signed with JWT_SECRET containing `{ id: <adminId> }`.
export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as {
      id: string;
    };
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Apply to protected routes (e.g., creating/updating/deleting projects)
export const adminRouter = Router();
adminRouter.use(authMiddleware);
