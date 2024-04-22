import React, { useCallback } from "react"
import { CanvasPrimitiveRenderer } from "./CanvasPrimitiveRenderer"
import { AnyElement } from "@tscircuit/builder"
import { useMemo } from "react"
import { convertElementToPrimitives } from "../lib/convert-element-to-primitive"
import { Matrix } from "transformation-matrix"
import { GridConfig } from "lib/types"
import { MouseElementTracker } from "./MouseElementTracker"
import { DimensionOverlay } from "./DimensionOverlay"
import { ToolbarOverlay } from "./ToolbarOverlay"
import { ErrorOverlay } from "./ErrorOverlay"

export interface CanvasElementsRendererProps {
  elements: AnyElement[]
  transform?: Matrix
  width?: number
  height?: number
  grid?: GridConfig
}

export const CanvasElementsRenderer = (props: CanvasElementsRendererProps) => {
  const primitives = useMemo(() => {
    const primitives = props.elements.flatMap((elm) =>
      convertElementToPrimitives(elm, props.elements)
    )
    return primitives
  }, [props.elements])
  return (
    <MouseElementTracker transform={props.transform} primitives={primitives}>
      <DimensionOverlay transform={props.transform!}>
        <ToolbarOverlay elements={props.elements as any}>
          <ErrorOverlay
            transform={props.transform}
            elements={props.elements as any}
          >
            <CanvasPrimitiveRenderer
              transform={props.transform}
              primitives={primitives}
              width={props.width}
              height={props.height}
              grid={props.grid}
            />
          </ErrorOverlay>
        </ToolbarOverlay>
      </DimensionOverlay>
    </MouseElementTracker>
  )
}
