import React from "react";
import { Text, View } from "react-native";
import { router, useNavigation } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useUser } from "@clerk/clerk-expo";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import type { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerActions, ParamListBase } from "@react-navigation/native";

import HamburgerIcon from "~/components/HamburgerIcon";

const CustomDrawerComponent = (props: any) => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={"Home"}
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer());
          router.push("/(auth)/(home)");
        }}
      ></DrawerItem>
      <DrawerItem
        label={"Add to Pantry"}
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer());
          router.push("/(auth)/(home)");
        }}
      ></DrawerItem>
      <DrawerItem
        label={"Shopping List"}
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer());
          router.push("/(auth)/(home)");
        }}
      ></DrawerItem>
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  return (
    <>
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: "#6c47ff",
          },
          headerTintColor: "#fff",
          headerLeft: () => <HamburgerIcon />,
          title: "Home",
        }}
        drawerContent={(props) => <CustomDrawerComponent />}
      />
    </>
  );
}
