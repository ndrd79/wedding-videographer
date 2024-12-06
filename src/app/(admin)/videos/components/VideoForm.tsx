'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

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

interface VideoFormProps {
  initialData?: Video | null;
  onSubmit: (data: Partial<Video>) => void;
  onCancel: () => void;
}

const CATEGORIES = [
  'Casamento',
  'Pré-Wedding',
  'Ensaio',
  'Evento',
  'Outro'
];

export default function VideoForm({ initialData, onSubmit, onCancel }: VideoFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    thumbnail: '',
    category: CATEGORIES[0],
    featured: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        youtubeUrl: initialData.youtubeUrl,
        thumbnail: initialData.thumbnail,
        category: initialData.category,
        featured: initialData.featured,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const extractYouTubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^"&?\/\s]{11})/);
    return match?.[1] || '';
  };

  const handleYouTubeUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    const videoId = extractYouTubeId(url);
    setFormData(prev => ({
      ...prev,
      youtubeUrl: url,
      thumbnail: videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : prev.thumbnail
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <button
        type="button"
        onClick={onCancel}
        className="absolute right-0 top-0 p-2 text-gray-400 hover:text-white transition-colors"
      >
        <X size={24} />
      </button>

      <h2 className="text-2xl font-bold mb-6 text-white">
        {initialData ? 'Editar Vídeo' : 'Novo Vídeo'}
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Descrição</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white h-32"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">URL do YouTube</label>
          <input
            type="url"
            name="youtubeUrl"
            value={formData.youtubeUrl}
            onChange={handleYouTubeUrlChange}
            className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Categoria</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
          >
            {CATEGORIES.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="w-4 h-4 bg-gray-700 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label className="text-sm font-medium text-gray-300">Destacar este vídeo</label>
        </div>

        {formData.thumbnail && (
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Preview da Thumbnail</label>
            <img
              src={formData.thumbnail}
              alt="Thumbnail preview"
              className="w-48 h-32 object-cover rounded-lg"
            />
          </div>
        )}

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition-colors"
          >
            {initialData ? 'Salvar' : 'Criar'}
          </button>
        </div>
      </div>
    </form>
  );
}
