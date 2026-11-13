import React from 'react';
import { Section, SectionColor } from '@site/src/pages/_components/section';
import { SectionHeading } from '@site/src/pages/_components/section-heading';
import { SectionTag } from '@site/src/pages/_components/section-tag';
import styles from './styles.module.css';
import { Grid, GridItem } from '@site/src/pages/_components/grid';
import { SectionContent } from '@site/src/pages/_components/section-content';
import SvgCost from '@site/static/pages/home/icon/cost.svg';
import SvgUpdates from '@site/static/pages/home/icon/updates.svg';
import SvgDistributed from '@site/static/pages/home/icon/distributed.svg';
import Link from '@docusaurus/Link';

type Props = {
  color?: SectionColor;
};

function SentinelSolves({ color = 'light-gray' }: Props) {
  return (
    <Section color={color} id="sentinel-solutions">
      <SectionContent align="center">
        <SectionTag>Sentinel Firewall</SectionTag>
        <SectionHeading>the Complete Security Toolkit for Linux servers</SectionHeading>
      </SectionContent>
      <SectionContent>
        <Grid className={styles.content} center>
          <GridItem>
            <SvgUpdates style={{ color: 'var(--section-color-highlight)' }} />
            <h4>iptables firewall</h4>
            <p>
              A Stateful Packet Inspection (SPI) iptables firewall that track the state of network connections, allowing only legitimate traffic to pass through. 
            </p>
          </GridItem>
          <GridItem>
            <SvgCost style={{ color: 'var(--section-color-highlight)' }} />
            <h4>intrusion detection</h4>
            <p>
              A daemon that monitors login failures for services like SSH, cPanel, FTP, IMAP, SMTP, and web apps. It also supports custom log parsing with regex.
            </p>
          </GridItem>
          <GridItem>
            <SvgDistributed style={{ color: 'var(--section-color-highlight)' }} />
            <h4>security tools</h4>
            <p>
              A suite of security tools: block lists, mod_security log reporting, exploit checks, system alerts.. <Link to="/docs/features">and more</Link>
            </p>
          </GridItem>
        </Grid>
      </SectionContent>
    </Section>
  );
}

function Placeholder({ size }: { size: string }) {
  return (
    <div
      style={{
        height: size,
        width: size,
        opacity: 0.2,
        backgroundColor: 'var(--section-color-foreground)',
      }}
    />
  );
}

export { SentinelSolves };
