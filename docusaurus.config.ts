import fs from 'node:fs/promises';
import { Config } from '@docusaurus/types';
import {
  Options as PresetClassicOptions,
  ThemeConfig as PresetClassicThemeConfig,
} from '@docusaurus/preset-classic';
import { Options as PluginContentBlogOptions } from '@docusaurus/plugin-content-blog';
import { Options as PluginGoogleAnalyticsOptions } from '@docusaurus/plugin-google-analytics';
import { Options as PluginGithubStarsOptions } from '@sentinelfirewall/docusaurus-github-stars';
import { Options as PluginSEOChecksOptions } from '@sentinelfirewall/docusaurus-seo-checks';
import rehypeShiki, { RehypeShikiOptions } from '@shikijs/rehype';
import { bundledLanguages } from 'shiki';
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationFocus,
} from '@shikijs/transformers';
import rehypeNameToId from 'rehype-name-to-id';

const rehypeShikiPlugin = [
  rehypeShiki,
  {
    themes: {
      dark: 'github-dark',
      light: 'github-light',
    },
    transformers: [
      {
        name: 'meta',
        code(node) {
          const language = this.options.lang ?? 'plaintext';
          this.addClassToHast(node, `language-${language}`);
          return node;
        },
      },
      transformerMetaHighlight(),
      transformerNotationDiff(),
      transformerNotationHighlight(),
      transformerNotationFocus(),
    ],
    langs: [
      ...(Object.keys(bundledLanguages) as Array<keyof typeof bundledLanguages>),
    ],
  } as RehypeShikiOptions,
];

function siteBaseUrl() {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  return 'https://sentinelfirewall.github.io';
}

// Fallback used only if GitHub can't be reached at build time.
const FALLBACK_VERSION = '15.17';

// Fetch the latest Sentinel version from GitHub at build time.
// Order: env override -> csf/version.txt on main -> latest release tag -> fallback.
async function latestSentinelVersion(): Promise<string> {
  if (process.env.SENTINEL_VERSION) return process.env.SENTINEL_VERSION.trim();
  const headers: Record<string, string> = { 'User-Agent': 'sentinel-website-build' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  try {
    const res = await fetch(
      'https://raw.githubusercontent.com/sentinelfirewall/sentinel/main/csf/version.txt',
      { headers, signal: AbortSignal.timeout(10000) },
    );
    if (res.ok) {
      const v = (await res.text()).trim();
      if (/^\d+(\.\d+)+$/.test(v)) return v;
    }
  } catch {}
  try {
    const res = await fetch(
      'https://api.github.com/repos/sentinelfirewall/sentinel/releases/latest',
      { headers, signal: AbortSignal.timeout(10000) },
    );
    if (res.ok) {
      const tag = String((await res.json()).tag_name ?? '').replace(/^v/, '').trim();
      if (tag) return tag;
    }
  } catch {}
  console.warn(`[version] Could not fetch Sentinel version from GitHub, using ${FALLBACK_VERSION}`);
  return FALLBACK_VERSION;
}

const config = (async (): Promise<Config> => {
  const sentinelVersion = await latestSentinelVersion();
  const baseUrl = process.env.NODE_ENV === 'development' ? '/' : '/website/';
  return {
    title: 'Sentinel Firewall',
    tagline: 'The firewall for Web Hosting & Self-Hosting',
    customFields: {
      sentinelVersion,
    },
    future: {
      experimental_faster: true,
      v4: true,
    },
    url: siteBaseUrl(),
    baseUrl,
    organizationName: 'sentinelfirewall',
    projectName: 'website',
    trailingSlash: true,
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: '/favicon.ico',

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
      defaultLocale: 'en',
      locales: ['en'],
    },

    presets: [
      [
        'classic',
        {
          blog: {
            blogTitle: 'Blog',
            blogDescription: 'The latest security news, updates, and announcements.',
            blogSidebarCount: 0,
            beforeDefaultRehypePlugins: [rehypeShikiPlugin],
            rehypePlugins: [rehypeNameToId],
            authorsMapPath: '../authors.yml', // relative to blog directory
            blogListComponent: '@theme/sentinel/blog/list-page',
            blogPostComponent: '@theme/sentinel/blog/post-page',
            onInlineAuthors: 'throw',
            onUntruncatedBlogPosts: 'ignore',
          },
          docs: {
            editUrl: 'https://github.com/sentinelfirewall/website/edit/main/',
            beforeDefaultRehypePlugins: [rehypeShikiPlugin],
            rehypePlugins: [rehypeNameToId],
            lastVersion: 'current',
            versions: {
              current: {
                label: sentinelVersion,
              },
            },
          },
          pages: {
            beforeDefaultRehypePlugins: [rehypeShikiPlugin],
            rehypePlugins: [rehypeNameToId],
          },
          theme: {
            customCss: [require.resolve('./src/styles/index.css')],
          },
        } satisfies PresetClassicOptions,
      ],
    ],

    plugins: [
      [
        '@sentinelfirewall/docusaurus-github-stars',
        {
          preloadRepo: 'sentinelfirewall/sentinel',
        } satisfies PluginGithubStarsOptions,
      ],
      [
        '@sentinelfirewall/docusaurus-seo-checks',
        {
          underscores: { level: 'error' },
        } satisfies PluginSEOChecksOptions,
      ],
      [
        '@docusaurus/plugin-google-analytics',
        {
          trackingID: process.env.GOOGLE_ANALYTICS_ID || 'localdev',
          anonymizeIP: true,
        } satisfies PluginGoogleAnalyticsOptions,
      ],
      [
        '@easyops-cn/docusaurus-search-local',
        {
          hashed: true,
          indexDocs: true,
          indexBlog: true,
          indexPages: false,
          docsRouteBasePath: '/docs',
          blogRouteBasePath: '/blog',
          highlightSearchTermsOnTargetPage: true,
          explicitSearchResultPath: true,
        },
      ],
      customPostCssPlugin, // PostCSS plugin function registration
    ],

    themeConfig: {
      image: '/logo/sentinel_social.png',
      navbar: {
        title: 'Sentinel Firewall',
        logo: {
          alt: 'Sentinel Logo',
          src: '/logo/sentinel_purple_icon_logo.svg',
        },
        items: [
          { to: '/blog', label: 'Blog', position: 'left' },
          { type: 'doc', docId: 'intro', position: 'left', label: 'Docs' },
          {
            type: 'docsVersionDropdown',
            // used for styling, see src/styles/theme/_navbar.css
            className: 'navbar__link--version-dropdown',
          },
          {
            href: 'https://github.com/sentinelfirewall/sentinel',
            'aria-label': 'Star Sentinel on GitHub',
            position: 'right',
            html: `<span class="badge badge--outline">Star us! ★ <github-count repo="sentinelfirewall/sentinel">20</github-count></span>`,
            className: 'sidebar-hidden',
          },
          await svgIconNavItem({
            svgIconPath: './static/icons/github.svg',
            label: 'GitHub',
            href: 'https://github.com/sentinelfirewall/sentinel',
          }),
        ],
      },
       announcementBar: {
         id: 'announcement',
         content: `<a href="${baseUrl}docs/upgrade-from-csf/">📢 ConfigServer shutdown - Easily migrate from ConfigServer Security&Firewall (CSF) to Sentinel</a>`,
       },
      footer: {
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/sentinelfirewall/',
              },
              {
                label: 'Contributing',
                href: 'https://github.com/sentinelfirewall/sentinel/blob/main/CONTRIBUTING.md',
              },
            ],
          },
          {
            title: 'Social',
            items: [
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/sentinelfirewall/',
              },
            ],
          },
          {
            title: 'Organization',
            items: [
              {
                label: 'About',
                to: '/docs/intro/',
              },
              {
                label: 'Contact',
                href: 'https://github.com/sentinelfirewall/sentinel/issues',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Sentinel Project - All rights reserved. “ConfigServer” is a trademark of Way to the Web Limited.`,
      },
    } satisfies PresetClassicThemeConfig,

    markdown: {
      format: 'detect',
      mdx1Compat: {
        admonitions: false,
        comments: false,
        headingIds: false,
      },
    },

    headTags: [
      {
        tagName: 'link',
        attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      },
      {
        tagName: 'link',
        attributes: {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'crossorigin',
        },
      },
      {
        tagName: 'link',
        attributes: {
          href: 'https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Lexend:wght@100..900&family=Inter:wght@100..900&display=swap',
          rel: 'stylesheet',
        },
      },
    ],

    onBrokenAnchors: 'throw',
    onDuplicateRoutes: 'throw',
  };
})();

/** @return {import('@docusaurus/types').Plugin} */
function customPostCssPlugin() {
  return {
    name: 'custom-postcss',
    configurePostCss(options) {
      options.plugins.push(require('postcss-preset-env'));
      return options;
    },
  };
}

type NavbarItem = Required<Required<PresetClassicThemeConfig>['navbar']>['items'][number];
type SvgNavItemOptions = NavbarItem & {
  svgIconPath: string;
  label: string;
  href: string;
  className?: string;
  position?: 'left' | 'right';
};
/**
 * build an icon nav item, works with styles in `src/styles/theme/_navbar.css`
 */
async function svgIconNavItem({
  svgIconPath,
  label,
  href,
  className,
  position = 'right',
  ...extras
}: SvgNavItemOptions): Promise<NavbarItem> {
  const icon = await fs.readFile(svgIconPath, 'utf-8');
  const linkClass = 'navbar__icon';

  return {
    href: href,
    position,
    html: `
      ${icon}
      <span class="navbar__icon-label">${label}</span>
    `,
    className: `${className ? `${className} ` : ''}${linkClass}`,
    ...extras,
  };
}

module.exports = config;
