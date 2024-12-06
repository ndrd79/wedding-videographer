'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import VideoCard from './components/VideoCard';
import VideoForm from './components/VideoForm';

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

export default function VideosManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
    fetchVideos();
  }, [status, router]);

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos');
      const data = await response.json();
      setVideos(data.sort((a: Video, b: Video) => a.order - b.order));
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao carregar vídeos:', error);
      setIsLoading(false);
    }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setVideos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);
        
        // Update order in database
        fetch('/api/videos/reorder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newOrder.map((video, index) => ({
            id: video.id,
            order: index
          })))
        });

        return newOrder;
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este vídeo?')) {
      try {
        await fetch(`/api/videos/${id}`, { method: 'DELETE' });
        setVideos(videos.filter(video => video.id !== id));
      } catch (error) {
        console.error('Erro ao excluir vídeo:', error);
      }
    }
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    setShowForm(true);
  };

  const handleFormSubmit = async (videoData: Partial<Video>) => {
    try {
      const method = editingVideo ? 'PUT' : 'POST';
      const url = editingVideo ? `/api/videos/${editingVideo.id}` : '/api/videos';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(videoData)
      });

      if (response.ok) {
        fetchVideos();
        setShowForm(false);
        setEditingVideo(null);
      }
    } catch (error) {
      console.error('Erro ao salvar vídeo:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-300"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Gerenciar Vídeos</h1>
        <button
          onClick={() => {
            setEditingVideo(null);
            setShowForm(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white"
        >
          Adicionar Vídeo
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <VideoForm
              initialData={editingVideo}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingVideo(null);
              }}
            />
          </div>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={videos.map(v => v.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid gap-6">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onEdit={() => handleEdit(video)}
                onDelete={() => handleDelete(video.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
