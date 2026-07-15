import mongoose, { Schema, type Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  tech: string[];
  features: string[];
  imageUrl: string | null;
  githubUrl: string | null;
  demoUrl: string | null;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    tech: { type: [String], default: [] },
    features: { type: [String], default: [] },
    imageUrl: { type: String, default: null },
    githubUrl: { type: String, default: null },
    demoUrl: { type: String, default: null },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ProjectSchema.index({ sortOrder: 1 });

export const Project = mongoose.model<IProject>('Project', ProjectSchema);
