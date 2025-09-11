
export default function ResumePage() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, border: 'none' }}>
      <iframe
        src="/resume.pdf"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Ashis Kumar Rai's Resume"
      />
    </div>
  );
}
