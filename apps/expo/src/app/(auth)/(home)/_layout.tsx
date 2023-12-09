import type { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import type { ParamListBase } from "@react-navigation/native";
import { router, useNavigation } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React from "react";

import HamburgerIcon from "~/components/HamburgerIcon";

//@ts-expect-error dont know what props were passing yet
const CustomDrawerComponent = (props) => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={"Home"}
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer());
          router.push("/(auth)/(home)/home");
        }}
      ></DrawerItem>
      <DrawerItem
        label={"Add to Pantry"}
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer());
          router.push("/(auth)/(home)/pantry");
        }}
      ></DrawerItem>
      <DrawerItem
        label={"Shopping List"}
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer());
          router.push("/(auth)/(home)/shopping-list");
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
        drawerContent={(props) => <CustomDrawerComponent props={props}/>}
      />
    </>
  );
}
