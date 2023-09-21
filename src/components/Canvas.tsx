import { useCallback, useRef } from 'react';
import * as Toolbar from '@radix-ui/react-toolbar';
import { slate } from 'tailwindcss/colors'
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  ConnectionMode,
  Connection,
  updateEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import '@reactflow/node-resizer/dist/style.css';
import { Square } from './Square';
import { DefaultEdge } from './DefaultEdge';

// Próximo To-do: Adicionar node de Input.

interface InitialNode extends Node {
  type: keyof typeof NODE_TYPES
}

const initialNodes: InitialNode[] = [
  { 
    id: '1', 
    position: { x: 200, y: 400 }, 
    data: {
      label: 'Node'
    },
    type: 'square',
  },
];

const initialEdges: Edge[] = [
  // { 
  //   id: 'e1-2', 
  //   source: '1', 
  //   target: '2', 
  //   label: 'connect to' 
  // }
];

const NODE_TYPES = {
  square: Square,
}

const EDGE_TYPES = {
  default: DefaultEdge,
}

export function Canvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const edgeUpdateSuccessful = useRef(true);

  const onConnect = useCallback((params: Connection) => {
    return setEdges((eds) => addEdge(params, eds))
  }, [setEdges]);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge: Edge, newConnection: Connection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, [setEdges]);

  const onEdgeUpdateEnd = useCallback((_: MouseEvent | TouchEvent , edge: Edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, [setEdges]);

  function handleAddSquareNode() {
    setNodes((nodes) => {
      return [...nodes, {
        id: crypto.randomUUID(),
        position: {
          x: 600,
          y: 400,
        },
        data: {},
        type: 'square',
      }]
    })
  }

  return (
    <>
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: 'default'
        }}
      >
        <Controls /> 
        <Background color={slate['200']} />
      </ReactFlow>

      <Toolbar.Root className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-slate-950 rounded-2xl shadow-lg border border-slate-100 px-8 h-20 w-96 overflow-hidden">
        <Toolbar.Button onClick={handleAddSquareNode} className="text-zinc-400">
          <div className='w-32 h-32 bg-slate-100 mt-6 rounded transition-transform hover:-translate-y-2'></div>
        </Toolbar.Button>
      </Toolbar.Root>
    </>
  );
}