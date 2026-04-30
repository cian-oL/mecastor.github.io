const SUBSTACK_URL = "https://olearylab.substack.com/feed";
const RSS2JSON_API = "https://api.rss2json.com/v1/api.json";

export interface SubstackPost {
  title: string;
  excerpt: string;
  date: string;
  link: string;
  thumbnail: string | null;
  categories: string[];
}

export async function getSubstackPosts(count = 10): Promise<SubstackPost[]> {
  try {
    const url = `${RSS2JSON_API}?rss_url=${encodeURIComponent(SUBSTACK_URL)}&count=${count}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`RSS fetch failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error(`RSS API error: ${data.message || 'Unknown error'}`);
    }

    return data.items.map((item: any) => ({
      title: item.title || '',
      excerpt: item.description?.replace(/<[^>]*>/g, '').slice(0, 160) || '',
      date: item.pubDate || new Date().toISOString(),
      link: item.link || '',
      thumbnail: item.thumbnail || item.enclosure?.link || null,
      categories: item.categories || [],
    }));
  } catch (error) {
    console.error('Failed to fetch Substack posts:', error);
    return [];
  }
}