
import React from "react"

import MapGroup from "./MapGroup"

const Lines = ({
  groupName,
  itemName,
  ...restProps
}) =>
  <MapGroup
    groupName={groupName}
    itemName={itemName}
    {...restProps}
  />

Lines.defaultProps = {
  groupName: "lines",
  itemName: "line",
}

export default Lines
