import summitNetwork from './summit-network.json';
import summitNetworkEnriched from './summit-network-enriched.json';

export interface NetworkDataset {
    id: string;
    name: string;
    description: string;
    data: any; // Type this more strictly if possible based on your JSON structure
}

export const datasets: NetworkDataset[] = [
    {
        id: 'semantic',
        name: 'Semantic Network (Themes)',
        description: 'Rich map of speakers, topics, and organizations',
        data: summitNetworkEnriched
    },
    {
        id: 'day1',
        name: 'Simple Network (Day 1)',
        description: 'Basic connections from Day 1 speakers',
        data: summitNetwork
    },
];

export const getDataset = (id: string) => datasets.find(d => d.id === id) || datasets[0];
