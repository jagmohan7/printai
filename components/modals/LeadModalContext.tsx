"use client";
import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import ProductDemoModal from "./ProductDemoModal";
import ServiceConsultationModal from "./ServiceConsultationModal";

type ModalType = "product" | "service" | null;

interface LeadModalContextValue {
  openProductDemo: (entityName: string) => void;
  openServiceConsultation: (entityName: string) => void;
  closeModal: () => void;
}

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) throw new Error("useLeadModal must be used inside LeadModalProvider");
  return ctx;
}

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [entityName, setEntityName] = useState("");

  const openProductDemo = useCallback((name: string) => {
    setEntityName(name);
    setActiveModal("product");
  }, []);

  const openServiceConsultation = useCallback((name: string) => {
    setEntityName(name);
    setActiveModal("service");
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  return (
    <LeadModalContext.Provider value={{ openProductDemo, openServiceConsultation, closeModal }}>
      {children}
      <ProductDemoModal
        isOpen={activeModal === "product"}
        entityName={entityName}
        onClose={closeModal}
      />
      <ServiceConsultationModal
        isOpen={activeModal === "service"}
        entityName={entityName}
        onClose={closeModal}
      />
    </LeadModalContext.Provider>
  );
}
