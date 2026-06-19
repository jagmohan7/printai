// app.jsx — assembles the PrintAI wireframe exploration canvas.
// Section functions return fragments of <DCArtboard>; guarded so the file
// renders even while later sections are still being authored.

const seg = (fn) => (typeof fn === 'function' ? fn() : null);

function App() {
  return (
    <DesignCanvas>
      <DCSection id="foundations" title="00 · Foundations" subtitle="Logo, palette, type & how to read this doc">
        {seg(window.Foundations)}
      </DCSection>
      <DCSection id="navbar" title="01 · Navbar" subtitle="Sticky · transparent-over-hero → glass-on-scroll · in-nav dark toggle">
        {seg(window.Navbar)}
      </DCSection>
      <DCSection id="hero" title="02 · Hero" subtitle="Split · centered · bento · dark — each carries the Google trust card">
        {seg(window.Hero)}
      </DCSection>
      <DCSection id="stats" title="03 · Performance Statistics" subtitle="Thin navy band · animated counters · teal numerals">
        {seg(window.Stats)}
      </DCSection>
      <DCSection id="about" title="04 · About PrintAI" subtitle="Company story · image + checklist · trust">
        {seg(window.About)}
      </DCSection>
      <DCSection id="solutions" title="05 · Our Solutions" subtitle="Chatbot · Web-to-Print · Workflow — 3-card / carousel / bento">
        {seg(window.Solutions)}
      </DCSection>
      <DCSection id="how" title="06 · How It Works" subtitle="Connect → Configure → Automate → Scale">
        {seg(window.HowItWorks)}
      </DCSection>
      <DCSection id="blogs" title="07 · Blogs" subtitle="Featured resource cards · category · excerpt">
        {seg(window.Blogs)}
      </DCSection>
      <DCSection id="testimonials" title="08 · Testimonials" subtitle="Google reviews · ratings — masonry / carousel / wall">
        {seg(window.Testimonials)}
      </DCSection>
      <DCSection id="cta" title="09 · Contact CTA" subtitle="Conversion section · navy→teal gradient · dual CTA">
        {seg(window.ContactCTA)}
      </DCSection>
      <DCSection id="footer" title="10 · Footer" subtitle="Multi-column · contact · social · legal">
        {seg(window.Footer)}
      </DCSection>
      <DCSection id="responsive" title="Responsive" subtitle="Tablet (768) + mobile (390) for the priority sections">
        {seg(window.Responsive)}
      </DCSection>
      <DCSection id="home" title="Recommended Homepage" subtitle="Strongest concepts composed into one full-page stack">
        {seg(window.Homepage)}
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
