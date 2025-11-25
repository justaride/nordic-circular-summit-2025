'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import cytoscape from 'cytoscape';

// Import network data
import networkData from '@/data/network/summit-network.json';

export default function NetworkPage() {
  const cyRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cy, setCy] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [stats, setStats] = useState(networkData.stats);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [filters, setFilters] = useState({
    connectionType: 'all',
    nodeType: 'all',
    searchTerm: ''
  });

  useEffect(() => {
    if (!cyRef.current || typeof window === 'undefined') return;

    try {
      const cytoscapeInstance = cytoscape({
        container: cyRef.current,
        elements: networkData.elements,
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'width': 'data(size)',
            'height': 'data(size)',
            'text-valign': 'bottom',
            'text-halign': 'center',
            'text-margin-y': 5,
            'font-size': '10px',
            'font-weight': 'bold',
            'color': '#ffffff',
            'text-outline-color': '#000000',
            'text-outline-width': 2,
            'overlay-opacity': 0
          }
        },
        {
          selector: 'node[type = "speaker"]',
          style: {
            'background-color': '#5ba8b5', // glacial-400
            'border-width': 3,
            'border-color': '#4a8292' // glacial-600
          }
        },
        {
          selector: 'node[type = "participant"]',
          style: {
            'background-color': '#6b7b5c', // sage-500
            'border-width': 2,
            'border-color': '#8a9a7b' // sage-400
          }
        },
        {
          selector: 'node:selected',
          style: {
            'border-width': 5,
            'border-color': '#5b9dad', // glacial-500
            'background-color': '#3f6b78' // glacial-700
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'opacity': 0.5,
            'curve-style': 'bezier'
          }
        },
        {
          selector: 'edge[type = "session"]',
          style: {
            'line-color': '#5ba8b5', // glacial-400
            'target-arrow-color': '#5ba8b5',
            'opacity': 0.6
          }
        },
        {
          selector: 'edge[type = "organization"]',
          style: {
            'line-color': '#8a9a7b', // sage-400
            'target-arrow-color': '#8a9a7b',
            'width': 3,
            'opacity': 0.7
          }
        },
        {
          selector: 'edge[type = "country"]',
          style: {
            'line-color': '#9a9e9b', // arctic-500
            'target-arrow-color': '#9a9e9b',
            'width': 1.5,
            'opacity': 0.3,
            'line-style': 'dashed'
          }
        },
        {
          selector: 'edge.highlighted',
          style: {
            'width': 4,
            'opacity': 1,
            'z-index': 10
          }
        }
      ],
      layout: {
        name: 'cose',
        animate: true,
        animationDuration: 1000,
        nodeRepulsion: 8000,
        idealEdgeLength: 100,
        edgeElasticity: 100,
        gravity: 1,
        numIter: 1000,
        randomize: false
      },
      minZoom: 0.3,
      maxZoom: 3,
      wheelSensitivity: 0.2
    });

    cytoscapeInstance.on('tap', 'node', (evt: any) => {
      const node = evt.target;
      setSelectedNode(node.data());

      cytoscapeInstance.elements().removeClass('highlighted');
      node.connectedEdges().addClass('highlighted');
    });

    cytoscapeInstance.on('tap', (evt: any) => {
      if (evt.target === cytoscapeInstance) {
        setSelectedNode(null);
        cytoscapeInstance.elements().removeClass('highlighted');
      }
    });

    setCy(cytoscapeInstance);

    return () => {
      if (cytoscapeInstance) {
        cytoscapeInstance.destroy();
      }
    };
    } catch (error) {
      console.error('Error initializing Cytoscape:', error);
    }
  }, []);

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
            data.name.toLowerCase().includes(searchLower) ||
            (data.organization && data.organization.toLowerCase().includes(searchLower)) ||
            (data.country && data.country.toLowerCase().includes(searchLower));

          node.style('display', matches ? 'element' : 'none');
        });
      }
    });

    if (filters.connectionType !== 'all' || filters.nodeType !== 'all' || filters.searchTerm) {
      cy.layout({ name: 'cose', animate: true, animationDuration: 500 }).run();
    }
  }, [cy, filters]);

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-4">
            {/* Filters Card */}
            <div className="frost-card rounded-xl shadow-lg p-4">
              <h3 className="font-bold text-lg mb-4 flex items-center" style={{ color: 'var(--glacial-800)' }}>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </h3>

              {/* Search */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--glacial-700)' }}>
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Name, org, country..."
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none"
                  style={{ borderColor: 'var(--glacial-300)', background: 'var(--arctic-50)' }}
                  value={filters.searchTerm}
                  onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                />
              </div>

              {/* Connection Type Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--glacial-700)' }}>
                  Connection Type
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none"
                  style={{ borderColor: 'var(--glacial-300)', background: 'var(--arctic-50)' }}
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
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--glacial-700)' }}>
                  Show People
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none"
                  style={{ borderColor: 'var(--glacial-300)', background: 'var(--arctic-50)' }}
                  value={filters.nodeType}
                  onChange={(e) => setFilters({ ...filters, nodeType: e.target.value })}
                >
                  <option value="all">Everyone</option>
                  <option value="speaker">Speakers Only</option>
                  <option value="participant">Participants Only</option>
                </select>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => setFilters({ connectionType: 'all', nodeType: 'all', searchTerm: '' })}
                className="w-full px-4 py-2 rounded-md text-white transition-colors"
                style={{ background: 'var(--arctic-500)' }}
              >
                Reset Filters
              </button>
            </div>

            {/* View Controls Card */}
            <div className="frost-card rounded-xl shadow-lg p-4">
              <h3 className="font-bold text-lg mb-4 flex items-center" style={{ color: 'var(--glacial-800)' }}>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Controls
              </h3>

              <button
                onClick={resetView}
                className="w-full mb-2 px-4 py-2 rounded-md text-white transition-colors"
                style={{ background: 'var(--glacial-500)' }}
              >
                Fit to Screen
              </button>

              <button
                onClick={recenterLayout}
                className="w-full mb-2 px-4 py-2 rounded-md text-white transition-colors"
                style={{ background: 'var(--sage-500)' }}
              >
                Re-layout Network
              </button>

              <button
                onClick={toggleFullscreen}
                className="w-full px-4 py-2 rounded-md text-white transition-colors flex items-center justify-center"
                style={{ background: 'var(--glacial-600)' }}
              >
                {isFullscreen ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Exit Fullscreen
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    Fullscreen Mode
                  </>
                )}
              </button>
            </div>

            {/* Legend Card */}
            <div className="frost-card rounded-xl shadow-lg p-4">
              <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--glacial-800)' }}>Legend</h3>

              <div className="space-y-3">
                <div className="text-sm">
                  <div className="font-semibold mb-2" style={{ color: 'var(--glacial-700)' }}>Nodes (People)</div>
                  <div className="flex items-center mb-1">
                    <div className="w-4 h-4 rounded-full border-2 mr-2" style={{ background: 'var(--glacial-400)', borderColor: 'var(--glacial-600)' }}></div>
                    <span style={{ color: 'var(--foreground)' }}>Speakers</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full border-2 mr-2" style={{ background: 'var(--sage-500)', borderColor: 'var(--sage-400)' }}></div>
                    <span style={{ color: 'var(--foreground)' }}>Participants</span>
                  </div>
                </div>

                <div className="text-sm border-t pt-3" style={{ borderColor: 'var(--glacial-200)' }}>
                  <div className="font-semibold mb-2" style={{ color: 'var(--glacial-700)' }}>Connections</div>
                  <div className="flex items-center mb-1">
                    <div className="w-8 h-0.5 mr-2" style={{ background: 'var(--glacial-400)' }}></div>
                    <span className="text-xs" style={{ color: 'var(--foreground)' }}>Same Session</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <div className="w-8 mr-2" style={{ height: '3px', background: 'var(--sage-400)' }}></div>
                    <span className="text-xs" style={{ color: 'var(--foreground)' }}>Same Organization</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 mr-2" style={{ borderTop: '2px dashed var(--arctic-500)' }}></div>
                    <span className="text-xs" style={{ color: 'var(--foreground)' }}>Same Country</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="frost-card rounded-xl shadow-lg p-4">
              <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--glacial-800)' }}>Statistics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--sage-600)' }}>Speakers:</span>
                  <span className="font-semibold" style={{ color: 'var(--glacial-800)' }}>{stats.speakers}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--sage-600)' }}>Participants:</span>
                  <span className="font-semibold" style={{ color: 'var(--glacial-800)' }}>{stats.participants}</span>
                </div>
                <div className="flex justify-between border-t pt-2" style={{ borderColor: 'var(--glacial-200)' }}>
                  <span style={{ color: 'var(--sage-600)' }}>Sessions:</span>
                  <span className="font-semibold" style={{ color: 'var(--glacial-800)' }}>{stats.sessions}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--sage-600)' }}>Organizations:</span>
                  <span className="font-semibold" style={{ color: 'var(--glacial-800)' }}>{stats.organizations}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--sage-600)' }}>Countries:</span>
                  <span className="font-semibold" style={{ color: 'var(--glacial-800)' }}>{stats.countries}</span>
                </div>
                <div className="flex justify-between border-t pt-2" style={{ borderColor: 'var(--glacial-200)' }}>
                  <span style={{ color: 'var(--sage-600)' }}>Connections:</span>
                  <span className="font-semibold" style={{ color: 'var(--glacial-800)' }}>{stats.totalEdges}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Network Visualization */}
          <div ref={containerRef} className={`lg:col-span-3 ${isFullscreen ? 'fixed inset-0 z-50 p-4' : ''}`} style={isFullscreen ? { background: 'var(--background)' } : {}}>
            <div className={`frost-card rounded-xl shadow-lg p-4 ${isFullscreen ? 'h-full' : ''}`}>
              <div
                ref={cyRef}
                className="w-full rounded-lg border-2"
                style={{ height: isFullscreen ? 'calc(100vh - 100px)' : '80vh', background: 'var(--arctic-50)', borderColor: 'var(--glacial-200)' }}
              />

              {/* Info text */}
              <div className="mt-4 text-sm" style={{ color: 'var(--sage-600)' }}>
                <p className="mb-2">
                  <strong style={{ color: 'var(--glacial-700)' }}>💡 Tip:</strong> Click any person to see details and highlight connections.
                  Drag to pan, scroll to zoom.
                </p>
                {selectedNode && (
                  <div className="mt-3 p-3 rounded-lg border" style={{ background: 'var(--glacial-50)', borderColor: 'var(--glacial-200)' }}>
                    <div className="font-bold text-lg mb-1" style={{ color: 'var(--glacial-800)' }}>{selectedNode.name}</div>
                    {selectedNode.title && (
                      <div className="text-sm" style={{ color: 'var(--sage-700)' }}>{selectedNode.title}</div>
                    )}
                    {selectedNode.organization && (
                      <div className="text-sm mt-1" style={{ color: 'var(--sage-600)' }}>
                        📍 {selectedNode.organization}
                      </div>
                    )}
                    {selectedNode.country && (
                      <div className="text-sm" style={{ color: 'var(--sage-600)' }}>
                        🌍 {selectedNode.country}
                      </div>
                    )}
                    <div className="mt-2 text-xs">
                      <span className="inline-block px-2 py-1 rounded mr-2" style={{ background: 'var(--glacial-100)', color: 'var(--glacial-800)' }}>
                        {selectedNode.type}
                      </span>
                      {selectedNode.category && (
                        <span className="inline-block px-2 py-1 rounded" style={{ background: 'var(--sage-100)', color: 'var(--sage-800)' }}>
                          {selectedNode.category}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
