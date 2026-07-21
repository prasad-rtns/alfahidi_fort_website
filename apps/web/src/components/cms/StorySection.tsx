import { StorytellingEngine } from "@/components/Story";
import { mediaUrl } from "@/lib/cms/pages";
import type { CmsStorySection } from "@/lib/cms/types";
import type { StoryScene } from "@/components/Story/types";

export function StorySection({ section }: { section: CmsStorySection }) {
  const scenes = (section.scenes && section.scenes.length > 0 ? section.scenes : [section]).map<StoryScene>((scene, index) => ({
    order: "order" in scene && typeof scene.order === "number" ? scene.order : index + 1,
    scene: "scene" in scene && typeof scene.scene === "string" ? scene.scene : section.title,
    title: scene.title,
    description: scene.description ?? "",
    image: mediaUrl(scene.image),
    video: mediaUrl(scene.video) || null,
    animationType: scene.animationType ?? section.animationType ?? "fade"
  }));

  if (scenes.every((scene) => !scene.image && !scene.video)) return null;

  return <StorytellingEngine scenes={scenes} />;
}
