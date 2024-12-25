import { cookieStorage, createStorage, http } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { arbitrum, sepolia, bsc } from "@reown/appkit/networks";
import { type Chain } from "viem";

// Get projectId from environment variables with type checking
export const projectId: string | undefined = "537931f27ae9d94a71f7e559a4aff8e8";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Define the networks array with proper typing
export const networks: Chain[] = [arbitrum, sepolia, bsc];

// Set up the Wagmi Adapter (Config) with proper typing
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

// Export the wagmi config
export const config = wagmiAdapter.wagmiConfig;