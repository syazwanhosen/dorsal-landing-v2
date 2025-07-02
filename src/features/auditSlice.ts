import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types based on OCR API response
export interface BillingItem {
  code: string;
  description: string;
  price: string;
}

export interface PersonInfo {
  name: string;
  details: string;
}

export interface AuditRecord {
  hospital_name: string;
  state: string;
  date: string;
  invoice_number: string;
  patient_information: PersonInfo;
  doctor_information: PersonInfo;
  billing_data: BillingItem[];
}

interface AuditState {
  auditRecords: AuditRecord[];
}

const initialState: AuditState = {
  auditRecords: [],
};

const auditSlice = createSlice({
  name: "audit",
  initialState,
  reducers: {
    addAuditRecord: (state, action: PayloadAction<AuditRecord>) => {
      state.auditRecords.push(action.payload);
    },
    clearAuditRecords: (state) => {
      state.auditRecords = [];
    },
  },
});

export const { addAuditRecord, clearAuditRecords } = auditSlice.actions;
export default auditSlice.reducer;
