import { EdgeProps, getSmoothStepPath } from "reactflow";

export function DefaultEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <path
      id={id}
      style={style}
      className="fill-none stroke-slate-300 stroke-2"
      d={edgePath}
      markerEnd={markerEnd}
    />
  );
}