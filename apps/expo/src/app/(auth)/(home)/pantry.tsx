import React, { useEffect, useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as SQLite from "expo-sqlite";

interface Item {
  id?: number | undefined;
  item_name: string;
  units: string;
  number: string;
}

export default function ShoppingList() {
  const [itemToAdd, setItemToAdd] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [units, setUnits] = useState("");
  const [numberOfItems, setNumberOfItems] = useState("");
  const [pantryItems, setPantryItems] = useState<Item[]>([]);
  const db = SQLite.openDatabase("pantry_items.db");

  const validateInput = (input: string, element: string) => {
    if (!input) {
      let current = [...errors];
      current.push(`${element} must contain a valid input.`);
      setErrors(current);
    }
  };

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
        (txtObj, resultsSet) => setPantryItems(resultsSet.rows._array),
        (txtObj, error) => {
          console.log(error);
          if (error) return true;
          return false;
        },
      );
    });
  }, []);

  const addItemToPantry = (pantryItem: Item) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO pantry_items (item_name, number, units) VALUES (?, ?, ?)",
        [pantryItem.item_name, pantryItem.number, pantryItem.units],
        (txtObj, resultsSet) => {
          let existingItems = [...pantryItems];
          existingItems.push({
            id: resultsSet.insertId,
            item_name: pantryItem.item_name,
            number: pantryItem.number,
            units: pantryItem.units,
          });
          setPantryItems(existingItems);
        },
        (txtObj, error) => console.log(error),
      );
    });
  };

  const submit = () => {
    validateInput(numberOfItems, "Number of Items");
    validateInput(itemToAdd, "Item Name");
    validateInput(units, "Units");
    if (errors.length > 0) {
      errors.forEach((error) => alert(error));
      return
    } else {
      const pantryItem: Item = {
        number: numberOfItems,
        item_name: itemToAdd,
        units: units,
      };
      addItemToPantry(pantryItem);
      setNumberOfItems("");
      setUnits("");
      setItemToAdd("");
    }
  };
  return (
    <View style={styles.container}>
      {/* <Spinner visible={loading} /> */}
      {/* OAUTH NEEDS TO BE WORKED ON */}
      {/* {authTypes.map((strategyType: string) => (
          <SignInWithOAuth strategyType={strategyType} />
      ))} */}
      <TextInput
        autoCapitalize="words"
        placeholder="Item to Add"
        value={itemToAdd}
        onChangeText={setItemToAdd}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Number of Items"
        keyboardType="number-pad"
        value={numberOfItems}
        onChangeText={setNumberOfItems}
        style={styles.inputField}
      />
      <TextInput
        autoCapitalize="words"
        placeholder="Units"
        value={units}
        onChangeText={setUnits}
        style={styles.inputField}
      />

      <Button
        onPress={() => submit()}
        title="Add Item to Pantry"
        color={"#6c47ff"}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#6c47ff",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    margin: 8,
    alignItems: "center",
  },
});
