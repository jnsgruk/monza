import React, { Component } from "react"

import { 
  SearchState, 
  IntegratedFiltering,
  SortingState, 
  IntegratedSorting,
  PagingState, 
  IntegratedPaging,
  FilteringState,
  GroupingState,
  IntegratedGrouping
} from "@devexpress/dx-react-grid"

import { 
  Grid, 
  Table, 
  TableHeaderRow, 
  PagingPanel, 
  TableFilterRow, 
  Toolbar, 
  SearchPanel,
  DragDropProvider,
  GroupingPanel,
  TableGroupRow, 
} from "@devexpress/dx-react-grid-material-ui"

class DataTable extends Component {

  state = {
    sorting: [],
    currentPage: 0,
    pageSize: 10,
    pageSizes: [0, 10, 20, 30, 50, 100],
    filters: [],
    searchValue: "",
    grouping:  []
  }

  changeSorting = sorting => this.setState({ sorting })
  changeGrouping = grouping => this.setState({ grouping })
  changeCurrentPage = currentPage => this.setState({ currentPage })
  changePageSize = pageSize => this.setState({ pageSize })
  changeFilters = filters => this.setState({ filters })
  changeSearchValue = value => this.setState({ searchValue: value })
  changeColumnWidths = columnWidths => this.setState({ columnWidths })

  render = () => {
    const { columns, rows } = this.props  
    const { sorting, grouping, pageSize, pageSizes, currentPage, filters, searchValue } = this.state
    return (
        <Grid rows={rows} columns={columns}>
          
          <SortingState 
            sorting={sorting} 
            onSortingChange={this.changeSorting}
          />
          <IntegratedSorting />
          
          <SearchState
            value={searchValue}
            onValueChange={this.changeSearchValue}
          />
          <FilteringState
            filters={filters}
            onFiltersChange={this.changeFilters}
          />
          <IntegratedFiltering />

          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={this.changeCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={this.changePageSize}
          />
          <IntegratedPaging/>

          <DragDropProvider />
          <GroupingState
            grouping={grouping}
            onGroupingChange={this.changeGrouping}
          />
          <IntegratedGrouping />

          <Table />
          <TableHeaderRow showSortingControls/>
          <TableFilterRow/>
          <TableGroupRow />
          <Toolbar />
          <GroupingPanel showGroupingControls />
          <SearchPanel />
          <PagingPanel pageSizes={pageSizes} />
        </Grid>
    )
  }
}

export default DataTable