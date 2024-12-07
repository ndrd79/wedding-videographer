'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Video {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  thumbnail: string | null;
  featured: boolean;
  published: boolean;
  category: string;
}

const VIDEO_CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'Casamento', label: 'Casamento' },
  { id: 'Pré-Wedding', label: 'Pré-Wedding' },
  { id: 'Ensaio Fotográfico', label: 'Ensaio Fotográfico' },
  { id: 'Evento', label: 'Evento' },
  { id: 'Outro', label: 'Outro' }
];

export default function PortfolioPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos');
        if (response.ok) {
          const data = await response.json();
          // Only show published videos
          setVideos(data.filter((video: Video) => video.published));
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Extract YouTube video ID
  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&\?]{10,12})/);
    return match?.[1] || '';
  };

  // Filter videos by category
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

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

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
        <section className="relative pt-40 pb-20">
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

        {/* Category Filter */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {VIDEO_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105
                    ${selectedCategory === category.id
                      ? 'bg-[#D4AF37] text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }
                  `}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Video Section */}
        {featuredVideos.length > 0 && (
          <section className="relative py-12">
            <div className="max-w-7xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-serif font-medium text-white mb-4 text-center">
                  Vídeo em Destaque
                </h2>
                <p className="text-gray-400/90 text-lg text-center max-w-2xl mx-auto">
                  Uma prévia especial do nosso trabalho mais recente
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative aspect-video w-full max-w-5xl mx-auto overflow-hidden rounded-xl shadow-2xl"
              >
                <div 
                  className="absolute inset-0 cursor-pointer group"
                  onClick={() => handleVideoClick(featuredVideos[0])}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={featuredVideos[0].thumbnail}
                      alt={featuredVideos[0].title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#D4AF37]/90 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                        <Play className="w-8 h-8 md:w-10 md:h-10 text-black transform translate-x-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-xl md:text-2xl font-medium text-white mb-2">
                        {featuredVideos[0].title}
                      </h3>
                      <p className="text-gray-300/90">
                        {featuredVideos[0].description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Regular Videos Section */}
        <section className="relative py-16 bg-gradient-to-b from-black via-black/90 to-black/80">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: 'url("/images/pattern-overlay.png")',
              opacity: 0.05,
              backgroundSize: '200px 200px'
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularVideos.map(video => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
                    <Image
                      src={video.thumbnail || `https://i.ytimg.com/vi/${getYoutubeId(video.youtubeUrl)}/maxresdefault.jpg`}
                      alt={video.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <h3 className="text-white font-semibold mt-3">{video.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider Section */}
        <section className="py-24 bg-gradient-to-b from-black/80 via-gray-900/30 to-black/90 relative overflow-hidden">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: 'url("/images/pattern-overlay.png")',
              opacity: 0.05,
              backgroundSize: '200px 200px',
              backgroundPosition: 'center'
            }}
          />
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-white mb-6">
                Vamos Criar Algo Especial Juntos?
              </h2>
              <p className="text-gray-400/90 text-lg mb-8 leading-relaxed">
                Cada história de amor merece ser contada de forma única e emocionante. 
                Deixe-nos transformar seus momentos em memórias cinematográficas inesquecíveis.
              </p>
              <Link
                href="/contato"
                className="inline-block bg-[#D4AF37]/90 text-black px-8 py-3 rounded-lg text-lg font-medium hover:bg-[#D4AF37] transition-all duration-300 hover:scale-105 transform"
              >
                Agende uma Consulta
              </Link>
            </motion.div>
          </div>
        </section>

      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="w-full max-w-5xl">
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${getYoutubeId(selectedVideo.youtubeUrl)}?autoplay=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-4 text-white">
              <h3 className="text-2xl font-bold">{selectedVideo.title}</h3>
              <p className="mt-2 text-gray-300">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
