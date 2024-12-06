'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
      className="bg-gray-800 rounded-lg overflow-hidden group hover:ring-2 hover:ring-[#D4AF37]/30 transition-all duration-300"
    >
      {/* Thumbnail e Overlay */}
      <div className="relative aspect-video">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={onEdit}
            className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 p-2 rounded-full text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
        {/* Handle de arraste */}
        <div
          className="absolute top-2 right-2 cursor-move opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          {...attributes}
          {...listeners}
        >
          <div className="bg-black/50 p-1.5 rounded-full text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="12" r="1" />
              <circle cx="9" cy="5" r="1" />
              <circle cx="9" cy="19" r="1" />
              <circle cx="15" cy="12" r="1" />
              <circle cx="15" cy="5" r="1" />
              <circle cx="15" cy="19" r="1" />
            </svg>
          </div>
        </div>
        {video.featured && (
          <div className="absolute top-2 left-2 bg-[#D4AF37] text-black px-2 py-1 rounded text-xs font-medium">
            Destaque
          </div>
        )}
      </div>

      {/* Informações do Vídeo */}
      <div className="p-4">
        <h3 className="text-lg font-medium text-white mb-2 line-clamp-1">{video.title}</h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{video.description}</p>
        <div className="flex items-center justify-between">
          <span className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">
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
    </div>
  );
}
