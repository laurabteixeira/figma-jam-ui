import { Handle, NodeProps, Position } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';


export function Square({selected}: NodeProps) {
  return (
    <div className="bg-slate-100 rounded w-full h-full min-w-[200px] min-h-[200px]">
      <NodeResizer 
        minWidth={200} 
        minHeight={200} 
        isVisible={selected} 
        lineClassName="border-blue-400"
        handleClassName="h-3 w-3 bg-white border-2 border-blue-400"
        />

      <Handle 
        id="top"
        type="source" 
        position={Position.Top} 
        className="-top-5 bg-transparent w-3 h-3 border-2 border-blue-400" 
      />
      <Handle 
        id="bottom"
        type="source" 
        position={Position.Bottom} 
        className="-bottom-5 bg-transparent w-3 h-3 border-2 border-blue-400" 
      />
      <Handle 
        id="left"
        type="source" 
        position={Position.Left} 
        className="-left-5 bg-transparent w-3 h-3 border-2 border-blue-400" 
      />
      <Handle 
        id="right"
        type="source" 
        position={Position.Right} 
        className="-right-5 bg-transparent w-3 h-3 border-2 border-blue-400" 
      />
    </div>
  )
}