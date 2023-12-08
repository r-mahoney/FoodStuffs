import React from "react";
import { Button } from "react-native";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { OAuthStrategy } from "@clerk/types";

import { useWarmUpBrowser } from "../hooks/warmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

const capitalize = (word: string) => {
  return word
    .split(" ")
    .map((l: string) => l[0]!.toUpperCase() + l.substring(1))
    .join(" ");
};

const SignInWithOAuth = ({ strategyType }: { strategyType: string }) => {
  if (!strategyType) return;
  const type = capitalize(strategyType.split("_")[1] as string);
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({
    strategy: strategyType as OAuthStrategy
  });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive?.({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.log("error signing in", err);
    }
  }, []);

  return <Button title={`Sign in with ${type}`} onPress={onPress} />;
};
export default SignInWithOAuth;
