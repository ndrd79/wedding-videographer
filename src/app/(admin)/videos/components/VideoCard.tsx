'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  thumbnail: string;
  category: string;
  featured: boolean;
  order: number;
}

interface VideoCardProps {
  video: Video;
  onEdit: () => void;
  onDelete: () => void;
}

export default function VideoCard({ video, onEdit, onDelete }: VideoCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: video.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-800 rounded-lg overflow-hidden"
    >
      <div className="flex">
        {/* Handle de arraste */}
        <div
          className="bg-gray-700 px-4 flex items-center cursor-move hover:bg-gray-600 transition-colors"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={20} className="text-gray-400" />
        </div>

        <div className="flex-grow p-6 flex items-start gap-6">
          {/* Thumbnail */}
          <div className="flex-shrink-0 w-48 h-32 relative">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover rounded-lg"
            />
            {video.featured && (
              <span className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-sm font-semibold">
                Destaque
              </span>
            )}
          </div>

          {/* Conteúdo */}
          <div className="flex-grow">
            <h3 className="text-xl font-semibold mb-2 text-white">{video.title}</h3>
            <p className="text-gray-400 mb-2">{video.description}</p>
            <div className="flex items-center gap-4">
              <span className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">
                {video.category}
              </span>
              <a
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                Ver no YouTube
              </a>
            </div>
          </div>

          {/* Ações */}
          <div className="flex-shrink-0 flex gap-2">
            <button
              onClick={onEdit}
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-white transition-colors"
            >
              Editar
            </button>
            <button
              onClick={onDelete}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white transition-colors"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
