import React from 'react';
import { MOSTRO_INSTANCES, MostroLink } from 'functions/mostroInstances';
import {
  EyeInvisibleOutlined,
  LockOutlined,
  ThunderboltOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  GlobalOutlined,
  SendOutlined,
  XOutlined,
  InstagramOutlined,
  TikTokOutlined,
  DiscordOutlined,
} from '@ant-design/icons';

const linkIcons: Record<MostroLink['type'], React.ReactNode> = {
  website: <GlobalOutlined />,
  telegram: <SendOutlined />,
  x: <XOutlined />,
  instagram: <InstagramOutlined />,
  tiktok: <TikTokOutlined />,
  discord: <DiscordOutlined />,
};

const advantages = [
  {
    icon: <EyeInvisibleOutlined />,
    title: 'Sin KYC / anónimo',
    text: 'Operaciones totalmente privadas, sin registros personales ni datos sensibles.',
  },
  {
    icon: <LockOutlined />,
    title: 'No custodial',
    text: 'Mantén el control total de tus fondos: Mostro no custodia tu Bitcoin.',
  },
  {
    icon: <ThunderboltOutlined />,
    title: 'Fast Lightning',
    text: 'Transacciones ultra rápidas y de bajo coste en la Lightning Network.',
  },
  {
    icon: <SafetyCertificateOutlined />,
    title: 'Resistente a la censura',
    text: 'Protocolo distribuido sobre Nostr, inmutable y sin control central.',
  },
  {
    icon: <TeamOutlined />,
    title: 'Comunidades P2P',
    text: `Opera con las ${MOSTRO_INSTANCES.length} instancias de confianza que ya listamos aquí, cada una con su moneda fiat y métodos de pago locales.`,
  },
];

/**
 * Native rendering of the Mostro infographic: readable at any width (one column
 * on mobile, up to five on desktop) instead of a fixed-size image.
 */
const MostroPromo: React.FC = () => {
  return (
    <div className="mostro-promo">
      <div className="mostro-promo__head">
        <img src={`${process.env.PUBLIC_URL}/assets/mostro.small.png`} alt="" />
        <div>
          <h2>Mostro P2P</h2>
          <p>Bitcoin sin permisos</p>
        </div>
      </div>

      <div className="mostro-promo__grid">
        {advantages.map(advantage => (
          <div className="mostro-promo__card" key={advantage.title}>
            <span className="mostro-promo__icon">{advantage.icon}</span>
            <h3>{advantage.title}</h3>
            <p>{advantage.text}</p>
          </div>
        ))}
      </div>

      <div className="mostro-promo__communities">
        <h3>Comunidades e instancias</h3>
        <ul>
          {MOSTRO_INSTANCES.map(instance => (
            <li key={instance.pubkey}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/${instance.name}.small.png`}
                alt=""
                onError={event => {
                  event.currentTarget.style.display = 'none';
                }}
              />
              <span className="mostro-promo__region">
                {instance.flag} {instance.region}
              </span>
              {instance.links.map(link => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${instance.region} — ${link.type}`}
                >
                  {linkIcons[link.type]}
                </a>
              ))}
            </li>
          ))}
        </ul>
      </div>

      <div className="mostro-promo__cta">
        <a href="https://mostro.network/#get-started" target="_blank" rel="noopener noreferrer">
          &gt;&gt; Empieza a operar
        </a>
        <a href="https://mostro.community" target="_blank" rel="noopener noreferrer">
          mostro.community
        </a>
      </div>
    </div>
  );
};

export default MostroPromo;
