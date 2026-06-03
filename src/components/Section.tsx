import type { ReactNode } from 'react'

/** Shared section shell: anchor id, title, lead paragraph, content. */
export function Section({
  id,
  title,
  lead,
  children,
}: {
  id: string
  title: string
  lead?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="section">
      <div className="section__inner">
        <h2 className="section__title">{title}</h2>
        {lead && <p className="section__lead">{lead}</p>}
        {children}
      </div>
    </section>
  )
}
