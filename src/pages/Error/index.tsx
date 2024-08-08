import type { FallbackProps } from 'react-error-boundary';

function Error({ error, resetErrorBoundary }: FallbackProps) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role='alert'>
      <p>发生了一些错误:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>重试</button>
    </div>
  );
}
export default Error;
