import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import classnames from 'classnames';
import * as React from 'react';

import styles from './styles.module.css';

const features = [
  {
    title: 'Familiar',
    imageUrl: 'img/undraw_experience_design_eq3j.svg',
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
    imageUrl: 'img/undraw_personal_settings_kihd.svg',
    description: (
      <>
        Inspired by <a href="https://theme-ui.com/">Theme UI</a>, design tokens
        are first-class citizens. Enjoy frictionless autocompletion for various
        scales. Define convenient property aliases and shorthands on your own.
      </>
    ),
  },
  {
    title: 'Lightweight',
    imageUrl: 'img/undraw_fast_loading_0lbh.svg',
    description: (
      <>
        Built upon <a href="https://seek-oss.github.io/treat/">treat</a>, styles
        are statically extracted with near-zero runtime by default. Dynamic
        style injection is an opt-in feature, providing enhanced flexibility at
        low cost.
      </>
    ),
  },
];

interface FeatureProps {
  imageUrl: string;
  title: string;
  description: React.ReactNode;
}

function Feature({ imageUrl, title, description }: FeatureProps): JSX.Element {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home(): JSX.Element {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout description={`${siteConfig.tagline} with React`}>
      <header className="hero text--center shadow--lw">
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle margin-bottom--lg">
            {siteConfig.tagline}
          </p>

          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--primary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/getting-started')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className={styles.features}>
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

export default Home;
