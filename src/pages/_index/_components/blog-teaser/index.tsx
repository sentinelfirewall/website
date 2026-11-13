import Link from '@docusaurus/Link';
import { Section } from '@site/src/pages/_components/section';
import { SectionContent } from '@site/src/pages/_components/section-content';
import { SectionHeading } from '@site/src/pages/_components/section-heading';
import { SectionTag } from '@site/src/pages/_components/section-tag';
import React, { ComponentProps } from 'react';

type Props = Partial<ComponentProps<typeof Section> & typeof DEFAULT_CONTENT>;

const DEFAULT_CONTENT = {
  color: 'light-gray' as const,
  id: 'blog-teaser',
  tag: 'How-to guides & articles',
  heading: 'Our Blog',
  intro: (
    <p>
      Discover expert tips, best practices, and deep dives into Linux Security—helping you strengthen security, optimize performance, and stay ahead of server threats.
    </p>
  ),
  link: {
    href: '/blog',
    text: 'Read our blog articles',
  },
  img: {
    src: '/pages/home/blog-teaser/components.svg',
    alt: '',
  },
};

function BlogTeaser({
  color = DEFAULT_CONTENT.color,
  id = DEFAULT_CONTENT.id,
  tag = DEFAULT_CONTENT.tag,
  heading = DEFAULT_CONTENT.heading,
  intro = DEFAULT_CONTENT.intro,
  link = DEFAULT_CONTENT.link,
  img = DEFAULT_CONTENT.img,
}: Props) {
  return (
    <Section id={id} color={color}>
      <SectionContent>
        <SectionTag>{tag}</SectionTag>
        <SectionHeading>{heading}</SectionHeading>
        {intro}
        {link && (
          <p>
            <Link href={link.href}>{link.text}</Link>
          </p>
        )}
      </SectionContent>
    </Section>
  );
}

export { BlogTeaser };
