/** Search input with icon, clear button and correct keyboard behaviour. */
import React from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontSize, spacing } from "../constants/theme";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  onClear,
  placeholder = "Search destinations…",
}: SearchBarProps) {
  return (
    <View style={styles.wrap}>
      <Ionicons
        name="search"
        size={18}
        color={colors.gray}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.grayLight}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="words"
        clearButtonMode="while-editing"
        accessibilityLabel="Search destinations"
      />
      {value.length > 0 ? (
        <TouchableOpacity
          hitSlop={10}
          onPress={onClear}
          accessibilityLabel="Clear search"
        >
          <Ionicons name="close-circle" size={20} color={colors.grayLight} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: spacing.l,
    paddingVertical: 12,
  },
  icon: {
    marginRight: spacing.s + 2,
    top: 1,
  },
  input: {
    flex: 1,
    fontSize: fontSize.medium,
    color: colors.ink,
    paddingVertical: 0,
  },
});
