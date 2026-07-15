import { Router, type Request, type Response } from 'express';
import { Project } from '../models/Project.js';

const router = Router();

// GET /api/projects — list all projects (public)
router.get('/', async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ sortOrder: 1, createdAt: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET /api/projects/:id — get a single project (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// POST /api/projects — create a project (protected — wire authMiddleware when admin is ready)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, tech, features, imageUrl, githubUrl, demoUrl, sortOrder } =
      req.body;
    if (!title || !description) {
      res.status(400).json({ error: 'Title and description are required' });
      return;
    }
    const project = new Project({
      title,
      description,
      tech: tech || [],
      features: features || [],
      imageUrl: imageUrl || null,
      githubUrl: githubUrl || null,
      demoUrl: demoUrl || null,
      sortOrder: sortOrder ?? 0,
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// PUT /api/projects/:id — update a project (protected)
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE /api/projects/:id — delete a project (protected)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;
