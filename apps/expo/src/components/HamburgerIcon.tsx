import React from "react";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  DrawerActions,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

const HamburgerIcon = () => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();
  return (
    <Pressable onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} style={{ marginLeft: 10 }}>
      <Ionicons name="menu" size={24} color={"#fff"} />
    </Pressable>
  );
};
export default HamburgerIcon;
