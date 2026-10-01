import type { LucideIcon } from 'lucide-react';
export default function EmptyState({ icon: Icon, title, subtitle }: { icon: LucideIcon; title: string; subtitle?: string }) {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--sub)' }}>
      <Icon size={30} style={{ opacity: .5, marginBottom: 10 }} />
      <div style={{ fontWeight: 600, color: 'var(--text)' }}>{title}</div>
      {subtitle && <div style={{ fontSize: 13, marginTop: 4 }}>{subtitle}</div>}
    </div>
  );
}
