
import { ResumeViewer } from '@/components/resume-viewer';

export default function ResumePage() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, border: 'none' }}>
      <ResumeViewer />
    </div>
  );
}
