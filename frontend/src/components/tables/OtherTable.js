import React from "react"

import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table"

const OtherTable = props => {
  const {other} = props
	return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell numeric style={{textAlign:"center"}}>MAC Address</TableCell>
            <TableCell numeric style={{textAlign:"center"}}>Position</TableCell>
            <TableCell numeric style={{textAlign:"center"}}>Last Seen</TableCell>
            <TableCell numeric style={{textAlign:"center"}}>APs</TableCell>
            <TableCell numeric style={{textAlign:"center"}}>Probes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {other.map(n => {
            return (
              <TableRow key={n["Key"]}>
                <TableCell numeric style={{textAlign:"center"}}>{n["Device MAC"]}</TableCell>
                <TableCell style={{textAlign:"center"}}>{n["Latitude"] + ", " + n["Longitude"]}</TableCell>
                <TableCell style={{textAlign:"center"}}>{n["Last Seen"]}</TableCell>
                <TableCell numeric style={{textAlign:"center"}}>{n["APs"].length}</TableCell>
                <TableCell numeric style={{textAlign:"center"}}>{n["Probes"].length}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    )
}

export default OtherTable