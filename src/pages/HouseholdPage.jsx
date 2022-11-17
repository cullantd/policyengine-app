import ThreeColumnPage from "../layout/ThreeColumnPage";
import Menu from "../layout/Menu";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { createDefaultHousehold } from "../api/variables";
import { apiCall } from "../api/call";
import { useEffect } from "react";
import VariableEditor from "./household/input/VariableEditor";
import LoadingCentered from "../layout/LoadingCentered";
import ErrorPage from "../layout/Error";
import MaritalStatus from "./household/input/MaritalStatus";
import CountChildren from "./household/input/CountChildren";
import BiPanel from "../layout/BiPanel";
import NetIncomeBreakdown from "./household/output/NetIncomeBreakdown";
import EarningsVariation from "./household/output/EarningsVariation";
import MarginalTaxRates from "./household/output/MarginalTaxRates";
import HouseholdRightSidebar from "./household/HouseholdRightSidebar";

const HOUSEHOLD_OUTPUT_TREE = [
  {
    name: "householdOutput",
    label: "Results",
    children: [
      {
        name: "householdOutput.netIncome",
        label: "Net income",
      },
      {
        name: "householdOutput.earnings",
        label: "Varying your earnings",
      },
      {
        name: "householdOutput.mtr",
        label: "Marginal tax rates",
      },
    ],
  },
];

function HouseholdLeftSidebar(props) {
  const { metadata } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <BiPanel
      left={
        <Menu
          tree={metadata.variableTree}
          selected={searchParams.get("focus") || ""}
          onSelect={(focus) => {
            let newSearchParams = { focus: focus };
            if (searchParams.get("household")) {
              newSearchParams.household = searchParams.get("household");
            }
            setSearchParams(newSearchParams);
          }}
        />
      }
      right={
        <Menu
          tree={HOUSEHOLD_OUTPUT_TREE}
          selected={searchParams.get("focus") || ""}
          onSelect={(focus) => {
            let newSearchParams = { focus: focus };
            if (searchParams.get("household")) {
              newSearchParams.household = searchParams.get("household");
            }
            setSearchParams(newSearchParams);
          }}
        />
      }
      leftTitle="Inputs"
      rightTitle="Outputs"
      leftNavigatedSelected={!(searchParams.get("focus") || "").startsWith("householdOutput")}
    />
  );
}

export function createHousehold(id, countryId, metadata) {
  // Fetches the household with the given ID if it exists, otherwise creates a new one.
  if (id) {
    return apiCall(`/${countryId}/household/${id}`)
      .then((res) => res.json())
      .catch((err) => {
        return createDefaultHousehold(
          countryId,
          metadata.variables,
          metadata.entities
        );
      });
  } else {
    return new Promise((resolve) =>
      resolve(
        createDefaultHousehold(countryId, metadata.variables, metadata.entities)
      )
    );
  }
}

export default function HouseholdPage(props) {
  const { metadata, household, setHousehold, policy, setPolicy } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  let middle;
  const focus = searchParams.get("focus") || "";

  useEffect(() => {
  if (!focus) {
    let newSearch = {};
    for (const [key, value] of searchParams) {
        newSearch[key] = value;
    }
    newSearch.focus = "structure.maritalStatus";
    setSearchParams(newSearch);
  }});

  if (!household.input || !household.computed) {
    middle = <LoadingCentered />;
  } else if (focus.startsWith("input.")) {
    middle = (
      <VariableEditor
        metadata={metadata}
        household={household}
        setHousehold={setHousehold}
      />
    );
  } else if (focus === "structure.maritalStatus") {
    middle = (
      <MaritalStatus
        metadata={metadata}
        household={household}
        setHousehold={setHousehold}
      />
    );
  } else if (focus === "structure.children") {
    middle = (
      <CountChildren
        metadata={metadata}
        household={household}
        setHousehold={setHousehold}
      />
    );
  } else if (focus === "householdOutput.netIncome") {
    middle = <NetIncomeBreakdown metadata={metadata} household={household} />;
  } else if (focus === "householdOutput.earnings") {
    middle = <EarningsVariation metadata={metadata} household={household} />;
  } else if (focus === "householdOutput.mtr") {
    middle = <MarginalTaxRates metadata={metadata} household={household} />;
  } else {
    middle = <LoadingCentered />;
  }
  return (
    <ThreeColumnPage
      left={<HouseholdLeftSidebar metadata={metadata} />}
      middle={middle}
      right={<BiPanel 
        leftTitle="Household" 
        rightTitle="Policy" 
        left={<HouseholdRightSidebar metadata={metadata} household={household} />} 
      />}
    />
  );
}