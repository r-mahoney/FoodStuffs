import { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";

import { TRPCProvider } from "~/utils/api";

const CLERK_PUBLISHABLE_KEY =
  "pk_test_a25vd24tc3dpbmUtNzMuY2xlcmsuYWNjb3VudHMuZGV2JA";
// const CLERK_PUBLISHABLE_KEY =
//   "pk_test_dG91Y2hpbmctYmVkYnVnLTQ0LmNsZXJrLmFjY291bnRzLmRldiQ";

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === "(auth)";

    console.log("User changed: ", isSignedIn);

    if (isSignedIn && !inTabsGroup) {
      router.replace("/(auth)/(home)/home");
    } else if (!isSignedIn) {
      router.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  return <Slot />;
};

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const RootLayout = () => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <TRPCProvider>
        <InitialLayout />
      </TRPCProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
