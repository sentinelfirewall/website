import React from 'react';
import { Section } from '@site/src/pages/_components/section';
import { SectionTag } from '@site/src/pages/_components/section-tag';
import { SectionHeading } from '@site/src/pages/_components/section-heading';
import {
  Switcher,
  SwitcherButton,
  SwitcherContent,
  SwitcherList,
} from '../what-is-sentinel/switcher';
import { SectionSubheading } from '@site/src/pages/_components/section-subheading';
import styles from './what-is-sentinel.module.css';
import { Grid, GridItem } from '@site/src/pages/_components/grid';

type Props = {};

const INTRO_CONTENT: {
  tag: React.ReactNode;
  heading: React.ReactNode;
  description: React.ReactNode;
} = {
  tag: 'What is Sentinel?',
  heading: 'fork of ConfigServer Firewall & Security',
  description: (
  <>
    <p>
      ⚡ The sudden shutdown of Configserver in 2025 has left a huge gap in our ecosystem.
      For years, ConfigServer Firewall (CSF) has been the backbone of server security for hosting providers and control panels — stable, feature-rich, and trusted by sysadmins everywhere.
    </p>
    <p>
      Luckily, Way to the Web Limited released the CSF script under the GPL license.
      Soon after, a group of us SysAdmins have started the Sentinel project — a fork of CSF that is actively maintained, community-driven, and fully compatible as a drop-in replacement on existing servers.
    </p>
  </> 
  ),
};

const SWITCHER_CONTENT: Array<{
  id: string;
  title: React.ReactNode;
  image: string;
  features: Array<{
    title: React.ReactNode;
    description: React.ReactNode;
    link?: string;
    linkText?: React.ReactNode;
  }>;
}> = [
  {
    id: 'build',
    image: '/pages/home/what-is-sentinel/build.svg',
    title: 'CSF',
    features: [
      {
        title: 'Advanced Firewall Protection',
        description: (
          <>Provides robust iptables-based filtering to secure servers from unauthorized access.</>
        ),
      },
      {
        title: 'Granular Access Control',
        description: (
          <>
            Manage inbound and outbound traffic with precise port and IP restrictions.
          </>
        ),
      },
      {
        title: 'Brute-Force Defense',
        description: (
          <>
            Blocks repeated login attempts and suspicious activity automatically.
          </>
        ),
      },
    ],
  },
  {
    id: 'compose',
    image: '/pages/home/what-is-sentinel/compose.svg',
    title: 'LFD',
    features: [
      {
        title: 'Real-Time Intrusion Detection',
        description: (
          <>
            Monitors system logs for failed login attempts and malicious behavior.
          </>
        ),
      },
      {
        title: 'Automated IP Blocking',
        description: (
          <>
            Instantly bans attackers showing suspicious login patterns.
          </>
        ),
      },
      {
        title: 'Alert & Notification System',
        description: (
          <>
            Sends security alerts to keep administrators informed.
          </>
        ),
      },
    ],
  },
  {
    id: 'run',
    image: '/pages/home/what-is-sentinel/run.svg',
    title: 'UI',
    features: [
      {
        title: 'User-Friendly Dashboard',
        description: (
          <>
            Simplifies firewall and LFD management with an intuitive web UI.
          </>
        ),
      },
      {
        title: 'Quick Rule Management',
        description: (
          <>
            Add, edit, or remove firewall rules without command-line complexity.
          </>
        ),
      },
      {
        title: 'Live Monitoring Tools',
        description: (
          <>
            View active connections, blocks, and logs in real-time.
          </>
        ),
      },
    ],
  },
];

function WhatIsSentinel({}: Props) {
  return (
    <Section color="dark-gray" id="what-is-sentinel">
      <div className="container">
        <SectionTag>{INTRO_CONTENT.tag}</SectionTag>
        <SectionHeading>{INTRO_CONTENT.heading}</SectionHeading>
        {INTRO_CONTENT.description}
      </div>

      <div className="container">
        <WhatIsSentinelSwitcher />
      </div>
    </Section>
  );
}

// Abstracted switcher component for reuse on introduction docs page
function WhatIsSentinelSwitcher({}: Props) {
  return (
    <Switcher defaultValue={SWITCHER_CONTENT[0].id}>
      <SwitcherList className={styles.list}>
        {SWITCHER_CONTENT.map((content, i) => (
          <SwitcherButton key={content.id} className={styles.button} value={content.id}>
            <img
              src={`/pages/home/icon/${content.id}.svg`}
              className={`${styles.icon} ${styles[content.id]}`}
              alt=""
            />
            {content.title}
          </SwitcherButton>
        ))}
      </SwitcherList>

      {SWITCHER_CONTENT.map((content, i) => (
        <SwitcherContent key={content.id} value={content.id} className={styles.content}>
          <SectionSubheading className={styles.heading}>{content.title}</SectionSubheading>
          <Grid>
            <GridItem>
              {content.features.map((feature, i) => (
                <div className={styles.feature} key={i}>
                  <h5>{feature.title}</h5>
                  <p>{feature.description}</p>
                  {feature.link && <a href={feature.link}>{feature.linkText}</a>}
                </div>
              ))}
            </GridItem>
          </Grid>
        </SwitcherContent>
      ))}
    </Switcher>
  );
}

export { WhatIsSentinel, WhatIsSentinelSwitcher };
