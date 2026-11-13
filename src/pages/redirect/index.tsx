import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';

const DEFAULT_REDIRECT = 'https://openpanel.com?utm_source=sentinelfirewall.github.io';

function ContactForm() {
  const [redirectUrl, setRedirectUrl] = React.useState(DEFAULT_REDIRECT);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const customRedirect = params.get('to');

    if (customRedirect) {
      try {
        const url = new URL(customRedirect);
        setRedirectUrl(url.toString());
      } catch (e) {
        console.warn("Invalid redirect URL provided, falling back to default.");
      }
    }
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      window.location.assign(redirectUrl);
    }, 3000);

    return () => clearTimeout(timer);
  }, [redirectUrl]);

  return (
    <Layout title={`Leaving Site`} description="Sentinel Firewall - Redirecting..">
      <main style={{ margin: '0 auto', width: 'max-content', paddingTop: '10vh' }}>
        <Heading
          as="h1"
          style={{ textAlign: 'center', marginBottom: 'calc(var(--ifm-leading) * 2)' }}
        >
          You are leaving the Sentinel Firewall website
        </Heading>

        <p style={{ textAlign: 'center', marginBottom: '1rem' }}>
          For your security, please note that you are about to be redirected to an external site:
        </p>

        <p style={{ textAlign: 'center', fontWeight: 'bold', wordBreak: 'break-all' }}>
          {redirectUrl}
        </p>

        <p style={{ textAlign: 'center' }}>
          You will be redirected automatically in a few seconds.<br />
          If you are not redirected, please use this link:{' '}
          <Link to={redirectUrl}>Continue to destination</Link>
        </p>
      </main>
    </Layout>
  );
}

export default ContactForm;
