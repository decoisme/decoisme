'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  layer: number;
}

interface Edge {
  from: number;
  to: number;
  layer: number;
}

const LAYER_CONFIG = [
  { opacity: 0.15, parallaxFactor: -0.03, nodeSize: 1 },
  { opacity: 0.3, parallaxFactor: -0.06, nodeSize: 2 },
  { opacity: 0.55, parallaxFactor: -0.1, nodeSize: 2 },
];

const NODE_COUNT = 60;
const CONNECTION_DISTANCE = 280;

function generateNetwork(): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      layer: Math.floor(Math.random() * 3),
    });
  }

  // Connect nearby nodes within the same layer
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].layer !== nodes[j].layer) continue;

      const dx = (nodes[i].x - nodes[j].x) * (typeof window !== 'undefined' ? window.innerWidth : 1920) / 100;
      const dy = (nodes[i].y - nodes[j].y) * (typeof window !== 'undefined' ? window.innerHeight : 1080) / 100;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CONNECTION_DISTANCE) {
        edges.push({
          from: i,
          to: j,
          layer: nodes[i].layer,
        });
      }
    }
  }

  return { nodes, edges };
}

function NetworkLayer({
  nodes,
  edges,
  layerIndex,
  mouseX,
  mouseY,
}: {
  nodes: Node[];
  edges: Edge[];
  layerIndex: number;
  mouseX: number;
  mouseY: number;
}) {
  const config = LAYER_CONFIG[layerIndex];
  const layerNodes = nodes.filter((n) => n.layer === layerIndex);
  const layerEdges = edges.filter((e) => e.layer === layerIndex);

  // Inverse parallax: move opposite to mouse
  const offsetX = (mouseX - (typeof window !== 'undefined' ? window.innerWidth / 2 : 960)) * config.parallaxFactor;
  const offsetY = (mouseY - (typeof window !== 'undefined' ? window.innerHeight / 2 : 540)) * config.parallaxFactor;

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity: config.opacity }}
      animate={{ x: offsetX, y: offsetY }}
      transition={{ type: 'tween', ease: 'linear', duration: 0 }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Lines */}
        {layerEdges.map((edge, idx) => {
          const from = nodes[edge.from];
          const to = nodes[edge.to];
          return (
            <line
              key={`edge-${layerIndex}-${idx}`}
              x1={`${from.x}%`}
              y1={`${from.y}%`}
              x2={`${to.x}%`}
              y2={`${to.y}%`}
              stroke="black"
              strokeWidth="0.5"
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {layerNodes.map((node) => (
        <div
          key={`node-${node.id}`}
          className="absolute bg-black"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: `${config.nodeSize}px`,
            height: `${config.nodeSize}px`,
          }}
        />
      ))}
    </motion.div>
  );
}

export function NetworkBackground() {
  const [mouseX, setMouseX] = useState(typeof window !== 'undefined' ? window.innerWidth / 2 : 960);
  const [mouseY, setMouseY] = useState(typeof window !== 'undefined' ? window.innerHeight / 2 : 540);
  const [mounted, setMounted] = useState(false);

  const network = useMemo(() => generateNetwork(), []);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Network Plexus Layers */}
        {LAYER_CONFIG.map((_, layerIndex) => (
          <NetworkLayer
            key={`layer-${layerIndex}`}
            nodes={network.nodes}
            edges={network.edges}
            layerIndex={layerIndex}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        ))}

        {/* Dynamic Crosshair — Horizontal Line */}
        <div
          className="absolute left-0 right-0 bg-black"
          style={{
            top: `${mouseY}px`,
            height: '1px',
            opacity: 0.12,
          }}
        />

        {/* Dynamic Crosshair — Vertical Line */}
        <div
          className="absolute top-0 bottom-0 bg-black"
          style={{
            left: `${mouseX}px`,
            width: '1px',
            opacity: 0.12,
          }}
        />

        {/* Crosshair intersection marker */}
        <div
          className="absolute bg-black"
          style={{
            left: `${mouseX - 2}px`,
            top: `${mouseY - 2}px`,
            width: '4px',
            height: '4px',
            opacity: 0.25,
          }}
        />
      </div>
  );
}
