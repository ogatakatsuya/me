export function getSpeakerDeckThumbnailUrl(speakerDeckId: string): string {
  return `https://files.speakerdeck.com/presentations/${speakerDeckId}/slide_0.jpg`;
}

export async function getSpeakerDeckThumbnailFromId(speakerDeckId: string): Promise<string | null> {
  try {
    if (!speakerDeckId) {
      console.warn('SpeakerDeck ID is required');
      return null;
    }

    const thumbnailUrl = getSpeakerDeckThumbnailUrl(speakerDeckId);
    
    // Verify the thumbnail exists
    const response = await fetch(thumbnailUrl, { method: 'HEAD' });
    if (!response.ok) {
      console.warn('Thumbnail not found at:', thumbnailUrl);
      return null;
    }

    return thumbnailUrl;
  } catch (error) {
    console.error('Failed to get SpeakerDeck thumbnail:', error);
    return null;
  }
}