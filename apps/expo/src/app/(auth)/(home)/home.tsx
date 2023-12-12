import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, View, StyleSheet } from "react-native";
import * as SQLite from "expo-sqlite";
import { useUser } from "@clerk/clerk-expo";

interface Item {
  id: number;
  item_name: string;
  units: string;
  number: string;
}

const Home = () => {
  const db = SQLite.openDatabase("pantry_items.db");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS pantry_items (id INTEGER PRIMARY KEY AUTOINCREMENT, item_name TEXT, number TEXT, units TEXT)",
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM pantry_items",
        undefined,
        (txtObj, resultsSet) => setItems(resultsSet.rows._array),
        (txObj, error) => console.log(error),
      );
    });

    setLoading(false);
  }, []);

  console.log(items);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ textAlign: "center" }}>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ textAlign: "center" }}>
          {user!.firstName
            ? `Welcome ${user!.firstName}  🎉!`
            : `Good morning ${user!.username}!  🎉`}
        </Text>
        {items.map((item) => (
          <View style>
            <Text>{item.item_name}</Text>
            <Button onPress={() => {}} title="Delete"></Button>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  button: {
    alignItems: "flex-end"
  }
})