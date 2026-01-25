export function formatSpeakerName(speakerId: string | null): string {
  if (!speakerId) return 'Unknown Speaker';

  // Convert speaker ID to readable name
  const names: Record<string, string> = {
    // Day 1 Speakers
    'einar-kleppe-holthe': 'Einar Kleppe Holthe',
    'eva-jorgensen': 'Eva Jørgensen',
    'edvard-lybert-mork': 'Edvard Lybert Mørk',
    'peter-borg': 'Peter Borg',
    'gorm-vold': 'Gorm Vold',
    'marthe-haugland': 'Marthe Haugland',
    'peter-munch-madsen': 'Peter Munch Madsen',
    'cathrine-barth': 'Cathrine Barth',
    'frederik-thrane': 'Frederik Thrane',
    'alisa-mick': 'Alisa Mick',
    'michel-bajuk': 'Michel Bajuk',
    'keira-dignan': 'Keira Dignan',
    'agita-baltbarde': 'Agita Baltbārde',
    // Day 2 - Circular Design Toolbox
    'dan-mikkin': 'Dan Mikkin',
    'maarja-karlson': 'Maarja Karlson',
    // Day 2 - NBTT Textiles
    'betina-simonsen': 'Betina Simonsen',
    'kerli-kant-hvass': 'Kerli Kant Hvass',
    'jonas-eder-hansen': 'Jonas Eder-Hansen',
    'emilia-jedda': 'Emilia Jedda',
    'inga': 'Inga',
    // Day 2 - Circular Construction
    'jan-thomas-odegard': 'Jan Thomas Odegard',
    'helle-redder-momsen': 'Helle Redder Momsen',
    'anna-karlsdottir': 'Anna Karlsdottir'
  };

  return names[speakerId] || speakerId;
}
