'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

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

interface VideoThumbnailProps {
  category: string;
}

export default function VideoThumbnail({ category }: VideoThumbnailProps) {
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    async function fetchFeaturedVideo() {
      try {
        const response = await fetch(`/api/videos?category=${category}&featured=true&limit=1`);
        const data = await response.json();
        if (data && data.length > 0) {
          setVideo(data[0]);
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    }

    fetchFeaturedVideo();
  }, [category]);

  if (!video?.thumbnail) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
        <Play className="w-12 h-12 text-white/50" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <Image
        src={video.thumbnail}
        alt={video.title}
        fill
        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center transform group-hover:scale-110 transition-transform">
          <Play className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
}
