import { useUser } from "@clerk/clerk-expo";
import React from "react";
import { Text, View } from "react-native";

const Home = () => {
  const { user } = useUser();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ textAlign: "center" }}>
        {user!.firstName
          ? `Welcome ${user!.firstName}  🎉!`
          : `Good morning ${user!.username}!  🎉`}
      </Text>
    </View>
  );
};

export default Home;
