import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import { BlogTeaser } from './_components/blog-teaser';
import { GetInvolved } from './_components/get-involved';
import { GetStarted } from './_components/get-started';
import { Hero } from './_components/hero';
import { SentinelSolves } from './_components/sentinel-solves';
import { WhatIsSentinel } from './_components/what-is-sentinel';
import { WhyUseSentinel } from './_components/why-use-sentinel';

function Home() {
  return (
    <Layout
      title={`Sentinel Firewall - The Firewall for Web & Self-Hosting`}
      description="Sentinel is a Stateful Packet Inspection (SPI) firewall, Login/Intrusion Detection and Security application for Linux servers."
      wrapperClassName="navbar-glass"
    >
      <main className={styles.main}>
        <Hero />
        <SentinelSolves />
        <WhatIsSentinel />
        <WhyUseSentinel />
        <BlogTeaser />
        <GetInvolved />
        <GetStarted />
      </main>
    </Layout>
  );
}
export default Home;
