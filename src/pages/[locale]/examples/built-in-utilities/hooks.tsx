/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Alert } from 'reactstrap';
import BuiltInUtilitiesSidebar from '../../../../components/doc/BuiltInUtilitiesSidebar';
import DocPage from '../../../../components/doc/DocPage';
import I18nLink from '../../../../components/i18n/I18nLink';
import DefaultLayout from '../../../../components/pageLayouts/DefaultLayout';
import Code from '../../../../components/utils/Code';
import ExternalLink from '../../../../components/utils/ExternalLink';
import withApollo from '../../../../hocs/withApollo';
import { StaticParams } from '../../../../types/nextjs/StaticParams';
import { OnlyBrowserPageProps } from '../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import { getCommonStaticPaths, getCommonStaticProps } from '../../../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/examples/built-in-utilities/hooks';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/zeit/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps, StaticParams> = getCommonStaticProps;

/**
 * Only executed on the server side at build time
 * Necessary when a page has dynamic routes and uses "getStaticProps"
 */
export const getStaticPaths: GetStaticPaths<StaticParams> = getCommonStaticPaths;

/**
 * SSG pages are first rendered by the server (during static bundling)
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = {} & SSGPageProps<Partial<OnlyBrowserPageProps>>;

const HooksPage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DefaultLayout
      {...props}
      pageName={'hooks'}
      headProps={{
        title: 'Hooks examples - Next Right Now',
      }}
      Sidebar={BuiltInUtilitiesSidebar}
    >
      <DocPage>
        <h1 className={'pcolor'}>Hooks examples</h1>

        <Alert color={'info'}>
          A few hooks are provided as utilities:<br />
          <ul
            css={css`
              text-align: left;
            `}
          >
            <li>
              <code>useHasMounted</code>: Hook to properly handle expected differences between server and browser rendering.<br />
              Helps to avoid "Text content did not match" warnings, during React rehydration.
            </li>
            <li>
              <code>useI18n</code>: Hook to access i18n/localisation data
            </li>
            <li>
              <code>useUserSession</code>: Hook to access the user session data
            </li>
          </ul>
        </Alert>

        <h2>useHasMounted</h2>

        <p>
          This hook helps rendering content only when the component has mounted (client-side).<br />
          It's helpful when you want some part of your app to only render on the client.<br />
          <br />
          We strongly recommend reading
          <ExternalLink href={'https://joshwcomeau.com/react/the-perils-of-rehydration/#abstractions'}>The perils of rehydration</ExternalLink>
          to familiarise yourself with this.
        </p>

        <Code
          text={`
            const MyComponent: React.FunctionComponent<Props> = (props): JSX.Element => {
              const hasMounted = useHasMounted();
              if (!hasMounted) {
                // Returns null on server-side
                // Returns null on client-side, until the component has mounted
                return null;
              }

              // Do stuff that will be executed only on the client-side, after rehydration
              return (...)
            };

            export default MyComponent;
          `}
        />

        <hr />

        <h2>useI18n</h2>

        <p>
          This hook helps access i18n data in any functional component.
        </p>

        <Code
          text={`
            const { lang, locale }: I18n = useI18n();
          `}
        />

        <hr />

        <h2>useUserSession</h2>

        <p>
          This hook helps access user data in any functional component.
        </p>

        <Code
          text={`
            const { deviceId }: UserSession = useUserSession();
          `}
        />

        <hr />

      </DocPage>
    </DefaultLayout>
  );
};

export default withApollo()(HooksPage);