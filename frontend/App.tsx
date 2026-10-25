import { useState } from "react";

import SearchScreen from "./src/screens/SearchScreen";
import BusinessDetailsScreen from "./src/screens/BusinessDetailsScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("search");

  const [selectedBusiness, setSelectedBusiness] =
    useState("Juniper & Grain");

  function openBusiness(businessName: string) {
    setSelectedBusiness(businessName);
    setCurrentScreen("details");
  }

  function goBack() {
    setCurrentScreen("search");
  }

  if (currentScreen === "details") {
    return (
      <BusinessDetailsScreen
        businessName={selectedBusiness}
        onBack={goBack}
      />
    );
  }

  return (
    <SearchScreen
      onViewBusiness={openBusiness}
    />
  );
}