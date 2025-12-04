'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import cytoscape from 'cytoscape';

// Import network data
// Import network registry
import { datasets, getDataset } from '@/data/network/registry';

export default function NetworkPage() {
  const cyRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentDatasetId, setCurrentDatasetId] = useState(datasets[0].id);
  const [stats, setStats] = useState(datasets[0].data.stats);
  const [cy, setCy] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    connectionType: 'all',
    nodeType: 'all',
    searchTerm: '',
    countries: [] as string[],
    sectors: [] as string[]
  });
  // Pathfinding state
  const [pathfindingMode, setPathfindingMode] = useState(false);
  const [pathNodes, setPathNodes] = useState<{ from: string | null; to: string | null }>({ from: null, to: null });
  const [pathResult, setPathResult] = useState<{ path: any[] | null; degrees: number | null }>({ path: null, degrees: null });
  // Cluster view state
  const [clusterMode, setClusterMode] = useState<'none' | 'category' | 'country'>('none');

  // Get current dataset data
  const currentData = getDataset(currentDatasetId).data;

  // Extract unique countries and sectors for filters
  const uniqueCountries = Array.from(new Set(
    currentData.elements.nodes
      .filter((n: any) => n.data.country)
      .map((n: any) => n.data.country)
  )).sort();

  const uniqueSectors = Array.from(new Set(
    currentData.elements.nodes
      .filter((n: any) => n.data.category)
      .map((n: any) => n.data.category)
  )).sort();

  // Get all person nodes for pathfinding dropdowns (exclude decoration nodes)
  const personNodes = currentData.elements.nodes.filter((n: any) => n.data.type !== 'decoration');

  // Inject decoration nodes for the "Mind Map" look
  const decorationNodes = [
    { data: { id: 'dec-1', label: '💡', type: 'decoration', size: 60 }, position: { x: 100, y: 100 } },
    { data: { id: 'dec-2', label: '✈️', type: 'decoration', size: 60 }, position: { x: 500, y: 100 } },
    { data: { id: 'dec-3', label: '✏️', type: 'decoration', size: 60 }, position: { x: 100, y: 500 } },
    { data: { id: 'dec-4', label: '🌍', type: 'decoration', size: 60 }, position: { x: 500, y: 500 } },
  ];

  const elementsWithDecorations = {
    nodes: [...currentData.elements.nodes, ...decorationNodes],
    edges: currentData.elements.edges
  };

  useEffect(() => {
    if (!cyRef.current || typeof window === 'undefined') return;

    try {
      const styles: any[] = [
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'width': 'data(size)',
            'height': 'data(size)',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-family': 'var(--font-patrick-hand), cursive', // Hand-drawn font
            'font-size': '14px',
            'font-weight': 'normal',
            'color': '#2c3e50',
            'text-outline-color': '#FFF9F0',
            'text-outline-width': 0,
            'background-color': '#ffffff',
            'border-width': 2,
            'border-style': 'dashed',
            'border-color': '#2c3e50',
            'overlay-opacity': 0,
            'transition-property': 'background-color, line-color, target-arrow-color, width, height, opacity',
            'transition-duration': '0.3s'
          }
        },
        {
          selector: 'node[image]',
          style: {
            'background-image': 'data(image)',
            'background-fit': 'cover',
            'background-clip': 'none',
            'border-width': 0
          }
        },
        // Decoration Nodes (Icons)
        {
          selector: 'node[type = "decoration"]',
          style: {
            'shape': 'rectangle',
            'background-opacity': 0,
            'border-width': 0,
            'font-size': '40px', // Large emoji/icon
            'label': 'data(label)', // The emoji itself
            'text-valign': 'center',
            'text-halign': 'center'
          }
        },
        // Playful "Mind Map" Palette
        {
          selector: 'node[type = "speaker"]',
          style: {
            'shape': 'round-rectangle',
            'background-color': '#FFD93D', // Sunny Yellow
            'border-color': '#2c3e50',
            'border-width': 2,
            'border-style': 'dashed',
            'color': '#2c3e50'
          }
        },
        {
          selector: 'node[type = "participant"]',
          style: {
            'shape': 'ellipse',
            'background-color': '#FF6B6B', // Salmon/Red
            'border-color': '#2c3e50',
            'border-width': 2,
            'border-style': 'dashed',
            'color': '#ffffff'
          }
        },
        {
          selector: 'node[type = "organization"]',
          style: {
            'shape': 'round-rectangle',
            'background-color': '#4ECDC4', // Teal
            'border-color': '#2c3e50',
            'border-width': 2,
            'border-style': 'dashed',
            'width': 'mapData(size, 0, 100, 60, 100)',
            'height': 'mapData(size, 0, 100, 40, 60)',
            'color': '#ffffff'
          }
        },
        {
          selector: 'node:selected',
          style: {
            'border-width': 4,
            'border-style': 'solid', // Solid border on select
            'border-color': '#2c3e50',
            'background-color': '#ffffff',
            'color': '#2c3e50'
          }
        },
        // "Hand-Drawn" Edge Styling
        {
          selector: 'edge',
          style: {
            'width': 2,
            'opacity': 0.8,
            'curve-style': 'unbundled-bezier', // More organic curve
            'control-point-distances': [20, -20], // Wavy effect
            'control-point-weights': [0.25, 0.75],
            'line-color': '#2c3e50',
            'line-style': 'dashed',
            'line-dash-pattern': [6, 3],
            'target-arrow-shape': 'triangle',
            'target-arrow-color': '#2c3e50',
            'transition-property': 'opacity, line-color, width',
            'transition-duration': '0.3s'
          }
        },
        {
          selector: 'edge[type = "session"]',
          style: {
            'line-color': '#2c3e50',
            'target-arrow-color': '#2c3e50',
            'width': 2
          }
        },
        {
          selector: 'edge[type = "organization"]',
          style: {
            'line-color': '#2c3e50',
            'target-arrow-color': '#2c3e50',
            'width': 3
          }
        },
        {
          selector: 'edge[type = "country"]',
          style: {
            'line-color': '#95a5a6', // Gray for less important links
            'target-arrow-color': '#95a5a6',
            'width': 1.5,
            'opacity': 0.6
          }
        },
        {
          selector: 'edge.highlighted',
          style: {
            'width': 4,
            'opacity': 1,
            'z-index': 10,
            'line-style': 'solid', // Solid line for highlight
            'line-color': '#FF6B6B',
            'target-arrow-color': '#FF6B6B'
          }
        },
        {
          selector: '.dimmed',
          style: {
            'opacity': 0.1,
            'filter': 'grayscale(100%)',
            'z-index': 0
          }
        },
        {
          selector: 'node.highlighted',
          style: {
            'border-width': 4,
            'border-style': 'solid',
            'border-color': '#2c3e50',
            'z-index': 20
          }
        },
        {
          selector: '.in-path',
          style: {
            'opacity': 1,
            'z-index': 999
          }
        },
        {
          selector: 'node.in-path',
          style: {
            'border-width': 5,
            'border-style': 'solid',
            'border-color': '#9b59b6', // Purple for path nodes
            'background-color': '#e8daef',
            'z-index': 999
          }
        },
        {
          selector: 'edge.in-path',
          style: {
            'width': 5,
            'line-color': '#9b59b6',
            'target-arrow-color': '#9b59b6',
            'line-style': 'solid',
            'opacity': 1,
            'z-index': 999
          }
        }
      ];

      const cytoscapeInstance = cytoscape({
        container: cyRef.current,
        elements: elementsWithDecorations,
        style: styles,
        layout: {
          name: 'cose',
          animate: true, // Animate the layout itself
          animationDuration: 1000,
          randomize: false,
          componentSpacing: 100,
          nodeRepulsion: (node: any) => 400000,
          nodeOverlap: 10,
          idealEdgeLength: (edge: any) => 100,
          edgeElasticity: (edge: any) => 100,
          nestingFactor: 5,
          gravity: 80,
          numIter: 1000,
          initialTemp: 200,
          coolingFactor: 0.95,
          minTemp: 1.0
        },
        minZoom: 0.5,
        maxZoom: 3,
        wheelSensitivity: 0.2,
      });

      setCy(cytoscapeInstance);

      // --- Animations ---

      let animationFrameId: number;
      let breathingInterval: NodeJS.Timeout;

      if (isAnimating) {
        // 1. Traffic Flow (Marching Ants)
        let offset = 0;
        const animateEdges = () => {
          offset -= 1;
          cytoscapeInstance.edges().style('line-dash-offset', offset);
          animationFrameId = requestAnimationFrame(animateEdges);
        };
        animateEdges();

        // 2. Breathing Nodes (Subtle Pulsing)
        const pulseNodes = () => {
          const nodes = cytoscapeInstance.nodes();
          const randomNodes = nodes.filter(() => Math.random() < 0.1);

          randomNodes.forEach((node: any) => {
            if (node.data('type') === 'decoration' || node.scratch('animating')) return;

            const originalSize = node.data('size') || 30;
            const targetSize = originalSize * 1.2;

            node.scratch('animating', true);

            node.animation({
              style: { width: targetSize, height: targetSize },
              duration: 1000,
              easing: 'ease-in-out-sine'
            }).play().promise().then(() => {
              return node.animation({
                style: { width: originalSize, height: originalSize },
                duration: 1000,
                easing: 'ease-in-out-sine'
              }).play().promise();
            }).then(() => {
              node.scratch('animating', false);
            });
          });
        };

        breathingInterval = setInterval(pulseNodes, 2000);
      } else {
        // Reset styles if animation is off
        cytoscapeInstance.edges().style('line-dash-offset', 0);
      }

      // --- End Animations ---

      // --- Interactions ---

      // Hover Effects
      cytoscapeInstance.on('mouseover', 'node', (evt: any) => {
        const node = evt.target;
        if (node.data('type') === 'decoration') return;

        document.body.style.cursor = 'pointer';

        // Slight scale up on hover (if not already animating)
        if (!node.scratch('animating')) {
          node.animate({
            style: {
              width: (node.data('size') || 30) * 1.1,
              height: (node.data('size') || 30) * 1.1
            },
            duration: 200
          });
        }
      });

      cytoscapeInstance.on('mouseout', 'node', (evt: any) => {
        const node = evt.target;
        document.body.style.cursor = 'default';

        // Reset scale
        if (!node.scratch('animating')) {
          node.animate({
            style: {
              width: node.data('size') || 30,
              height: node.data('size') || 30
            },
            duration: 200
          });
        }
      });

      cytoscapeInstance.on('tap', 'node', (evt: any) => {
        const node = evt.target;
        setSelectedNode(node.data());
        setIsSidebarOpen(false); // Close sidebar on mobile when node is selected

        // Focus Mode: Dim everything first
        cytoscapeInstance.elements().addClass('dimmed');
        cytoscapeInstance.elements().removeClass('highlighted');

        // Highlight selected node and direct connections
        const connectedEdges = node.connectedEdges();
        const connectedNodes = connectedEdges.connectedNodes();

        node.removeClass('dimmed').addClass('highlighted');
        connectedEdges.removeClass('dimmed').addClass('highlighted');
        connectedNodes.removeClass('dimmed').addClass('highlighted');
      });

      cytoscapeInstance.on('tap', (evt: any) => {
        if (evt.target === cytoscapeInstance) {
          setSelectedNode(null);
          cytoscapeInstance.elements().removeClass('dimmed');
          cytoscapeInstance.elements().removeClass('highlighted');
        }
      });

      // Cleanup function
      return () => {
        if (breathingInterval) clearInterval(breathingInterval);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (cytoscapeInstance) {
          cytoscapeInstance.destroy();
        }
      };
    } catch (error) {
      console.error('Error initializing Cytoscape:', error);
    }

    // Update stats when dataset changes
    setStats(currentData.stats);
  }, [currentDatasetId, isAnimating]); // Re-run when dataset changes

  useEffect(() => {
    if (!cy) return;

    cy.batch(() => {
      cy.elements().style('display', 'element');

      if (filters.connectionType !== 'all') {
        cy.edges().style('display', 'none');
        cy.edges(`[type = "${filters.connectionType}"]`).style('display', 'element');
      }

      if (filters.nodeType !== 'all') {
        cy.nodes().style('display', 'none');
        cy.nodes(`[type = "${filters.nodeType}"]`).style('display', 'element');
        cy.nodes(`[type = "${filters.nodeType}"]`).connectedEdges().style('display', 'element');
      }

      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        cy.nodes().forEach((node: any) => {
          const data = node.data();
          const matches =
            (data.name && data.name.toLowerCase().includes(searchLower)) ||
            (data.organization && data.organization.toLowerCase().includes(searchLower)) ||
            (data.country && data.country.toLowerCase().includes(searchLower));

          node.style('display', matches ? 'element' : 'none');
        });
      }

      // Country filter (multi-select)
      if (filters.countries.length > 0) {
        cy.nodes().forEach((node: any) => {
          const data = node.data();
          if (data.type === 'decoration') return; // Skip decoration nodes

          const matchesCountry = data.country && filters.countries.includes(data.country);
          if (!matchesCountry) {
            node.style('display', 'none');
          }
        });
      }

      // Sector filter (multi-select)
      if (filters.sectors.length > 0) {
        cy.nodes().forEach((node: any) => {
          const data = node.data();
          if (data.type === 'decoration') return; // Skip decoration nodes

          const matchesSector = data.category && filters.sectors.includes(data.category);
          if (!matchesSector) {
            node.style('display', 'none');
          }
        });
      }
    });

    if (filters.connectionType !== 'all' || filters.nodeType !== 'all' || filters.searchTerm) {
      cy.layout({ name: 'cose', animate: true, animationDuration: 500 }).run();
    }
  }, [cy, filters]);

  // Pathfinding: Find shortest path between two nodes
  const findPath = () => {
    if (!cy || !pathNodes.from || !pathNodes.to) return;

    // Clear previous path
    cy.elements().removeClass('in-path');
    setPathResult({ path: null, degrees: null });

    const fromNode = cy.getElementById(pathNodes.from);
    const toNode = cy.getElementById(pathNodes.to);

    if (!fromNode.length || !toNode.length) {
      alert('One or both nodes not found');
      return;
    }

    // BFS to find shortest path
    const dijkstra = cy.elements().dijkstra(fromNode, () => 1);
    const pathTo = dijkstra.pathTo(toNode);

    if (pathTo.length === 0) {
      alert('No path found between these nodes');
      return;
    }

    // Highlight path
    pathTo.addClass('in-path');

    // Calculate degrees (number of edges)
    const edgesInPath = pathTo.filter('edge').length;

    setPathResult({ path: pathTo, degrees: edgesInPath });

    // Fit to path
    cy.fit(pathTo, 50);
  };

  const clearPath = () => {
    if (cy) {
      cy.elements().removeClass('in-path');
    }
    setPathNodes({ from: null, to: null });
    setPathResult({ path: null, degrees: null });
    setPathfindingMode(false);
  };

  const applyClusterLayout = () => {
    if (!cy || clusterMode === 'none') {
      // If cluster mode is disabled, use default cose layout
      recenterLayout();
      return;
    }

    const nodes = cy.nodes('[type != "decoration"]');
    const groupKey = clusterMode === 'category' ? 'category' : 'country';

    // Group nodes by the selected key
    const groups: Record<string, any[]> = {};
    nodes.forEach((node: any) => {
      const key = node.data(groupKey) || 'Other';
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(node);
    });

    // Calculate positions for each cluster (grid layout)
    const clusterKeys = Object.keys(groups);
    const cols = Math.ceil(Math.sqrt(clusterKeys.length));
    const spacing = 400;

    cy.batch(() => {
      clusterKeys.forEach((key, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const centerX = col * spacing;
        const centerY = row * spacing;

        // Arrange nodes in this cluster in a circle
        const clusterNodes = groups[key];
        const radius = Math.max(50, clusterNodes.length * 15);

        clusterNodes.forEach((node: any, i: number) => {
          const angle = (2 * Math.PI * i) / clusterNodes.length;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          node.position({ x, y });
        });
      });
    });

    // Fit to view
    cy.fit(undefined, 50);
  };

  const resetView = () => {
    if (cy) {
      cy.fit();
      cy.zoom(1);
    }
  };

  const recenterLayout = () => {
    if (cy) {
      cy.layout({
        name: 'cose',
        animate: true,
        animationDuration: 1000,
        randomize: true
      }).run();
    }
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
        setTimeout(() => {
          if (cy) {
            cy.resize();
            cy.fit();
          }
        }, 100);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
        setTimeout(() => {
          if (cy) {
            cy.resize();
            cy.fit();
          }
        }, 100);
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      if (cy) {
        setTimeout(() => {
          cy.resize();
          cy.fit();
        }, 100);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [cy]);


  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="frost-card-strong border-b" style={{ borderColor: 'var(--glacial-200)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="inline-flex items-center mb-2 transition-colors" style={{ color: 'var(--glacial-600)' }}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🔗</span>
                <div>
                  <h1 className="text-3xl font-bold" style={{ color: 'var(--glacial-800)' }}>Summit Network Map</h1>
                  <p style={{ color: 'var(--sage-600)' }}>Interactive visualization of Day 1 connections</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="hidden md:flex gap-4">
              <div className="text-center px-4 py-2 rounded-lg" style={{ background: 'var(--glacial-100)' }}>
                <div className="text-2xl font-bold" style={{ color: 'var(--glacial-800)' }}>{stats.totalNodes}</div>
                <div className="text-xs" style={{ color: 'var(--glacial-600)' }}>People</div>
              </div>
              <div className="text-center px-4 py-2 rounded-lg" style={{ background: 'var(--sage-100)' }}>
                <div className="text-2xl font-bold" style={{ color: 'var(--sage-800)' }}>{stats.totalEdges}</div>
                <div className="text-xs" style={{ color: 'var(--sage-600)' }}>Connections</div>
              </div>
              <div className="text-center px-4 py-2 rounded-lg" style={{ background: 'var(--arctic-100)' }}>
                <div className="text-2xl font-bold" style={{ color: 'var(--arctic-800)' }}>{stats.organizations}</div>
                <div className="text-xs" style={{ color: 'var(--arctic-600)' }}>Organizations</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[calc(100vh-80px)] overflow-hidden bg-[#FFF9F0]">

        {/* Custom Map Container */}
        <div className="absolute inset-0">

          {/* Mobile Toggle Button (Floating) */}
          <div className="lg:hidden absolute top-4 left-4 z-30">
            <button
              onClick={() => {
                setIsSidebarOpen(true);
                setSelectedNode(null); // Close profile card when opening sidebar
              }}
              className="px-4 py-2 rounded-full text-white font-bold flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
              style={{
                background: '#2c3e50',
                fontFamily: 'var(--font-patrick-hand), cursive',
                fontSize: '1.1rem',
                border: '2px solid #fff'
              }}
            >
              <span>🔍 Filter & Legend</span>
            </button>
          </div>

          {/* Control Panel (Responsive Drawer) */}
          {/* Mobile: Fixed Overlay | Desktop: Absolute Left Panel */}
          <div className={`
          fixed inset-0 z-40 lg:z-10 lg:absolute lg:top-4 lg:left-4 lg:bottom-4 lg:w-80
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
            {/* Backdrop for Mobile */}
            <div
              className="absolute inset-0 bg-black/50 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar Content */}
            <div className="relative h-full w-full max-w-xs bg-white/95 backdrop-blur-md lg:bg-white/90 lg:rounded-xl shadow-2xl lg:shadow-xl overflow-y-auto border-r lg:border-2 border-gray-200 lg:border-gray-800 flex flex-col">

              {/* Mobile Header */}
              <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-patrick-hand), cursive', color: '#2c3e50' }}>
                  Controls
                </h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-4 space-y-4">
                {/* Filters & Search Card */}
                <div className="rounded-xl p-4 border-2"
                  style={{
                    background: '#fff',
                    borderColor: '#2c3e50',
                    backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}>
                  <h3 className="text-2xl font-bold mb-4 flex items-center" style={{ fontFamily: 'var(--font-patrick-hand), cursive', color: '#2c3e50' }}>
                    <span className="mr-2">🔍</span> Find & Filter
                  </h3>

                  {/* Search Input */}
                  <div className="mb-4">
                    <label className="block text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-patrick-hand), cursive', color: '#2c3e50' }}>
                      Search Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe..."
                      className="w-full px-3 py-2 border-2 rounded-md focus:ring-2 focus:outline-none"
                      style={{
                        borderColor: '#2c3e50',
                        borderStyle: 'dashed',
                        fontFamily: 'var(--font-patrick-hand), cursive',
                        fontSize: '1.1rem'
                      }}
                      value={filters.searchTerm || ''}
                      onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                    />
                  </div>

                  {/* Dataset Selector */}
                  <div className="mb-4">
                    <label className="block text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-patrick-hand), cursive', color: '#2c3e50' }}>
                      Select Network
                    </label>
                    <select
                      className="w-full px-3 py-2 border-2 rounded-md focus:ring-2 focus:outline-none"
                      style={{
                        borderColor: '#2c3e50',
                        borderStyle: 'dashed',
                        fontFamily: 'var(--font-patrick-hand), cursive',
                        fontSize: '1.1rem'
                      }}
                      value={currentDatasetId}
                      onChange={(e) => setCurrentDatasetId(e.target.value)}
                    >
                      {datasets.map(ds => (
                        <option key={ds.id} value={ds.id}>{ds.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Connection Type Filter */}
                  <div className="mb-4">
                    <label className="block text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-patrick-hand), cursive', color: '#2c3e50' }}>
                      Connection Type
                    </label>
                    <select
                      className="w-full px-3 py-2 border-2 rounded-md focus:ring-2 focus:outline-none"
                      style={{
                        borderColor: '#2c3e50',
                        borderStyle: 'dashed',
                        fontFamily: 'var(--font-patrick-hand), cursive',
                        fontSize: '1.1rem'
                      }}
                      value={filters.connectionType}
                      onChange={(e) => setFilters({ ...filters, connectionType: e.target.value })}
                    >
                      <option value="all">All Connections</option>
                      <option value="session">Session Only</option>
                      <option value="organization">Organization Only</option>
                      <option value="country">Country Only</option>
                    </select>
                  </div>

                  {/* Node Type Filter */}
                  <div className="mb-4">
                    <label className="block text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-patrick-hand), cursive', color: '#2c3e50' }}>
                      Show People
                    </label>
                    <select
                      className="w-full px-3 py-2 border-2 rounded-md focus:ring-2 focus:outline-none"
                      style={{
                        borderColor: '#2c3e50',
                        borderStyle: 'dashed',
                        fontFamily: 'var(--font-patrick-hand), cursive',
                        fontSize: '1.1rem'
                      }}
                      value={filters.nodeType}
                      onChange={(e) => setFilters({ ...filters, nodeType: e.target.value })}
                    >
                      <option value="all">Everyone</option>
                      <option value="speaker">Speakers Only</option>
                      <option value="participant">Participants Only</option>
                    </select>
                  </div>

                  {/* Country Filter (Multi-select) */}
                  <div className="mb-4">
                    <label className="block text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-patrick-hand), cursive', color: '#2c3e50' }}>
                      Filter by Country:
                    </label>
                    <div className="max-h-32 overflow-y-auto border-2 border-dashed rounded-md p-2" style={{ borderColor: '#2c3e50' }}>
                      {uniqueCountries.length > 0 ? (
                        (uniqueCountries as string[]).map((country: string) => (
                          <label key={country} className="flex items-center mb-1 cursor-pointer hover:bg-gray-50 p-1 rounded">
                            <input
                              type="checkbox"
                              checked={filters.countries.includes(country)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFilters({ ...filters, countries: [...filters.countries, country] });
                                } else {
                                  setFilters({ ...filters, countries: filters.countries.filter(c => c !== country) });
                                }
                              }}
                              className="mr-2"
                            />
                            <span style={{ fontFamily: 'var(--font-patrick-hand), cursive', fontSize: '1rem' }}>{country}</span>
                          </label>
                        ))
                      ) : (
                        <p className="text-gray-400 text-sm">No countries available</p>
                      )}
                    </div>
                    {filters.countries.length > 0 && (
                      <p className="text-xs mt-1" style={{ color: '#2c3e50' }}>
                        {filters.countries.length} selected
                      </p>
                    )}
                  </div>

                  {/* Sector Filter (Multi-select) */}
                  <div className="mb-4">
                    <label className="block text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-patrick-hand), cursive', color: '#2c3e50' }}>
                      Filter by Sector:
                    </label>
                    <div className="max-h-32 overflow-y-auto border-2 border-dashed rounded-md p-2" style={{ borderColor: '#2c3e50' }}>
                      {uniqueSectors.length > 0 ? (
                        (uniqueSectors as string[]).map((sector: string) => (
                          <label key={sector} className="flex items-center mb-1 cursor-pointer hover:bg-gray-50 p-1 rounded">
                            <input
                              type="checkbox"
                              checked={filters.sectors.includes(sector)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFilters({ ...filters, sectors: [...filters.sectors, sector] });
                                } else {
                                  setFilters({ ...filters, sectors: filters.sectors.filter(s => s !== sector) });
                                }
                              }}
                              className="mr-2"
                            />
                            <span style={{ fontFamily: 'var(--font-patrick-hand), cursive', fontSize: '1rem' }}>{sector}</span>
                          </label>
                        ))
                      ) : (
                        <p className="text-gray-400 text-sm">No sectors available</p>
                      )}
                    </div>
                    {filters.sectors.length > 0 && (
                      <p className="text-xs mt-1" style={{ color: '#2c3e50' }}>
                        {filters.sectors.length} selected
                      </p>
                    )}
                  </div>

                  {/* Reset Button */}
                  <button
                    onClick={() => setFilters({ connectionType: 'all', nodeType: 'all', searchTerm: '', countries: [], sectors: [] })}
                    className="w-full px-4 py-2 rounded-md text-white transition-transform hover:scale-105"
                    style={{
                      background: '#2c3e50',
                      fontFamily: 'var(--font-patrick-hand), cursive',
                      fontSize: '1.2rem',
                      border: '2px solid #2c3e50'
                    }}
                  >
                    Reset Filters
                  </button>
                </div>

                {/* Pathfinding Card */}
                <div className="rounded-xl p-4 border-2"
                  style={{
                    background: '#fff',
                    borderColor: '#2c3e50',
                    backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}>
                  <h3 className="text-2xl font-bold mb-4 flex items-center" style={{ fontFamily: 'var(--font-patrick-hand), cursive', color: '#2c3e50' }}>
                    <span className="mr-2">🔗</span> Six Degrees
                  </h3>

                  <div className="space-y-3">
                    {/* From Node */}
                    <div>
                      <label className="block text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-patrick-hand), cursive', color: '#2c3e50' }}>
                        From:
                      </label>
                      <select
                        className="w-full px-3 py-2 border-2 rounded-md focus:ring-2 focus:outline-none"
                        style={{
                          borderColor: '#2c3e50',
                          borderStyle: 'dashed',
                          fontFamily: 'var(--font-patrick-hand), cursive',
                          fontSize: '1rem'
                        }}
                        value={pathNodes.from || ''}
                        onChange={(e) => setPathNodes({ ...pathNodes, from: e.target.value })}
                      >
                        <option value="">Select a person...</option>
                        {personNodes.map((node: any) => (
                          <option key={node.data.id} value={node.data.id}>
                            {node.data.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* To Node */}
                    <div>
                      <label className="block text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-patrick-hand), cursive', color: '#2c3e50' }}>
                        To:
                      </label>
                      <select
                        className="w-full px-3 py-2 border-2 rounded-md focus:ring-2 focus:outline-none"
                        style={{
                          borderColor: '#2c3e50',
                          borderStyle: 'dashed',
                          fontFamily: 'var(--font-patrick-hand), cursive',
                          fontSize: '1rem'
                        }}
                        value={pathNodes.to || ''}
                        onChange={(e) => setPathNodes({ ...pathNodes, to: e.target.value })}
                      >
                        <option value="">Select a person...</option>
                        {personNodes.map((node: any) => (
                          <option key={node.data.id} value={node.data.id}>
                            {node.data.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Find Path Button */}
                    <button
                      onClick={findPath}
                      disabled={!pathNodes.from || !pathNodes.to}
                      className="w-full px-4 py-2 rounded-md text-white transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: '#9b59b6',
                        fontFamily: 'var(--font-patrick-hand), cursive',
                        fontSize: '1.1rem',
                        border: '2px solid #8e44ad'
                      }}
                    >
                      Find Path
                    </button>

                    {/* Result Display */}
                    {pathResult.degrees !== null && (
                      <div className="mt-3 p-3 bg-purple-50 rounded-md border-2 border-dashed border-purple-300">
                        <p className="text-center font-bold" style={{ fontFamily: 'var(--font-patrick-hand), cursive', fontSize: '1.2rem', color: '#9b59b6' }}>
                          {pathResult.degrees === 0 ? 'Same person!' : `${pathResult.degrees} degree${pathResult.degrees > 1 ? 's' : ''} of separation`}
                        </p>
                      </div>
                    )}

                    {/* Clear Button */}
                    {(pathNodes.from || pathNodes.to || pathResult.path) && (
                      <button
                        onClick={clearPath}
                        className="w-full px-4 py-2 rounded-md transition-transform hover:scale-105"
                        style={{
                          background: '#95a5a6',
                          color: '#fff',
                          fontFamily: 'var(--font-patrick-hand), cursive',
                          fontSize: '1rem',
                          border: '2px solid #7f8c8d'
                        }}
                      >
                        Clear Path
                      </button>
                    )}
                  </div>
                </div>

                {/* Legend & Controls Card */}
                <div className="rounded-xl p-4 border-2"
                  style={{
                    background: '#fff',
                    borderColor: '#2c3e50',
                    backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}>
                  <h3 className="text-2xl font-bold mb-4 flex items-center" style={{ fontFamily: 'var(--font-patrick-hand), cursive', color: '#2c3e50' }}>
                    <span className="mr-2">🗺️</span> Legend & Controls
                  </h3>

                  {/* Legend */}
                  <div className="mb-6 space-y-2">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded border-2 border-dashed border-gray-800 mr-2" style={{ background: '#FFD93D' }}></div>
                      <span style={{ fontFamily: 'var(--font-patrick-hand), cursive', fontSize: '1.1rem' }}>Speaker</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full border-2 border-dashed border-gray-800 mr-2" style={{ background: '#FF6B6B' }}></div>
                      <span style={{ fontFamily: 'var(--font-patrick-hand), cursive', fontSize: '1.1rem' }}>Participant</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded border-2 border-dashed border-gray-800 mr-2" style={{ background: '#4ECDC4' }}></div>
                      <span style={{ fontFamily: 'var(--font-patrick-hand), cursive', fontSize: '1.1rem' }}>Organization</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-1 border-b-2 border-dashed border-gray-800 mr-2"></div>
                      <span style={{ fontFamily: 'var(--font-patrick-hand), cursive', fontSize: '1.1rem' }}>Connection</span>
                    </div>
                  </div>

                  {/* Animation Toggle */}
                  <div className="mb-4">
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input type="checkbox" className="sr-only" checked={isAnimating} onChange={() => setIsAnimating(!isAnimating)} />
                        <div className={`block w-14 h-8 rounded-full border-2 border-gray-800 ${isAnimating ? 'bg-green-400' : 'bg-gray-200'}`}></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isAnimating ? 'transform translate-x-6' : ''} border-2 border-gray-800`}></div>
                      </div>
                      <div className="ml-3 font-bold" style={{ fontFamily: 'var(--font-patrick-hand), cursive', fontSize: '1.1rem' }}>
                        {isAnimating ? 'Animations ON' : 'Animations OFF'}
                      </div>
                    </label>
                  </div>

                  {/* Cluster View Controls */}
                  <div className="mb-4">
                    <label className="block text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-patrick-hand), cursive', color: '#2c3e50' }}>
                      Group Nodes:
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setClusterMode('none');
                          recenterLayout();
                        }}
                        className={`flex-1 px-3 py-2 rounded-md transition-all ${clusterMode === 'none' ? 'scale-105' : 'opacity-70'}`}
                        style={{
                          background: clusterMode === 'none' ? '#4ECDC4' : '#95a5a6',
                          color: '#fff',
                          fontFamily: 'var(--font-patrick-hand), cursive',
                          fontSize: '0.95rem',
                          border: `2px solid ${clusterMode === 'none' ? '#2c3e50' : '#7f8c8d'}`
                        }}
                      >
                        Normal
                      </button>
                      <button
                        onClick={() => {
                          setClusterMode('category');
                          setTimeout(() => applyClusterLayout(), 100);
                        }}
                        className={`flex-1 px-3 py-2 rounded-md transition-all ${clusterMode === 'category' ? 'scale-105' : 'opacity-70'}`}
                        style={{
                          background: clusterMode === 'category' ? '#4ECDC4' : '#95a5a6',
                          color: '#fff',
                          fontFamily: 'var(--font-patrick-hand), cursive',
                          fontSize: '0.95rem',
                          border: `2px solid ${clusterMode === 'category' ? '#2c3e50' : '#7f8c8d'}`
                        }}
                      >
                        by Sector
                      </button>
                      <button
                        onClick={() => {
                          setClusterMode('country');
                          setTimeout(() => applyClusterLayout(), 100);
                        }}
                        className={`flex-1 px-3 py-2 rounded-md transition-all ${clusterMode === 'country' ? 'scale-105' : 'opacity-70'}`}
                        style={{
                          background: clusterMode === 'country' ? '#4ECDC4' : '#95a5a6',
                          color: '#fff',
                          fontFamily: 'var(--font-patrick-hand), cursive',
                          fontSize: '0.95rem',
                          border: `2px solid ${clusterMode === 'country' ? '#2c3e50' : '#7f8c8d'}`
                        }}
                      >
                        by Country
                      </button>
                    </div>
                  </div>

                  {/* View Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={resetView}
                      className="w-full px-4 py-2 rounded-md text-white transition-transform hover:scale-105"
                      style={{ background: '#95a5a6', fontFamily: 'var(--font-patrick-hand), cursive', fontSize: '1.1rem', border: '2px solid #2c3e50' }}
                    >
                      Fit to Screen
                    </button>
                    <button
                      onClick={recenterLayout}
                      className="w-full px-4 py-2 rounded-md text-white transition-transform hover:scale-105"
                      style={{ background: '#95a5a6', fontFamily: 'var(--font-patrick-hand), cursive', fontSize: '1.1rem', border: '2px solid #2c3e50' }}
                    >
                      Re-layout
                    </button>
                    <button
                      onClick={toggleFullscreen}
                      className="w-full px-4 py-2 rounded-md text-white transition-transform hover:scale-105"
                      style={{ background: '#2c3e50', fontFamily: 'var(--font-patrick-hand), cursive', fontSize: '1.1rem', border: '2px solid #2c3e50' }}
                    >
                      {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                    </button>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="rounded-xl p-4 border-2 bg-white/50 border-gray-300">
                  <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--glacial-800)' }}>Statistics</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--sage-600)' }}>Speakers:</span>
                      <span className="font-semibold">{stats.speakers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--sage-600)' }}>Participants:</span>
                      <span className="font-semibold">{stats.participants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--sage-600)' }}>Orgs:</span>
                      <span className="font-semibold">{stats.organizations}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--sage-600)' }}>Links:</span>
                      <span className="font-semibold">{stats.totalEdges}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Network Visualization Container */}
          <div ref={containerRef} className={`w-full h-full ${isFullscreen ? 'fixed inset-0 z-50' : ''}`} style={isFullscreen ? { background: 'var(--background)' } : {}}>
            <div
              ref={cyRef}
              className="w-full h-full"
              style={{
                // Dot Grid Pattern
                background: `
              radial-gradient(#d1d5db 1px, transparent 1px),
              #FFF9F0
            `,
                backgroundSize: '20px 20px',
              }}
            />

            {/* Floating Profile Card / Bottom Sheet */}
            {selectedNode && (
              <div
                className="fixed bottom-0 left-0 w-full lg:absolute lg:top-4 lg:right-4 lg:w-80 lg:bottom-auto lg:left-auto z-30 transform transition-all duration-300 ease-out"
                style={{
                  filter: 'drop-shadow(4px 4px 0px rgba(44, 62, 80, 0.2))'
                }}
              >
                {/* "Tape" visual (Desktop only) */}
                <div className="hidden lg:block absolute -top-3 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-yellow-100 opacity-80 rotate-1" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>

                {/* Mobile Handle (Visual cue) */}
                <div className="lg:hidden absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-1.5 rounded-full bg-gray-300"></div>

                <div
                  className="bg-white p-6 relative rounded-t-xl lg:rounded-lg"
                  style={{
                    backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px)',
                    backgroundSize: '100% 24px',
                    boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
                    transform: 'rotate(0deg) lg:rotate(1deg)'
                  }}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => {
                      setSelectedNode(null);
                      if (cy) {
                        cy.elements().removeClass('dimmed');
                        cy.elements().removeClass('highlighted');
                      }
                    }}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-800 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-bold leading-tight" style={{ fontFamily: 'var(--font-patrick-hand), cursive', color: '#2c3e50' }}>
                          {selectedNode.name}
                        </h2>
                        {selectedNode.title && (
                          <p className="text-sm mt-1" style={{ fontFamily: 'var(--font-patrick-hand), cursive', color: '#7f8c8d' }}>
                            {selectedNode.title}
                          </p>
                        )}
                      </div>
                      {/* Icon/Type Indicator */}
                      <div className="flex-shrink-0">
                        {selectedNode.type === 'speaker' && <span className="text-2xl">🎤</span>}
                        {selectedNode.type === 'participant' && <span className="text-2xl">👋</span>}
                        {selectedNode.type === 'organization' && <span className="text-2xl">🏢</span>}
                      </div>
                    </div>

                    <div className="border-t-2 border-dashed border-gray-200 my-2"></div>

                    <div className="space-y-2" style={{ fontFamily: 'var(--font-patrick-hand), cursive', fontSize: '1.1rem' }}>
                      {selectedNode.organization && (
                        <div className="flex items-center text-gray-700">
                          <span className="w-6 text-center mr-2">📍</span>
                          {selectedNode.organization}
                        </div>
                      )}
                      {selectedNode.country && (
                        <div className="flex items-center text-gray-700">
                          <span className="w-6 text-center mr-2">🌍</span>
                          {selectedNode.country}
                        </div>
                      )}
                      {selectedNode.category && (
                        <div className="flex items-center text-gray-700">
                          <span className="w-6 text-center mr-2">🏷️</span>
                          {selectedNode.category}
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    {(selectedNode.url || selectedNode.website) && (
                      <div className="pt-2">
                        <a
                          href={selectedNode.url || selectedNode.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center py-2 px-4 rounded transition-transform hover:scale-105 hover:rotate-1"
                          style={{
                            background: '#2c3e50',
                            color: '#fff',
                            fontFamily: 'var(--font-patrick-hand), cursive',
                            border: '2px solid #2c3e50'
                          }}
                        >
                          View Full Profile
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Info text (Simplified) */}
            <div className="absolute bottom-4 right-4 text-sm hidden lg:block bg-white/80 p-2 rounded-lg backdrop-blur-sm" style={{ color: 'var(--sage-600)' }}>
              <p>
                <strong style={{ color: 'var(--glacial-700)' }}>💡 Tip:</strong> Click any person to see details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
