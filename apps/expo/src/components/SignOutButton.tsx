import { Button, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

export default function SignOut() {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
}
