'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  fallback: ReactNode;
  children: ReactNode;
  /** Label for the console warning, e.g. "hero-3d". */
  name: string;
}

/** Contains failures in optional enhancements (WebGL, chat) so the page around them keeps working. */
export class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn(
      `[${this.props.name}] recovered from error:`,
      error.message,
      info.componentStack?.split('\n')[1]?.trim(),
    );
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
