import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useThemeContext from '@theme/hooks/useThemeContext';
import Layout from '@theme/Layout';
import * as React from 'react';
import GitHubButton from 'react-github-btn';

import styles from './index.module.css';

const features = [
  {
    title: 'Familiar',
    imageURL: 'img/undraw_experience_design_eq3j.svg',
    description: (
      <>
        Co-locating CSS with markup, glaze praises the component-based
        development era. Say goodbye to naming conventions with an API
        resembling inline styles.
      </>
    ),
  },
  {
    title: 'Personalizable',
    imageURL: 'img/undraw_personal_settings_kihd.svg',
    description: (
      <>
        Inspired by{' '}
        <a
          href="https://theme-ui.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Theme UI
        </a>
        , design tokens are first-class citizens. Enjoy frictionless
        autocompletion for various scales. Define convenient property aliases
        and shorthands on your own.
      </>
    ),
  },
  {
    title: 'Lightweight',
    imageURL: 'img/undraw_fast_loading_0lbh.svg',
    description: (
      <>
        Built upon{' '}
        <a
          href="https://seek-oss.github.io/treat/"
          target="_blank"
          rel="noopener noreferrer"
        >
          treat
        </a>
        , styles are statically extracted with near-zero runtime by default.
        Dynamic style injection is an opt-in feature, providing enhanced
        flexibility at low cost.
      </>
    ),
  },
];

interface FeatureProps {
  imageURL: string;
  title: string;
  description: React.ReactNode;
}

function Feature({ imageURL, title, description }: FeatureProps): JSX.Element {
  return (
    <div className="col col--4 margin-vert--md">
      <div className="text--center margin-bottom--md">
        <img
          src={useBaseUrl(imageURL)}
          alt={title}
          className={styles.featureImage}
        />
      </div>

      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function HomePage(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const siteConfig = useDocusaurusContext().siteConfig!;
  const { isDarkTheme } = useThemeContext();

  return (
    <Layout description={`${siteConfig.tagline} with React`}>
      <header className="hero text--center shadow--lw">
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle margin-bottom--lg">
            {siteConfig.tagline}
          </p>

          <Link
            to={useBaseUrl('docs/getting-started')}
            className="button button--primary button--lg margin-bottom--md"
          >
            Get Started
          </Link>

          <div>
            <GitHubButton
              /* eslint-disable @typescript-eslint/no-non-null-assertion */
              href={`https://github.com/${siteConfig.organizationName!}/${siteConfig.projectName!}`}
              aria-label={`Star ${siteConfig.organizationName!}/${siteConfig.projectName!} on GitHub`}
              /* eslint-enable @typescript-eslint/no-non-null-assertion */
              data-show-count
              data-size="large"
              data-color-scheme={
                isDarkTheme
                  ? 'no-preference: dark; light: dark;'
                  : 'dark: light;'
              }
            >
              Star
            </GitHubButton>
          </div>
        </div>
      </header>

      <main>
        <section className={`${styles.features} margin-vert--lg`}>
          <div className="container">
            <div className="row">
              {features.map((props, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Feature key={i} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
