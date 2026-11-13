import React from 'react';
import styles from './wasmcloud-ecosystem.module.css';
import { LogoScroller } from './logo-scroller';
import { SectionTag } from '@site/src/pages/_components/section-tag';
import { Section } from '@site/src/pages/_components/section';
import { SectionContent } from '@site/src/pages/_components/section-content';
import { SectionHeading } from '@site/src/pages/_components/section-heading';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

type Props = {};

function WasmCloudEcosystem({}: Props) {
  return (
    <Section id="ecosystem" color="space-blue">
      <SectionContent align="center">
        <SectionTag>Supports</SectionTag>
        <SectionHeading>All Major Control Panels</SectionHeading>
        <p>and generic Linux server</p>
        <p>
          <Link className="button" href="/docs/usage/installation-on-generic-linux/">
            Docs
          </Link>
        </p>
      </SectionContent>
      <SectionContent align="center" hasContainer={false}>
        <div className={styles.graphic}>
          <div className={styles.callout} data-before>
            <img src={useBaseUrl('/pages/home/wasmcloud-ecosystem/arrow-1.svg')} alt="" />
            <span>works with this</span>
          </div>
          <LogoScroller />
          <div className={styles.callout} data-after>
            <img src={useBaseUrl('/pages/home/wasmcloud-ecosystem/arrow-2.svg')} alt="" />
            <span>and this</span>
          </div>
        </div>
      </SectionContent>
    </Section>
  );
}

export { WasmCloudEcosystem };
