import * as React from "react";
import * as ReactDOM from "react-dom";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { Checkbox } from "@progress/kendo-react-inputs";
import { ColumnMenu, ColumnMenuCheckboxFilter } from "./columnMenu";
import { filterBy } from "@progress/kendo-data-query";
import { sampleProducts } from "./sample-products";

const initialFilter = {
  logic: "and",
  filters: [
    {
      field: "ProductName",
      operator: "contains",
      value: "Chef"
    }
  ]
};
const App = () => {
  const [filter, setFilter] = React.useState(initialFilter);

  const [enableFilters, setEnableFilters] = React.useState({
    filterable: true,
    columnMenu: true,
    size: "medium"
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
          marginBottom: "1rem",
          backgroundColor: "#eee",
          borderRadius: "0.375rem"
        }}
      >
        <Checkbox
          defaultChecked={true}
          label={"Allow filters"}
          onChange={(e) =>
            setEnableFilters({ ...enableFilters, filterable: e.value })
          }
        />
        <Checkbox
          defaultChecked={true}
          label={"Allow Column menu"}
          onChange={(e) =>
            setEnableFilters({ ...enableFilters, columnMenu: e.value })
          }
        />
        <Checkbox
          defaultChecked={false}
          label={"Dense datagrid"}
          onChange={(e) =>
            setEnableFilters({
              ...enableFilters,
              size: e.value ? "small" : "medium"
            })
          }
        />
      </div>

      <Grid
        style={{
          height: "auto"
        }}
        data={filterBy(sampleProducts, filter)}
        filterable={enableFilters.filterable}
        filter={filter}
        onFilterChange={(e) => setFilter(e.filter)}
        size={enableFilters.size}
      >
        <Column field="ProductID" title="ID" filterable={false} width="60px" />
        <Column
          field="ProductName"
          title="Product Name"
          width="400px"
          columnMenu={enableFilters.columnMenu && ColumnMenu}
        />
        <Column
          field="FirstOrderedOn"
          filter="date"
          format="{0:d}"
          columnMenu={enableFilters.columnMenu && ColumnMenu}
        />
        <Column
          field="UnitPrice"
          filter="numeric"
          format="{0:c}"
          columnMenu={enableFilters.columnMenu && ColumnMenu}
        />
        <Column
          field="Discontinued"
          filter="boolean"
          width="150px"
          columnMenu={enableFilters.columnMenu && ColumnMenuCheckboxFilter}
        />
      </Grid>
    </>
  );
};
ReactDOM.render(<App />, document.querySelector("my-app"));
