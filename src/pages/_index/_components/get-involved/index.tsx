import React from 'react';
import { Section, SectionColor } from '@site/src/pages/_components/section';
import { SectionHeading } from '@site/src/pages/_components/section-heading';
import { SectionTag } from '@site/src/pages/_components/section-tag';
import styles from './get-involved.module.css';
import { Links } from '@site/src/constants';
import { SectionContent } from '@site/src/pages/_components/section-content';
import Link from '@docusaurus/Link';
import { Grid, GridItem } from '@site/src/pages/_components/grid';
import useBaseUrl from '@docusaurus/useBaseUrl';

type Props = {
  color?: SectionColor;
  tag?: React.ReactNode;
  heading?: React.ReactNode;
  intro?: React.ReactNode;
};

const DEFAULT_PROPS: Props = {
  color: 'green',
  tag: 'Get Involved',
  heading: 'Join the community',
  intro: (
    <p>
      Star us on Github, write blog post about Sentinel, drop in on our Discord
      channel. There are plenty of ways to get connected with the wider community for support,
      insight, use-cases and expertise.
    </p>
  ),
};

function GetInvolved({
  color = DEFAULT_PROPS.color,
  tag = DEFAULT_PROPS.tag,
  heading = DEFAULT_PROPS.heading,
  intro = DEFAULT_PROPS.intro,
}: Props) {
  const { PLAYLIST, GITHUB, SLACK } = Links;

  return (
    <Section color={color} id="community">
      <SectionContent>
        <SectionTag>{tag}</SectionTag>
        <SectionHeading>{heading}</SectionHeading>
      </SectionContent>
      <SectionContent>
        <Grid>
          <GridItem>
            {typeof intro === 'string' ? <p>{intro}</p> : intro}
            <ul className={styles.list}>
              <li>
                <Link href={GITHUB}>
                  <img src={useBaseUrl('/pages/home/icon/github.svg')} alt="" />
                  <span>Star project on GitHub</span>
                </Link>
              </li>
            </ul>
          </GridItem>
          <GridItem>
          </GridItem>
        </Grid>
      </SectionContent>
    </Section>
  );
}

export { GetInvolved };
