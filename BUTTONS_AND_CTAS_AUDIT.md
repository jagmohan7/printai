# PrintAI Buttons & CTAs Audit

## Navigation & Global Components

### Navbar Component (`D:\printai\components\Navbar.tsx`)

#### Desktop Navigation
| Element | Text/Label | Destination | CSS Classes |
|---------|-----------|-------------|------------|
| Logo Link | (Logo) | `/` | `flex items-center gap-2.5 flex-shrink-0` |
| Home Link | Home | `/#home` | `pa-link block py-2 text-[14.5px] font-medium` |
| About Link | About | `/about` | `pa-link block py-2 text-[14.5px] font-medium` |
| Products Dropdown | Products | `/products/chatbots` | `pa-link flex items-center gap-1 py-2 text-[14.5px] font-medium` |
| - AI Chatbot | AI Chatbot | `/products/chatbots` | `pa-drop-item block px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium` |
| - Web-to-Print | Web-to-Print | `/products/web-to-print` | `pa-drop-item block px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium` |
| Services Dropdown | Services | `/services/automation` | `pa-link flex items-center gap-1 py-2 text-[14.5px] font-medium` |
| - Automation | Print Workflow Automation | `/services/automation` | `pa-drop-item block px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium` |
| - DevOps | DevOps | `/services/devops` | `pa-drop-item block px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium` |
| - Custom AI | Custom AI Development | `/services/custom-ai` | `pa-drop-item block px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium` |
| Resources Dropdown | Resources | `/resources` | `pa-link flex items-center gap-1 py-2 text-[14.5px] font-medium` |
| - Blogs | Blogs | `/resources` | `pa-drop-item block px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium` |
| - Case Studies | Case Studies | `/case-studies` | `pa-drop-item block px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium` |
| - FAQs | FAQs | `/faqs` | `pa-drop-item block px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium` |
| Theme Toggle | (Theme Icon) | onclick: `toggleTheme()` | `pa-toggle w-9 h-9 rounded-full flex items-center justify-center` |
| Contact Link | Contact | `/#contact` | `pa-ghost inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-[14px] font-semibold` |
| CTA Button | Book Demo | `/#contact` (via onClick handler) | `pa-cta inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-[14px] font-semibold cursor-pointer` |

#### Mobile Navigation
| Element | Text/Label | Destination | CSS Classes |
|---------|-----------|-------------|------------|
| Hamburger Menu | (Icon) | onclick: `toggleMobileOpen()` | `pa-burger md:hidden p-1.5 rounded-md` |
| Products Expand | Products | onclick: `setMobileGroup()` | `pa-mhead w-full flex items-center justify-between px-3.5 py-3 text-[14px] font-medium` |
| - AI Chatbot | AI Chatbot | `/products/chatbots` | `pa-mlink block pl-6 pr-3.5 py-2.5 text-[13.5px]` |
| - Web-to-Print | Web-to-Print | `/products/web-to-print` | `pa-mlink block pl-6 pr-3.5 py-2.5 text-[13.5px]` |
| Services Expand | Services | onclick: `setMobileGroup()` | `pa-mhead w-full flex items-center justify-between px-3.5 py-3 text-[14px] font-medium` |
| - Automation | Print Workflow Automation | `/services/automation` | `pa-mlink block pl-6 pr-3.5 py-2.5 text-[13.5px]` |
| - DevOps | DevOps | `/services/devops` | `pa-mlink block pl-6 pr-3.5 py-2.5 text-[13.5px]` |
| - Custom AI | Custom AI Development | `/services/custom-ai` | `pa-mlink block pl-6 pr-3.5 py-2.5 text-[13.5px]` |
| Resources Expand | Resources | onclick: `setMobileGroup()` | `pa-mhead w-full flex items-center justify-between px-3.5 py-3 text-[14px] font-medium` |
| - Blogs | Blogs | `/resources` | `pa-mlink block pl-6 pr-3.5 py-2.5 text-[13.5px]` |
| - Case Studies | Case Studies | `/case-studies` | `pa-mlink block pl-6 pr-3.5 py-2.5 text-[13.5px]` |
| - FAQs | FAQs | `/faqs` | `pa-mlink block pl-6 pr-3.5 py-2.5 text-[13.5px]` |
| Dark Mode Toggle | Dark mode | onclick: `toggleTheme()` | `pa-mhead w-full flex items-center justify-between px-3.5 py-3 text-[14px] font-medium` |
| Mobile CTA Button | Book Demo | onclick: `onCtaClick()` | `pa-cta block mt-3 text-center px-5 py-3 text-[14px] font-semibold rounded-xl w-full cursor-pointer` |
| Mobile Contact | Contact | `/#contact` | `pa-ghost block mt-2 text-center px-5 py-3 text-[14px] font-semibold rounded-xl` |

---

### Footer Component (`D:\printai\components\Footer.tsx`)

| Element | Text/Label | Destination | CSS Classes |
|---------|-----------|-------------|------------|
| Logo Link | (Logo) | `/` | `flex items-center gap-2.5 mb-5` |
| LinkedIn | LinkedIn | `https://www.linkedin.com/company/printai` | `w-10 h-10 rounded-full border border-white/[0.12] flex items-center justify-center text-[#9FB3C8]` |
| Twitter | Twitter | `https://twitter.com/printai` | `w-10 h-10 rounded-full border border-white/[0.12] flex items-center justify-center text-[#9FB3C8]` |
| Facebook | Facebook | `https://www.facebook.com/printai` | `w-10 h-10 rounded-full border border-white/[0.12] flex items-center justify-center text-[#9FB3C8]` |
| Instagram | Instagram | `https://www.instagram.com/printai` | `w-10 h-10 rounded-full border border-white/[0.12] flex items-center justify-center text-[#9FB3C8]` |
| **Company Section** | | | |
| About Us | About Us | `/#about` | `text-[#9FB3C8] text-[13.5px] hover:text-[#13C07A]` |
| Case Studies | Case Studies | `/case-studies` | `text-[#9FB3C8] text-[13.5px] hover:text-[#13C07A]` |
| Resources | Resources | `/resources` | `text-[#9FB3C8] text-[13.5px] hover:text-[#13C07A]` |
| Contact | Contact | `/#contact` | `text-[#9FB3C8] text-[13.5px] hover:text-[#13C07A]` |
| **Products Section** | | | |
| AI Chatbot | AI Chatbot | `/products/chatbots` | `text-[#9FB3C8] text-[13.5px] hover:text-[#13C07A]` |
| Web-to-Print | Web-to-Print | `/products/web-to-print` | `text-[#9FB3C8] text-[13.5px] hover:text-[#13C07A]` |
| Workflow Automation | Workflow Automation | `/services/automation` | `text-[#9FB3C8] text-[13.5px] hover:text-[#13C07A]` |
| **Resources Section** | | | |
| Blog | Blog | `/resources` | `text-[#9FB3C8] text-[13.5px] hover:text-[#13C07A]` |
| Case Studies | Case Studies | `/case-studies` | `text-[#9FB3C8] text-[13.5px] hover:text-[#13C07A]` |
| FAQs | FAQs | `/#faq` | `text-[#9FB3C8] text-[13.5px] hover:text-[#13C07A]` |
| Privacy Policy | Privacy Policy | `/privacy` | `text-[12.5px] text-[#9FB3C8] hover:text-white` |
| Terms | Terms | `/terms` | `text-[12.5px] text-[#9FB3C8] hover:text-white` |

---

## Hero & Main Sections

### Hero Section (`D:\printai\components\sections\HeroSection.tsx`)

| Component | Button Text | Destination | CSS Classes | Notes |
|-----------|-------------|-------------|------------|-------|
| Primary CTA | Book a Demo | `/#contact` | `pa-hero-pri inline-flex items-center justify-center px-7 h-[52px] rounded-xl` | Primary action button |
| Secondary CTA | View Case Studies | `/case-studies` | `pa-hero-ghost inline-flex items-center justify-center px-7 h-[52px] rounded-xl` | Secondary action |
| Tab Buttons | (Tab name) | onclick: `setTab()` | `w-full h-8 rounded-xl text-[11.5px] font-semibold text-white transition-all hover:opacity-90` | Interactive tabs in hero |
| Feature Button | (Feature name) | onclick: action-specific | `w-full h-8 rounded-xl text-[11.5px] font-semibold text-white transition-all hover:opacity-90` | Selectable feature buttons |

---

### About Section (`D:\printai\components\sections\AboutSection.tsx`)

| Button Text | Destination | CSS Classes |
|------------|------------|------------|
| Our Story | `/#about` | `pa-btn-pri inline-flex items-center justify-center px-6 h-[48px] rounded-xl font-semibold text-[14.5px]` |
| Meet the Team | `/#contact` | `pa-btn-ghost inline-flex items-center justify-center px-6 h-[48px] rounded-xl font-semibold text-[14.5px]` |

---

### Contact CTA Section (`D:\printai\components\sections\ContactCtaSection.tsx`)

| Button Text | Destination | CSS Classes |
|------------|------------|------------|
| Book Demo | `/#contact` | `pa-btn-pri inline-flex items-center justify-center px-7 h-[52px] rounded-xl font-semibold text-[15px]` |
| Contact Sales | `/#contact` | `pa-btn-onnavy-ghost inline-flex items-center justify-center px-7 h-[52px] rounded-xl font-semibold text-[15px]` |

---

## Product-Specific Sections

### Web-to-Print Product Pages

#### W2P Hero Section (`D:\printai\components\sections\web-to-print\W2PHeroSection.tsx`)

| Button Text | Destination | CSS Classes | Notes |
|------------|------------|------------|-------|
| (Primary CTA) | `ctaPrimaryHref` | `pa-btn-pri inline-flex items-center gap-2.5 px-7 py-[13px] rounded-xl font-semibold text-[14.5px]` | Configurable from props |
| (Secondary CTA) | `ctaSecondaryHref` | `pa-btn-ghost inline-flex items-center gap-2.5 px-7 py-[13px] rounded-xl font-semibold text-[14.5px]` | Configurable from props |
| Quantity Buttons | onclick: `setActiveQty()` | `qty-btn px-3 py-2.5 rounded-lg text-sm font-semibold` | Interactive quantity selectors |
| Finish Buttons | onclick: `setActiveFinish()` | `finish-btn px-3 py-2.5 rounded-lg text-[13px] font-medium` | Interactive finish selectors |

#### W2P Store Audit Section (`D:\printai\components\sections\web-to-print\W2PStoreAuditSection.tsx`)

| Button Text | Destination | CSS Classes |
|------------|------------|------------|
| (CTA Text) | `ctaHref` | `pa-btn-pri inline-flex items-center gap-2.5 px-9 py-[15px] rounded-xl font-semibold text-[15px] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 mb-5` |

#### W2P Final CTA Section (`D:\printai\components\sections\web-to-print\W2PFinalCtaSection.tsx`)

| Button Text | Destination | CSS Classes |
|------------|------------|------------|
| (CTA Text) | `ctaHref` | `inline-flex items-center gap-2.5 px-9 py-[16px] rounded-xl font-semibold text-[15px] text-white bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#2563EB] hover:to-[#0891b2] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_40px_rgba(6,182,212,0.45)] mb-6` |

---

### Automation Product Pages

#### Hero Automation (`D:\printai\components\sections\automation\HeroAutomation.tsx`)

| Button Text | Destination | CSS Classes |
|------------|------------|------------|
| (Primary CTA) | `ctaPrimaryHref` | `inline-flex items-center gap-2.5 px-7 py-[14px] rounded-xl font-semibold text-[14.5px] text-white bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_30px_rgba(34,211,238,0.4)]` |
| (Secondary CTA) | `ctaSecondaryHref` | `inline-flex items-center gap-2.5 px-7 py-[14px] rounded-xl font-semibold text-[14.5px] pa-ink-text border border-[var(--pa-line)] bg-[var(--pa-card)] hover:border-[#3B82F6]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200` |

#### Automation CTA Section (`D:\printai\components\sections\automation\AutomationCtaSection.tsx`)

| Button Text | Destination | CSS Classes |
|------------|------------|------------|
| (CTA Text) | `ctaHref` | `mt-10 inline-flex items-center gap-2.5 px-9 py-[16px] rounded-xl font-semibold text-[15px] text-white bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_40px_rgba(34,211,238,0.45)]` |

---

### Chatbots Product Pages

#### Hero Chatbots (`D:\printai\components\sections\chatbots\HeroChatbots.tsx`)

| Button Text | Destination | CSS Classes |
|------------|------------|------------|
| (Primary CTA) | `ctaPrimaryHref` | (customizable from props) |
| (Secondary CTA) | `ctaSecondaryHref` | (customizable from props) |

#### Demo Section Chatbots (`D:\printai\components\sections\chatbots\DemoSection.tsx`)

| Button Text | Destination | CSS Classes |
|------------|------------|------------|
| (CTA Text) | `ctaHref` | (customizable from props) |

#### Final CTA Section Chatbots (`D:\printai\components\sections\chatbots\FinalCtaSection.tsx`)

| Button Text | Destination | CSS Classes |
|------------|------------|------------|
| (CTA Text) | `ctaHref` | (customizable from props) |

---

### DevOps Product Pages

#### DevOps Hero Section (`D:\printai\components\sections\devops\DevOpsHeroSection.tsx`)

| Button Text | Destination | CSS Classes |
|------------|------------|------------|
| (Primary CTA) | `ctaPrimaryHref` | `inline-flex items-center gap-2.5 px-8 py-[15px] rounded-xl font-semibold text-[15px] text-white bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#2563EB] hover:to-[#0891b2] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_30px_rgba(59,130,246,0.4)]` |
| (Secondary CTA) | `ctaSecondaryHref` | `inline-flex items-center gap-2.5 px-8 py-[15px] rounded-xl font-semibold text-[15px] pa-ink-text border border-violet-500/40 hover:border-violet-400/70 hover:bg-violet-500/10 hover:-translate-y-0.5 transition-all duration-200` |

#### DevOps CTA Section (`D:\printai\components\sections\devops\DevOpsCtaSection.tsx`)

| Button Text | Destination | CSS Classes |
|------------|------------|------------|
| (CTA Text) | `ctaHref` | `mt-10 inline-flex items-center gap-2.5 px-10 py-[17px] rounded-xl font-semibold text-[15px] text-white bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#2563EB] hover:to-[#0891b2] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_40px_rgba(59,130,246,0.4)]` |

---

### Custom AI Product Pages

#### Custom AI Hero Section (`D:\printai\components\sections\custom-ai\CustomAIHeroSection.tsx`)

| Button Text | Destination | CSS Classes |
|------------|------------|------------|
| (Primary CTA) | `ctaPrimaryHref` | `inline-flex items-center gap-2.5 px-8 py-[15px] rounded-xl font-semibold text-[15px] text-white bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#2563EB] hover:to-[#0891b2] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_36px_rgba(6,182,212,.35)]` |
| (Secondary CTA) | `ctaSecondaryAnchor` | `inline-flex items-center gap-2.5 px-8 py-[15px] rounded-xl font-semibold text-[15px] pa-ink-text border border-[var(--pa-line)] hover:border-cyan-400/40 hover:bg-cyan-500/5 hover:-translate-y-0.5 transition-all duration-200` |

#### Custom AI CTA Section (`D:\printai\components\sections\custom-ai\CustomAICtaSection.tsx`)

| Button Text | Destination | CSS Classes |
|------------|------------|------------|
| (CTA Text) | `ctaHref` | `mt-10 inline-flex items-center gap-2.5 px-12 py-[18px] rounded-xl font-semibold text-[16px] text-white bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#2563EB] hover:to-[#0891b2] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_40px_rgba(59,130,246,0.5)]` |

---

## Form & Modal Components

### Contact Form (`D:\printai\components\ContactForm.tsx`)

| Element | Type | Purpose | CSS Classes |
|---------|------|---------|------------|
| Country Code Dropdown | button | Select phone country | `w-full h-[54px] flex items-center justify-between gap-1.5 px-3 bg-white border border-[color:var(--pa-line)] rounded-xl` |
| Country Code Options | button | Select country code | `w-full flex items-center gap-2.5 px-3 py-2.5 text-left text-[13.5px] transition-colors hover:bg-[rgba(19,192,122,0.07)]` |
| Submit Button | button | Book Demo | `pa-btn-pri w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-[15px]` |

---

### Demo Modal (`D:\printai\components\DemoModal.tsx`)

| Button Text | Destination | CSS Classes | Notes |
|------------|------------|------------|-------|
| Close Button | onclick: `onClose()` | `absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10` | X button to close |
| Product Demo Card | onclick: `setActiveForm()` | `p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer` | Selectable card |
| Free Consultation Card | onclick: `setActiveForm()` | `p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer` | Selectable card |
| Book Product Demo | `productDemoHref` | `mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#13C07A] text-[#062A1E] font-bold rounded-xl hover:bg-[#0F6E56] transition-colors w-full justify-center` | Primary action |
| Book Consultation | `consultationHref` | `mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#a78bfa] to-[#7c3aed] text-white font-bold rounded-xl hover:from-[#7c3aed] hover:to-[#6d28d9] transition-colors w-full justify-center` | Primary action |

---

## Solutions & CTA Sections

### Solution CTA Section (`D:\printai\components\shared\SolutionCtaSection.tsx`)

| Button Text | Destination | CSS Classes |
|------------|------------|------------|
| (Primary Text) | `primaryHref` | `inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-[15px] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0` (background: `#13C07A`, color: `#062A1E`) |
| (Secondary Text) | `secondaryHref` | `pa-btn-onnavy-ghost inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-[15px]` |

---

## Utility & Secondary Sections

### Blogs Section (`D:\printai\components\sections\BlogsSection.tsx`)

| Button Text | Destination | CSS Classes |
|------------|------------|------------|
| View All | `viewAllHref` | `pa-btn-ghost inline-flex items-center gap-2 px-5 h-[44px] rounded-xl font-semibold text-[14px] whitespace-nowrap` |
| Blog Card Link | `post.href` | `pa-card pa-card-hover group rounded-2xl overflow-hidden flex flex-col h-full` |

---

### Services Section (`D:\printai\components\sections\ServicesSection.tsx`)

| Element | Purpose | CSS Classes |
|---------|---------|------------|
| Service Card | onclick: `swiper?.slideToLoop()` | Carousel navigation |
| Card Link | Navigate to service | `href={card.href}` |

---

### Solutions Section (`D:\printai\components\sections\SolutionsSection.tsx`)

| Element | Purpose | CSS Classes |
|---------|---------|------------|
| Solution Card | onclick: carousel navigation | Swiper carousel control |
| Card Link | Navigate to solution | `href={card.href}` |

---

## FAQ Accordions

### FAQ Accordion Buttons (Multiple Components)

Components with FAQ accordions:
- `D:\printai\components\blocks\FaqBlockClient.tsx`
- `D:\printai\components\shared\SolutionFaqSection.tsx`
- `D:\printai\components\sections\chatbots\FaqSection.tsx`
- `D:\printai\components\sections\custom-ai\CustomAIFaqSection.tsx`
- `D:\printai\components\sections\faqs\FaqsPageClient.tsx`

| Button Type | Purpose | CSS Classes |
|------------|---------|------------|
| FAQ Expand/Collapse | onclick: `setOpen()` | `w-full flex items-center justify-between px-6 py-5 text-left` or similar |

---

## Case Studies & Resources

### Case Studies Content (`D:\printai\app\case-studies\CaseStudiesContent.tsx`)

| Element | Purpose | CSS Classes |
|---------|---------|------------|
| Category Filter | onclick: `setActive()` | Category button filters |
| CTA Link | Navigate to contact | `href={c.ctaHref \|\| "/#contact"}` |

---

### Resources Content (`D:\printai\app\resources\ResourcesContent.tsx`)

| Element | Purpose | CSS Classes |
|---------|---------|------------|
| Category Filter | onclick: `setActive()` | Category button filters |
| Load More Button | onclick: `setVisible()` | Load more resources |
| CTA Link | Navigate to contact | `href={post.ctaHref \|\| "/#contact"}` |

---

## CSS Button Classes Reference

### Primary Button Styles
- **`pa-btn-pri`** — Primary CTA (teal background)
- **`pa-hero-pri`** — Hero primary button
- **`pa-cta`** — Navigation CTA button (green background, shadow)

### Secondary/Ghost Styles
- **`pa-btn-ghost`** — Secondary button (outline style, light theme)
- **`pa-hero-ghost`** — Hero secondary button
- **`pa-btn-onnavy-ghost`** — Secondary button on dark background

### Tertiary Styles
- **`pa-toggle`** — Theme toggle button
- **`pa-burger`** — Hamburger menu button
- **`pa-ghost`** — Contact link button

### Link Styles
- **`pa-link`** — Navigation link with underline animation
- **`pa-mlink`** — Mobile navigation link
- **`pa-mhead`** — Mobile menu header/expandable

---

## Default Destinations Summary

| Destination | Purpose |
|------------|---------|
| `/#home` | Homepage anchor |
| `/#about` | About section |
| `/#contact` | Contact/Demo form |
| `/about` | About page |
| `/products/chatbots` | AI Chatbot product page |
| `/products/web-to-print` | Web-to-Print product page |
| `/services/automation` | Print Automation service page |
| `/services/devops` | DevOps service page |
| `/services/custom-ai` | Custom AI Development service page |
| `/resources` | Blog & resources page |
| `/case-studies` | Case studies page |
| `/faqs` | FAQs page |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `https://www.linkedin.com/company/printai` | LinkedIn social |
| `https://twitter.com/printai` | Twitter social |
| `https://www.facebook.com/printai` | Facebook social |
| `https://www.instagram.com/printai` | Instagram social |

---

## Key Observations

1. **Consistent Button System**: The site uses a well-defined set of button classes (`pa-btn-pri`, `pa-btn-ghost`, `pa-cta`, etc.) across all components.

2. **Primary CTA**: Most pages funnel users to `/#contact` for demos or inquiries via the contact form.

3. **Navigation**: Main navigation dropdowns for Products, Services, and Resources maintain consistent structure across desktop and mobile.

4. **Styling**: CTAs use gradient backgrounds and hover effects (`hover:-translate-y-0.5`) for visual feedback.

5. **Accessibility**: Modal, form, and dropdown components include proper ARIA labels and keyboard interaction support.

6. **Mobile Responsive**: Separate styling for mobile nav with hamburger menu and full vertical layout.

7. **Theme Support**: Dark/light mode toggle affects button styling via CSS variables (`--pa-bar`, `--pa-card`, etc.).

---

**Generated**: PrintAI Buttons & CTAs Audit
