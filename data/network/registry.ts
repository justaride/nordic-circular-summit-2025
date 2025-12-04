import summitNetwork from './summit-network.json';

export interface NetworkDataset {
    id: string;
    name: string;
    description: string;
    data: any; // Type this more strictly if possible based on your JSON structure
}

export const datasets: NetworkDataset[] = [
    {
        id: 'day1',
        name: 'Day 1: Summit Network',
        description: 'Connections from Day 1 speakers and participants',
        data: summitNetwork
    },
    // Placeholder for future datasets
    /*
    {
      id: 'day2',
      name: 'Day 2: Future Network',
      description: 'Projected connections for Day 2',
      data: day2Network
    }
    */
];

export const getDataset = (id: string) => datasets.find(d => d.id === id) || datasets[0];
