import React from "react"

import {
  ListItem as MUIListItem,
  ListItemText,
  ListItemIcon,
  Icon,
} from "@material-ui/core"

const ListItem = ({ icon, primary, secondary }) => (
  <MUIListItem>
    <ListItemIcon>
      <Icon>{icon}</Icon>
    </ListItemIcon>
    <ListItemText primary={primary} secondary={secondary} />
  </MUIListItem>
)

export default ListItem
