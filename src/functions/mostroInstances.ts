// Single registry of the Mostro instances the aggregator knows about. Adding an
// instance used to mean touching four parallel lists that silently drifted apart;
// everything downstream is now derived from this one array.
//
// This lives in its own module rather than in `functions/index.ts` because
// `context/NostrEventsContext.tsx` needs `mostroPubkeys` while `functions/index.ts`
// already imports `isEventExpired` from that context — putting it in the index
// would close an import cycle. Nothing here imports from the project.
/** Public channel of a community, as published by mostro.community. */
export interface MostroLink {
  type: 'website' | 'telegram' | 'x' | 'instagram' | 'tiktok' | 'discord';
  url: string;
}

export interface MostroInstance {
  pubkey: string;
  /** Source label in the table, and the logo filename in public/assets. */
  name: string;
  region: string;
  /** Flag of the community running the instance; empty for the global one. */
  flag: string;
  /** Authoritative relay: the source of truth for this instance's pending orders. */
  authRelays: string[];
  /** Community channels, mirrored from https://mostro.community/#communities. */
  links: MostroLink[];
}

export const MOSTRO_INSTANCES: MostroInstance[] = [
  {
    // The flagship instance keeps the bare `mostro` source tag, so it is not renamed.
    pubkey: '82fa8cb978b43c79b2156585bac2c011176a21d2aead6d9f7c575c005be88390',
    name: 'mostro',
    flag: '🌐',
    region: 'Global',
    authRelays: ['wss://relay.mostro.network'],
    links: [
      { type: 'website', url: 'https://mostro.network' },
      { type: 'telegram', url: 'https://t.me/MostroP2P' },
    ],
  },
  {
    pubkey: '0000cc02101ec29eea9ce623258752b9d7da66c27845ed26846dd0b0fc736b40',
    name: 'NostroMostro',
    flag: '🇪🇸',
    region: 'España',
    authRelays: ['wss://relay.kilombino.com'],
    links: [
      { type: 'website', url: 'https://nostromostro.github.io/' },
      { type: 'telegram', url: 'https://t.me/nostromostro' },
    ],
  },
  {
    pubkey: '00000235a3e904cfe1213a8a54d6f1ec1bef7cc6bfaabd6193e82931ccf1366a',
    name: 'Kmbalache',
    flag: '🇨🇺',
    region: 'Cuba',
    authRelays: ['wss://relay.mostro.network'],
    links: [
      { type: 'website', url: 'https://cubabitcoin.org/kmbalache/' },
      { type: 'telegram', url: 'https://t.me/Cuba_Bitcoin' },
    ],
  },
  {
    pubkey: '00000978acc594c506976c655b6decbf2d4af25ffdaa6680f2a9568b0a88441b',
    name: 'MostroColombia',
    flag: '🇨🇴',
    region: 'Colombia',
    authRelays: ['wss://relay.mostro.network'],
    links: [
      { type: 'telegram', url: 'https://t.me/ColombiaP2P' },
      { type: 'x', url: 'https://x.com/ColombiaP2P' },
    ],
  },
  {
    pubkey: '00007cb3305fb972f5cc83f83a8fbca1e64e93c9d1369880a9fd62ef95d23f91',
    name: 'MostroBolivia',
    flag: '🇧🇴',
    region: 'Bolivia',
    authRelays: ['wss://relay.mostro.network'],
    links: [
      { type: 'website', url: 'https://bitcoinbolivia.org/' },
      { type: 'telegram', url: 'https://t.me/btcxbolivia' },
      { type: 'x', url: 'https://x.com/btcxbolivia' },
      { type: 'instagram', url: 'https://www.instagram.com/btcxbolivia' },
      { type: 'tiktok', url: 'https://www.tiktok.com/@btcxbolivia' },
    ],
  },
  {
    pubkey: '000009ee1e4b1dc7add19ab30e4ef854d7b562e208b62686fd9002b50b24dabb',
    name: 'MostroVenezuela',
    flag: '🇻🇪',
    region: 'Venezuela',
    authRelays: ['wss://relay.mostro.network'],
    links: [{ type: 'telegram', url: 'https://t.me/MostroVzla' }],
  },
  {
    pubkey: '00037abd44e7a846689e230d5446abcd0d56a344fa81fff85c09d1929feda486',
    name: 'MostroBrasil',
    flag: '🇧🇷',
    region: 'Brasil',
    authRelays: ['wss://relay.mostro.network'],
    links: [{ type: 'telegram', url: 'https://t.me/+GyVD_uH9-Gw0OGRh' }],
  },
  {
    pubkey: 'b3626fe91b602bdbca3673bec0855221f41dc8f6d0e4027e51eaa525d68d87f2',
    name: 'MostroAr',
    flag: '🇦🇷',
    region: 'Argentina',
    authRelays: ['wss://relay.mostro.network'],
    links: [
      { type: 'website', url: 'https://lacrypta.ar/' },
      { type: 'telegram', url: 'https://t.me/lacryptaok' },
      { type: 'x', url: 'https://x.com/LaCryptaOk' },
      { type: 'discord', url: 'https://discord.lacrypta.ar' },
    ],
  },
];

export const mostroPubkeys = MOSTRO_INSTANCES.map(instance => instance.pubkey);

export const MOSTRO_SOURCES = MOSTRO_INSTANCES.map(instance => instance.name);

// Rewrites the generic `mostro` source tag to the issuing instance. A no-op for the
// flagship, whose name is `mostro` already.
export const mostroInstanceNames: Record<string, string> = {};

export const mostroAuthRelays: Record<string, string[]> = {};

MOSTRO_INSTANCES.forEach(instance => {
  mostroInstanceNames[instance.pubkey] = instance.name;
  mostroAuthRelays[instance.pubkey] = instance.authRelays;
});
