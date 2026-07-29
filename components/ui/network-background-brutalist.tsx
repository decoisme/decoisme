'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Node {
  x: number;
  y: number;
  layer: number;
}

interface Connection {
  from: Node;
  to: Node;
  layer: number;
}

export default function NetworkBackgroundBrutalist() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  // Generate random nodes and connections on mount
  useEffect(() => {
    const generatedNodes: Node[] = [];
    const nodeCount = 30;

    // Generate nodes across 3 layers
    for (let i = 0; i < nodeCount; i++) {
      generatedNodes.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        layer: Math.floor(Math.random() * 3) + 1, // layers 1, 2, 3
      });
    }

    // Generate connections between nearby nodes
    const generatedConnections: Connection[] = [];
    for (let i = 0; i < generatedNodes.length; i++) {
      for (let j = i + 1; j < generatedNodes.length; j++) {
        const node1 = generatedNodes[i];
        const node2 = generatedNodes[j];
        const distance = Math.sqrt(
          Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2)
        );

        // Connect nodes that are close enough and on the same layer
        if (distance < 20 && node1.layer === node2.layer && Math.random() > 0.5) {
          generatedConnections.push({
            from: node1,
            to: node2,
            layer: node1.layer,
          });
        }
      }
    }

    setNodes(generatedNodes);
    setConnections(generatedConnections);
  }, []);

  // Track mouse position instantly
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate inverse parallax offset
  const getParallaxOffset = (layer: number) => {
    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
    const offsetX = (mousePosition.x - centerX) * layer * -0.01;
    const offsetY = (mousePosition.y - centerY) * layer * -0.01;
    return { x: offsetX, y: offsetY };
  };

  // Layer opacities
  const getLayerOpacity = (layer: number) => {
    const opacities = [0.2, 0.4, 0.6];
    return opacities[layer - 1] || 0.2;
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 cursor-crosshair overflow-hidden">
      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Dynamic Crosshair */}
      <motion.div
        className="absolute h-px bg-black"
        style={{
          top: mousePosition.y,
          left: 0,
          right: 0,
          opacity: 0.3,
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />
      <motion.div
        className="absolute w-px bg-black"
        style={{
          left: mousePosition.x,
          top: 0,
          bottom: 0,
          opacity: 0.3,
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />

      {/* Network Plexus SVG - Lines */}
      <svg className="absolute inset-0 w-full h-full">
        {[1, 2, 3].map((layer) => {
          const offset = getParallaxOffset(layer);
          return (
            <motion.g
              key={`lines-layer-${layer}`}
              style={{
                x: offset.x,
                y: offset.y,
                opacity: getLayerOpacity(layer),
              }}
              transition={{ type: 'tween', ease: 'linear', duration: 0 }}
            >
              {connections
                .filter((conn) => conn.layer === layer)
                .map((conn, idx) => (
                  <line
                    key={`line-${layer}-${idx}`}
                    x1={`${conn.from.x}%`}
                    y1={`${conn.from.y}%`}
                    x2={`${conn.to.x}%`}
                    y2={`${conn.to.y}%`}
                    stroke="black"
                    strokeWidth="0.5"
                  />
                ))}
            </motion.g>
          );
        })}
      </svg>

      {/* Network Plexus - Nodes */}
      {[1, 2, 3].map((layer) => {
        const offset = getParallaxOffset(layer);
        return (
          <motion.div
            key={`nodes-layer-${layer}`}
            className="absolute inset-0"
            style={{
              x: offset.x,
              y: offset.y,
              opacity: getLayerOpacity(layer),
            }}
            transition={{ type: 'tween', ease: 'linear', duration: 0 }}
          >
            {nodes
              .filter((node) => node.layer === layer)
              .map((node, idx) => (
                <div
                  key={`node-${layer}-${idx}`}
                  className="absolute w-[2px] h-[2px] bg-black rounded-none"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
          </motion.div>
        );
      })}
    </div>
  );
}
