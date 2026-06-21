import React from 'react';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import { Button } from './Button';
import { EmptyState } from './EmptyState';
import { Select } from './Select';
import { formatDate, getStatusLabel } from '@/utils';

type TaskStatus = 'todo' | 'in_progress' | 'completed';

interface KanbanTask {
  id: number;
  title: string;
  description?: string;
  status: string;
  created_at: string;
}

interface KanbanBoardProps {
  tasks: KanbanTask[];
  onStatusChange: (taskId: number, status: TaskStatus) => Promise<void> | void;
  onDeleteTask: (taskId: number) => void;
  onCreateTask: () => void;
}

const columns: { id: TaskStatus; title: string; accent: string }[] = [
  { id: 'todo', title: 'Todo', accent: 'bg-slate-400' },
  { id: 'in_progress', title: 'In Progress', accent: 'bg-primary' },
  { id: 'completed', title: 'Completed', accent: 'bg-emerald-400' },
];

const statusOptions = columns.map((column) => ({ value: column.id, label: column.title }));

const SortableTaskCard: React.FC<{
  task: KanbanTask;
  onStatusChange: (taskId: number, status: TaskStatus) => Promise<void> | void;
  onDeleteTask: (taskId: number) => void;
}> = ({ task, onStatusChange, onDeleteTask }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: 'task', status: task.status },
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`rounded-lg border border-slate-700 bg-slate-900/95 p-4 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:border-slate-500 ${
        isDragging ? 'opacity-60 ring-2 ring-primary/40' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          className="mt-0.5 rounded p-1 text-slate-500 hover:bg-slate-800 hover:text-slate-200"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="min-w-0 flex-1">
          <h3 className="break-words text-sm font-semibold text-white">{task.title}</h3>
          {task.description && <p className="mt-2 line-clamp-3 text-sm text-slate-400">{task.description}</p>}
          <p className="mt-3 text-xs text-slate-500">Created {formatDate(task.created_at)}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Select
          aria-label={`Status for ${task.title}`}
          value={task.status}
          options={statusOptions}
          onChange={(event) => onStatusChange(task.id, event.target.value as TaskStatus)}
          className="py-1.5 text-xs"
        />
        <Button
          variant="ghost"
          size="sm"
          icon={<Trash2 className="h-4 w-4" />}
          onClick={() => onDeleteTask(task.id)}
          className="shrink-0 px-2 text-red-300 hover:bg-red-500/10 hover:text-red-200"
        >
          Delete
        </Button>
      </div>
    </article>
  );
};

const KanbanColumn: React.FC<{
  id: TaskStatus;
  title: string;
  accent: string;
  tasks: KanbanTask[];
  onStatusChange: (taskId: number, status: TaskStatus) => Promise<void> | void;
  onDeleteTask: (taskId: number) => void;
}> = ({ id, title, accent, tasks, onStatusChange, onDeleteTask }) => {
  const { setNodeRef, isOver } = useDroppable({ id, data: { type: 'column', status: id } });

  return (
    <section
      ref={setNodeRef}
      className={`flex min-h-[28rem] flex-col rounded-lg border bg-slate-950/30 p-3 transition ${
        isOver ? 'border-primary/70 ring-2 ring-primary/20' : 'border-slate-800'
      }`}
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${accent}`} />
          <h2 className="text-sm font-semibold text-white">{title}</h2>
        </div>
        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs font-semibold text-slate-300">
          {tasks.length}
        </span>
      </div>
      <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-1 flex-col gap-3">
          {tasks.map((task) => (
            <SortableTaskCard
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onDeleteTask={onDeleteTask}
            />
          ))}
          {tasks.length === 0 && (
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-slate-800 p-6 text-center text-sm text-slate-500">
              Drop tasks into {getStatusLabel(id).toLowerCase()}.
            </div>
          )}
        </div>
      </SortableContext>
    </section>
  );
};

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tasks,
  onStatusChange,
  onDeleteTask,
  onCreateTask,
}) => {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    if (!activeTask) return;

    const overTask = tasks.find((task) => task.id === over.id);
    const nextStatus = (over.data.current?.status || overTask?.status) as TaskStatus | undefined;

    if (nextStatus && activeTask.status !== nextStatus) {
      onStatusChange(activeTask.id, nextStatus);
    }
  };

  if (tasks.length === 0) {
    return (
      <EmptyState
        title="No tasks yet"
        description="Create a first task to start shaping this project into a visible delivery pipeline."
        actionLabel="Create task"
        onAction={onCreateTask}
      />
    );
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="grid gap-4 xl:grid-cols-3">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            accent={column.accent}
            tasks={tasks.filter((task) => task.status === column.id)}
            onStatusChange={onStatusChange}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </DndContext>
  );
};
