import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";

const CustomHeaderButton = (props) => {
  // header button, IconComponent, iconsize frm pckage installed with vector icons (Ionicons specific icoins using). forwarding all props by pulling pout all key value pairs and passing to this obj
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
    //   if on android color is white otherwise (ios) color primary color
      color={Platform.OS === 'android' ? 'black' : colors.primaryColor}
    />
  );
};

const styles = StyleSheet.create({});

export default CustomHeaderButton;
