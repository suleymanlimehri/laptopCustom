import './AccessDenied.css';

export default function AccessDenied() {
  return (
    <div className="access-denied">
      <h1 className="vibrate">⛔ ACCESS DENIED ⛔</h1>
      <p>You do not have permission to view this page.</p>
      <p>Please contact the administrator.</p>
    </div>
  );
}
