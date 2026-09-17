import { ScrollReveal } from '@/components/site';

/*
 * The Altiere Standard — four principles as an editorial ledger.
 *
 * Desktop: the intro sits in a sticky left column while the numbered
 * principles read down the right as hairline-ruled rows. Mobile: the intro
 * stacks above the list. Each row reveals on scroll: the number settles in,
 * the title lifts, and the divider draws across.
 */

const PRINCIPLES = [
  {
    index: '01',
    title: 'Curated Properties',
    copy: 'A considered collection selected for architecture, location and long-term relevance.',
  },
  {
    index: '02',
    title: 'Private Advisory',
    copy: 'Clear guidance from search through negotiation and acquisition.',
  },
  {
    index: '03',
    title: 'Asset Stewardship',
    copy: 'Thoughtful management designed around preservation, performance and peace of mind.',
  },
  {
    index: '04',
    title: 'Transparent Service',
    copy: 'A composed process with clear communication at every stage.',
  },
];

export function AltiereStandard() {
  return (
    <div className="shell std">
      <div className="std__intro">
        <div className="std__intro-inner">
          <ScrollReveal>
            <p className="eyebrow">The Altiere Standard</p>
          </ScrollReveal>
          <ScrollReveal stagger={1}>
            <h2 id="standard-heading" className="std__title">
              Real estate, more <em>thoughtfully</em> represented.
            </h2>
          </ScrollReveal>
          <ScrollReveal stagger={2}>
            <p className="std__copy">
              A considered approach to property, from the first conversation to long-term stewardship.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <ol className="std__list">
        {PRINCIPLES.map((p, i) => (
          <li key={p.index} className="std-row">
            <ScrollReveal stagger={Math.min(i + 1, 5)} className="std-row__inner">
              <span className="std-row__index" aria-hidden="true">
                {p.index}
              </span>
              <div className="std-row__body">
                <p className="std-row__meta">
                  <span className="sr-only">Principle </span>
                  {p.index}
                </p>
                <h3 className="std-row__title">{p.title}</h3>
                <p className="std-row__copy">{p.copy}</p>
              </div>
            </ScrollReveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
