import CodeBlock from '@theme/CodeBlock';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import * as React from 'react';

export interface PackageInstallProps {
  dependencies?: string[];
}

export default function PackageInstall({
  dependencies,
}: PackageInstallProps): JSX.Element {
  return (
    <Tabs
      groupId="package-managers"
      defaultValue="npm"
      values={[
        { label: 'npm', value: 'npm' },
        { label: 'Yarn', value: 'yarn' },
      ]}
    >
      <TabItem value="npm">
        <CodeBlock className="shell">
          {dependencies ? `npm install ${dependencies.join(' ')}` : ''}
        </CodeBlock>
      </TabItem>

      <TabItem value="yarn">
        <CodeBlock className="shell">
          {dependencies ? `yarn add ${dependencies.join(' ')}` : ''}
        </CodeBlock>
      </TabItem>
    </Tabs>
  );
}
