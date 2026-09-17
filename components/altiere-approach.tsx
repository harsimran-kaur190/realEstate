import { ScrollReveal } from '@/components/site';

/*
 * The Altiere Approach — a qualitative brand statement.
 *
 * Replaces the former numeric counters. A large serif statement sits on an
 * offset two-column grid; beneath it four ideas read as a single ruled
 * ledger with hairline dividers, not as cards. Acts as a breathing point
 * between the property and location content and the storytelling below.
 */

const IDEAS = [
  { title: 'Curation', copy: 'A focused collection rather than an endless catalogue.' },
  { title: 'Clarity', copy: 'Straightforward guidance throughout the property journey.' },
  { title: 'Discretion', copy: 'A private, considered experience built around each client.' },
  { title: 'Stewardship', copy: 'Long-term attention beyond the transaction.' },
];

export function AltiereApproach() {
  return (
    <section className="apr" aria-labelledby="approach-heading">
      <div className="shell">
        <div className="apr__statement">
          <div className="apr__lead">
            <ScrollReveal>
              <p className="eyebrow">The Altiere Approach</p>
            </ScrollReveal>
            <ScrollReveal stagger={1}>
              <h2 id="approach-heading" className="apr__title">
                Considered from <em>every</em> angle.
              </h2>
            </ScrollReveal>
          </div>

          <ScrollReveal stagger={2} className="apr__aside">
            <span className="apr__mark" aria-hidden="true" />
            <p className="apr__copy">
              From discovery and acquisition to ongoing property stewardship, every decision is
              approached with clarity, discretion and attention to detail.
            </p>
          </ScrollReveal>
        </div>

        <ul className="apr__ideas">
          {IDEAS.map((idea, i) => (
            <li key={idea.title} className="apr-idea">
              <ScrollReveal stagger={Math.min(i + 1, 5)} className="apr-idea__inner">
                <h3 className="apr-idea__title">{idea.title}</h3>
                <p className="apr-idea__copy">{idea.copy}</p>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
