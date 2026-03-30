import { HomeHero } from "@/components/home/HomeHero";
import { RiEvictionTopicCard } from "@/components/home/RiEvictionTopicCard";
import { ComingSoonTopicCard } from "@/components/home/ComingSoonTopicCard";
import { TrustPanel } from "@/components/home/TrustPanel";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <HomeHero />
      <div className="grid gap-4 sm:grid-cols-2">
        <RiEvictionTopicCard />
        <ComingSoonTopicCard />
      </div>
      <TrustPanel />
    </div>
  );
}
