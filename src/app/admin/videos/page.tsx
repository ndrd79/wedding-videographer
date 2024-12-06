'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Trash2, Plus, Star } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  youtubeUrl: string;
  category: 'WEDDING' | 'PREWEDDING' | 'CORPORATE';
  featured: boolean;
  order: number;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar sessão
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const session = await response.json();
        console.log('Detalhes da sessão:', {
          email: session?.user?.email,
          role: session?.user?.role,
          isAuthenticated: !!session?.user
        });
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
      }
    };
    checkSession();
  }, []);

  // Fetch videos
  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos');
      if (response.ok) {
        const data = await response.json();
        setVideos(data);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Delete video
  const deleteVideo = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este vídeo?')) return;

    try {
      const response = await fetch(`/api/videos?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setVideos(videos.filter(video => video.id !== id));
      }
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  // Edit video
  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    setIsEditing(true);
  };

  // Create new video
  const handleCreate = () => {
    setEditingVideo({
      id: '',
      title: '',
      description: '',
      thumbnailUrl: '',
      youtubeUrl: '',
      category: 'WEDDING',
      featured: false,
      order: videos.length,
    });
    setIsEditing(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-300"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Vídeos</h1>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          Novo Vídeo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-lg overflow-hidden"
          >
            {/* Thumbnail */}
            <div className="aspect-video relative">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              {video.featured && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Star size={14} />
                  Destaque
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{video.title}</h3>
                <span className="text-sm px-2 py-1 bg-gray-700 rounded-full">
                  {video.category}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4">{video.description}</p>
              
              {/* Actions */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleEdit(video)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => deleteVideo(video.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">
              {editingVideo?.id ? 'Editar Vídeo' : 'Novo Vídeo'}
            </h2>

            <form onSubmit={async (e) => {
              e.preventDefault();
              if (!editingVideo) return;

              try {
                const method = editingVideo.id ? 'PUT' : 'POST';
                const url = editingVideo.id ? `/api/videos?id=${editingVideo.id}` : '/api/videos';

                console.log('Enviando vídeo:', editingVideo);

                const response = await fetch(url, {
                  method,
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(editingVideo),
                });

                console.log('Status da resposta:', response.status);
                const data = await response.json();
                console.log('Resposta:', data);

                if (response.ok) {
                  fetchVideos();
                  setIsEditing(false);
                  setEditingVideo(null);
                } else {
                  alert(data.error || 'Erro ao salvar vídeo');
                }
              } catch (error) {
                console.error('Error saving video:', error);
                alert('Erro ao salvar vídeo');
              }
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={editingVideo?.title || ''}
                  onChange={(e) => setEditingVideo(prev => prev ? {...prev, title: e.target.value} : null)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Descrição
                </label>
                <textarea
                  value={editingVideo?.description || ''}
                  onChange={(e) => setEditingVideo(prev => prev ? {...prev, description: e.target.value} : null)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  URL da Thumbnail
                </label>
                <input
                  type="url"
                  value={editingVideo?.thumbnailUrl || ''}
                  onChange={(e) => setEditingVideo(prev => prev ? {...prev, thumbnailUrl: e.target.value} : null)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  URL do YouTube
                </label>
                <input
                  type="url"
                  value={editingVideo?.youtubeUrl || ''}
                  onChange={(e) => setEditingVideo(prev => prev ? {...prev, youtubeUrl: e.target.value} : null)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Categoria
                </label>
                <select
                  value={editingVideo?.category || 'WEDDING'}
                  onChange={(e) => setEditingVideo(prev => prev ? {...prev, category: e.target.value as Video['category']} : null)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                >
                  <option value="WEDDING">Casamento</option>
                  <option value="PREWEDDING">Pré-Wedding</option>
                  <option value="CORPORATE">Corporativo</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={editingVideo?.featured || false}
                  onChange={(e) => setEditingVideo(prev => prev ? {...prev, featured: e.target.checked} : null)}
                  className="w-4 h-4"
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  Destaque
                </label>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingVideo(null);
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
