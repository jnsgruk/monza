import React from "react"

import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table"

const APTable = props => {
  const {aps} = props
	return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{textAlign: "center"}}>SSID</TableCell>
            <TableCell numeric style={{textAlign: "center"}}>MAC Address</TableCell>
            <TableCell numeric style={{textAlign: "center"}}>Channel</TableCell>
            <TableCell numeric style={{textAlign: "center"}}>Position</TableCell>
            <TableCell numeric style={{textAlign: "center"}}>Last Seen</TableCell>
            <TableCell numeric style={{textAlign: "center"}}>Clients</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {aps.map(n => {
            return (
              <TableRow key={n["Key"]}>
                <TableCell style={{textAlign: "center"}}>{n["SSID"]}</TableCell>
                <TableCell numeric style={{textAlign: "center"}}>{n["Device MAC"]}</TableCell>
                <TableCell numeric style={{textAlign: "center"}}>{n["Channel"]}</TableCell>
                <TableCell style={{textAlign: "center"}}>{n["Latitude"] + ", " + n["Longitude"]}</TableCell>
                <TableCell style={{textAlign: "center"}}>{n["Last Seen"]}</TableCell>
                <TableCell numeric style={{textAlign: "center"}}>{n["Clients"].length}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    )
}

export default APTable