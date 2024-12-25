'use client';

import { SDKProvider, useLaunchParams } from '@telegram-apps/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { type FC, useEffect, useMemo } from 'react';
import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './App';
import { ErrorBoundary } from './ErrorBoundary';
import { wagmiAdapter, projectId } from './utils/config';

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Create AppKit configuration
const appKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: wagmiAdapter.networks,
  metadata: {
    name: 'TMA',
    description: 'AppKit Example',
    url: 'https://reown.com/appkit',
    icons: ['https://assets.reown.com/reown-profile-pic.png']
  },
  features: {
    analytics: true
  }
});

const Inner: FC = () => {
  const manifestUrl = useMemo(() => {
    return new URL('tonconnect-manifest.json', window.location.href).toString();
  }, []);
  const debug = useLaunchParams().startParam === 'debug';

  useEffect(() => {
    if (debug) {
      import('eruda').then((lib) => lib.default.init());
    }
  }, [debug]);

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <TonConnectUIProvider manifestUrl={manifestUrl}>
          <SDKProvider acceptCustomStyles debug={debug}>
            <App />
          </SDKProvider>
        </TonConnectUIProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

// ErrorBoundaryError component for global error handling
const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
  <div>
    <p>An unhandled error occurred:</p>
    <blockquote>
      <code>
        {error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : JSON.stringify(error)}
      </code>
    </blockquote>
  </div>
);

// Root Component with Error Boundary
export const Root: FC = () => (
  <ErrorBoundary fallback={(error) => <ErrorBoundaryError error={error} />}>
    <Inner />
  </ErrorBoundary>
);