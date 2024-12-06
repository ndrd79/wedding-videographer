import { google } from 'googleapis';

const youtube = google.youtube('v3');

// Canal ID do cliente: @a.vanderoscki
const CHANNEL_ID = 'UCnxvGbIVZPVXKHQGWEXHn0g';

// Você precisará criar uma chave de API no Google Cloud Console
// e adicionar ao seu arquivo .env
const API_KEY = process.env.YOUTUBE_API_KEY;

export async function getChannelVideos(pageToken?: string) {
  try {
    const response = await youtube.search.list({
      key: API_KEY,
      channelId: CHANNEL_ID,
      part: ['snippet'],
      order: 'date',
      maxResults: 50,
      pageToken,
      type: ['video'],
    });

    return {
      videos: response.data.items || [],
      nextPageToken: response.data.nextPageToken,
      totalResults: response.data.pageInfo?.totalResults || 0,
    };
  } catch (error) {
    console.error('Erro ao buscar vídeos:', error);
    throw error;
  }
}

export async function getVideoDetails(videoId: string) {
  try {
    const response = await youtube.videos.list({
      key: API_KEY,
      id: [videoId],
      part: ['snippet', 'statistics'],
    });

    return response.data.items?.[0];
  } catch (error) {
    console.error('Erro ao buscar detalhes do vídeo:', error);
    throw error;
  }
}
