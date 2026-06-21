import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, CalendarDays, CheckCircle2, ListTodo, Plus, Timer } from 'lucide-react';
import {
  Alert,
  Button,
  Card,
  Input,
  KanbanBoard,
  LoadingSpinner,
  Modal,
  Select,
  StatCard,
  TextArea,
} from '@/components';
import { projectService, taskService } from '@/services/api';
import { Project, Task } from '@/types';
import { formatDate } from '@/utils';

type TaskStatus = 'todo' | 'in_progress' | 'completed';

const statusOptions = [
  { value: 'todo', label: 'Todo' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

export const ProjectDetailsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const data = await projectService.getById(Number(projectId));
      setProject(data);
      setTasks(data.tasks || []);
    } catch {
      setError('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (event: React.FormEvent) => {
    event.preventDefault();
    setCreating(true);
    setError('');

    try {
      const newTask = await taskService.create({
        title,
        description,
        status,
        project_id: Number(projectId),
      });
      setTasks((currentTasks) => [...currentTasks, newTask]);
      setTitle('');
      setDescription('');
      setStatus('todo');
      setIsModalOpen(false);
      toast.success('Task created');
    } catch {
      setError('Failed to create task');
      toast.error('Could not create task');
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateTask = async (taskId: number, newStatus: TaskStatus) => {
    const previousTasks = tasks;
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    );

    try {
      await taskService.update(taskId, { status: newStatus });
      toast.success('Task moved');
    } catch {
      setTasks(previousTasks);
      setError('Failed to update task');
      toast.error('Could not update task');
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await taskService.delete(taskId);
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
      toast.success('Task deleted');
    } catch {
      setError('Failed to delete task');
      toast.error('Could not delete task');
    }
  };

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.status === 'completed').length;
    const active = tasks.filter((task) => task.status === 'in_progress').length;
    const todo = tasks.filter((task) => task.status === 'todo').length;
    const rate = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;

    return { completed, active, todo, rate };
  }, [tasks]);

  if (loading) return <LoadingSpinner fullScreen label="Loading project" />;

  if (!project) {
    return (
      <main className="app-page">
        <div className="app-container">
          <Alert type="warning" message={error || 'Project not found'} />
        </div>
      </main>
    );
  }

  return (
    <main className="app-page">
      <div className="app-container space-y-8">
        <div className="flex flex-col gap-5">
          <Link to="/projects" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Kanban workspace</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{project.title}</h1>
              {project.description && <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{project.description}</p>}
              <p className="mt-3 inline-flex items-center gap-2 text-sm text-slate-500">
                <CalendarDays className="h-4 w-4" />
                Created {formatDate(project.created_at)}
              </p>
            </div>
            <Button icon={<Plus className="h-4 w-4" />} onClick={() => setIsModalOpen(true)}>
              Add task
            </Button>
          </div>
        </div>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Tasks" value={tasks.length} icon={<ListTodo className="h-5 w-5" />} trend="Project scope" />
          <StatCard label="In Progress" value={stats.active} icon={<Timer className="h-5 w-5" />} trend="Currently moving" />
          <StatCard label="Completed" value={stats.completed} icon={<CheckCircle2 className="h-5 w-5" />} trend={`${stats.rate}% completion rate`} />
          <StatCard label="Backlog" value={stats.todo} icon={<ListTodo className="h-5 w-5" />} trend="Ready to start" />
        </div>

        <Card className="p-4 sm:p-5">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Workflow</p>
              <h2 className="mt-1 text-xl font-semibold text-white">Task board</h2>
            </div>
            <span className="text-sm text-slate-500">Drag cards between columns or update status directly.</span>
          </div>
          <KanbanBoard
            tasks={tasks}
            onStatusChange={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onCreateTask={() => setIsModalOpen(true)}
          />
        </Card>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create new task">
          <form onSubmit={handleCreateTask} className="space-y-4">
            <Input
              label="Task title"
              placeholder="Implement analytics widget"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
            <TextArea
              label="Description"
              placeholder="Add acceptance criteria or implementation notes"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
            />
            <Select
              label="Status"
              value={status}
              onChange={(event) => setStatus(event.target.value as TaskStatus)}
              options={statusOptions}
            />
            <Button className="w-full" loading={creating} disabled={creating}>
              Create task
            </Button>
          </form>
        </Modal>
      </div>
    </main>
  );
};
