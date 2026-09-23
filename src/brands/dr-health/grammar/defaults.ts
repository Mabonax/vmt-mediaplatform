import demo from "../data/demo.json";
import { familyRegistry } from "./families";
import { parseGrammarPromo } from "../../../engine/grammar/resolve";
import type {
  FamilyId,
  GrammarPromoProps,
} from "../../../engine/grammar/models";

export function grammarDefaults(
  familyId: FamilyId = "editorial-health",
): GrammarPromoProps {
  return parseGrammarPromo({
    schemaVersion: 1,
    familyId,
    content: demo.content,
    axes: familyRegistry.get(familyId).reference.designDNA.character,
    variation: {
      layoutVariant: "split",
      typographyScale: 1,
      imageScale: 1,
      whitespace: 0.5,
      shapeDensity: 0.5,
      depth: 0.5,
      expressiveness: 0.5,
    },
    motionId: "premium",
  });
}
