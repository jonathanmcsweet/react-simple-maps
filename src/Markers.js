
import React from "react"

import MapGroup from "./MapGroup"

const Markers = ({
  groupName,
  itemName,
  ...restProps
}) =>
  <MapGroup
    groupName={groupName}
    itemName={itemName}
    {...restProps}
  />

Markers.defaultProps = {
  groupName: "markers",
  itemName: "marker",
}

export default Markers
