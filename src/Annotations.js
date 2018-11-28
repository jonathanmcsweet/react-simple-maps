
import React from "react"

import MapGroup from "./MapGroup"

const Annotations = ({
  groupName,
  itemName,
  ...restProps
}) =>
  <MapGroup
    groupName={groupName}
    itemName={itemName}
    {...restProps}
  />

Annotations.defaultProps = {
  groupName: "annotations",
  itemName: "annotation",
}

export default Annotations
