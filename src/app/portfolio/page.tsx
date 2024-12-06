'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Star } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: 'WEDDING' | 'PREWEDDING' | 'CORPORATE';
  featured: boolean;
  order: number;
}

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch videos
  useEffect(() => {
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

    fetchVideos();
  }, []);

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'WEDDING', label: 'Casamentos' },
    { id: 'PREWEDDING', label: 'Pré-Wedding' },
    { id: 'CORPORATE', label: 'Corporativo' },
  ];

  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter(video => video.category === selectedCategory);

  // Separate featured videos
  const featuredVideos = filteredVideos.filter(video => video.featured);
  const regularVideos = filteredVideos.filter(video => !video.featured);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background pattern */}
      <div 
        className="fixed inset-0 opacity-10 bg-repeat"
        style={{
          backgroundImage: 'url("/images/pattern.png")',
          backgroundSize: '100px 100px'
        }}
      />

      {/* Content container */}
      <div className="relative">
        {/* Hero Section */}
        <section className="relative py-32">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white font-serif">
                Nosso Portfólio
              </h1>
              <p className="text-xl text-gray-300">
                Explore nossa coleção de momentos únicos e emocionantes que capturamos ao longo dos anos.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105
                    ${selectedCategory === category.id
                      ? 'bg-gradient-to-r from-amber-600 to-amber-400 text-white shadow-lg hover:shadow-amber-500/50'
                      : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20'
                    }
                  `}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Featured Videos */}
            {featuredVideos.length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center text-white font-serif">
                  Destaques
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredVideos.map((video) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="group relative"
                    >
                      <div className="relative overflow-hidden rounded-xl aspect-video">
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <button
                            onClick={() => setSelectedVideo(video)}
                            className="bg-amber-500 p-4 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"
                          >
                            <Play className="w-6 h-6 text-white" />
                          </button>
                        </div>
                        {video.featured && (
                          <div className="absolute top-4 right-4">
                            <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                          </div>
                        )}
                      </div>
                      <div className="mt-4">
                        <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors duration-300">
                          {video.title}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                          {video.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Videos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularVideos.map((video) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="group relative"
                >
                  <div className="relative overflow-hidden rounded-xl aspect-video">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={() => setSelectedVideo(video)}
                        className="bg-amber-500 p-4 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"
                      >
                        <Play className="w-6 h-6 text-white" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors duration-300">
                      {video.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {video.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              Fechar
            </button>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src={selectedVideo.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
