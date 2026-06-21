import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowRight, FolderKanban, Plus, Trash2 } from 'lucide-react';
import { Alert, Button, Card, EmptyState, Input, Modal, Skeleton, TextArea } from '@/components';
import { projectService } from '@/services/api';
import { Project } from '@/types';
import { formatDate, truncateText } from '@/utils';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectService.getAll();
      setProjects(data);
    } catch {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (event: React.FormEvent) => {
    event.preventDefault();
    setCreating(true);
    setError('');

    try {
      const newProject = await projectService.create({ title, description });
      setProjects((currentProjects) => [...currentProjects, newProject]);
      setTitle('');
      setDescription('');
      setIsModalOpen(false);
      toast.success('Project created');
    } catch {
      setError('Failed to create project');
      toast.error('Could not create project');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectService.delete(id);
      setProjects((currentProjects) => currentProjects.filter((project) => project.id !== id));
      toast.success('Project deleted');
    } catch {
      setError('Failed to delete project');
      toast.error('Could not delete project');
    }
  };

  return (
    <main className="app-page">
      <div className="app-container space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Portfolio workspace</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Projects</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-400">
              Organize deliverables into polished project spaces with tasks, statuses, and progress.
            </p>
          </div>
          <Button icon={<Plus className="h-4 w-4" />} onClick={() => setIsModalOpen(true)}>
            New project
          </Button>
        </div>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create new project">
          <form onSubmit={handleCreateProject} className="space-y-4">
            <Input
              label="Project title"
              placeholder="Portfolio API redesign"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
            <TextArea
              label="Description"
              placeholder="Summarize the outcome, scope, or target workflow"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
            />
            <Button className="w-full" loading={creating} disabled={creating}>
              Create project
            </Button>
          </form>
        </Modal>

        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <Skeleton key={item} className="h-56" />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} className="flex min-h-56 flex-col">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FolderKanban className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-slate-700 px-2.5 py-1 text-xs font-medium text-slate-400">
                    {formatDate(project.created_at)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
                  {project.description ? truncateText(project.description, 132) : 'No description added yet.'}
                </p>
                <div className="mt-6 flex gap-2">
                  <Link
                    to={`/projects/${project.id}`}
                    className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-md bg-slate-900 px-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Open
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Trash2 className="h-4 w-4" />}
                    onClick={() => handleDeleteProject(project.id)}
                    className="px-3 text-red-300 hover:bg-red-500/10 hover:text-red-200"
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No projects yet"
            description="Create your first project and turn this dashboard into a living product management workspace."
            actionLabel="Create project"
            onAction={() => setIsModalOpen(true)}
          />
        )}
      </div>
    </main>
  );
};
