export interface NotebookItem {
  id: string;
  title: string;
  description: string;
  type: 'audio' | 'video' | 'summary' | 'faq' | 'briefing' | 'image' | 'pdf' | 'other';
  content?: string;
  audioUrl?: string;
  videoUrl?: string;
  imageUrl?: string;
  pdfUrl?: string;
  externalUrl?: string;
  dateAdded: string;
  duration?: string;
}

// NotebookLM generated content
export const notebookItems: NotebookItem[] = [
  {
    id: 'trust-based-circular-economy',
    title: "Greenland's Trust-Based Circular Economy",
    description: "AI-generated audio overview exploring how trust serves as the foundational infrastructure for circular economy in Greenland and the Arctic region. Features insights from summit speakers on traditional knowledge, symbiosis, and Nordic collaboration.",
    type: 'audio',
    audioUrl: '/notebook/Greenland_s_Trust_Based_Circular_Economy_Action.m4a',
    dateAdded: 'Dec 4, 2025',
    duration: '~10 min'
  },
  {
    id: 'circular-economy-ancient-idea',
    title: 'Circular Economy: An Ancient Idea',
    description: "Video exploration of how circular economy principles are deeply rooted in traditional Arctic and indigenous practices. The 'new' circular economy mirrors millennia of Greenlandic wisdom where nothing is wasted.",
    type: 'video',
    videoUrl: '/notebook/Circular_Economy__Ancient_Idea.mp4',
    dateAdded: 'Dec 4, 2025',
    duration: 'Video'
  },
  {
    id: 'nordic-circular-summit-overview',
    title: 'Nordic Circular Summit 2025 Overview',
    description: "Comprehensive video summary of the summit highlights, key speakers, and major themes from the historic gathering in Nuuk, Greenland.",
    type: 'video',
    videoUrl: '/notebook/Nordic_Circular_Summit.mp4',
    dateAdded: 'Dec 4, 2025',
    duration: 'Video'
  },
  {
    id: 'arctic-wisdom-global-action',
    title: 'Arctic Wisdom, Global Action',
    description: "In-depth briefing document synthesizing the summit's key insights on how Arctic and Nordic communities are shaping the future of circular economy through traditional knowledge, trust-based collaboration, and innovative business models.",
    type: 'pdf',
    pdfUrl: '/notebook/Arctic_Wisdom_Global_Action.pdf',
    dateAdded: 'Dec 4, 2025'
  },
  {
    id: 'mind-map',
    title: 'Summit Mind Map',
    description: "Visual representation of the interconnected themes, speakers, and concepts from the Nordic Circular Summit 2025. Shows relationships between sessions, key quotes, and strategic opportunities.",
    type: 'image',
    imageUrl: '/notebook/NotebookLM_Mind_Map.png',
    dateAdded: 'Dec 4, 2025'
  }
];
