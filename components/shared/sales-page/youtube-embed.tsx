import { YouTubeEmbedProps } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId }) => (
  <Card className="max-w-3xl mx-auto">
    <CardContent className="p-4">
      <div className="relative w-full aspect-video">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?controls=0&modestbranding=1&rel=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </CardContent>
  </Card>
);

export default YouTubeEmbed;
