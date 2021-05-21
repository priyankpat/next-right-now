import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
import {
  getPublicLayoutStaticPaths,
  getPublicLayoutStaticProps,
} from '@/layouts/public/publicLayoutSSG';

import { AMPLITUDE_PAGES } from '@/modules/core/amplitude/amplitude';
import Code from '@/components/dataDisplay/Code';
import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { Customer } from '@/modules/core/data/types/Customer';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import PublicLayout from '@/layouts/public/components/PublicLayout';
import React from 'react';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { createLogger } from '@/modules/core/logging/logger';
import useCustomer from '@/modules/core/data/hooks/useCustomer';

const fileLabel = 'pages/[locale]/public/index';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  fileLabel,
});

/**
 * Only executed on the server side at build time
 * Necessary when a page has dynamic routes and uses "getStaticProps"
 */
export const getStaticPaths: GetStaticPaths<CommonServerSideParams> = getPublicLayoutStaticPaths;

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = getPublicLayoutStaticProps;

/**
 * SSG pages are first rendered by the server (during static bundling)
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = {} & SSGPageProps<Partial<OnlyBrowserPageProps>>;

/**
 * Public template for SSG pages
 */
const PagePublicTemplateSSG: NextPage<Props> = (props): JSX.Element => {
  const customer: Customer = useCustomer();

  return (
    <PublicLayout
      {...props}
      pageName={AMPLITUDE_PAGES.TEMPLATE_SSG_PAGE}
    >
      <p>
        This pages was created using from "/layouts/public/pagePublicTemplateSSG.tsx".<br />
        it is located at "/pages/[locale]/public/index.tsx", but you most likely want to move it to "/pages/[locale]/index.tsx".<br />
        <br />
        This page uses the "public" layout, which comes "naked" (no nav/footer) and doesn't fetch any data. (data are mocked, and minimalist)
        <br />
        You can start customizing NRN here. Other pages use the "demo" layout, which comes with its own data fetching, components, and inherent complexity.<br />
        <br />
        <br />
        Usually, when I create a new project from NRN, I wipe the whole "/layouts/demo" folder, unless I want to keep it around for its documentation/examples.
        <br />
        <br />
      </p>
      <p>
        <b>Customer data</b>:<br />
        <Code
          text={JSON.stringify(customer, null, 2)}
        />
      </p>
    </PublicLayout>
  );
};

export default PagePublicTemplateSSG;
