import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export function isWebGLSupported(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  className?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class WebGLBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('[WebGLBoundary] 3D Scene Error intercepted:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    const supported = isWebGLSupported();

    if (this.state.hasError || !supported) {
      return (
        <div
          className={`w-full h-full min-h-[280px] rounded-2xl border border-[#272733] bg-[#0d0d13] p-6 flex flex-col items-center justify-center text-center space-y-3 ${
            this.props.className || ''
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-[#FF5B35]/10 border border-[#FF5B35]/30 flex items-center justify-center text-[#FF5B35]">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-display text-base font-bold text-[#F4F0E6]">
              {this.props.fallbackTitle || '3D WebGL Visualization'}
            </h4>
            <p className="font-mono text-xs text-[#A7A3AD] max-w-xs mt-1">
              {!supported
                ? 'WebGL is not accelerated in your current browser configuration. Visual telemetry continues in standard 2D mode.'
                : 'Interactive 3D simulation paused due to GPU context reload.'}
            </p>
          </div>
          {supported && (
            <button
              onClick={this.handleRetry}
              className="px-3.5 py-1.5 rounded-lg border border-[#272733] bg-[#161622] hover:border-[#FF5B35] text-xs font-mono text-[#F4F0E6] flex items-center space-x-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#FF5B35]" />
              <span>Reload Simulation</span>
            </button>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
