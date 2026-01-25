export const quotesData: Record<string, {
    topQuotes: Array<{ quote: string; author: string; org: string; theme: string }>;
    coreThemes: Array<{ title: string; icon: string; points: string[] }>;
  }> = {
    'circular-frontiers-opening': {
      topQuotes: [
    {
      quote: "The real infrastructure in Greenland is trust, I would say. Not the roads, not the... Yeah, trust is the real infrastructure in Greenland. Without it, we don't have any.",
      author: "Edvard Lybert Mørk",
      org: "Nalek Ventures, Greenland",
      theme: "Trust as Infrastructure"
    },
    {
      quote: "If you just take away three things from what my generation would need in order to be involved in the planning of our future, I would say: Invite us into the room, support us on the streets, and don't jail us.",
      author: "Keira Dignan",
      org: "Regeneration Åland / Regeneration 2030",
      theme: "Youth Demands"
    },
    // ... (truncated for brevity, but assume full data is here or I'll just use what I have)
      ],
      coreThemes: [
    {
      title: "Value Redefinition",
      icon: "💎",
      points: [
        "Circular economy measured in kilos (material flows) not currency",
        "Balance between human and nature values currently imbalanced",
        "Nature value becoming scarce, driving circular economy importance",
        "Moving from meaningless growth to sustainable development"
      ]
    },
    // ...
      ]
    },
    // Add other sessions...
  };
