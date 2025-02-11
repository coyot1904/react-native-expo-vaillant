import React, { useCallback } from "react";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import { startServer } from "./src/server";
import CustomerComponent from "./src/customers";
import { Customer } from "./src/types/customer";
import { ConnectivityStatus } from "./src/types/connectivity";

startServer();

export default function App() {
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [connectivityStatus, setConnectivityStatus] = React.useState<
    ConnectivityStatus[]
  >([]);

  const fetchData = useCallback(async () => {
    try {
      // Fetch customers first
      const customerRes = await fetch("/api/customers");
      if (!customerRes.ok) throw new Error("Failed to fetch customers");
      const customerJson = await customerRes.json();
      setCustomers(customerJson.customers);

      // Fetch customer connectivity report once customers are set
      const connectivityRes = await fetch("/api/customer-connectivity-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerIds: customerJson.customers.map((c: Customer) => c._id),
        }),
      });
      const connectivityJson = await connectivityRes.json();
      setConnectivityStatus(connectivityJson.customerConnectivity);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  React.useEffect(() => {
    const controller = new AbortController();
    fetchData().catch(console.error);
    return () => controller.abort();
  }, [fetchData]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CustomerComponent
          customers={customers}
          connectivityStatus={connectivityStatus}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 15,
  },
});
