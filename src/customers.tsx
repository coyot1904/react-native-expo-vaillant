import React, { useCallback } from "react";
import { Text, View, FlatList, StyleSheet, Image } from "react-native";
import { Customer } from "./types/customer";
import { ConnectivityStatus } from "./types/connectivity";

type CodeProps = {
  customers: Customer[];
  connectivityStatus: ConnectivityStatus[];
};

const CustomerComponent: React.FC<CodeProps> = ({
  customers,
  connectivityStatus,
}) => {
  const getStatus = useCallback(
    (customerId: number) => {
      const status = connectivityStatus.find(
        (status) => status.id === customerId
      );
      if (!status) return <Text style={styles.boldInfoText}>Unknown</Text>;

      return (
        <View
          style={[
            styles.statusIndicator,
            status.isConnected ? styles.green : styles.red,
          ]}
        />
      );
    },
    [connectivityStatus]
  );

  const Item = React.memo(
    ({ customer, index }: { customer: Customer; index: number }) => (
      <View
        style={[
          styles.itemContainer,
          { backgroundColor: index % 2 === 0 ? "#D8BFD8" : "#FF6347" },
        ]}
      >
        <View style={styles.topContainer}>
          <Image style={styles.avatar} source={{ uri: customer.avatar }} />
          <Text style={styles.customerNameText}>
            {customer.firstName} {customer.lastName}
          </Text>
        </View>
        <Text style={styles.informationText}>
          <Text style={styles.boldInfoText}>Birthday:</Text>{" "}
          {new Date(customer.birthday).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
        <Text style={styles.informationText}>
          <Text style={styles.boldInfoText}>Email:</Text> {customer.email}
        </Text>
        <Text style={styles.informationText}>
          <Text style={styles.boldInfoText}>Sex:</Text> {customer.sex}
        </Text>
        <Text style={styles.informationText}>
          <Text style={styles.boldInfoText}>Subscription Tier:</Text>{" "}
          {customer.subscriptionTier}
        </Text>
        <Text style={styles.informationText}>
          <Text style={styles.boldInfoText}>Address:</Text>{" "}
          {customer.address.street} - {customer.address.zipCode} -{" "}
          {customer.address.city} - {customer.address.country}
        </Text>
        {getStatus(customer._id)}
      </View>
    )
  );

  return (
    <FlatList
      data={customers}
      renderItem={({ item, index }) => <Item customer={item} index={index} />}
      keyExtractor={(item) => item._id.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
    padding: 15,
    marginTop: 15,
    borderRadius: 7,
  },
  customerNameText: {
    color: "#FFF",
    marginLeft: 7,
    fontSize: 16,
    fontWeight: "700",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 40,
    borderColor: "#FFF",
    borderWidth: 1,
  },
  topContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  informationText: {
    color: "#FFF",
    marginTop: 10,
    fontSize: 14,
    fontWeight: "400",
  },
  boldInfoText: {
    fontWeight: "700",
  },
  statusIndicator: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  green: { backgroundColor: "#9ACD32" },
  red: { backgroundColor: "#FF0000" },
});

export default CustomerComponent;
