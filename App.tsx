import { StyleSheet, Text, View, SafeAreaView, Alert } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          padding:10,
          margin:18,
          textAlign: "center",
          fontSize: 58,
          color: "pink",
          fontWeight: 200,
        }}
      >
        Bienvenue !! Ca va ?!
      </Text>
      <Text
      style={{
        padding:20,
        color:"#0054"
      }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        <Text
        style={{
          color: "blue",
          textDecorationLine:"underline",
          fontSize:20
            }}
            onPress={() => Alert.alert("Vous avez appuyer sur le texte")}>
                    {" "}   Appuyer ici ! {" "}
        </Text>
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center'
  },
});
