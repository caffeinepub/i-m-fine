import { Video, Music, Headphones, Play } from 'lucide-react';
import MediaLinkCard from '@/components/content/MediaLinkCard';
import {
  selfHelpVideos,
  musicVideos,
  guidedMeditations,
  educationalSeries,
} from '@/content/catalog';

export default function VideosMusicPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
          Videos & Music
        </h1>
        <p className="text-lg text-muted-foreground">
          Healing videos, guided meditations, and calming music to support your journey.
        </p>
      </div>

      {/* Self-Help Videos */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Video className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Self-Help Videos</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Educational and inspirational video content on trauma, healing, and personal growth.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selfHelpVideos.map((item, index) => (
            <MediaLinkCard key={index} item={item} />
          ))}
        </div>
      </section>

      {/* Music Videos */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Music className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Music Videos</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Calming and uplifting music for relaxation, meditation, and healing.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {musicVideos.map((item, index) => (
            <MediaLinkCard key={index} item={item} />
          ))}
        </div>
      </section>

      {/* Guided Meditations */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Headphones className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Guided Meditations</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Audio and video guided meditation sessions for relaxation, grounding, and emotional healing.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {guidedMeditations.map((item, index) => (
            <MediaLinkCard key={index} item={item} />
          ))}
        </div>
      </section>

      {/* Educational Series */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Play className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Educational Series</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Video series and channels covering trauma recovery, mental health, and healing practices.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {educationalSeries.map((item, index) => (
            <MediaLinkCard key={index} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
