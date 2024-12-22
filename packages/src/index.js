import { loadPopperJs } from './utils/loadPopper.js';

// Import components
import { initDropdowns, cleanupDropdowns } from './dropdown/dropdown.js';
import { initPopovers, cleanupPopovers } from './popover/popover.js';
import { initTooltips, cleanupTooltips } from './tooltip/tooltip.js';
import { initAlert } from './alert/alert.js';
import { initCollapse } from './collapse/collapse.js';
import { initTabs, cleanupTabs } from './tabs/tabs.js';
import { initModal, cleanupModals } from './modal/modal.js';
import { initAccordion, cleanupAccordion } from './accordion/accordion.js';
import { initStepper, cleanupStepper } from './stepper/stepper.js';

// Export individual components for named imports
export {
  initAlert,
  initCollapse,
  initDropdowns,
  cleanupDropdowns,
  initPopovers,
  cleanupPopovers,
  initTooltips,
  cleanupTooltips,
  initTabs,
  cleanupTabs,
  initModal,
  cleanupModals,
  initAccordion,
  cleanupAccordion,
  initStepper,
  cleanupStepper,
};

// Combine all features into a global object
const DavidAI = {
  initAlert,
  initCollapse,
  initDropdowns,
  cleanupDropdowns,
  initPopovers,
  cleanupPopovers,
  initTooltips,
  cleanupTooltips,
  initTabs,
  cleanupTabs,
  initModal,
  cleanupModals,
  initAccordion,
  cleanupAccordion,
  initStepper,
  cleanupStepper,
};

// **Global Initialization Function**
export function initDavidAI() {
  // Initialize Popper-independent components
  initAlert();
  initCollapse();
  initTabs();
  initModal();
  initAccordion();
  initStepper();
  // Load Popper.js once, then initialize Popper-dependent components
  loadPopperJs()
    .then(() => {
      initDropdowns();
      initPopovers();
      initTooltips();
    })
    .catch((error) => {
      console.error("Failed to load Popper.js:", error);
    });
}

// Auto-initialize components in the browser environment
if (typeof window !== "undefined" && typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    // Use the global initializer
    initDavidAI();

    // Observe DOM for dynamically added elements to auto-initialize
    const observer = new MutationObserver(() => {
      initAlert();
      initCollapse();
      initAccordion();
      initStepper();
      initTabs();
      initModal();
      initDropdowns();
      initPopovers();
      initTooltips();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Expose DavidAI globally for UMD
    window.DavidAI = { ...DavidAI, initDavidAI };
  });
}

export default { ...DavidAI, initDavidAI };
