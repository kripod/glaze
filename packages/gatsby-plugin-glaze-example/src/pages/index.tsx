import { useStyling } from 'glaze';
import React from 'react';

import { Layout } from '../components/Layout';

export default function IndexPage(): JSX.Element {
  const sx = useStyling();

  return (
    <Layout>
      <div {...sx({ px: 4, py: 2, bg: 'papayawhip', color: 'rebeccapurple' })}>
        Hello, world!
      </div>
    </Layout>
  );
}
