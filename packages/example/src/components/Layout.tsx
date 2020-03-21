import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { TreatProvider } from 'react-treat';

import theme from '../gatsby-plugin-treat/theme.treat';

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          name
          description
        }
      }
    }
  `);

  return (
    <React.StrictMode>
      <Helmet
        titleTemplate={`%s - ${data.site.siteMetadata.name}`}
        defaultTitle={data.site.siteMetadata.name}
      >
        <meta name="description" content={data.site.siteMetadata.description} />
      </Helmet>

      <TreatProvider theme={theme}>
        <header>{/* TODO */}</header>

        <main>{children}</main>

        <footer>{/* TODO */}</footer>
      </TreatProvider>
    </React.StrictMode>
  );
}
